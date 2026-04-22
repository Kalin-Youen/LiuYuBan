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
DOCS_DIR = ROOT / "docs"
DOCS_ASSETS_DIR = DOCS_DIR / "assets"
DATA_DIR = DOCS_DIR / "assets" / "data"
CONTENT_JSON = DATA_DIR / "content.json"
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
MOTHER_DESCRIPTIONS = {
    "母网一": "从起源、边界、时间尺度与可能性空间出发，讨论系统究竟从哪里开始、在什么条件下能展开。",
    "母网二": "围绕旋转、涡量、相变、耗散与跃迁，追踪结构怎样被启动、筛选并留住。",
    "母网三": "把规则、对象、信息压缩与反馈校正放到同一层里，解释规则为什么会出现、会稳定。",
    "母网四": "处理光速、量子、退相干与经典化的接口，说明微观约束怎样走向宏观对象世界。",
    "母网五": "围绕感知、记忆、思考、决策与想象，解释认知系统如何生成判断与内部演化。",
    "母网六": "从意识广播、自我模型、直觉、灵感到意义叙事，处理高阶心智如何站住的问题。",
}
GRAPH_DEFAULT_NODE_ID = "core-02"


def load_config() -> dict:
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def ensure_dirs() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)


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


def collect_items(config: dict) -> tuple[list[dict], list[dict], dict[str, dict]]:
    items: list[dict] = []
    sections_meta: list[dict] = []
    search_index: dict[str, dict] = {}

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
            plain_text = re.sub(r"\s+", " ", re.sub(r"[#>*`$\\[\]()\-_=|]", " ", source))

            item = {
                "id": slug,
                "slug": slug,
                "sectionId": section["id"],
                "sectionTitle": section["title"],
                "title": title,
                "excerpt": excerpt,
                "updatedAt": updated_at,
                "sourcePath": relative_path,
                "html": html,
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

    return items, sections_meta, search_index


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

    nodes = [*mothers, *cores, *interfaces, *secondaries]
    node_lookup = {node["id"]: node for node in nodes}

    for node in nodes:
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

    spotlight_ids = [
        node["id"]
        for node in sorted(
            cores,
            key=lambda entry: (
                -entry["discussedChapterCount"],
                -entry["supportChapterCount"],
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
            "secondaryCount": len(secondaries),
            "litNodeCount": sum(1 for node in nodes if node["status"] == "lit"),
            "mappedNodeCount": sum(1 for node in nodes if node["status"] == "mapped"),
        },
        "families": families,
        "nodes": nodes,
        "edges": edges,
    }


def build_payload(config: dict) -> dict:
    items, sections, search_index = collect_items(config)
    newest_update = max((item["updatedAt"] for item in items), default=None)
    total_chars = sum(item["wordCount"] for item in items)
    knowledge_graph = build_knowledge_graph(search_index)

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
        "knowledgeGraph": knowledge_graph,
    }


def write_payload(payload: dict) -> None:
    CONTENT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def write_cname(custom_domain: str) -> None:
    custom_domain = custom_domain.strip()
    if custom_domain:
        CNAME_PATH.write_text(custom_domain + "\n", encoding="utf-8")
    elif CNAME_PATH.exists():
        CNAME_PATH.unlink()


def sync_index_html(config: dict) -> None:
    if not INDEX_HTML_PATH.exists():
        return

    text = INDEX_HTML_PATH.read_text(encoding="utf-8")
    title = html.escape(config["siteTitle"], quote=True)
    description = html.escape(config["siteDescription"], quote=True)

    replacements = [
        (r"(<title>)(.*?)(</title>)", rf"\g<1>{title}\g<3>"),
        (
            r'(<meta\s+name="description"\s+content=")([^"]*)(")',
            rf'\g<1>{description}\g<3>',
        ),
        (
            r'(<meta\s+property="og:title"\s+content=")([^"]*)(")',
            rf'\g<1>{title}\g<3>',
        ),
        (
            r'(<meta\s+property="og:description"\s+content=")([^"]*)(")',
            rf'\g<1>{description}\g<3>',
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
    payload = build_payload(config)
    write_payload(payload)
    write_cname(config.get("customDomain", ""))
    sync_index_html(config)
    sync_publish_root()
    print(f"Generated site data: {CONTENT_JSON.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
