"""Resize and compress website photos (gallery + race photos).

Full-resolution phone photos (5-10 MB each) make pages slow to load. This
shrinks every image in the target folders under public/images to a sensible
max dimension and re-saves it as an optimized WebP, so you can just dump raw
photos into a folder and run this once before committing.

WebP at quality ~84 looks visually close to the original at 25-35% smaller
than an equivalent-quality JPEG, so we get noticeably better quality than a
straight JPEG re-encode at the same file size.

Usage (from the project root):

    python scripts/optimize-images.py           # optimizes gallery AND races
    python scripts/optimize-images.py races     # just one folder
    python scripts/optimize-images.py gallery/2026-08-community-event

Folders are searched recursively, so 'gallery' covers every album subfolder
inside public/images/gallery in one go.

It edits files in place and always outputs .webp, converting .jpg/.jpeg/.png
originals (the old file is deleted). Images already small enough are left
untouched, so it is safe to re-run.

NOTE: race photos are linked by exact filename in src/data/events.ts (e.g.
'/images/races/icebreaker.jpeg'). If you optimize a new race photo, update
that path's extension to .webp too. Gallery photos don't need this — the
gallery page reads whatever files are in public/images/gallery at build time.

To start a new gallery album, use scripts/new-album.py — it creates the folder
and its _album.json for you.

Requires Pillow with WebP support (the standard `pip install pillow` wheel
has it):  pip install pillow
"""
import io
import os
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip install pillow")

MAX_DIMENSION = 2000      # longest edge a photo needs on screen
WEBP_QUALITY = 84         # sweet spot: visually close to source, much smaller
EXTS = {".jpg", ".jpeg", ".png", ".webp"}

# Re-encoding an already-optimized WebP typically saves only 2-3% while losing
# a little quality every time. Since this script is meant to be re-run over the
# whole gallery whenever photos are added, only rewrite such a file when the
# saving is actually worth it.
MIN_RESAVE_SAVING = 0.10

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_ROOT = os.path.join(PROJECT_ROOT, "public", "images")
DEFAULT_FOLDERS = ["gallery", "races"]


def optimize(path: str) -> str:
    im = Image.open(path)
    # Honour the camera's rotation flag, then drop EXIF so it can't re-rotate.
    im = ImageOps.exif_transpose(im)

    before = os.path.getsize(path)
    root, ext = os.path.splitext(path)
    is_webp = ext.lower() == ".webp"

    longest = max(im.width, im.height)
    resized = longest > MAX_DIMENSION
    if resized:
        scale = MAX_DIMENSION / longest
        new_size = (round(im.width * scale), round(im.height * scale))
        im = im.resize(new_size, Image.LANCZOS)

    rgb = im.convert("RGB")  # flatten any alpha; these are photos, not icons
    buf = io.BytesIO()
    rgb.save(buf, "WEBP", quality=WEBP_QUALITY, method=6)
    after = buf.getbuffer().nbytes

    # For an already-WebP file we didn't resize, only overwrite if there's a
    # real saving — re-encoding an already-optimized photo shaves a couple of
    # percent while slowly degrading quality on every repeat run.
    if is_webp and not resized and after > before * (1 - MIN_RESAVE_SAVING):
        return f"  {os.path.basename(path):40} {before // 1024:>5} KB  (already optimized, skipped)"

    out_path = root + ".webp"
    with open(out_path, "wb") as fh:
        fh.write(buf.getvalue())

    # If we converted format (e.g. .jpg -> .webp), remove the original file.
    if out_path != path:
        os.remove(path)

    tag = "resized" if resized else "recompressed"
    return f"  {os.path.basename(path):40} {before // 1024:>5} KB -> {after // 1024:>5} KB  ({tag})"


def find_images(folder: str):
    """Every image under `folder`, recursively, grouped by containing directory.

    Recursing is what lets 'gallery' cover all of its album subfolders at once.
    """
    groups = []
    for dirpath, dirnames, filenames in os.walk(folder):
        dirnames.sort()
        images = sorted(f for f in filenames if os.path.splitext(f)[1].lower() in EXTS)
        if images:
            groups.append((dirpath, images))
    return groups


def optimize_folder(name: str) -> None:
    # Accept both slash styles so 'gallery/general' works on Windows too.
    rel = name.replace("\\", "/").strip("/")
    folder = os.path.join(IMAGES_ROOT, *rel.split("/"))

    if not os.path.isdir(folder):
        print(f"(skipping '{rel}' — public/images/{rel} not found)")
        return

    groups = find_images(folder)
    if not groups:
        print(f"No images found in public/images/{rel}")
        return

    for dirpath, images in groups:
        label = os.path.relpath(dirpath, IMAGES_ROOT).replace("\\", "/")
        print(f"Optimizing {len(images)} image(s) in public/images/{label} ...")
        for f in images:
            print(optimize(os.path.join(dirpath, f)))


def main() -> None:
    folders = sys.argv[1:] or DEFAULT_FOLDERS
    for name in folders:
        optimize_folder(name)
    print("Done. Review the photos, then commit and push.")


if __name__ == "__main__":
    main()
