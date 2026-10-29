#!/bin/zsh
# Screenshots the local site at phone widths (360 = small Android, 412 = Galaxy S25 Ultra,
# 390 = iPhone) and reports any element wider than the screen.
# Usage: scripts/qa-mobile.sh [#anchor]   e.g. scripts/qa-mobile.sh '#pricing'
# Output PNGs land in /tmp/listingspark-qa/
set -e
ROOT=${0:A:h:h}; SITE=$ROOT/site/listingspark-site; OUT=/tmp/listingspark-qa; ANCHOR=${1:-}
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p $OUT
sed "s#<head>#<head><base href=\"file://$SITE/\">#" $SITE/index.html > $OUT/qa.html
cat >> $OUT/qa.html <<'JS'
<script>
window.addEventListener('load',function(){setTimeout(function(){
 var W=document.documentElement.clientWidth,out=[];
 document.querySelectorAll('body *').forEach(function(e){if(e.closest('.skip'))return;var r=e.getBoundingClientRect();if(r.width&&(r.right>W+1||r.left<-1))out.push(e.tagName+'.'+e.className+' right='+Math.round(r.right))});
 parent.postMessage(W+'px: '+(out.length?out.slice(0,20).join(' | '):'no overflow'),'*');
},300)});
</script>
JS
for w in 360 390 412; do
  print "<html><body style='margin:0'><iframe src='qa.html$ANCHOR' style='border:0;width:${w}px;height:14000px'></iframe><pre id=R></pre><script>addEventListener('message',function(e){R.textContent=e.data})</script></body></html>" > $OUT/frame-$w.html
  "$CH" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --window-size=$w,14000 --virtual-time-budget=5000 --screenshot=$OUT/phone-$w.png file://$OUT/frame-$w.html >/dev/null 2>&1
  "$CH" --headless=new --disable-gpu --allow-file-access-from-files --window-size=800,600 --virtual-time-budget=5000 --dump-dom file://$OUT/frame-$w.html 2>/dev/null | grep -o '<pre id="R">[^<]*' | sed 's/<pre id="R">//'
done
echo "Screenshots: $OUT/phone-{360,390,412}.png"
