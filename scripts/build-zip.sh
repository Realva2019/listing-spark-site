#!/bin/zsh
# Builds a clean upload zip: index.html at the zip root, no .DS_Store / __MACOSX.
# Output: dist/listingspark-site.zip  (upload to Hostinger public_html and Extract)
set -e
ROOT=${0:A:h:h}
SITE=$ROOT/site/listingspark-site
OUT=$ROOT/dist/listingspark-site.zip
mkdir -p $ROOT/dist && rm -f $OUT
cd $SITE && zip -rqX $OUT . -x '*.DS_Store' -x '__MACOSX/*'
echo "Built $OUT ($(du -h $OUT | cut -f1))"
