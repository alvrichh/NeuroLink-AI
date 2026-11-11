#!/usr/bin/env python3
"""Validate Markdown links and local image destinations.

No external network requests; designed for a public documentation repository.
Usage: python scripts/check_docs_links.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

REPO = Path(__file__).resolve().parents[1]
MD_LINK = re.compile(r"!?(?:\[[^\]\n]*\])\((?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\)")
CODE_FENCE = re.compile(r"^\s*[`~]{3,}.*?^\s*[`~]{3,}.*?$", re.MULTILINE | re.DOTALL)
EXTERNAL = ("http:", "https:", "mailto:", "data:", "tel:", "//")


def strip_code_blocks(text: str) -> str:
    # Preserve a line's location as much as possible for useful diagnostics.
    return CODE_FENCE.sub(lambda m: "\n" * m.group(0).count("\n"), text)


def check_file(path: Path) -> list[str]:
    text = strip_code_blocks(path.read_text(encoding="utf-8"))
    errors: list[str] = []
    for match in MD_LINK.finditer(text):
        link = (match.group(1) or match.group(2) or "").strip()
        if not link or link.startswith(("#", *EXTERNAL)):
            continue
        target = unquote(urlsplit(link).path)
        if not target:
            continue
        # Verify relative path, not URL fragment; file links containing
        # literal parentheses should use angle-bracket Markdown form.
        candidate = (path.parent / target).resolve()
        line = text.count("\n", 0, match.start()) + 1
        try:
            candidate.relative_to(REPO.resolve())
        except ValueError:
            errors.append(f"{path.relative_to(REPO)}:{line}: escapes repository: {link}")
            continue
        if not candidate.exists():
            errors.append(f"{path.relative_to(REPO)}:{line}: missing local target: {link}")
    return errors


def main() -> int:
    md_files = sorted(REPO.rglob("*.md"))
    all_errors: list[str] = []
    for file in md_files:
        if any(part in {".git", ".venv", "node_modules"} for part in file.parts):
            continue
        all_errors.extend(check_file(file))
    if all_errors:
        print("\n".join(all_errors))
        print(f"FAIL: {len(all_errors)} broken local Markdown link(s).")
        return 1
    print(f"PASS: checked local Markdown links across {len(md_files)} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
