#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Research orchestrator for concept self-organization.

It turns reviewed concept candidates into research cards. Human feedback is
part of the control loop:
- accepted directions are promoted;
- rejected directions are demoted;
- examples, boundaries, and search hints are copied into the next card.
"""

from __future__ import annotations

import argparse
import json
import os
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path
from typing import Any

from concept_self_organizer import DEFAULT_OUTPUT_DIR, ROOT, load_local_config


DEFAULT_RESEARCH_DIR = ROOT / ".collaboration" / "research_cycles"
HUMAN_FEEDBACK_DIR = ROOT / ".collaboration" / "human_feedback"

PROMOTE_DECISIONS = {"主书", "专题", "工具卡", "工具"}
DEMOTE_DECISIONS = {"拒绝"}


def load_json_files(directory: Path, pattern: str) -> list[dict[str, Any]]:
    if not directory.exists():
        return []
    items: list[dict[str, Any]] = []
    for path in sorted(directory.glob(pattern), key=lambda item: item.stat().st_mtime, reverse=True):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        data["_file"] = str(path.relative_to(ROOT))
        items.append(data)
    return items


def normalize_text(value: Any) -> str:
    return str(value or "").strip()


def load_feedback() -> dict[str, list[dict[str, Any]]]:
    grouped: dict[str, list[dict[str, Any]]] = {}
    for item in load_json_files(HUMAN_FEEDBACK_DIR, "human_feedback_*.json"):
        concepts = normalize_text(item.get("concepts"))
        if concepts:
            grouped.setdefault(concepts, []).append(item)
    return grouped


def feedback_adjustment(items: list[dict[str, Any]]) -> tuple[float, list[dict[str, Any]]]:
    adjustment = 0.0
    for item in items:
        decision = normalize_text(item.get("decision"))
        if decision in PROMOTE_DECISIONS:
            adjustment += 0.2
        elif decision in {"残差"}:
            adjustment += 0.05
        elif decision in DEMOTE_DECISIONS:
            adjustment -= 0.5
    return adjustment, items[:3]


def load_candidates(runs_dir: Path) -> list[dict[str, Any]]:
    candidates: list[dict[str, Any]] = []
    for path in sorted(runs_dir.glob("concept_run_*.json"), key=lambda item: item.stat().st_mtime, reverse=True):
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
        for candidate in data.get("candidates", []):
            concepts = " + ".join(
                str(item.get("term", ""))
                for item in candidate.get("concepts", [])
                if isinstance(item, dict)
            )
            review = reviews.get(str(candidate.get("id")), {})
            candidates.append(
                {
                    "id": candidate.get("id"),
                    "run_file": str(path.relative_to(ROOT)),
                    "created_at": data.get("created_at"),
                    "concepts": concepts,
                    "statement": candidate.get("statement"),
                    "training_weight": float(candidate.get("training_weight") or 0),
                    "curriculum_stage": candidate.get("curriculum_stage"),
                    "action": candidate.get("action"),
                    "order_reason": candidate.get("order_reason"),
                    "missing_prerequisites": candidate.get("missing_prerequisites") or [],
                    "risks": candidate.get("risks") or [],
                    "ai_verdict": review.get("verdict", "unreviewed" if reviews else "-"),
                    "ai_target": review.get("target", "-"),
                    "ai_score": float(review.get("score") or 0),
                    "ai_reason": review.get("reason", ""),
                    "ai_risk": review.get("risk", ""),
                }
            )
    return candidates


def select_candidates(candidates: list[dict[str, Any]], limit: int) -> list[dict[str, Any]]:
    feedback = load_feedback()
    kept = []
    for item in candidates:
        if item.get("ai_verdict") != "keep":
            continue
        concepts = normalize_text(item.get("concepts"))
        adjustment, matched_feedback = feedback_adjustment(feedback.get(concepts, []))
        score = float(item.get("ai_score") or 0) + float(item.get("training_weight") or 0) + adjustment
        item = {**item, "feedback_adjustment": round(adjustment, 3), "matched_feedback": matched_feedback, "selection_score": round(score, 3)}
        if score > 0:
            kept.append(item)
    kept.sort(key=lambda item: item["selection_score"], reverse=True)
    seen: set[str] = set()
    selected: list[dict[str, Any]] = []
    for item in kept:
        key = normalize_text(item.get("concepts"))
        if key in seen:
            continue
        seen.add(key)
        selected.append(item)
        if len(selected) >= limit:
            break
    return selected


def feedback_lines(feedback: list[dict[str, Any]], field: str) -> list[str]:
    values = [normalize_text(item.get(field)) for item in feedback if normalize_text(item.get(field))]
    return list(dict.fromkeys(values))


def heuristic_card(candidate: dict[str, Any]) -> dict[str, Any]:
    concepts = normalize_text(candidate.get("concepts"))
    target = normalize_text(candidate.get("ai_target") or "专题")
    matched_feedback = candidate.get("matched_feedback", [])
    examples = feedback_lines(matched_feedback, "example")
    boundaries = feedback_lines(matched_feedback, "boundary")
    search_hints = feedback_lines(matched_feedback, "search_hint")
    decision_overrides = feedback_lines(matched_feedback, "decision")
    if decision_overrides:
        target = decision_overrides[0]
    return {
        "source": candidate.get("run_file"),
        "candidate_id": candidate.get("id"),
        "concepts": concepts,
        "target": target,
        "research_question": f"{concepts} 能否形成一个可复核的学习顺序、工具卡或章节桥接？",
        "working_hypothesis": normalize_text(candidate.get("statement")),
        "evidence_needed": [
            "检查现有文稿中是否已有相同或相近表述",
            "给出一个正例：该组合能帮助排序、解释或生成工具",
            "给出一个反例：该组合在什么边界外会失效",
            "判断它应进入主书、专题、工具卡、残差还是拒绝",
        ],
        "failure_conditions": [
            "只能生成漂亮句子，不能产生操作步骤",
            "概念边界说不清，无法区分先后层次",
            "找不到任何可回写位置或可登记残差",
            *boundaries,
        ],
        "human_examples": examples,
        "human_boundaries": boundaries,
        "search_hints": search_hints,
        "feedback_adjustment": candidate.get("feedback_adjustment", 0),
        "selection_score": candidate.get("selection_score", 0),
        "writeback_proposal": f"优先作为“{target}”候选处理；回写前需要复核边界、证据和失败条件。",
        "machine_next_action": "先联网取证，再由智能体会商决定是否请求更多人类意见。",
    }


def call_ai(cards: list[dict[str, Any]], config: dict[str, str]) -> dict[str, Any]:
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
                    "You are a research-card reviewer. Do not write final prose. "
                    "Return strict JSON array. Keep human feedback as constraints."
                ),
            },
            {"role": "user", "content": json.dumps(cards, ensure_ascii=False, indent=2)},
        ],
        "temperature": 0.15,
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
    return {"enabled": True, "model": model, "research_cards": parsed}


def write_cycle(cards: list[dict[str, Any]], ai_result: dict[str, Any], output_dir: Path) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    json_path = output_dir / f"research_cycle_{stamp}.json"
    md_path = output_dir / f"research_cycle_{stamp}.md"
    data = {
        "created_at": datetime.now().isoformat(),
        "purpose": "turn reviewed concept candidates into research cards with human feedback",
        "ai_research": ai_result,
        "cards": cards,
    }
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    lines = ["# Concept Research Cycle", "", f"- Time: {data['created_at']}", ""]
    for index, card in enumerate(cards, 1):
        lines.extend([
            f"## R{index:03d} {card['concepts']}",
            "",
            f"- Target: {card['target']}",
            f"- Selection score: {card['selection_score']}",
            f"- Feedback adjustment: {card['feedback_adjustment']}",
            f"- Question: {card['research_question']}",
            f"- Hypothesis: {card['working_hypothesis']}",
            f"- Search hints: {'; '.join(card.get('search_hints', [])) or '-'}",
            "",
        ])
    if ai_result.get("research_cards"):
        lines.extend(["## AI Review", "", "```json", json.dumps(ai_result["research_cards"], ensure_ascii=False, indent=2), "```", ""])
    if ai_result.get("error"):
        lines.extend(["## AI Error", "", str(ai_result["error"]), ""])
    md_path.write_text("\n".join(lines), encoding="utf-8")
    return json_path, md_path


def main() -> int:
    parser = argparse.ArgumentParser(description="Create research cards from concept candidates")
    parser.add_argument("--runs-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_RESEARCH_DIR)
    parser.add_argument("--limit", type=int, default=5)
    parser.add_argument("--use-ai", action="store_true")
    args = parser.parse_args()

    candidates = load_candidates(args.runs_dir)
    selected = select_candidates(candidates, args.limit)
    cards = [heuristic_card(item) for item in selected]
    ai_result = call_ai(cards, load_local_config()) if args.use_ai else {"enabled": False}
    json_path, md_path = write_cycle(cards, ai_result, args.output_dir)
    print(f"[OK] Candidates: {len(candidates)}")
    print(f"[OK] Research cards: {len(cards)}")
    print(f"[OK] JSON: {json_path}")
    print(f"[OK] Markdown: {md_path}")
    if ai_result.get("error"):
        print(f"[WARN] AI review failed: {ai_result['error']}")
    time.sleep(0.01)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
