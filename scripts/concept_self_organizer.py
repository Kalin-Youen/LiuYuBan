#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
差结构学习法 · 概念自组织试验器

用途：
- 从概念池或站点知识图谱中抽取概念；
- 自动生成概念组合候选；
- 用启发式规则做第一轮评分；
- 可选调用 NVIDIA/OpenAI 兼容接口做深评；
- 输出为可回写、可复核的“生长单元”。

API key 只从环境变量或本地忽略配置读取，不写入仓库。

实践建议：当前 NVIDIA 深评在 6 条候选以内较稳；更大的批量建议拆成多轮运行后合并。
"""

from __future__ import annotations

import argparse
import itertools
import json
import os
import random
import re
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTENT_JSON = ROOT / "docs" / "assets" / "data" / "content.json"
LOCAL_CONFIG = ROOT / ".concept_ai.local.json"
DEFAULT_OUTPUT_DIR = ROOT / ".collaboration" / "concept_runs"

DEFAULT_CONCEPTS = [
    {"term": "差异", "layer": "基础", "role": "识别不同"},
    {"term": "差结构", "layer": "基础", "role": "组织差异"},
    {"term": "落差", "layer": "动力", "role": "形成可比较梯度"},
    {"term": "流", "layer": "动力", "role": "表达定向传递"},
    {"term": "边界", "layer": "约束", "role": "限定交换界面"},
    {"term": "反馈", "layer": "循环", "role": "放大或抑制变化"},
    {"term": "耗散", "layer": "循环", "role": "筛除不稳定部分"},
    {"term": "稳态", "layer": "结构", "role": "维持可重复组织"},
    {"term": "结构", "layer": "结构", "role": "暂时站住的组织"},
    {"term": "规则", "layer": "规则", "role": "可重复可压缩关系"},
    {"term": "粗粒化", "layer": "分层", "role": "保留相关差异"},
    {"term": "约束继承", "layer": "分层", "role": "低层提供边界"},
    {"term": "符号外置", "layer": "认知", "role": "高保真保存关系"},
    {"term": "预测误差", "layer": "认知", "role": "驱动模型更新"},
    {"term": "注意门控", "layer": "认知", "role": "排序处理资源"},
    {"term": "残差登记", "layer": "协作", "role": "保留未解决问题"},
    {"term": "版本回写", "layer": "协作", "role": "沉淀可复核修改"},
    {"term": "知识排序", "layer": "学习", "role": "安排进入顺序"},
    {"term": "阶梯式学习", "layer": "学习", "role": "从支点逐层上升"},
    {"term": "自组织增量", "layer": "协作", "role": "在约束中自动生长"},
]

COMBINATION_FRAMES = [
    "{a} 只有经过 {b} 的约束，才可能从松散现象变成可复核结构。",
    "{a} 负责显影问题，{b} 负责决定哪些部分可以留下。",
    "当 {a} 与 {b} 接到同一回路中，系统才可能从人工修补转向自组织生长。",
    "{a} 若缺少 {b}，容易退化成散乱扩写；{b} 若缺少 {a}，又会失去现实入口。",
    "把 {a} 排在 {b} 之前，适合做入门阶梯；把 {b} 回扣到 {a}，适合做复核闭环。",
]

ACTION_MAP = [
    ("补桥", "适合补到主书或专题中，说明两层之间如何连接。"),
    ("转专题", "适合独立展开为专题，不宜直接塞进主线。"),
    ("做样本", "适合作为人类学习或 AI 协作的首批案例。"),
    ("登记残差", "有启发但边界不足，应暂存等待更多样本。"),
    ("做工具", "适合转成脚本、卡片、流程表或评测协议。"),
]


@dataclass(frozen=True)
class Concept:
    term: str
    layer: str
    role: str
    source: str = "manual"
    stage: int = 2
    difficulty: float = 0.5


@dataclass
class Candidate:
    id: str
    concepts: list[Concept]
    statement: str
    heuristic_score: float
    curriculum_stage: int
    training_weight: float
    order_reason: str
    missing_prerequisites: list[str]
    action: str
    reason: str
    risks: list[str]
    ai_review: dict[str, Any] | None = None


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def load_local_config() -> dict[str, str]:
    load_env_file(ROOT / ".env")
    if not LOCAL_CONFIG.exists():
        return {}
    try:
        data = json.loads(LOCAL_CONFIG.read_text(encoding="utf-8-sig"))
    except json.JSONDecodeError:
        return {}
    return {str(k): str(v) for k, v in data.items() if v}


def clean_text(value: Any) -> str:
    text = re.sub(r"<[^>]+>", " ", str(value or ""))
    text = re.sub(r"\s+", " ", text).strip()
    return text


def load_graph_concepts(limit: int) -> list[Concept]:
    if not CONTENT_JSON.exists():
        return []
    try:
        data = json.loads(CONTENT_JSON.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []
    graph = data.get("knowledgeGraph") or {}
    concepts: list[Concept] = []
    for node in graph.get("nodes", []):
        label = clean_text(node.get("label") or node.get("title"))
        if not label or len(label) > 18:
            continue
        layer = clean_text(node.get("kind") or node.get("family") or "图谱")
        role = clean_text(node.get("summary") or node.get("description") or node.get("intro") or "知识图谱节点")
        concepts.append(Concept(label, layer, role[:80], "knowledgeGraph", 3, 0.65))
        if len(concepts) >= limit:
            break
    return concepts


def load_concepts(path: Path | None, graph_limit: int) -> list[Concept]:
    stage_defaults = {
        "基础": (1, 0.2),
        "约束": (1, 0.35),
        "动力": (2, 0.45),
        "循环": (2, 0.5),
        "结构": (2, 0.55),
        "规则": (3, 0.65),
        "分层": (3, 0.7),
        "认知": (3, 0.7),
        "学习": (2, 0.55),
        "协作": (4, 0.8),
    }
    concepts = []
    for item in DEFAULT_CONCEPTS:
        stage, difficulty = stage_defaults.get(item["layer"], (2, 0.5))
        concepts.append(Concept(**item, stage=stage, difficulty=difficulty))
    concepts.extend(load_graph_concepts(graph_limit))
    if path and path.exists():
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, list):
            raise ValueError("概念文件必须是 JSON 数组")
        for item in data:
            concepts.append(
                Concept(
                    term=clean_text(item.get("term")),
                    layer=clean_text(item.get("layer") or "外部"),
                    role=clean_text(item.get("role") or "待定"),
                    source=clean_text(item.get("source") or str(path)),
                    stage=int(item.get("stage") or 2),
                    difficulty=float(item.get("difficulty") or 0.5),
                )
            )
    unique: dict[str, Concept] = {}
    for concept in concepts:
        if concept.term and concept.term not in unique:
            unique[concept.term] = concept
    return list(unique.values())


def heuristic_score(concepts: tuple[Concept, ...], statement: str) -> tuple[float, list[str]]:
    layers = {concept.layer for concept in concepts}
    roles = " ".join(concept.role for concept in concepts)
    terms = [concept.term for concept in concepts]
    score = 0.35
    risks: list[str] = []

    if len(layers) > 1:
        score += 0.2
    if any(term in roles for term in terms):
        score += 0.05
    if any(word in statement for word in ["约束", "边界", "反馈", "回路", "复核"]):
        score += 0.15
    if any(word in statement for word in ["自组织", "阶梯", "回写", "样本"]):
        score += 0.15
    if len(set(terms)) != len(terms):
        score -= 0.4
        risks.append("概念重复")
    if any(term in ["量子", "意识", "终极", "本体"] for term in terms):
        risks.append("可能触发过强跨层类比")
        score -= 0.05
    if len(statement) > 120:
        score -= 0.05
        risks.append("表达偏长，回写前需要压缩")
    if not risks:
        risks.append("仍需人工判断是否进入主线")
    return max(0.0, min(1.0, score)), risks


def infer_missing_prerequisites(concepts: tuple[Concept, ...], stage_gap: int) -> list[str]:
    if stage_gap <= 1:
        return []
    layers = {concept.layer for concept in concepts}
    terms = {concept.term for concept in concepts}
    missing: list[str] = []
    if "基础" in layers and not {"差结构", "落差"} & terms:
        missing.extend(["差结构", "落差"])
    if "动力" in layers and "协作" in layers:
        missing.extend(["反馈", "粗粒化", "版本回写边界"])
    if "学习" in layers and "协作" in layers:
        missing.extend(["反馈接口", "复核机制", "残差登记"])
    if not missing:
        missing.extend(["中间层概念", "适用边界", "失败条件"])
    return list(dict.fromkeys(missing))


def curriculum_metadata(concepts: tuple[Concept, ...], score: float) -> tuple[int, float, str, list[str]]:
    stages = [concept.stage for concept in concepts]
    difficulties = [concept.difficulty for concept in concepts]
    stage_gap = max(stages) - min(stages)
    curriculum_stage = max(stages)
    difficulty = sum(difficulties) / len(difficulties)

    weight = score * (1.0 - min(stage_gap, 3) * 0.08) * (1.0 - max(0.0, difficulty - 0.65) * 0.25)
    weight = max(0.05, min(1.0, weight))

    if stage_gap == 0:
        reason = "同层组合，适合在同一学习阶段内做概念对照。"
    elif stage_gap == 1:
        reason = "相邻层组合，适合做阶梯桥接。"
    else:
        reason = "跨层较大，需先补中间先修概念，暂不宜直接回写为结论。"
        weight *= 0.75

    return curriculum_stage, round(weight, 3), reason, infer_missing_prerequisites(concepts, stage_gap)


def make_candidates(concepts: list[Concept], count: int, seed: int | None) -> list[Candidate]:
    rng = random.Random(seed)
    pairs = list(itertools.combinations(concepts, 2))
    rng.shuffle(pairs)
    candidates: list[Candidate] = []
    for index, pair in enumerate(pairs[: max(count * 5, count)]):
        frame = rng.choice(COMBINATION_FRAMES)
        statement = frame.format(a=pair[0].term, b=pair[1].term)
        score, risks = heuristic_score(pair, statement)
        curriculum_stage, training_weight, order_reason, missing_prerequisites = curriculum_metadata(pair, score)
        action, reason = ACTION_MAP[index % len(ACTION_MAP)]
        candidates.append(
            Candidate(
                id=f"C{index + 1:04d}",
                concepts=list(pair),
                statement=statement,
                heuristic_score=round(score, 3),
                curriculum_stage=curriculum_stage,
                training_weight=training_weight,
                order_reason=order_reason,
                missing_prerequisites=missing_prerequisites,
                action=action,
                reason=reason,
                risks=risks,
            )
        )
    candidates.sort(key=lambda item: item.heuristic_score, reverse=True)
    return candidates[:count]


def call_ai_review(candidates: list[Candidate], config: dict[str, str]) -> dict[str, Any]:
    api_key = os.environ.get("NVIDIA_API_KEY") or config.get("nvidia_api_key")
    base_url = (os.environ.get("NVIDIA_BASE_URL") or config.get("nvidia_base_url") or "https://integrate.api.nvidia.com/v1").rstrip("/")
    model = os.environ.get("NVIDIA_MODEL") or config.get("model") or "nvidia/nemotron-3-super-120b-a12b"
    if not api_key:
        return {"enabled": False, "error": "未设置 NVIDIA_API_KEY 或 .concept_ai.local.json 中的 nvidia_api_key"}

    compact = [
        {
            "id": item.id,
            "concepts": [concept.term for concept in item.concepts],
            "statement": item.statement,
            "curriculum_stage": item.curriculum_stage,
            "training_weight": item.training_weight,
            "order_reason": item.order_reason,
            "missing_prerequisites": item.missing_prerequisites,
            "action": item.action,
        }
        for item in candidates
    ]
    system_prompt = (
        "你是差结构学习法项目的L3复核智能体。"
        "你的任务不是扩写，而是审查概念组合候选能否成为生长单元。"
        "请严格输出JSON，不要Markdown。"
    )
    user_prompt = (
        "请审查这些机器自动组合出的概念候选。"
        "对每条给出 verdict(keep/defer/reject)、score(0-1)、target(主书/专题/AI协作卷/残差/工具)、"
        "reason、risk。只保留边界清楚、可回写的判断。\n\n"
        + json.dumps(compact, ensure_ascii=False, indent=2)
    )
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.2,
        "max_tokens": 4096,
        "stream": False,
    }
    request = urllib.request.Request(
        f"{base_url}/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            body = json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        return {"enabled": True, "error": str(exc), "model": model}
    content = body.get("choices", [{}])[0].get("message", {}).get("content", "")
    parsed: Any = content
    try:
        parsed = json.loads(content)
    except json.JSONDecodeError:
        pass
    return {"enabled": True, "model": model, "review": parsed}


def write_outputs(candidates: list[Candidate], ai_result: dict[str, Any], output_dir: Path) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    json_path = output_dir / f"concept_run_{stamp}.json"
    md_path = output_dir / f"concept_run_{stamp}.md"
    data = {
        "created_at": datetime.now().isoformat(),
        "purpose": "机器自行运行概念组合，生成可复核生长单元",
        "ai_review": ai_result,
        "candidates": [
            {
                **asdict(candidate),
                "concepts": [asdict(concept) for concept in candidate.concepts],
            }
            for candidate in candidates
        ],
    }
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    reviews_by_id: dict[str, dict[str, Any]] = {}
    review_payload = ai_result.get("review")
    if isinstance(review_payload, list):
        reviews_by_id = {
            str(item.get("id")): item
            for item in review_payload
            if isinstance(item, dict) and item.get("id")
        }

    lines = [
        "# 概念自组织运行记录",
        "",
        f"- 时间：{data['created_at']}",
        f"- AI 深评：{'已启用' if ai_result.get('enabled') else '未启用'}",
        f"- 深评模型：{ai_result.get('model', '-') if ai_result.get('enabled') else '-'}",
        "",
        "| ID | 概念组合 | 阶段 | 权重 | 分数 | 建议动作 | AI裁定 | AI去向 | AI风险 | 候选句 | 排序理由 | 缺失先修 | 风险 |",
        "|---|---|---:|---:|---:|---|---|---|---:|---|---|---|---|",
    ]
    for item in candidates:
        concept_text = " + ".join(concept.term for concept in item.concepts)
        risk_text = "；".join(item.risks)
        missing_text = "；".join(item.missing_prerequisites) if item.missing_prerequisites else "-"
        review = reviews_by_id.get(item.id, {})
        if ai_result.get("enabled") and item.id not in reviews_by_id:
            verdict = "unreviewed"
            target = "-"
            ai_risk = "AI未返回此项"
        else:
            verdict = str(review.get("verdict", "-"))
            target = str(review.get("target", "-"))
            ai_risk = review.get("risk", "-")
        lines.append(
            f"| {item.id} | {concept_text} | {item.curriculum_stage} | {item.training_weight:.3f} | {item.heuristic_score:.3f} | {item.action} | {verdict} | {target} | {ai_risk} | {item.statement} | {item.order_reason} | {missing_text} | {risk_text} |"
        )
    md_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return json_path, md_path


def main() -> int:
    parser = argparse.ArgumentParser(description="运行概念自组织组合试验")
    parser.add_argument("--concept-file", type=Path, help="额外概念池 JSON 文件")
    parser.add_argument("--count", type=int, default=6, help="输出候选数量；启用 --use-ai 时建议不超过 6")
    parser.add_argument("--graph-limit", type=int, default=24, help="从知识图谱抽取的概念上限")
    parser.add_argument("--seed", type=int, default=None, help="随机种子")
    parser.add_argument("--use-ai", action="store_true", help="调用 NVIDIA/OpenAI 兼容接口做深评")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR, help="输出目录")
    args = parser.parse_args()

    concepts = load_concepts(args.concept_file, args.graph_limit)
    candidates = make_candidates(concepts, args.count, args.seed)
    config = load_local_config()
    ai_result = call_ai_review(candidates, config) if args.use_ai else {"enabled": False}
    json_path, md_path = write_outputs(candidates, ai_result, args.output_dir)

    print(f"[OK] 概念数: {len(concepts)}")
    print(f"[OK] 候选数: {len(candidates)}")
    print(f"[OK] JSON: {json_path}")
    print(f"[OK] Markdown: {md_path}")
    if ai_result.get("error"):
        print(f"[WARN] AI 深评未完成: {ai_result['error']}")
    time.sleep(0.01)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
