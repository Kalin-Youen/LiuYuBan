from __future__ import annotations

import html
import json
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

import markdown


ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "site.config.json"
CARDS_CONFIG_PATH = ROOT / "cards.config.json"
DOCS_DIR = ROOT / "docs"
DOCS_ASSETS_DIR = DOCS_DIR / "assets"
DATA_DIR = DOCS_DIR / "assets" / "data"
CONTENT_JSON = DATA_DIR / "content.json"
SEARCH_JSON = DATA_DIR / "search.json"
CONTENT_ITEMS_DIR = DATA_DIR / "items"
CNAME_PATH = DOCS_DIR / "CNAME"
INDEX_HTML_PATH = DOCS_DIR / "index.html"
ROOT_INDEX_PATH = ROOT / "index.html"
ROOT_404_PATH = ROOT / "404.html"
ROOT_ASSETS_DIR = ROOT / "assets"
ROOT_CNAME_PATH = ROOT / "CNAME"
GRAPH_CORE_PATH = ROOT / "研究文稿" / "05_总纲与图谱" / "核心理论网络图谱_三十六网.md"
GRAPH_SECONDARY_PATH = (
    ROOT
    / "研究文稿"
    / "05_总纲与图谱"
    / "核心理论网络图谱_接口深化与三十六个二级理论网.md"
)
GRAPH_SUPPORT_PATH_HINTS = (
    "研究文稿/05_总纲与图谱/",
    "研究文稿/07_书稿/附录B_",
    "研究文稿/07_书稿/附录D_",
    "研究文稿/07_书稿/附录E_",
)
MANUAL_NODE_ALIASES = {
    "core-01": ["非均匀性", "不均匀", "初始差异"],
    "core-02": ["落差", "力的落差", "梯度"],
    "core-03": ["因果边界", "边界"],
    "core-07": ["力矩", "旋转"],
    "core-08": ["涡量", "漩涡"],
    "core-10": ["相变", "对称破缺"],
    "core-11": ["开放系统", "耗散"],
    "core-13": ["规则形成", "规则定义"],
    "core-14": ["粗粒化"],
    "core-15": ["有效理论"],
    "core-16": ["稳定对象", "对象稳定"],
    "core-17": ["信息压缩"],
    "core-18": ["反馈", "校正回路"],
    "core-19": ["光速", "因果常数"],
    "core-20": ["量子状态", "量子约束"],
    "core-22": ["退相干", "经典化"],
    "core-24": ["量子认知边界", "认知有效层"],
    "core-25": ["预测误差", "感知预测"],
    "core-26": ["记忆", "表征"],
    "core-27": ["思考动力学", "思考力学", "思考机理"],
    "core-28": ["决策", "证据积累"],
    "core-29": ["想象", "反事实"],
    "core-30": ["认知偏差", "认知惯性"],
    "core-31": ["全局工作空间", "意识广播"],
    "core-32": ["自我模型", "稳定自我"],
    "core-33": ["直觉", "直觉压缩"],
    "core-34": ["灵感", "灵感重组"],
    "core-35": ["价值情绪", "情绪加权"],
    "core-36": ["意识叙事", "意义叙事"],
}
MANUAL_NODE_ALIASES["secondary-attention-gating"] = [
    "注意力机制",
    "注意力门控",
    "注意力门控网",
    "attention",
]
MOTHER_DESCRIPTIONS = {
    "母网一": "从起源、边界、时间尺度与可能性空间出发，讨论系统究竟从哪里开始、在什么条件下能展开。",
    "母网二": "围绕旋转、涡量、相变、耗散与跃迁，追踪结构怎样被启动、筛选并留住。",
    "母网三": "把规则、对象、信息压缩与反馈校正放到同一层里，解释规则为什么会出现、会稳定。",
    "母网四": "处理光速、量子、退相干与经典化的接口，说明微观约束怎样走向宏观对象世界。",
    "母网五": "围绕感知、记忆、思考、决策与想象，解释认知系统如何生成判断与内部演化。",
    "母网六": "从意识广播、自我模型、直觉、灵感到意义叙事，处理高阶心智如何站住的问题。",
}
GRAPH_DEFAULT_NODE_ID = "core-02"
MANUAL_GRAPH_NODE_DEFINITIONS = (
    {
        "id": "secondary-attention-gating",
        "kind": "secondary",
        "code": "5.x",
        "shortCode": "5.x",
        "label": "注意力门控网",
        "shortLabel": "注意力门控",
        "description": "高优先候补节点：把显著性、目标、上下文与历史状态放进同一处，解释有限资源为何总先处理某些差异。",
        "thesis": "注意力不是神秘聚光灯，而是有限系统对候选差异进行重排、加权与门控的桥梁。",
        "evidenceTier": "S/B",
        "familyId": "bridge",
        "familyLabel": "跨层接口",
        "familyOrder": 99,
        "order": 1,
        "relatedIds": ["core-25", "core-27", "core-31"],
        "priority": 100,
        "spotlight": True,
        "statusHint": "candidate",
        "statusLabel": "高优先候补",
        "countInStats": False,
    },
)


