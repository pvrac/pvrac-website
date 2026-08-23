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
    python scripts/optimize-images.py gallery races

It edits files in place and always outputs .webp, converting .jpg/.jpeg/.png
originals (the old file is deleted). Images already small enough are left
untouched, so it is safe to re-run.

NOTE: race photos are linked by exact filename in src/data/events.ts (e.g.
'/images/races/icebreaker.jpeg'). If you optimize a new race photo, update
that path's extension to .webp too. Gallery photos don't need this — the
gallery page reads whatever files are in public/images/gallery at build time.

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

    # For an already-WebP file we didn't resize, only overwrite if it's
    # smaller — re-encoding an already-optimized photo can inflate it (and
    # slowly degrade quality on repeat runs). Nothing to gain there.
    if is_webp and not resized and after >= before:
        return f"  {os.path.basename(path):40} {before // 1024:>5} KB  (already optimized, skipped)"

    out_path = root + ".webp"
    with open(out_path, "wb") as fh:
        fh.write(buf.getvalue())

    # If we converted format (e.g. .jpg -> .webp), remove the original file.
    if out_path != path:
        os.remove(path)

    tag = "resized" if resized else "recompressed"
    return f"  {os.path.basename(path):40} {before // 1024:>5} KB -> {after // 1024:>5} KB  ({tag})"


def optimize_folder(name: str) -> None:
    folder = os.path.join(IMAGES_ROOT, name)
    if not os.path.isdir(folder):
        print(f"(skipping '{name}' — public/images/{name} not found)")
        return

    files = [
        f
        for f in sorted(os.listdir(folder))
        if os.path.splitext(f)[1].lower() in EXTS
    ]
    if not files:
        print(f"No images found in public/images/{name}")
        return

    print(f"Optimizing {len(files)} image(s) in public/images/{name} ...")
    for f in files:
        print(optimize(os.path.join(folder, f)))


def main() -> None:
    folders = sys.argv[1:] or DEFAULT_FOLDERS
    for name in folders:
        optimize_folder(name)
    print("Done. Review the photos, then commit and push.")


if __name__ == "__main__":
    main()
