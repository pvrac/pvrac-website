# Gallery photos, sorted by event.
#
# Each SUBFOLDER in here is one album — it renders on /gallery as its own
# section: a heading with the event name, then that event's photos below.
#
#   gallery/
#     2026-08-14-community-event/
#       _album.json          <- optional: title, date, description
#       01-setup.webp
#       02-kids-race.webp
#     general/               <- the evergreen album; always sorts last
#       1.webp
#
# ORDER
#   Albums:  dated folders (YYYY-MM-DD- or YYYY-MM- prefix) first, newest to
#            oldest; then undated folders alphabetically; 'general' always last.
#   Photos:  by filename, ascending — number them (01-..., 02-...) to control
#            the order. The album already carries the recency ordering, so
#            within one event photos read in the order things happened.
#
# _album.json is optional. Without it the heading is derived from the folder
# name, so "2026-08-14-community-event" becomes "Community Event / 14 August
# 2026". Add the file when you want a custom title or a blurb:
#
#   { "title": "Community Event", "date": "14 August 2026",
#     "description": "Our morning at the school." }
#
# TO ADD AN EVENT
#   1. python scripts/new-album.py "Community Event" --date 2026-08-14
#   2. Copy the photos into the folder it prints
#   3. python scripts/optimize-images.py gallery
#   4. Commit and push
#
# A folder with no images in it is skipped, so you can create the album now and
# add the photos later.
