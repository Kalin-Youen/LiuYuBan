#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Human question answering for the concept research console.

The goal is not to pretend certainty. The answer should:
- search local manuscript and runtime records;
- explain what the concept currently means in this project;
- state whether it seems important and why;
- mark uncertainty and next evidence needed.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

from concept_research_orchestrator import DEFAULT_RESEARCH_DIR, ROOT
from concept_web_researcher import DEFAULT_WEB_DIR

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

DEFAULT_QA_DIR = ROOT / ".collaboration" / "human_qa"
SEARCH_ROOTS = [ROOT / "研究文稿", ROOT / "docs" / "assets" / "data"]


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def terms_from_question(question: str) -> list[str]:
    terms = re.findall(r"[\u4e00-\u9fffA-Za-z0-9_、+]{2,}", question)
    extra = []
    if "物质母网" in question:
        extra.extend(["物质母网", "物质", "光速、量子与物质母网", "量子约束", "稳定物质", "母网"])
    if "重要" in question:
        extra.extend(["重要", "主线", "工具", "残差", "边界"])
    return list(dict.fromkeys([*extra, *terms]))


def search_local_text(question: str, limit: int = 12) -> list[dict[str, Any]]:
    terms = terms_from_question(question)
    results: list[dict[str, Any]] = []
    for root in SEARCH_ROOTS:
        if not root.exists():
            continue
        for path in root.rglob("*"):
            if path.suffix.lower() not in {".md", ".json"} or not path.is_file():
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            plain = clean_text(text)
            score = sum(1 for term in terms if term and term in plain)
            if score <= 0:
                continue
            first_pos = min([plain.find(term) for term in terms if term in plain] or [0])
            snippet = plain[max(0, first_pos - 120): first_pos + 420]
            results.append(
                {
                    "path": str(path.relative_to(ROOT)),
                    "score": score,
                    "snippet": snippet,
                }
            )
    results.sort(key=lambda item: item["score"], reverse=True)
    return results[:limit]


def load_json_records(directory: Path, pattern: str, limit: int = 5) -> list[dict[str, Any]]:
    if not directory.exists():
        return []
    records = []
    for path in sorted(directory.glob(pattern), key=lambda item: item.stat().st_mtime, reverse=True)[:limit]:
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        data["_file"] = str(path.relative_to(ROOT))
        records.append(data)
    return records


def related_runtime(question: str) -> dict[str, Any]:
    terms = terms_from_question(question)
    research_cards = []
    for cycle in load_json_records(DEFAULT_RESEARCH_DIR, "research_cycle_*.json", 5):
        for card in cycle.get("cards", []):
            text = json.dumps(card, ensure_ascii=False)
            if any(term in text for term in terms):
                research_cards.append({**card, "_cycle": cycle.get("_file")})
    web_cards = []
    for batch in load_json_records(DEFAULT_WEB_DIR, "web_evidence_*.json", 5):
        for card in batch.get("cards", []):
            text = json.dumps(card, ensure_ascii=False)
            if any(term in text for term in terms):
                web_cards.append({**card, "_batch": batch.get("_file")})
    return {"research_cards": research_cards[:6], "web_cards": web_cards[:6]}


def answer_material_mother_net(question: str, local_hits: list[dict[str, Any]], runtime: dict[str, Any]) -> dict[str, Any]:
    evidence_paths = [item["path"] for item in local_hits[:5]]
    research_cards = runtime.get("research_cards", [])
    has_specific_card = any("物质母网" in json.dumps(card, ensure_ascii=False) for card in research_cards)
    importance = "中高"
    if has_specific_card:
        importance = "高，但必须降强"
    answer = (
        "在当前项目里，‘物质母网’更适合理解为一个组织物理章节的母级概念网，"
        "不是一个已经被证明的物理实体。它试图把光速、量子约束、物质稳定性、"
        "宏观经典性等内容放进同一条学习顺序：先看因果边界和传播限制，再看量子规则如何筛选稳定差异，"
        "最后看稳定物质如何作为被约束后的结构结果出现。"
    )
    why_important = [
        "它能把第6章的光速/因果结构与第7章的量子约束、稳定物质连接起来。",
        "它适合做课程或知识图谱的上层节点，帮助学习者知道哪些概念先学、哪些后学。",
        "它能提醒系统不要把物质当成孤立块体，而要追问边界、约束、反馈和稳定化条件。",
    ]
    limits = [
        "它目前应被写成‘组织学习与章节的母网’，不能写成标准物理学已经承认的实体。",
        "它不能替代具体物理证明；涉及光速、量子态、量子场、费米/玻色统计、退相干时，仍要回到对应学科表述。",
        "如果找不到清晰的章节位置、学习顺序或工具卡用途，就应降级为候选概念或残差。",
    ]
    next_steps = [
        "把‘物质母网’拆成：因果边界、量子约束、稳定物质、宏观经典性四个子节点。",
        "检查第6章与第7章之间是否已有足够桥接语句。",
        "让联网模块检索更具体的词，而不是直接搜‘物质母网’。",
    ]
    return {
        "answer": answer,
        "importance": importance,
        "why_important": why_important,
        "limits": limits,
        "next_steps": next_steps,
        "evidence_paths": evidence_paths,
    }


def generic_answer(question: str, local_hits: list[dict[str, Any]], runtime: dict[str, Any]) -> dict[str, Any]:
    if local_hits:
        answer = "我在本地文稿中找到了相关材料，但还不能直接给强结论。较稳妥的做法是先把它当作候选概念，检查它的定义、边界、用途和失败条件。"
    else:
        answer = "当前本地材料不足，不能可靠回答。应先让联网模块和人类联络员补关键词、例子和边界。"
    return {
        "answer": answer,
        "importance": "待定",
        "why_important": [],
        "limits": ["证据不足，不能升格为结论。"],
        "next_steps": ["补充关键词", "检索文稿", "联网取证", "请人类给例子或边界"],
        "evidence_paths": [item["path"] for item in local_hits[:5]],
    }


def answer_question(question: str) -> dict[str, Any]:
    local_hits = search_local_text(question)
    runtime = related_runtime(question)
    if "物质母网" in question:
        payload = answer_material_mother_net(question, local_hits, runtime)
    else:
        payload = generic_answer(question, local_hits, runtime)
    return {
        "created_at": datetime.now().isoformat(),
        "question": question,
        **payload,
        "local_hits": local_hits[:8],
        "runtime": runtime,
    }


def write_answer(result: dict[str, Any], output_dir: Path) -> Path:
    if not output_dir.is_absolute():
        output_dir = ROOT / output_dir
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
    path = output_dir / f"human_qa_{stamp}.json"
    path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description="Answer a human question using local project context")
    parser.add_argument("--question", required=True)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_QA_DIR)
    args = parser.parse_args()
    result = answer_question(args.question)
    path = write_answer(result, args.output_dir)
    print(json.dumps({"ok": True, "file": str(path.relative_to(ROOT)), "answer": result}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
