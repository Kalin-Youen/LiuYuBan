#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Concept self-organization web evidence collector.

This module is the system's "eyes":
- read the latest research cards;
- search the public web;
- fetch short snippets with source links;
- score source quality and relevance;
- write evidence candidates, not conclusions.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path
from typing import Any

from concept_research_orchestrator import DEFAULT_RESEARCH_DIR, ROOT


DEFAULT_WEB_DIR = ROOT / ".collaboration" / "web_evidence"
USER_AGENT = "Mozilla/5.0 concept-self-organizer/0.2"

LOW_VALUE_DOMAINS = {
    "iciba.com",
    "dictionary.cambridge.org",
    "dict.eudic.net",
    "baike.baidu.com",
    "youdao.com",
    "merriam-webster.com",
    "collinsdictionary.com",
}

HIGH_VALUE_HINTS = {
    "wikipedia.org": "encyclopedia",
    "arxiv.org": "paper",
    "plato.stanford.edu": "reference",
    "mit.edu": "university",
    "stanford.edu": "university",
    "harvard.edu": "university",
    "nature.com": "journal",
    "sciencedirect.com": "journal",
    "springer.com": "journal",
    "frontiersin.org": "journal",
    "ncbi.nlm.nih.gov": "paper-index",
}

CONCEPT_TRANSLATIONS = {
    "约束继承": "constraint inheritance",
    "预测误差": "prediction error",
    "粗粒化": "coarse graining",
    "因果边界": "causal boundary",
    "规则形成": "rule formation",
    "多尺度时间": "multi scale time",
    "学习": "learning",
    "结构": "structure",
    "相变": "phase transition",
    "对称破缺": "symmetry breaking",
    "注意门控": "attention gating",
    "版本回写": "version feedback",
    "耗散": "dissipation",
    "稳态": "steady state",
}


def fetch_text(url: str, timeout: int = 20, max_bytes: int = 600_000) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        content_type = response.headers.get("Content-Type", "")
        if "text/html" not in content_type and "text/plain" not in content_type:
            return ""
        raw = response.read(max_bytes)
    charset = "utf-8"
    match = re.search(r"charset=([\w.-]+)", content_type, re.I)
    if match:
        charset = match.group(1)
    return raw.decode(charset, errors="replace")