def load_config() -> dict:
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def load_cards_config() -> dict:
    if not CARDS_CONFIG_PATH.exists():
        return {"featuredDeckId": "", "decks": []}

    return json.loads(CARDS_CONFIG_PATH.read_text(encoding="utf-8"))


def normalize_card_text(value: object, fallback: str = "") -> str:
    if value is None:
        return fallback
    return str(value).strip() or fallback


def normalize_card_text_list(values: object) -> list[str]:
    if not isinstance(values, list):
        return []

    normalized: list[str] = []
    for value in values:
        text = normalize_card_text(value)
        if text:
            normalized.append(text)
    return normalized


def normalize_card_decks(raw: dict) -> dict:
    raw_decks = raw.get("decks") if isinstance(raw, dict) else []
    if not isinstance(raw_decks, list):
        return {"featuredDeckId": "", "decks": []}

    decks: list[dict] = []

    for deck_index, raw_deck in enumerate(raw_decks):
        if not isinstance(raw_deck, dict):
            continue

        deck_id = normalize_card_text(raw_deck.get("id"), f"deck-{deck_index + 1}")
        deck_source_path = normalize_card_text(raw_deck.get("sourcePath"))
        raw_cards = raw_deck.get("cards")

        if not isinstance(raw_cards, list):
            continue

        cards: list[dict] = []
        seen_card_ids: set[str] = set()

        for card_index, raw_card in enumerate(raw_cards):
            if not isinstance(raw_card, dict):
                continue

            card_id = normalize_card_text(raw_card.get("id"), f"{deck_id}-card-{card_index + 1}")
            if not card_id or card_id in seen_card_ids:
                continue

            seen_card_ids.add(card_id)
            cards.append(
                {
                    "id": card_id,
                    "title": normalize_card_text(raw_card.get("title"), f"Card {card_index + 1}"),
                    "suit": normalize_card_text(raw_card.get("suit")),
                    "layer": normalize_card_text(raw_card.get("layer")),
                    "lead": normalize_card_text(raw_card.get("lead")),
                    "example": normalize_card_text(raw_card.get("example")),
                    "misread": normalize_card_text(raw_card.get("misread")),
                    "action": normalize_card_text(raw_card.get("action")),
                    "assistantPrompt": normalize_card_text(raw_card.get("assistantPrompt")),
                    "focus": normalize_card_text(raw_card.get("focus")),
                    "sourcePath": normalize_card_text(raw_card.get("sourcePath"), deck_source_path),
                    "relatedIds": normalize_card_text_list(raw_card.get("relatedIds")),
                }
            )

        if not cards:
            continue

        card_id_set = {card["id"] for card in cards}
        for card in cards:
            card["relatedIds"] = [
                related_id
                for related_id in card["relatedIds"]
                if related_id in card_id_set and related_id != card["id"]
            ]

        raw_suits = raw_deck.get("suits")
        suits: list[dict] = []
        seen_suit_ids: set[str] = set()
        if isinstance(raw_suits, list):
            for suit_index, raw_suit in enumerate(raw_suits):
                if not isinstance(raw_suit, dict):
                    continue

                suit_id = normalize_card_text(raw_suit.get("id"), f"suit-{suit_index + 1}")
                if not suit_id or suit_id in seen_suit_ids:
                    continue

                seen_suit_ids.add(suit_id)
                suits.append(
                    {
                        "id": suit_id,
                        "label": normalize_card_text(raw_suit.get("label"), suit_id),
                        "symbol": normalize_card_text(raw_suit.get("symbol")),
                        "summary": normalize_card_text(raw_suit.get("summary")),
                        "accent": normalize_card_text(raw_suit.get("accent")),
                        "soft": normalize_card_text(raw_suit.get("soft")),
                    }
                )

        raw_layers = raw_deck.get("layers")
        layers: list[dict] = []
        seen_layer_ids: set[str] = set()
        if isinstance(raw_layers, list):
            for layer_index, raw_layer in enumerate(raw_layers):
                if not isinstance(raw_layer, dict):
                    continue

                layer_id = normalize_card_text(raw_layer.get("id"), f"layer-{layer_index + 1}")
                if not layer_id or layer_id in seen_layer_ids:
                    continue

                seen_layer_ids.add(layer_id)
                layers.append(
                    {
                        "id": layer_id,
                        "label": normalize_card_text(raw_layer.get("label"), layer_id),
                        "shortLabel": normalize_card_text(raw_layer.get("shortLabel"), f"L{layer_index + 1}"),
                        "summary": normalize_card_text(raw_layer.get("summary")),
                    }
                )

        raw_spreads = raw_deck.get("spreads")
        spreads: list[dict] = []
        seen_spread_ids: set[str] = set()
        if isinstance(raw_spreads, list):
            for spread_index, raw_spread in enumerate(raw_spreads):
                if not isinstance(raw_spread, dict):
                    continue

                spread_id = normalize_card_text(raw_spread.get("id"), f"spread-{spread_index + 1}")
                if not spread_id or spread_id in seen_spread_ids:
                    continue

                card_ids = [
                    card_id for card_id in normalize_card_text_list(raw_spread.get("cardIds")) if card_id in card_id_set
                ]
                if not card_ids:
                    continue

                seen_spread_ids.add(spread_id)
                spreads.append(
                    {
                        "id": spread_id,
                        "title": normalize_card_text(raw_spread.get("title"), spread_id),
                        "description": normalize_card_text(raw_spread.get("description")),
                        "rationale": normalize_card_text(raw_spread.get("rationale")),
                        "cardIds": card_ids,
                    }
                )

        spread_id_set = {spread["id"] for spread in spreads}

        raw_guides = raw_deck.get("guideScenarios")
        guide_scenarios: list[dict] = []
        seen_guide_ids: set[str] = set()
        if isinstance(raw_guides, list):
            for guide_index, raw_guide in enumerate(raw_guides):
                if not isinstance(raw_guide, dict):
                    continue

                guide_id = normalize_card_text(raw_guide.get("id"), f"guide-{guide_index + 1}")
                if not guide_id or guide_id in seen_guide_ids:
                    continue

                seen_guide_ids.add(guide_id)
                spread_id = normalize_card_text(raw_guide.get("spreadId"))
                guide_scenarios.append(
                    {
                        "id": guide_id,
                        "title": normalize_card_text(raw_guide.get("title"), guide_id),
                        "description": normalize_card_text(raw_guide.get("description")),
                        "assistantPrompt": normalize_card_text(raw_guide.get("assistantPrompt")),
                        "spreadId": spread_id if spread_id in spread_id_set else "",
                        "steps": normalize_card_text_list(raw_guide.get("steps")),
                    }
                )

        entry_card_id = normalize_card_text(raw_deck.get("entryCardId"), cards[0]["id"])
        if entry_card_id not in card_id_set:
            entry_card_id = cards[0]["id"]

        decks.append(
            {
                "id": deck_id,
                "title": normalize_card_text(raw_deck.get("title"), deck_id),
                "eyebrow": normalize_card_text(raw_deck.get("eyebrow"), "Learning Deck"),
                "subtitle": normalize_card_text(raw_deck.get("subtitle")),
                "summary": normalize_card_text(raw_deck.get("summary")),
                "description": normalize_card_text(raw_deck.get("description")),
                "sourcePath": deck_source_path,
                "entryCardId": entry_card_id,
                "assistantPrompt": normalize_card_text(raw_deck.get("assistantPrompt")),
                "suits": suits,
                "layers": layers,
                "spreads": spreads,
                "guideScenarios": guide_scenarios,
                "cards": cards,
                "stats": {
                    "cardCount": len(cards),
                    "suitCount": len(suits),
                    "layerCount": len(layers),
                    "spreadCount": len(spreads),
                    "guideCount": len(guide_scenarios),
                },
            }
        )

    featured_deck_id = normalize_card_text(raw.get("featuredDeckId")) if isinstance(raw, dict) else ""
    valid_deck_ids = {deck["id"] for deck in decks}
    if featured_deck_id not in valid_deck_ids:
        featured_deck_id = decks[0]["id"] if decks else ""

    return {
        "featuredDeckId": featured_deck_id,
        "decks": decks,
    }


