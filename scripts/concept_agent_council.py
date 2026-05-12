#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Multi-agent council for the concept self-organization system.

This is the first programmable division-of-labor layer:
- coordinator: decides the current task and next route;
- evidence scout: reads web evidence and identifies evidence gaps;
- critic: names risks, overclaims, and failure modes;
- curriculum designer: turns the candidate into learning order;
- human liaison: prepares clear questions for a human collaborator.

The human liaison is important: automatic research should know when to ask
people for judgement, examples, domain knowledge, or value choices.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path
from typing import Any

from concept_research_orchestrator import DEFAULT_RESEARCH_DIR, ROOT, load_local_config
from concept_web_researcher import DEFAULT_WEB_DIR


DEFAULT_AGENT_DIR = ROOT / ".collaboration" / "agent_cycles"


def latest_json(directory: Path, pattern: str) -> dict[str, Any]:
    files = sorted(directory.glob(pattern), key=lambda item: item.stat().st_mtime, reverse=True)
    if not files:
        return {}
    try:
        return json.loads(files[0].read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def load_inputs(limit: int) -> list[dict[str, Any]]:
    research = latest_json(DEFAULT_RESEARCH_DIR, "research_cycle_*.json")
    web = latest_json(DEFAULT_WEB_DIR, "web_evidence_*.json")
    web_by_key = {
        f"{card.get('source')}::{card.get('candidate_id')}": card
        for card in web.get("cards", [])
    }
    tasks: list[dict[str, Any]] = []
    for card in research.get("cards", [])[:limit]:
        key = f"{card.get('source')}::{card.get('candidate_id')}"
        tasks.append({"research_card": card, "web_evidence": web_by_key.get(key, {})})
    return tasks


def short_list(items: list[Any], max_items: int = 3) -> list[Any]:
    return items[:max_items] if isinstance(items, list) else []


def coordinator(task: dict[str, Any]) -> dict[str, Any]:
    card = task["research_card"]
    evidence = task.get("web_evidence") or {}
    evidence_count = len(evidence.get("evidence", []))
    if evidence_count == 0:
        route = "需要补证据"
    elif card.get("target") in {"工具", "专题"}:
        route = "可进入原型整理"
    else:
        route = "先做边界复核"
    return {
        "role": "coordinator",
        "decision": route,
        "next_step": "分派证据、批判、学习顺序和人类询问任务",
        "reason": f"target={card.get('target')} evidence_count={evidence_count}",
    }


def evidence_scout(task: dict[str, Any]) -> dict[str, Any]:
    evidence_card = task.get("web_evidence") or {}
    evidence = evidence_card.get("evidence", [])
    rejected = evidence_card.get("rejected", [])
    if not evidence:
        gap = "外部证据不足，当前不能支持回写"
    else:
        gap = "已有候选证据，但仍需人工判断支持/反例/背景"
    return {
        "role": "evidence_scout",
        "evidence_count": len(evidence),
        "rejected_count": len(rejected),
        "best_sources": [
            {
                "title": item.get("title"),
                "url": item.get("url"),
                "quality": item.get("quality"),
                "quality_score": item.get("quality_score"),
                "relevance": item.get("relevance"),
            }
            for item in short_list(evidence)
        ],
        "gap": gap,
    }


def critic(task: dict[str, Any]) -> dict[str, Any]:
    card = task["research_card"]
    risks = list(card.get("failure_conditions", []))
    concepts = str(card.get("concepts") or "")
    if re.search(r"量子|相变|对称破缺|光速|物质", concepts):
        risks.append("可能把物理概念过快迁移到学习或认知解释")
    if len((task.get("web_evidence") or {}).get("evidence", [])) == 0:
        risks.append("缺少外部证据，不能进入强结论")
    return {
        "role": "critic",
        "verdict": "defer" if any("缺少外部证据" in item for item in risks) else "proceed_with_limits",
        "risks": risks,
        "failure_test": "如果不能给出正例、反例和边界，就只能登记为残差，不能回写为结论。",
    }


def curriculum_designer(task: dict[str, Any]) -> dict[str, Any]:
    card = task["research_card"]
    concepts = [part.strip() for part in str(card.get("concepts") or "").split("+") if part.strip()]
    if len(concepts) >= 2:
        sequence = [
            f"先解释 {concepts[0]} 的局部含义",
            f"再引入 {concepts[1]} 的约束或反馈作用",
            "最后说明二者组合何时成立、何时失效",
        ]
    else:
        sequence = ["先定义概念", "再给例子", "最后给失败条件"]
    return {
        "role": "curriculum_designer",
        "learning_sequence": sequence,
        "tool_card_candidate": {
            "title": f"{card.get('concepts')} 检查卡",
            "checks": ["先后顺序是否清楚", "边界是否清楚", "是否有正例", "是否有反例"],
        },
    }


def human_liaison(task: dict[str, Any]) -> dict[str, Any]:
    card = task["research_card"]
    evidence_count = len((task.get("web_evidence") or {}).get("evidence", []))
    concepts = card.get("concepts")
    questions = [
        f"你认为“{concepts}”更应该进入主书、专题、工具卡，还是残差？",
        "你能否给一个现实学习或研究中的例子，说明这个组合确实有用？",
        "它最容易被误用到哪里？有没有必须写明的边界？",
    ]
    if evidence_count == 0:
        questions.insert(1, "当前联网证据不足，你是否知道更合适的关键词、论文、作者或领域入口？")
    return {
        "role": "human_liaison",
        "purpose": "向人类协作者请求裁定、例子、关键词或边界意见",
        "message_to_human": f"我在处理“{concepts}”，现在需要人的判断来决定它能否继续推进。",
        "questions": questions,
        "answer_schema": {
            "decision": "主书 / 专题 / 工具卡 / 残差 / 拒绝",
            "example": "一个正例，可为空",
            "boundary": "适用边界或误用风险",
            "search_hint": "推荐关键词、论文、作者或资料源",
        },
    }


ROLE_FUNCTIONS = [coordinator, evidence_scout, critic, curriculum_designer, human_liaison]


def heuristic_council(tasks: list[dict[str, Any]]) -> list[dict[str, Any]]:
    outputs = []
    for index, task in enumerate(tasks, 1):
        card = task["research_card"]
        outputs.append(
            {
                "task_id": f"A{index:03d}",
                "concepts": card.get("concepts"),
                "target": card.get("target"),
                "agents": [fn(task) for fn in ROLE_FUNCTIONS],
            }
        )
    return outputs


def call_ai(council: list[dict[str, Any]], config: dict[str, str]) -> dict[str, Any]:
    api_key = os.environ.get("NVIDIA_API_KEY") or config.get("nvidia_api_key")
    base_url = (os.environ.get("NVIDIA_BASE_URL") or config.get("nvidia_base_url") or "https://integrate.api.nvidia.com/v1").rstrip("/")
    model = os.environ.get("NVIDIA_MODEL") or config.get("model") or "nvidia/nemotron-3-super-120b-a12b"
    if not api_key:
        return {"enabled": False, "error": "missing NVIDIA_API_KEY or local config"}
    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a multi-agent research council reviewer. "
                    "Improve the division of labor, especially the human liaison questions. "
                    "Return strict JSON with fields: improved_tasks, global_risks, next_protocol."
                ),
            },
            {"role": "user", "content": json.dumps(council, ensure_ascii=False, indent=2)},
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
        with urllib.request.urlopen(request, timeout=180) as response:
            body = json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        return {"enabled": True, "model": model, "error": str(exc)}
    content = body.get("choices", [{}])[0].get("message", {}).get("content", "")
    try:
        parsed = json.loads(content)
    except json.JSONDecodeError:
        parsed = content
    return {"enabled": True, "model": model, "review": parsed}