def clean_html(value: str) -> str:
    value = re.sub(r"(?is)<script.*?</script>", " ", value)
    value = re.sub(r"(?is)<style.*?</style>", " ", value)
    value = re.sub(r"(?is)<noscript.*?</noscript>", " ", value)
    value = re.sub(r"(?is)<[^>]+>", " ", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def title_from_html(value: str) -> str:
    match = re.search(r"(?is)<title[^>]*>(.*?)</title>", value)
    return clean_html(match.group(1))[:160] if match else ""


def normalize_ddg_url(url: str) -> str:
    parsed = urllib.parse.urlparse(html.unescape(url))
    query = urllib.parse.parse_qs(parsed.query)
    if "uddg" in query and query["uddg"]:
        return query["uddg"][0]
    return urllib.parse.urlunparse(parsed)


def search_duckduckgo(query: str, limit: int) -> list[dict[str, str]]:
    search_url = "https://html.duckduckgo.com/html/?" + urllib.parse.urlencode({"q": query})
    page = fetch_text(search_url, timeout=25)
    results: list[dict[str, str]] = []
    pattern = re.compile(r'<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>(.*?)</a>', re.I | re.S)
    for match in pattern.finditer(page):
        url = normalize_ddg_url(match.group(1))
        title = clean_html(match.group(2))
        if url.startswith(("http://", "https://")):
            results.append({"title": title, "url": url})
        if len(results) >= limit:
            break
    return results


def search_bing(query: str, limit: int) -> list[dict[str, str]]:
    search_url = "https://www.bing.com/search?" + urllib.parse.urlencode({"q": query})
    page = fetch_text(search_url, timeout=25)
    results: list[dict[str, str]] = []
    block_pattern = re.compile(r"(?is)<li class=\"b_algo\".*?</li>")
    link_pattern = re.compile(r'(?is)<a[^>]+href="(https?://[^"]+)"[^>]*>(.*?)</a>')
    for block in block_pattern.findall(page):
        match = link_pattern.search(block)
        if not match:
            continue
        url = html.unescape(match.group(1))
        title = clean_html(match.group(2))
        if "bing.com" not in urllib.parse.urlparse(url).netloc:
            results.append({"title": title, "url": url})
        if len(results) >= limit:
            break
    return results


def web_search(query: str, limit: int) -> tuple[list[dict[str, str]], list[str]]:
    errors: list[str] = []
    for name, fn in (("bing", search_bing), ("duckduckgo", search_duckduckgo)):
        try:
            results = fn(query, limit)
            if results:
                return results, errors
            errors.append(f"{name}: no results")
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{name}: {exc}")
    return [], errors


def concept_terms(concepts: str) -> list[str]:
    parts = [part.strip() for part in re.split(r"[+，,、\s]+", concepts) if part.strip()]
    expanded = list(parts)
    for part in parts:
        if part in CONCEPT_TRANSLATIONS:
            expanded.extend(CONCEPT_TRANSLATIONS[part].split())
    return list(dict.fromkeys(expanded))


def query_for_card(card: dict[str, Any]) -> str:
    concepts = str(card.get("concepts") or "")
    translated = concepts
    for source, replacement in CONCEPT_TRANSLATIONS.items():
        translated = translated.replace(source, replacement)
    translated = re.sub(r"[+，,、]", " ", translated)
    return f"{translated} learning research relation"


def queries_for_card(card: dict[str, Any]) -> list[str]:
    base = query_for_card(card)
    concepts = str(card.get("concepts") or "")
    translated = concepts
    for source, replacement in CONCEPT_TRANSLATIONS.items():
        translated = translated.replace(source, replacement)
    translated = re.sub(r"[+，,、]", " ", translated)
    focused = re.sub(r"\s+", " ", translated).strip()
    human_hints = [
        str(item).strip()
        for item in card.get("search_hints", [])
        if str(item).strip()
    ]
    return list(dict.fromkeys([
        *human_hints,
        base,
        f"{focused} filetype:pdf",
        f"{focused} site:arxiv.org OR site:wikipedia.org",
        f"{focused} cognitive science learning",
        f"{focused} complex systems",
    ]))


def make_snippet(text: str, terms: list[str], max_len: int = 420) -> str:
    lowered = text.lower()
    positions = [lowered.find(term.lower()) for term in terms if term and lowered.find(term.lower()) >= 0]
    start = max(0, min(positions) - 120) if positions else 0
    return text[start:start + max_len].strip()


def source_quality(url: str, title: str) -> tuple[str, float, str]:
    domain = urllib.parse.urlparse(url).netloc.lower().removeprefix("www.")
    if any(domain.endswith(item) for item in LOW_VALUE_DOMAINS):
        return "low", 0.1, "dictionary or low-context reference"
    for hint, label in HIGH_VALUE_HINTS.items():
        if hint in domain:
            return "high", 0.9, label
    if re.search(r"\b(pdf|paper|journal|review|research|theory|learning|causal|prediction)\b", title, re.I):
        return "medium", 0.65, "research-like title"
    return "medium", 0.45, "ordinary web page"


def relevance_score(title: str, text: str, terms: list[str]) -> float:
    haystack = f"{title} {text[:6000]}".lower()
    if not terms:
        return 0.0
    hits = sum(1 for term in terms if term.lower() in haystack)
    return round(hits / len(terms), 3)


def load_latest_cards(research_dir: Path) -> list[dict[str, Any]]:
    files = sorted(research_dir.glob("research_cycle_*.json"), key=lambda item: item.stat().st_mtime, reverse=True)
    if not files:
        return []
    data = json.loads(files[0].read_text(encoding="utf-8"))
    return data.get("cards", [])


def evidence_for_card(
    card: dict[str, Any],
    search_limit: int,
    fetch_limit: int,
    include_low_quality: bool,
) -> dict[str, Any]:
    queries = queries_for_card(card)
    query = queries[0]
    terms = concept_terms(str(card.get("concepts") or ""))
    evidence: list[dict[str, Any]] = []
    rejected: list[dict[str, Any]] = []
    errors: list[str] = []
    seen_urls: set[str] = set()
    results: list[dict[str, str]] = []
    for current_query in queries:
        current_results, current_errors = web_search(current_query, search_limit)
        errors.extend([f"{current_query}: {error}" for error in current_errors])
        for result in current_results:
            if result["url"] in seen_urls:
                continue
            seen_urls.add(result["url"])
            results.append({**result, "query": current_query})
        if len(results) >= search_limit:
            break

    for result in results:
        try:
            page = fetch_text(result["url"], timeout=18)
            text = clean_html(page)
            title = title_from_html(page) or result["title"]
            if not text:
                continue
            quality, quality_score, quality_reason = source_quality(result["url"], title)
            relevance = relevance_score(title, text, terms)
            item = {
                "title": title,
                "url": result["url"],
                "query": result.get("query", query),
                "quality": quality,
                "quality_score": quality_score,
                "quality_reason": quality_reason,
                "relevance": relevance,
                "snippet": make_snippet(text, terms),
                "fetched_at": datetime.now().isoformat(),
                "use": "candidate evidence; human review decides support, counterexample, background, or irrelevant",
            }
            if include_low_quality or (quality_score >= 0.45 and relevance >= 0.2):
                evidence.append(item)
            else:
                rejected.append({k: item[k] for k in ("title", "url", "query", "quality", "quality_score", "quality_reason", "relevance")})
            if len(evidence) >= fetch_limit:
                break
        except (urllib.error.URLError, TimeoutError, UnicodeError, OSError) as exc:
            errors.append(f"{result['url']}: {exc}")
        time.sleep(0.4)

    evidence.sort(key=lambda item: (item["quality_score"], item["relevance"]), reverse=True)
    return {**card, "query": query, "queries": queries, "evidence": evidence, "rejected": rejected[:12], "errors": errors[:8]}


def write_outputs(cards: list[dict[str, Any]], output_dir: Path) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    json_path = output_dir / f"web_evidence_{stamp}.json"
    md_path = output_dir / f"web_evidence_{stamp}.md"
    data = {
        "created_at": datetime.now().isoformat(),
        "purpose": "Collect external evidence candidates for research cards",
        "cards": cards,
    }
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Web Evidence Candidates",
        "",
        f"- Time: {data['created_at']}",
        "- Note: these are evidence candidates, not conclusions. Human review is required before writeback.",
        "",
    ]
    for index, card in enumerate(cards, 1):
        lines.extend(
            [
                f"## W{index:03d} {card.get('concepts', '-')}",
                "",
                f"- Query: `{card.get('query', '-')}`",
                f"- Research question: {card.get('research_question', '-')}",
                "",
            ]
        )
        for item in card.get("evidence", []):
            lines.extend(
                [
                    f"### {item.get('title', '-')}",
                    "",
                    f"- URL: {item.get('url', '-')}",
                    f"- Quality: {item.get('quality', '-')} / {item.get('quality_score', '-')}",
                    f"- Relevance: {item.get('relevance', '-')}",
                    f"- Snippet: {item.get('snippet', '-')}",
                    f"- Use: {item.get('use', '-')}",
                    "",
                ]
            )
        if card.get("rejected"):
            lines.extend(["Filtered:", *[
                f"- {item.get('title', '-')} | quality={item.get('quality_score')} relevance={item.get('relevance')} | {item.get('url', '-')}"
                for item in card["rejected"][:5]
            ], ""])
        if card.get("errors"):
            lines.extend(["Errors:", *[f"- {error}" for error in card["errors"]], ""])
    md_path.write_text("\n".join(lines), encoding="utf-8")
    return json_path, md_path


def main() -> int:
    parser = argparse.ArgumentParser(description="Collect web evidence candidates for research cards")
    parser.add_argument("--research-dir", type=Path, default=DEFAULT_RESEARCH_DIR)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_WEB_DIR)
    parser.add_argument("--limit", type=int, default=3)
    parser.add_argument("--search-limit", type=int, default=8)
    parser.add_argument("--fetch-limit", type=int, default=3)
    parser.add_argument("--include-low-quality", action="store_true")
    args = parser.parse_args()

    cards = load_latest_cards(args.research_dir)[: args.limit]
    results = [
        evidence_for_card(card, args.search_limit, args.fetch_limit, args.include_low_quality)
        for card in cards
    ]
    json_path, md_path = write_outputs(results, args.output_dir)

    print(f"[OK] Research cards: {len(cards)}")
    print(f"[OK] Web evidence groups: {len(results)}")
    print(f"[OK] JSON: {json_path}")
    print(f"[OK] Markdown: {md_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