def ensure_dirs() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if CONTENT_ITEMS_DIR.exists():
        shutil.rmtree(CONTENT_ITEMS_DIR)
    CONTENT_ITEMS_DIR.mkdir(parents=True, exist_ok=True)


def chapter_sort_key(path: Path) -> tuple:
    name = path.stem
    if name.startswith("00_"):
        return (0, 0, name)

    chapter_match = re.match(r"第(\d+)章", name)
    if chapter_match:
        return (1, int(chapter_match.group(1)), name)

    appendix_match = re.match(r"附录([A-Z])", name)
    if appendix_match:
        return (2, ord(appendix_match.group(1)), name)

    if name.startswith("参考文献"):
        return (3, 0, name)

    return (4, 0, name)


def discover_files(section: dict) -> list[Path]:
    if section["type"] == "explicit":
        return [ROOT / rel_path for rel_path in section["files"]]

    if section["type"] == "directory":
        directory = ROOT / section["path"]
        return sorted(directory.glob("*.md"), key=chapter_sort_key)

    raise ValueError(f"Unsupported section type: {section['type']}")


def clean_markdown(text: str) -> str:
    text = text.replace("\r\n", "\n")

    # Replace absolute local file links with plain text labels for the public site.
    text = re.sub(
        r"\[([^\]]+)\]\(([A-Za-z]:\\\\[^)]+)\)",
        r"\1",
        text,
    )
    text = re.sub(
        r"\[([^\]]+)\]\((/[A-Za-z]:[^)]+)\)",
        r"\1",
        text,
    )
    return text


