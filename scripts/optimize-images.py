"""Resize and compress website photos (gallery + race photos).

Full-resolution phone photos (5-10 MB each) make pages slow to load. This
shrinks every image in the target folders under public/images to a sensible
max width and re-saves it as an optimized JPEG, so you can just dump raw photos
into a folder and run this once before committing.

Usage (from the project root):

    python scripts/optimize-images.py           # optimizes gallery AND races
    python scripts/optimize-images.py races     # just one folder
    python scripts/optimize-images.py gallery races

It edits files in place. Images already small enough are left untouched, so it
is safe to re-run. Requires Pillow:  pip install pillow
"""
import io
import os
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip install pillow")

MAX_WIDTH = 1600          # widest a photo needs to be on screen
JPEG_QUALITY = 82         # visually lossless-ish, much smaller files
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
    is_jpeg = ext.lower() in (".jpg", ".jpeg")

    resized = im.width > MAX_WIDTH
    if resized:
        new_h = round(im.height * MAX_WIDTH / im.width)
        im = im.resize((MAX_WIDTH, new_h), Image.LANCZOS)

    rgb = im.convert("RGB")  # flatten any alpha; output is JPEG
    buf = io.BytesIO()
    rgb.save(buf, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    after = buf.getbuffer().nbytes

    # For an already-JPEG file we didn't resize, only overwrite if it's smaller —
    # re-encoding an already-optimized photo can inflate it (and slowly degrade
    # quality on repeat runs). Nothing to gain there, so leave it untouched.
    if is_jpeg and not resized and after >= before:
        return f"  {os.path.basename(path):40} {before // 1024:>5} KB  (already optimized, skipped)"

    out_path = path if is_jpeg else root + ".jpg"
    with open(out_path, "wb") as fh:
        fh.write(buf.getvalue())

    # If we converted (e.g. .png -> .jpg), remove the original file.
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
