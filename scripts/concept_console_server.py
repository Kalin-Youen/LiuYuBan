#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
概念自组织控制台服务。

本地启动：
    python scripts/concept_console_server.py --port 8765

打开：
    http://127.0.0.1:8765

只使用 Python 标准库。API key 仍由 concept_self_organizer.py 从本地忽略配置读取。
"""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import os
import json
import subprocess
import threading
import time
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
RUNS_DIR = ROOT / ".collaboration" / "concept_runs"
CONSOLE_HTML = ROOT / "tools" / "concept_console.html"
SCRIPT = ROOT / "scripts" / "concept_self_organizer.py"
RESEARCH_SCRIPT = ROOT / "scripts" / "concept_research_orchestrator.py"
WEB_SCRIPT = ROOT / "scripts" / "concept_web_researcher.py"
AGENT_SCRIPT = ROOT / "scripts" / "concept_agent_council.py"
QA_SCRIPT = ROOT / "scripts" / "concept_human_qa.py"
RESEARCH_DIR = ROOT / ".collaboration" / "research_cycles"
WEB_DIR = ROOT / ".collaboration" / "web_evidence"
AGENT_DIR = ROOT / ".collaboration" / "agent_cycles"
HUMAN_FEEDBACK_DIR = ROOT / ".collaboration" / "human_feedback"
QA_DIR = ROOT / ".collaboration" / "human_qa"


loop_state = {
    "running": False,
    "interval_seconds": 900,
    "count": 6,
    "use_ai": True,
    "last_started_at": None,
    "last_finished_at": None,
    "last_error": None,
    "runs_started": 0,
}
loop_thread: threading.Thread | None = None
loop_lock = threading.Lock()


def read_json_body(handler: BaseHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length", "0") or "0")
    if length <= 0:
        return {}
    raw = handler.rfile.read(length).decode("utf-8")
    return json.loads(raw) if raw else {}


def run_once(count: int = 6, use_ai: bool = True, seed: int | None = None) -> dict:
    command = [
        "python",
        str(SCRIPT),
        "--count",
        str(count),
        "--output-dir",
        str(RUNS_DIR),
    ]
    if seed is not None:
        command.extend(["--seed", str(seed)])
    if use_ai:
        command.append("--use-ai")
    started = datetime.now().isoformat()
    proc = subprocess.run(
        command,
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        timeout=300,
    )
    finished = datetime.now().isoformat()
    result = {
        "ok": proc.returncode == 0,
        "started_at": started,
        "finished_at": finished,
        "command": command,
        "stdout": proc.stdout,
        "stderr": proc.stderr,
        "returncode": proc.returncode,
    }
    with loop_lock:
        loop_state["last_started_at"] = started
        loop_state["last_finished_at"] = finished
        loop_state["last_error"] = None if result["ok"] else proc.stderr or proc.stdout
        loop_state["runs_started"] += 1
    return result


def run_research_cycle(limit: int = 5, use_ai: bool = True) -> dict:
    command = [
        "python",
        str(RESEARCH_SCRIPT),
        "--limit",
        str(limit),
        "--output-dir",
        str(RESEARCH_DIR),
    ]
    if use_ai:
        command.append("--use-ai")
    started = datetime.now().isoformat()
    proc = subprocess.run(
        command,
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        timeout=360,
    )
    return {
        "ok": proc.returncode == 0,
        "started_at": started,
        "finished_at": datetime.now().isoformat(),
        "command": command,
        "stdout": proc.stdout,
        "stderr": proc.stderr,
        "returncode": proc.returncode,
    }


def run_web_evidence(limit: int = 3, search_limit: int = 5, fetch_limit: int = 3) -> dict:
    command = [
        "python",
        str(WEB_SCRIPT),
        "--limit",
        str(limit),
        "--search-limit",
        str(search_limit),
        "--fetch-limit",
        str(fetch_limit),
        "--output-dir",
        str(WEB_DIR),
    ]
    started = datetime.now().isoformat()
    proc = subprocess.run(
        command,
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        timeout=360,
    )
    return {
        "ok": proc.returncode == 0,
        "started_at": started,
        "finished_at": datetime.now().isoformat(),
        "command": command,
        "stdout": proc.stdout,
        "stderr": proc.stderr,
        "returncode": proc.returncode,
    }


def run_agent_council(limit: int = 3, use_ai: bool = True) -> dict:
    command = [
        "python",
        str(AGENT_SCRIPT),
        "--limit",
        str(limit),
        "--output-dir",
        str(AGENT_DIR),
    ]
    if use_ai:
        command.append("--use-ai")
    started = datetime.now().isoformat()
    proc = subprocess.run(
        command,
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        timeout=360,
    )
    return {
        "ok": proc.returncode == 0,
        "started_at": started,
        "finished_at": datetime.now().isoformat(),
        "command": command,
        "stdout": proc.stdout,
        "stderr": proc.stderr,
        "returncode": proc.returncode,
    }


def run_human_qa(question: str) -> dict:
    command = [
        "python",
        str(QA_SCRIPT),
        "--question",
        question,
        "--output-dir",
        str(QA_DIR),
    ]
    started = datetime.now().isoformat()
    env = {**os.environ, "PYTHONIOENCODING": "utf-8"}
    proc = subprocess.run(
        command,
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        env=env,
        timeout=180,
    )
    parsed = None
    stdout = proc.stdout or ""
    stderr = proc.stderr or ""
    if stdout.strip():
        try:
            parsed = json.loads(stdout)
        except json.JSONDecodeError:
            parsed = None
    return {
        "ok": proc.returncode == 0,
        "started_at": started,
        "finished_at": datetime.now().isoformat(),
        "command": command,
        "stdout": stdout,
        "stderr": stderr,
        "returncode": proc.returncode,
        "result": parsed,
    }


def loop_worker() -> None:
    while True:
        with loop_lock:
            if not loop_state["running"]:
                return
            interval = int(loop_state["interval_seconds"])
            count = int(loop_state["count"])
            use_ai = bool(loop_state["use_ai"])
        try:
            run_once(count=count, use_ai=use_ai)
        except Exception as exc:  # noqa: BLE001
            with loop_lock:
                loop_state["last_error"] = str(exc)
        slept = 0
        while slept < interval:
            time.sleep(min(2, interval - slept))
            slept += min(2, interval - slept)
            with loop_lock:
                if not loop_state["running"]:
                    return


def summarize_candidate(candidate: dict, reviews: dict[str, dict]) -> dict:
    concepts = candidate.get("concepts") or []
    concept_text = " + ".join(str(item.get("term", "")) for item in concepts if isinstance(item, dict))
    review = reviews.get(str(candidate.get("id")), {})
    return {
        "id": candidate.get("id"),
        "concepts": concept_text,
        "statement": candidate.get("statement"),
        "heuristic_score": candidate.get("heuristic_score"),
        "curriculum_stage": candidate.get("curriculum_stage"),
        "training_weight": candidate.get("training_weight"),
        "action": candidate.get("action"),
        "order_reason": candidate.get("order_reason"),
        "missing_prerequisites": candidate.get("missing_prerequisites") or [],
        "risks": candidate.get("risks") or [],
        "ai_verdict": review.get("verdict", "unreviewed" if reviews else "-"),
        "ai_target": review.get("target", "-"),
        "ai_score": review.get("score"),
        "ai_reason": review.get("reason", ""),
        "ai_risk": review.get("risk", ""),
    }


def load_runs() -> list[dict]:
    RUNS_DIR.mkdir(parents=True, exist_ok=True)
    runs = []
    for path in sorted(RUNS_DIR.glob("concept_run_*.json"), key=lambda item: item.stat().st_mtime, reverse=True):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        review_payload = (data.get("ai_review") or {}).get("review")
        reviews = {
            str(item.get("id")): item
            for item in review_payload
            if isinstance(review_payload, list)
            for item in review_payload
            if isinstance(item, dict) and item.get("id")
        } if isinstance(review_payload, list) else {}
        candidates = [summarize_candidate(item, reviews) for item in data.get("candidates", [])]
        runs.append(
            {
                "file": str(path.relative_to(ROOT)),
                "created_at": data.get("created_at"),
                "purpose": data.get("purpose"),
                "ai_enabled": bool((data.get("ai_review") or {}).get("enabled")),
                "ai_model": (data.get("ai_review") or {}).get("model"),
                "candidate_count": len(candidates),
                "reviewed_count": sum(1 for item in candidates if item.get("ai_verdict") not in ("-", "unreviewed")),
                "keep_count": sum(1 for item in candidates if item.get("ai_verdict") == "keep"),
                "candidates": candidates,
            }
        )
    return runs


def load_research_cycles() -> list[dict]:
    RESEARCH_DIR.mkdir(parents=True, exist_ok=True)
    cycles = []
    for path in sorted(RESEARCH_DIR.glob("research_cycle_*.json"), key=lambda item: item.stat().st_mtime, reverse=True):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        cycles.append(
            {
                "file": str(path.relative_to(ROOT)),
                "created_at": data.get("created_at"),
                "purpose": data.get("purpose"),
                "ai_enabled": bool((data.get("ai_research") or {}).get("enabled")),
                "ai_model": (data.get("ai_research") or {}).get("model"),
                "card_count": len(data.get("cards", [])),
                "cards": data.get("cards", []),
                "ai_research": (data.get("ai_research") or {}).get("research_cards"),
                "ai_error": (data.get("ai_research") or {}).get("error"),
            }
        )
    return cycles


def load_web_evidence() -> list[dict]:
    WEB_DIR.mkdir(parents=True, exist_ok=True)
    batches = []
    for path in sorted(WEB_DIR.glob("web_evidence_*.json"), key=lambda item: item.stat().st_mtime, reverse=True):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        cards = data.get("cards", [])
        batches.append(
            {
                "file": str(path.relative_to(ROOT)),
                "created_at": data.get("created_at"),
                "purpose": data.get("purpose"),
                "card_count": len(cards),
                "evidence_count": sum(len(card.get("evidence", [])) for card in cards),
                "rejected_count": sum(len(card.get("rejected", [])) for card in cards),
                "cards": cards,
            }
        )
    return batches


def load_agent_cycles() -> list[dict]:
    AGENT_DIR.mkdir(parents=True, exist_ok=True)
    cycles = []
    for path in sorted(AGENT_DIR.glob("agent_cycle_*.json"), key=lambda item: item.stat().st_mtime, reverse=True):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        council = data.get("council", [])
        human_requests = []
        for task in council:
            for agent in task.get("agents", []):
                if agent.get("role") == "human_liaison":
                    human_requests.append(
                        {
                            "task_id": task.get("task_id"),
                            "concepts": task.get("concepts"),
                            "message": agent.get("message_to_human"),
                            "questions": agent.get("questions", []),
                            "answer_schema": agent.get("answer_schema", {}),
                        }
                    )
        cycles.append(
            {
                "file": str(path.relative_to(ROOT)),
                "created_at": data.get("created_at"),
                "purpose": data.get("purpose"),
                "task_count": len(council),
                "human_request_count": len(human_requests),
                "human_requests": human_requests,
                "council": council,
                "ai_enabled": bool((data.get("ai_review") or {}).get("enabled")),
                "ai_model": (data.get("ai_review") or {}).get("model"),
                "ai_error": (data.get("ai_review") or {}).get("error"),
                "ai_review": (data.get("ai_review") or {}).get("review"),
            }
        )
    return cycles


def load_human_feedback() -> list[dict]:
    HUMAN_FEEDBACK_DIR.mkdir(parents=True, exist_ok=True)
    feedback = []
    for path in sorted(HUMAN_FEEDBACK_DIR.glob("human_feedback_*.json"), key=lambda item: item.stat().st_mtime, reverse=True):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        feedback.append({**data, "file": str(path.relative_to(ROOT))})
    return feedback


def load_human_qa() -> list[dict]:
    QA_DIR.mkdir(parents=True, exist_ok=True)
    answers = []
    for path in sorted(QA_DIR.glob("human_qa_*.json"), key=lambda item: item.stat().st_mtime, reverse=True):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        answers.append({**data, "file": str(path.relative_to(ROOT))})
    return answers


def save_human_feedback(body: dict) -> dict:
    HUMAN_FEEDBACK_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
    data = {
        "created_at": datetime.now().isoformat(),
        "task_id": str(body.get("task_id") or ""),
        "concepts": str(body.get("concepts") or ""),
        "decision": str(body.get("decision") or ""),
        "example": str(body.get("example") or ""),
        "boundary": str(body.get("boundary") or ""),
        "search_hint": str(body.get("search_hint") or ""),
        "notes": str(body.get("notes") or ""),
    }
    path = HUMAN_FEEDBACK_DIR / f"human_feedback_{stamp}.json"
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return {"ok": True, "file": str(path.relative_to(ROOT)), "feedback": data}


def summarize_human_feedback() -> dict:
    feedback = load_human_feedback()
    decision_counts = Counter(item.get("decision") or "-" for item in feedback)
    search_hints = [item for item in feedback if item.get("search_hint")]
    boundary_notes = [item for item in feedback if item.get("boundary")]
    return {
        "feedback_count": len(feedback),
        "decision_counts": dict(decision_counts),
        "search_hints": search_hints[:10],
        "boundary_notes": boundary_notes[:10],
    }


def clamp_score(value: float) -> float:
    return round(max(0.0, min(1.0, value)), 3)


def build_potential_map() -> dict:
    runs = load_runs()
    aggregate = aggregate_runs(runs)
    research_cycles = load_research_cycles()
    web_batches = load_web_evidence()
    agent_cycles = load_agent_cycles()
    feedback = load_human_feedback()
    answers = load_human_qa()

    latest_research = research_cycles[0] if research_cycles else {}
    latest_web = web_batches[0] if web_batches else {}
    latest_agent = agent_cycles[0] if agent_cycles else {}

    card_count = int(latest_research.get("card_count") or 0)
    evidence_count = int(latest_web.get("evidence_count") or 0)
    rejected_count = int(latest_web.get("rejected_count") or 0)
    human_request_count = int(latest_agent.get("human_request_count") or 0)
    feedback_count = len(feedback)
    answer_count = len(answers)
    writable_count = len(aggregate.get("writable_candidates") or [])
    repeated_count = len(aggregate.get("repeated_pairs") or [])
    keep_rate = float(aggregate.get("keep_rate") or 0)

    evidence_total = evidence_count + rejected_count
    evidence_quality = evidence_count / evidence_total if evidence_total else 0.0
    feedback_coverage = feedback_count / human_request_count if human_request_count else (1.0 if feedback_count else 0.0)

    dimensions = [
        {
            "name": "概念自组织",
            "score": clamp_score((aggregate.get("candidate_count", 0) / 40) * 0.35 + keep_rate * 0.45 + min(repeated_count, 8) / 8 * 0.2),
            "signal": f"候选 {aggregate.get('candidate_count', 0)}，keep率 {aggregate.get('keep_rate', 0)}，重复组合 {repeated_count}",
            "risk": "如果重复组合很多但没有人类裁定，会变成自我循环的漂亮组合。",
            "next": "让高频组合进入快速卡片，由人裁定去向。"
        },
        {
            "name": "研究卡管线",
            "score": clamp_score(min(card_count, 8) / 8 * 0.75 + (0.25 if research_cycles else 0)),
            "signal": f"最新研究卡 {card_count}，累计循环 {len(research_cycles)}",
            "risk": "研究卡如果只生成问题、不进入证据和回写，会停在计划层。",
            "next": "把排名靠前的研究卡强制进入联网取证和智能体会商。"
        },
        {
            "name": "联网证据",
            "score": clamp_score(min(evidence_count, 12) / 12 * 0.55 + evidence_quality * 0.45),
            "signal": f"最新证据 {evidence_count}，过滤 {rejected_count}，可用率 {round(evidence_quality, 2)}",
            "risk": "当前最大瓶颈是搜索质量，容易抓到词典页、低上下文页。",
            "next": "改进查询模板，优先论文、教材、百科、官方文档和高质量综述。"
        },
        {
            "name": "人类裁定回路",
            "score": clamp_score(min(feedback_count, 12) / 12 * 0.5 + min(feedback_coverage, 1.0) * 0.5),
            "signal": f"反馈 {feedback_count}，待人类请求 {human_request_count}，覆盖率 {round(feedback_coverage, 2)}",
            "risk": "如果人类反馈入口太重，系统无法从人的判断中学习。",
            "next": "继续强化手机快速裁定，并把裁定反向影响候选排序。"
        },
        {
            "name": "人机问答",
            "score": clamp_score(min(answer_count, 10) / 10 * 0.8 + (0.2 if answers else 0)),
            "signal": f"问答记录 {answer_count}",
            "risk": "问答如果不引用本地依据和边界，会退化成普通聊天。",
            "next": "让每个回答都能生成一个后续研究卡或反馈请求。"
        },
        {
            "name": "成果回写",
            "score": clamp_score(min(writable_count, 8) / 8 * 0.6 + min(feedback_count, 8) / 8 * 0.4),
            "signal": f"可回写候选 {writable_count}，人类反馈 {feedback_count}",
            "risk": "只运行不回写，项目会堆积运行数据但不长成文稿。",
            "next": "建立从主书/专题/工具卡/残差裁定到文稿草案的半自动出口。"
        },
    ]

    dimensions.sort(key=lambda item: item["score"], reverse=True)
    bottlenecks = [item for item in sorted(dimensions, key=lambda item: item["score"])[:3]]
    strongest = dimensions[:2]
    next_focus = bottlenecks[0]["name"] if bottlenecks else "继续收集样本"

    return {
        "created_at": datetime.now().isoformat(),
        "summary": {
            "overall_score": clamp_score(sum(item["score"] for item in dimensions) / len(dimensions)) if dimensions else 0,
            "next_focus": next_focus,
            "strongest": [item["name"] for item in strongest],
            "bottlenecks": [item["name"] for item in bottlenecks],
        },
        "dimensions": dimensions,
        "roadmap": [
            {"stage": "现在", "action": f"集中补强：{next_focus}", "success_signal": "对应分数超过 0.6，且能产生可复核记录。"},
            {"stage": "下一步", "action": "把快速裁定结果反向接入概念排序和研究卡选择。", "success_signal": "被人类裁定为主书/专题/工具卡的组合排名上升。"},
            {"stage": "再下一步", "action": "建立成果回写出口：从裁定卡生成章节补丁、专题草稿或工具卡草案。", "success_signal": "每轮自动研究至少产生一个可审阅的文稿变更候选。"},
        ],
        "warning_signals": [
            "证据数量增加但高质量来源比例不上升。",
            "候选组合变多但人类裁定没有增加。",
            "问答越来越流畅，但依据路径和边界越来越少。",
            "运行记录堆积，却没有进入主书、专题、工具卡或残差库。"
        ],
    }


def aggregate_runs(runs: list[dict]) -> dict:
    candidates = [
        {**candidate, "run_file": run["file"], "run_created_at": run.get("created_at")}
        for run in runs
        for candidate in run.get("candidates", [])
    ]
    reviewed = [item for item in candidates if item.get("ai_verdict") not in ("-", "unreviewed")]
    kept = [item for item in candidates if item.get("ai_verdict") == "keep"]
    unreviewed = [item for item in candidates if item.get("ai_verdict") == "unreviewed"]

    target_counts = Counter(str(item.get("ai_target") or "-") for item in kept)
    verdict_counts = Counter(str(item.get("ai_verdict") or "-") for item in candidates)
    concept_counts: Counter[str] = Counter()
    pair_stats: dict[str, dict] = {}
    target_buckets: dict[str, list[dict]] = defaultdict(list)
    high_risk: list[dict] = []

    for item in candidates:
        concepts = str(item.get("concepts") or "")
        terms = [part.strip() for part in concepts.split("+") if part.strip()]
        concept_counts.update(terms)

        stats = pair_stats.setdefault(
            concepts,
            {
                "concepts": concepts,
                "count": 0,
                "keep": 0,
                "reviewed": 0,
                "weight_sum": 0.0,
                "targets": Counter(),
                "examples": [],
            },
        )
        stats["count"] += 1
        stats["weight_sum"] += float(item.get("training_weight") or 0)
        if item.get("ai_verdict") not in ("-", "unreviewed"):
            stats["reviewed"] += 1
        if item.get("ai_verdict") == "keep":
            stats["keep"] += 1
            stats["targets"][str(item.get("ai_target") or "-")] += 1
            target_buckets[str(item.get("ai_target") or "-")].append(item)
        if len(stats["examples"]) < 2:
            stats["examples"].append(
                {
                    "id": item.get("id"),
                    "run_file": item.get("run_file"),
                    "statement": item.get("statement"),
                    "ai_reason": item.get("ai_reason"),
                    "ai_risk": item.get("ai_risk"),
                }
            )

        risk_text = " ".join(
            str(value)
            for value in [item.get("ai_risk"), *(item.get("risks") or [])]
            if value
        )
        if item.get("ai_verdict") == "reject" or any(word in risk_text for word in ["过强", "跨层", "风险", "不清", "泛化"]):
            high_risk.append(item)

    repeated_pairs = []
    for stats in pair_stats.values():
        reviewed_count = stats["reviewed"]
        keep_rate = stats["keep"] / reviewed_count if reviewed_count else 0.0
        repeated_pairs.append(
            {
                "concepts": stats["concepts"],
                "count": stats["count"],
                "reviewed": reviewed_count,
                "keep": stats["keep"],
                "keep_rate": round(keep_rate, 3),
                "avg_weight": round(stats["weight_sum"] / stats["count"], 3),
                "targets": dict(stats["targets"]),
                "examples": stats["examples"],
            }
        )
    repeated_pairs.sort(key=lambda item: (item["count"], item["keep"], item["avg_weight"]), reverse=True)

    writable_targets = {"主书", "专题", "工具", "AI协作卷", "残差"}
    writable_candidates = [
        item
        for item in kept
        if str(item.get("ai_target") or "") in writable_targets
    ]
    writable_candidates.sort(
        key=lambda item: (
            float(item.get("ai_score") or 0),
            float(item.get("training_weight") or 0),
        ),
        reverse=True,
    )

    total = len(candidates)
    reviewed_count = len(reviewed)
    keep_rate = len(kept) / reviewed_count if reviewed_count else 0.0
    unreviewed_rate = len(unreviewed) / total if total else 0.0
    repeated_count = sum(1 for item in repeated_pairs if item["count"] > 1)
    has_reusable_output = bool(writable_candidates)

    if total == 0:
        judgement = "还没有足够样本，不能判断。"
    elif has_reusable_output and (keep_rate >= 0.45 or repeated_count > 0):
        judgement = "有研究用途：系统已经产生可回写候选，并能用跨批次指标筛选。"
    elif has_reusable_output:
        judgement = "处在工具雏形：已有可回写候选，但稳定性还要靠更多批次确认。"
    else:
        judgement = "目前更像玩具：还没有形成可回写对象或稳定重复模式。"

    return {
        "run_count": len(runs),
        "candidate_count": total,
        "reviewed_count": reviewed_count,
        "keep_count": len(kept),
        "keep_rate": round(keep_rate, 3),
        "unreviewed_count": len(unreviewed),
        "unreviewed_rate": round(unreviewed_rate, 3),
        "target_counts": dict(target_counts),
        "verdict_counts": dict(verdict_counts),
        "top_concepts": concept_counts.most_common(12),
        "repeated_pairs": repeated_pairs[:12],
        "writable_candidates": writable_candidates[:12],
        "high_risk_candidates": high_risk[:12],
        "judgement": judgement,
        "toy_conditions": [
            "输出不能被聚合",
            "没有候选通过复核",
            "没有重复模式或稳定去向",
            "没有任何候选能进入正文、专题、工具卡或残差登记",
        ],
        "useful_conditions": [
            "产生可回写候选",
            "能暴露缺失先修或边界风险",
            "多轮后出现重复概念或稳定去向",
            "人工裁定可以反过来调整下一轮权重",
        ],
    }


class Handler(BaseHTTPRequestHandler):
    def send_json(self, data: dict | list, status: int = 200) -> None:
        encoded = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self) -> None:  # noqa: N802
        path = urlparse(self.path).path
        if path == "/":
            content = CONSOLE_HTML.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            return
        if path == "/api/runs":
            self.send_json({"runs": load_runs(), "loop": loop_state})
            return
        if path == "/api/aggregate":
            runs = load_runs()
            self.send_json({"aggregate": aggregate_runs(runs), "loop": loop_state})
            return
        if path == "/api/research-cycles":
            self.send_json({"cycles": load_research_cycles()})
            return
        if path == "/api/web-evidence":
            self.send_json({"batches": load_web_evidence()})
            return
        if path == "/api/agent-cycles":
            self.send_json({"cycles": load_agent_cycles()})
            return
        if path == "/api/human-feedback":
            self.send_json({"feedback": load_human_feedback(), "summary": summarize_human_feedback()})
            return
        if path == "/api/human-qa":
            self.send_json({"answers": load_human_qa()})
            return
        if path == "/api/potential-map":
            self.send_json({"potential": build_potential_map()})
            return
        if path == "/api/status":
            self.send_json({"loop": loop_state})
            return
        self.send_json({"error": "not found"}, 404)

    def do_POST(self) -> None:  # noqa: N802
        global loop_thread
        path = urlparse(self.path).path
        try:
            body = read_json_body(self)
            if path == "/api/run-once":
                count = int(body.get("count", 6))
                use_ai = bool(body.get("use_ai", True))
                seed = body.get("seed")
                result = run_once(count=count, use_ai=use_ai, seed=int(seed) if seed not in (None, "") else None)
                self.send_json(result)
                return
            if path == "/api/start-loop":
                with loop_lock:
                    loop_state["running"] = True
                    loop_state["interval_seconds"] = int(body.get("interval_seconds", 900))
                    loop_state["count"] = int(body.get("count", 6))
                    loop_state["use_ai"] = bool(body.get("use_ai", True))
                if loop_thread is None or not loop_thread.is_alive():
                    loop_thread = threading.Thread(target=loop_worker, daemon=True)
                    loop_thread.start()
                self.send_json({"ok": True, "loop": loop_state})
                return
            if path == "/api/stop-loop":
                with loop_lock:
                    loop_state["running"] = False
                self.send_json({"ok": True, "loop": loop_state})
                return
            if path == "/api/research-cycle":
                limit = int(body.get("limit", 5))
                use_ai = bool(body.get("use_ai", True))
                self.send_json(run_research_cycle(limit=limit, use_ai=use_ai))
                return
            if path == "/api/web-evidence":
                limit = int(body.get("limit", 3))
                search_limit = int(body.get("search_limit", 5))
                fetch_limit = int(body.get("fetch_limit", 3))
                self.send_json(run_web_evidence(limit=limit, search_limit=search_limit, fetch_limit=fetch_limit))
                return
            if path == "/api/agent-council":
                limit = int(body.get("limit", 3))
                use_ai = bool(body.get("use_ai", True))
                self.send_json(run_agent_council(limit=limit, use_ai=use_ai))
                return
            if path == "/api/human-feedback":
                self.send_json(save_human_feedback(body))
                return
            if path == "/api/human-qa":
                question = str(body.get("question") or "").strip()
                if not question:
                    self.send_json({"ok": False, "error": "question is required"}, 400)
                    return
                self.send_json(run_human_qa(question))
                return
        except Exception as exc:  # noqa: BLE001
            self.send_json({"ok": False, "error": str(exc)}, 500)
            return
        self.send_json({"error": "not found"}, 404)


def main() -> int:
    parser = argparse.ArgumentParser(description="启动概念自组织可视化控制台")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    if not CONSOLE_HTML.exists():
        raise FileNotFoundError(CONSOLE_HTML)
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print(f"[OK] 概念自组织控制台: http://{args.host}:{args.port}")
    print("[OK] Ctrl+C 停止")
    server.serve_forever()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