def extract_title(text: str, fallback: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def extract_excerpt(text: str) -> str:
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith("#"):
            continue
        if stripped.startswith("```") or stripped.startswith("$$"):
            continue
        return stripped[:180]
    return ""


def extract_headings(text: str) -> list[dict]:
    headings: list[dict] = []
    for line in text.splitlines():
        match = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
        if not match:
            continue
        level = len(match.group(1))
        label = match.group(2).strip()
        if level == 1:
            continue
        anchor = slugify_heading(label)
        headings.append({"level": level, "label": label, "anchor": anchor})
    return headings


def slugify_heading(label: str, separator: str = "-") -> str:
    normalized = re.sub(r"[^\w\u4e00-\u9fff\- ]+", "", label, flags=re.UNICODE)
    normalized = re.sub(r"\s+", separator, normalized.strip())
    return normalized.lower() or "section"


def slugify_stem(text: str) -> str:
    text = text.replace("_", "-")
    text = re.sub(r"[^\w\u4e00-\u9fff\-]+", "-", text, flags=re.UNICODE)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text.lower() or "item"


def render_markdown(text: str) -> str:
    md = markdown.Markdown(
        extensions=[
            "extra",
            "fenced_code",
            "tables",
            "toc",
            "sane_lists",
            "admonition",
            "attr_list",
        ],
        extension_configs={
            "toc": {
                "permalink": False,
                "slugify": slugify_heading,
            }
        },
        output_format="html5",
    )
    return md.convert(text)


def make_plain_text(text: str) -> str:
    text = re.sub(r"[#>*`$\\[\]()\-_=|]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def write_item_content(slug: str, html_content: str) -> None:
    item_path = CONTENT_ITEMS_DIR / f"{slug}.json"
    item_path.write_text(
        json.dumps(
            {
                "id": slug,
                "html": html_content,
            },
            ensure_ascii=False,
            separators=(",", ":"),
        ),
        encoding="utf-8",
    )


def relative_source_path(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def normalize_match_text(text: str) -> str:
    return re.sub(
        r"[\s`~!@#$%^&*()_+\-=\[\]{}\\|;:'\",.<>/?，。！？；：、“”‘’（）【】《》·…—→×]",
        "",
        text.lower(),
    )


def is_graph_support_path(source_path: str) -> bool:
    return any(source_path.startswith(prefix) for prefix in GRAPH_SUPPORT_PATH_HINTS)


def collect_items(config: dict) -> tuple[list[dict], list[dict], dict[str, dict], list[dict]]:
    items: list[dict] = []
    sections_meta: list[dict] = []
    search_index: dict[str, dict] = {}
    frontend_search_index: list[dict] = []

    for section in config["sections"]:
        files = discover_files(section)
        section_items: list[str] = []
        for order, file_path in enumerate(files):
            source = clean_markdown(file_path.read_text(encoding="utf-8"))
            title = extract_title(source, file_path.stem)
            excerpt = extract_excerpt(source)
            html = render_markdown(source)
            headings = extract_headings(source)
            relative_path = relative_source_path(file_path)
            slug = f"{section['id']}-{order + 1:02d}-{slugify_stem(file_path.stem)}"
            updated_at = datetime.fromtimestamp(
                file_path.stat().st_mtime, tz=timezone.utc
            ).isoformat()
            plain_text = make_plain_text(source)
            write_item_content(slug, html)
            frontend_search_index.append(
                {
                    "id": slug,
                    "text": plain_text,
                }
            )

            item = {
                "id": slug,
                "slug": slug,
                "sectionId": section["id"],
                "sectionTitle": section["title"],
                "title": title,
                "excerpt": excerpt,
                "updatedAt": updated_at,
                "sourcePath": relative_path,
                "contentPath": f"assets/data/items/{slug}.json",
                "headings": headings,
                "wordCount": len(plain_text.strip()),
                "order": order,
            }
            items.append(item)
            section_items.append(slug)
            search_index[slug] = {
                "id": slug,
                "title": title,
                "sourcePath": relative_path,
                "sectionId": section["id"],
                "sectionTitle": section["title"],
                "source": source,
                "matchText": normalize_match_text(f"{title}\n{source}\n{relative_path}"),
                "isGraphSupport": is_graph_support_path(relative_path),
            }

        sections_meta.append(
            {
                "id": section["id"],
                "title": section["title"],
                "items": section_items,
            }
        )

    return items, sections_meta, search_index, frontend_search_index


def make_node_aliases(label: str, short_label: str | None = None) -> list[str]:
    aliases = {label.strip()}

    if short_label:
        aliases.add(short_label.strip())

    for suffix in ("母网", "网"):
        if label.endswith(suffix) and len(label) > len(suffix) + 1:
            aliases.add(label[: -len(suffix)].strip())

    return sorted(alias for alias in aliases if alias)


def extract_field_blocks(body: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    current: str | None = None
    chunks: list[str] = []

    for raw_line in body.splitlines():
        stripped = raw_line.strip()
        if stripped.startswith("- ") and stripped.endswith("："):
            if current:
                fields[current] = " ".join(part for part in chunks if part).strip()
            current = stripped[2:-1].strip()
            chunks = []
            continue

        if not current:
            continue

        if stripped.startswith("## ") or stripped.startswith("### "):
            break

        if stripped.startswith("`") and stripped.endswith("`"):
            continue

        if stripped:
            chunks.append(stripped)

    if current:
        fields[current] = " ".join(part for part in chunks if part).strip()

    return fields


def extract_graph_codes(text: str) -> list[str]:
    return sorted(set(re.findall(r"网(\d{2})", text)))


def parse_core_graph() -> tuple[list[dict], list[dict], list[dict]]:
    text = GRAPH_CORE_PATH.read_text(encoding="utf-8")
    mothers: list[dict] = []
    cores: list[dict] = []
    edges: list[dict] = []
    mother_lookup: dict[str, dict] = {}
    current_mother: dict | None = None

    for line_match in re.finditer(r"^## .+|^### .+", text, flags=re.MULTILINE):
        line = line_match.group(0).strip()

        mother_match = re.match(r"^## (母网[一二三四五六])：(.+)$", line)
        if mother_match:
            prefix = mother_match.group(1)
            label = mother_match.group(2).strip()
            order = len(mothers) + 1
            current_mother = {
                "id": f"mother-{order}",
                "kind": "mother",
                "code": prefix,
                "label": label,
                "shortLabel": label.replace("母网", "").strip(),
                "description": MOTHER_DESCRIPTIONS.get(prefix, ""),
                "familyId": f"mother-{order}",
                "familyLabel": label,
                "familyOrder": order,
                "order": order,
                "childIds": [],
                "interfaceIds": [],
                "secondaryIds": [],
            }
            mothers.append(current_mother)
            mother_lookup[prefix] = current_mother
            continue

        core_match = re.match(r"^### 网(\d{2}) (.+?)(?: `([^`]+)`)?$", line)
        if not core_match or not current_mother:
            continue

        block_start = line_match.end()
        next_heading = re.search(r"^### 网\d{2} |^## ", text[block_start:], flags=re.MULTILINE)
        block_end = block_start + next_heading.start() if next_heading else len(text)
        fields = extract_field_blocks(text[block_start:block_end])
        core_code = core_match.group(1)
        node_id = f"core-{core_code}"

        node = {
            "id": node_id,
            "kind": "core",
            "code": f"网{core_code}",
            "shortCode": core_code,
            "label": core_match.group(2).strip(),
            "shortLabel": core_match.group(2).strip().removesuffix("网"),
            "description": fields.get("核心定义", ""),
            "thesis": fields.get("核心命题", ""),
            "evidenceTier": core_match.group(3) or "",
            "familyId": current_mother["id"],
            "familyLabel": current_mother["label"],
            "familyOrder": current_mother["order"],
            "parentId": current_mother["id"],
            "order": int(core_code),
            "relatedCoreCodes": extract_graph_codes(fields.get("主要连接", "")),
            "interfaceIds": [],
            "secondaryIds": [],
        }
        cores.append(node)
        current_mother["childIds"].append(node_id)
        edges.append({"source": current_mother["id"], "target": node_id, "kind": "hierarchy"})

    return mothers, cores, edges


def infer_interface_family_id(core_ids: list[str], core_lookup: dict[str, dict]) -> tuple[str, str, int]:
    families = [core_lookup[core_id]["familyId"] for core_id in core_ids if core_id in core_lookup]
    unique_families = sorted(set(families))

    if len(unique_families) == 1:
        family_id = unique_families[0]
        family_label = core_lookup[core_ids[0]]["familyLabel"]
        family_order = core_lookup[core_ids[0]]["familyOrder"]
        return family_id, family_label, family_order

    return "bridge", "跨层接口", 99


def parse_secondary_graph(core_lookup: dict[str, dict]) -> tuple[list[dict], list[dict], list[dict]]:
    text = GRAPH_SECONDARY_PATH.read_text(encoding="utf-8")
    interfaces: list[dict] = []
    secondaries: list[dict] = []
    edges: list[dict] = []

    interface_pattern = re.compile(
        r"^## [^#\n]*接口(?P<code>\d{2})[：:]\s*网(?P<a>\d{2})\s*[×x]\s*网(?P<b>\d{2}).*$",
        flags=re.MULTILINE,
    )
    interface_matches = list(interface_pattern.finditer(text))

    for index, match in enumerate(interface_matches):
        block_start = match.end()
        block_end = interface_matches[index + 1].start() if index + 1 < len(interface_matches) else len(text)
        block = text[block_start:block_end]
        title_match = re.search(r"^### (?!二级网)(.+)$", block, flags=re.MULTILINE)
        human_label = title_match.group(1).strip() if title_match else f"接口{match.group('code')}"
        related_core_ids = [f"core-{match.group('a')}", f"core-{match.group('b')}"]
        family_id, family_label, family_order = infer_interface_family_id(related_core_ids, core_lookup)
        interface_id = f"interface-{match.group('code')}"

        interface_node = {
            "id": interface_id,
            "kind": "interface",
            "code": f"接口{match.group('code')}",
            "shortCode": match.group("code"),
            "label": human_label,
            "shortLabel": human_label,
            "description": f"连接 {core_lookup[related_core_ids[0]]['label']} 与 {core_lookup[related_core_ids[1]]['label']} 的重点接口。",
            "familyId": family_id,
            "familyLabel": family_label,
            "familyOrder": family_order,
            "order": int(match.group("code")),
            "relatedIds": related_core_ids[:],
            "secondaryIds": [],
        }
        interfaces.append(interface_node)

        for core_id in related_core_ids:
            edges.append({"source": core_id, "target": interface_id, "kind": "interface"})
            core_lookup[core_id]["interfaceIds"].append(interface_id)

        secondary_pattern = re.compile(
            r"^### 二级网(?P<code>\d{2}) (?P<label>.+?)(?: `(?P<tier>[^`]+)`)?$",
            flags=re.MULTILINE,
        )
        secondary_matches = list(secondary_pattern.finditer(block))

        for secondary_index, secondary_match in enumerate(secondary_matches):
            body_start = secondary_match.end()
            body_end = (
                secondary_matches[secondary_index + 1].start()
                if secondary_index + 1 < len(secondary_matches)
                else len(block)
            )
            fields = extract_field_blocks(block[body_start:body_end])
            secondary_id = f"secondary-{secondary_match.group('code')}"
            secondary_node = {
                "id": secondary_id,
                "kind": "secondary",
                "code": f"二级网{secondary_match.group('code')}",
                "shortCode": secondary_match.group("code"),
                "label": secondary_match.group("label").strip(),
                "shortLabel": secondary_match.group("label").strip().removesuffix("网"),
                "description": fields.get("核心定义", ""),
                "thesis": fields.get("当前作用", ""),
                "evidenceTier": secondary_match.group("tier") or "",
                "familyId": family_id,
                "familyLabel": family_label,
                "familyOrder": family_order,
                "parentId": interface_id,
                "order": int(secondary_match.group("code")),
                "relatedIds": [interface_id, *related_core_ids],
            }
            secondaries.append(secondary_node)
            interface_node["secondaryIds"].append(secondary_id)
            edges.append({"source": interface_id, "target": secondary_id, "kind": "secondary"})

            for core_id in related_core_ids:
                core_lookup[core_id]["secondaryIds"].append(secondary_id)

    return interfaces, secondaries, edges


def build_manual_graph_nodes(core_lookup: dict[str, dict]) -> tuple[list[dict], list[dict]]:
    nodes: list[dict] = []
    edges: list[dict] = []

    for definition in MANUAL_GRAPH_NODE_DEFINITIONS:
        related_ids = [node_id for node_id in definition.get("relatedIds", []) if node_id in core_lookup]
        node = {
            **definition,
            "relatedIds": related_ids,
            "parentId": definition.get("parentId"),
        }
        nodes.append(node)

        for core_id in related_ids:
            if node["id"] not in core_lookup[core_id]["secondaryIds"]:
                core_lookup[core_id]["secondaryIds"].append(node["id"])
            edges.append({"source": core_id, "target": node["id"], "kind": "secondary"})

    return nodes, edges


def match_node_items(
    node: dict,
    search_index: dict[str, dict],
    *,
    aggregated_ids: Iterable[str] | None = None,
) -> dict[str, list[str]]:
    if aggregated_ids is not None:
        ordered = list(dict.fromkeys(aggregated_ids))
        discussed_ids = [item_id for item_id in ordered if not search_index[item_id]["isGraphSupport"]]
        support_ids = [item_id for item_id in ordered if search_index[item_id]["isGraphSupport"]]
        return {
            "chapterIds": ordered,
            "discussedChapterIds": discussed_ids,
            "supportChapterIds": support_ids,
        }

    aliases = [normalize_match_text(alias) for alias in node.get("aliases", []) if alias]
    aliases = [alias for alias in aliases if len(alias) >= 2]
    ranked: list[tuple[int, str]] = []

    for item_id, item in search_index.items():
        score = 0
        for alias in aliases:
            score += item["matchText"].count(alias)

        if score:
            if normalize_match_text(node["label"]) in normalize_match_text(item["title"]):
                score += 4
            ranked.append((score, item_id))

    ranked.sort(
        key=lambda pair: (
            search_index[pair[1]]["isGraphSupport"],
            -pair[0],
            search_index[pair[1]]["sectionId"],
            pair[1],
        )
    )

    chapter_ids = [item_id for _, item_id in ranked]
    discussed_ids = [item_id for item_id in chapter_ids if not search_index[item_id]["isGraphSupport"]]
    support_ids = [item_id for item_id in chapter_ids if search_index[item_id]["isGraphSupport"]]
    return {
        "chapterIds": chapter_ids,
        "discussedChapterIds": discussed_ids,
        "supportChapterIds": support_ids,
    }


def assign_node_status(node: dict) -> str:
    status_hint = node.get("statusHint")
    if status_hint:
        return str(status_hint)
    if node["discussedChapterCount"] > 0:
        return "lit"
    if node["chapterCount"] > 0:
        return "mapped"
    return "candidate"


def build_knowledge_graph(search_index: dict[str, dict]) -> dict:
    mothers, cores, edges = parse_core_graph()
    core_lookup = {node["id"]: node for node in cores}
    interfaces, secondaries, more_edges = parse_secondary_graph(core_lookup)
    edges.extend(more_edges)
    manual_nodes, manual_edges = build_manual_graph_nodes(core_lookup)
    secondaries.extend(manual_nodes)
    edges.extend(manual_edges)

    nodes = [*mothers, *cores, *interfaces, *secondaries]
    node_lookup = {node["id"]: node for node in nodes}

    for node in nodes:
        node.setdefault("priority", 0)
        node.setdefault("spotlight", False)
        node["aliases"] = make_node_aliases(node["label"], node.get("shortLabel"))
        node["aliases"].extend(MANUAL_NODE_ALIASES.get(node["id"], []))
        node["aliases"] = sorted(set(alias for alias in node["aliases"] if alias))

    for node in cores:
        matched = match_node_items(node, search_index)
        node.update(matched)

    for node in secondaries:
        matched = match_node_items(node, search_index)
        node.update(matched)

    for node in interfaces:
        direct = match_node_items(node, search_index)
        aggregated_ids = [
            *direct["chapterIds"],
            *(
                item_id
                for related_id in node["relatedIds"]
                for item_id in node_lookup[related_id].get("chapterIds", [])
            ),
            *(
                item_id
                for secondary_id in node["secondaryIds"]
                for item_id in node_lookup[secondary_id].get("chapterIds", [])
            ),
        ]
        node.update(match_node_items(node, search_index, aggregated_ids=aggregated_ids))

    for mother in mothers:
        aggregated_ids = [
            item_id
            for child_id in mother["childIds"]
            for item_id in node_lookup[child_id].get("chapterIds", [])
        ]
        mother.update(match_node_items(mother, search_index, aggregated_ids=aggregated_ids))
        mother["interfaceIds"] = sorted(
            {
                interface_id
                for child_id in mother["childIds"]
                for interface_id in node_lookup[child_id].get("interfaceIds", [])
            }
        )
        mother["secondaryIds"] = sorted(
            {
                secondary_id
                for child_id in mother["childIds"]
                for secondary_id in node_lookup[child_id].get("secondaryIds", [])
            }
        )

    for node in nodes:
        node["chapterCount"] = len(node.get("chapterIds", []))
        node["discussedChapterCount"] = len(node.get("discussedChapterIds", []))
        node["supportChapterCount"] = len(node.get("supportChapterIds", []))
        node["status"] = assign_node_status(node)
        node["signal"] = min(
            1,
            round((node["discussedChapterCount"] * 0.75 + node["supportChapterCount"] * 0.25) / 6, 3),
        )

    spotlight_candidates = [node for node in nodes if node["kind"] == "core" or node.get("spotlight")]
    kind_rank = {"core": 0, "interface": 1, "secondary": 2, "mother": 3}
    spotlight_ids = [
        node["id"]
        for node in sorted(
            spotlight_candidates,
            key=lambda entry: (
                -entry.get("priority", 0),
                kind_rank.get(entry["kind"], 9),
                -entry["discussedChapterCount"],
                -entry["supportChapterCount"],
                entry.get("familyOrder", 99),
                entry["order"],
            ),
        )[:6]
    ]

    families = [
        {
            "id": mother["id"],
            "label": mother["label"],
            "shortLabel": mother["shortLabel"],
            "order": mother["order"],
            "coreIds": mother["childIds"],
        }
        for mother in mothers
    ]

    for node in nodes:
        node.pop("aliases", None)

    return {
        "defaultNodeId": GRAPH_DEFAULT_NODE_ID,
        "spotlightIds": spotlight_ids,
        "stats": {
            "motherCount": len(mothers),
            "coreCount": len(cores),
            "interfaceCount": len(interfaces),
            "secondaryCount": sum(1 for node in secondaries if node.get("countInStats", True)),
            "litNodeCount": sum(1 for node in nodes if node["status"] == "lit"),
            "mappedNodeCount": sum(1 for node in nodes if node["status"] == "mapped"),
        },
        "families": families,
        "nodes": nodes,
        "edges": edges,
    }


def build_payload(config: dict) -> tuple[dict, list[dict]]:
    items, sections, search_index, frontend_search_index = collect_items(config)
    newest_update = max((item["updatedAt"] for item in items), default=None)
    total_chars = sum(item["wordCount"] for item in items)
    knowledge_graph = build_knowledge_graph(search_index)
    card_decks = normalize_card_decks(load_cards_config())

    return {
        "site": {
            "title": config["siteTitle"],
            "tagline": config["siteTagline"],
            "description": config["siteDescription"],
            "positioningStatement": config.get("positioningStatement", config["siteTagline"]),
            "positioningSupport": config.get("positioningSupport", config["siteDescription"]),
            "author": config["author"],
            "repoUrl": config["repoUrl"],
            "siteUrl": config["siteUrl"],
            "customDomain": config["customDomain"],
            "comments": config.get("comments", {}),
            "assistant": config.get("assistant", {}),
            "aiGateway": config.get("aiGateway", {}),
            "liveBook": config.get("liveBook", {}),
            "heroTitle": config["heroTitle"],
            "heroText": config["heroText"],
        },
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "stats": {
            "documentCount": len(items),
            "totalChars": total_chars,
            "newestUpdate": newest_update,
        },
        "sections": sections,
        "items": items,
        "cardDecks": card_decks,
        "knowledgeGraph": knowledge_graph,
    }, frontend_search_index


def write_payload(payload: dict, frontend_search_index: list[dict]) -> None:
    CONTENT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    SEARCH_JSON.write_text(
        json.dumps({"items": frontend_search_index}, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )


def write_cname(custom_domain: str) -> None:
    custom_domain = custom_domain.strip()
    if custom_domain:
        CNAME_PATH.write_text(custom_domain + "\n", encoding="utf-8")
    elif CNAME_PATH.exists():
        CNAME_PATH.unlink()


def build_asset_version(payload: dict) -> str:
    generated_at = str(payload.get("generatedAt", "")).strip()
    version = re.sub(r"[^0-9A-Za-z]+", "", generated_at)
    return version or datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")


def sync_index_html(config: dict, asset_version: str) -> None:
    if not INDEX_HTML_PATH.exists():
        return

    text = INDEX_HTML_PATH.read_text(encoding="utf-8")
    page_title = html.escape(f'{config["siteTitle"]} · 在线书稿', quote=True)
    share_title = html.escape(config["siteTitle"], quote=True)
    description = html.escape(config["siteDescription"], quote=True)

    replacements = [
        (r"(<title>)(.*?)(</title>)", rf"\g<1>{page_title}\g<3>"),
        (
            r'(<meta\s+name="description"\s+content=")([^"]*)(")',
            rf'\g<1>{description}\g<3>',
        ),
        (
            r'(<meta\s+property="og:title"\s+content=")([^"]*)(")',
            rf'\g<1>{share_title}\g<3>',
        ),
        (
            r'(<meta\s+property="og:description"\s+content=")([^"]*)(")',
            rf'\g<1>{description}\g<3>',
        ),
        (
            r'(\./assets/styles\.css)(\?v=[^"]*)?',
            rf"\g<1>?v={asset_version}",
        ),
        (
            r'(\./assets/app\.js)(\?v=[^"]*)?',
            rf"\g<1>?v={asset_version}",
        ),
        (
            r'(window\.__SITE_ASSET_VERSION__\s*=\s*")[^"]*(")',
            rf'\g<1>{asset_version}\g<2>',
        ),
    ]

    for pattern, replacement in replacements:
        text = re.sub(pattern, replacement, text, count=1, flags=re.DOTALL)

    INDEX_HTML_PATH.write_text(text, encoding="utf-8")


def sync_publish_root() -> None:
    if INDEX_HTML_PATH.exists():
        ROOT_INDEX_PATH.write_text(INDEX_HTML_PATH.read_text(encoding="utf-8"), encoding="utf-8")

    if DOCS_ASSETS_DIR.exists():
        if ROOT_ASSETS_DIR.exists():
            shutil.rmtree(ROOT_ASSETS_DIR)
        shutil.copytree(DOCS_ASSETS_DIR, ROOT_ASSETS_DIR)

    if CNAME_PATH.exists():
        ROOT_CNAME_PATH.write_text(CNAME_PATH.read_text(encoding="utf-8"), encoding="utf-8")
    elif ROOT_CNAME_PATH.exists():
        ROOT_CNAME_PATH.unlink()

    ROOT_404_PATH.write_text(
        """<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>差结构学习法</title>
    <meta name="robots" content="noindex" />
    <script>
      const parts = window.location.pathname.split("/").filter(Boolean);
      const repoBase = parts.length ? `/${parts[0]}/` : "/";
      const target = new URL(repoBase, window.location.origin);
      target.hash = window.location.hash;
      window.location.replace(target.toString());
    </script>
  </head>
  <body>
    <p>页面不存在，正在返回 <a href="./">差结构学习法</a>。</p>
  </body>
</html>
""",
        encoding="utf-8",
    )


def main() -> None:
    ensure_dirs()
    config = load_config()
    payload, frontend_search_index = build_payload(config)
    asset_version = build_asset_version(payload)
    write_payload(payload, frontend_search_index)
    write_cname(config.get("customDomain", ""))
    sync_index_html(config, asset_version)
    sync_publish_root()
    print(f"Generated site data: {CONTENT_JSON.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
