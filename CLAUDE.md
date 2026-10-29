# Listing Spark website

Static site (plain HTML/CSS/JS, no build step) hosted on Hostinger shared hosting.

## Where things live
- `site/listingspark-site/index.html`: all homepage copy and sections
- `site/listingspark-site/assets/css/styles.css`: all styling. Brand colors are in `:root`. Responsive rules are grouped at the bottom of the file (breakpoints 1024 / 900 / 820 / 560 / 380px).
- `site/listingspark-site/assets/js/main.js`: sliders, gallery data (categories, counts, names), service tabs
- `site/listingspark-site/assets/img/gallery/<category>/<n>-before.jpg|-after.jpg`: gallery photos. Counts in `galleryMeta` in main.js must match the files on disk.
- `ListingSpark-guide.md`: owner's hosting/launch guide (not uploaded)

## Quick-edit workflow
1. Edit files under `site/listingspark-site/`.
2. Run `scripts/qa-mobile.sh` (or `scripts/qa-mobile.sh '#pricing'` for one section). It screenshots 360/390/412px phone widths into `/tmp/listingspark-qa/` and reports horizontal overflow. Look at the screenshots before shipping CSS changes.
3. Deploy in one of two ways:
   - **Auto:** commit and push to `main`. `.github/workflows/deploy.yml` uploads the site folder over SSH/rsync (host key pinned). Needs the SSH_PASSWORD repo secret to be correct; as of 2026-10-30 it was still being rejected, so manual upload is the working path.
   - **Manual:** `scripts/build-zip.sh` builds `dist/listingspark-site.zip` with index.html at the root. Upload it to `public_html` in Hostinger File Manager and Extract.

## Rules
- After changing styles.css or main.js, bump the `?v=` date on their links in index.html. The .htaccess caches CSS/JS for a month, so phones otherwise keep the old files.
- Test every layout change at phone width. The owner checks on a Galaxy S25 Ultra in Chrome (412px CSS width).
- Don't commit or push unless asked. Pushing to main deploys the live site.
