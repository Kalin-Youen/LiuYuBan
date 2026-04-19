from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

import markdown


ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "site.config.json"
DOCS_DIR = ROOT / "docs"
DATA_DIR = DOCS_DIR / "assets" / "data"
CONTENT_JSON = DATA_DIR / "content.json"
CNAME_PATH = DOCS_DIR / "CNAME"


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


def collect_items(config: dict) -> tuple[list[dict], list[dict]]:
    items: list[dict] = []
    sections_meta: list[dict] = []

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

        sections_meta.append(
            {
                "id": section["id"],
                "title": section["title"],
                "items": section_items,
            }
        )

    return items, sections_meta


def build_payload(config: dict) -> dict:
    items, sections = collect_items(config)
    newest_update = max((item["updatedAt"] for item in items), default=None)
    total_chars = sum(item["wordCount"] for item in items)

    return {
        "site": {
            "title": config["siteTitle"],
            "tagline": config["siteTagline"],
            "description": config["siteDescription"],
            "author": config["author"],
            "repoUrl": config["repoUrl"],
            "siteUrl": config["siteUrl"],
            "customDomain": config["customDomain"],
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


def main() -> None:
    ensure_dirs()
    config = load_config()
    payload = build_payload(config)
    write_payload(payload)
    write_cname(config.get("customDomain", ""))
    print(f"Generated site data: {CONTENT_JSON.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
