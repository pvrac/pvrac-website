"""Start a new gallery album (one event = one folder).

The gallery page reads public/images/gallery at build time: every subfolder is
an album, shown as its own section with a heading and that event's photos
below. This script creates the folder and writes its _album.json, so you don't
have to remember the naming convention.

Usage (from the project root):

    python scripts/new-album.py "Community Event"
    python scripts/new-album.py "Community Event" --date 2026-08-14
    python scripts/new-album.py "Community Event" --description "Our morning at the school."

Without --date it uses today, so the album lands at the top of the page. Pass
--no-date for an album that isn't tied to a single day (those sort after the
dated ones, alphabetically).

Then:

    1. Copy the event photos into the folder it prints.
    2. python scripts/optimize-images.py gallery
    3. git add public/images/gallery && git commit && git push

Photos sort by filename, ascending, so number them (01-..., 02-...) to control
the order they appear in within the album.
"""
import argparse
import datetime as dt
import json
import os
import re
import sys

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GALLERY_ROOT = os.path.join(PROJECT_ROOT, "public", "images", "gallery")


def slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    if not slug:
        sys.exit(f"Could not build a folder name from {name!r}. Use letters or numbers.")
    return slug


def pretty_date(date: dt.date) -> str:
    # e.g. "14 August 2026" — matches what the page derives from a folder name.
    return f"{date.day} {date.strftime('%B')} {date.year}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a new gallery album folder.")
    parser.add_argument("title", help='Event name, e.g. "Community Event"')
    parser.add_argument("--date", help="Event date as YYYY-MM-DD (default: today)")
    parser.add_argument("--no-date", action="store_true", help="Album isn't tied to a date")
    parser.add_argument("--description", default="", help="One-line blurb shown under the title")
    args = parser.parse_args()

    slug = slugify(args.title)
    meta = {"title": args.title.strip()}

    if args.no_date:
        folder_name = slug
    else:
        if args.date:
            try:
                date = dt.date.fromisoformat(args.date)
            except ValueError:
                sys.exit(f"--date must look like 2026-08-14, got {args.date!r}")
        else:
            date = dt.date.today()
        # The date prefix is what sorts albums newest-first on the page.
        folder_name = f"{date:%Y-%m-%d}-{slug}"
        meta["date"] = pretty_date(date)

    if args.description.strip():
        meta["description"] = args.description.strip()

    folder = os.path.join(GALLERY_ROOT, folder_name)
    meta_path = os.path.join(folder, "_album.json")

    if os.path.exists(meta_path):
        sys.exit(
            f"public/images/gallery/{folder_name}/_album.json already exists.\n"
            "Edit that file directly, or pick a different title/date."
        )

    os.makedirs(folder, exist_ok=True)
    with open(meta_path, "w", encoding="utf-8") as fh:
        json.dump(meta, fh, indent=2, ensure_ascii=False)
        fh.write("\n")

    rel = f"public/images/gallery/{folder_name}"
    print(f"Created {rel}/")
    print(f"  title:       {meta['title']}")
    if "date" in meta:
        print(f"  date:        {meta['date']}")
    if "description" in meta:
        print(f"  description: {meta['description']}")
    print()
    print("Next:")
    print(f"  1. Copy the event photos into {rel}/")
    print("  2. python scripts/optimize-images.py gallery")
    print("  3. Commit and push - the album appears on /gallery")
    print()
    print(f"Edit {rel}/_album.json any time to change the heading or blurb.")


if __name__ == "__main__":
    main()