def write_outputs(council: list[dict[str, Any]], ai_result: dict[str, Any], output_dir: Path) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    json_path = output_dir / f"agent_cycle_{stamp}.json"
    md_path = output_dir / f"agent_cycle_{stamp}.md"
    data = {
        "created_at": datetime.now().isoformat(),
        "purpose": "multi-agent division of labor and human liaison requests",
        "council": council,
        "ai_review": ai_result,
    }
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = ["# Multi-Agent Council", "", f"- Time: {data['created_at']}", ""]
    for task in council:
        lines.extend([f"## {task['task_id']} {task.get('concepts')}", "", f"- Target: {task.get('target')}", ""])
        for agent in task.get("agents", []):
            lines.extend([f"### {agent.get('role')}", "", "```json", json.dumps(agent, ensure_ascii=False, indent=2), "```", ""])
    if ai_result.get("review"):
        lines.extend(["## AI Review", "", "```json", json.dumps(ai_result["review"], ensure_ascii=False, indent=2), "```", ""])
    if ai_result.get("error"):
        lines.extend(["## AI Error", "", str(ai_result["error"]), ""])
    md_path.write_text("\n".join(lines), encoding="utf-8")
    return json_path, md_path


def main() -> int:
    parser = argparse.ArgumentParser(description="Run multi-agent council for current research cards")
    parser.add_argument("--limit", type=int, default=3)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_AGENT_DIR)
    parser.add_argument("--use-ai", action="store_true")
    args = parser.parse_args()

    tasks = load_inputs(args.limit)
    council = heuristic_council(tasks)
    ai_result = call_ai(council, load_local_config()) if args.use_ai else {"enabled": False}
    json_path, md_path = write_outputs(council, ai_result, args.output_dir)
    print(f"[OK] Tasks: {len(council)}")
    print(f"[OK] JSON: {json_path}")
    print(f"[OK] Markdown: {md_path}")
    if ai_result.get("error"):
        print(f"[WARN] AI review failed: {ai_result['error']}")
    time.sleep(0.01)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
