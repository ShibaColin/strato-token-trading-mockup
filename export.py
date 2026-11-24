"""Build the current standalone HTML and static site ZIP using only stdlib."""
from pathlib import Path
import base64,json,mimetypes,zipfile
root=Path(__file__).resolve().parent
dist=root/'dist'
out=root/'exports'
out.mkdir(exist_ok=True)
assets={p.name:'data:'+(mimetypes.guess_type(p.name)[0] or 'application/octet-stream')+';base64,'+base64.b64encode(p.read_bytes()).decode() for p in (dist/'assets').iterdir() if p.is_file()}
image_assets={name:data for name,data in assets.items() if name.lower().endswith(('.svg','.png','.jpg','.webp'))}
app=(dist/'app.js').read_text().replace('src="assets/${n}"','src="${EMBEDDED_ASSETS[n] || \'assets/\'+n}"')
js='const EMBEDDED_ASSETS='+json.dumps(image_assets,separators=(',',':'))+';\n'+(dist/'market.js').read_text()+'\n'+(dist/'funding.js').read_text()+'\n'+(dist/'swap.js').read_text()+'\n'+app
html=(dist/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+(dist/'style.css').read_text()+'</style>')
for name in ['app.js','market.js','funding.js','swap.js','scene.js']:html=html.replace(f'<script src="{name}" defer></script>','')
html=html.replace('</body>','<script>'+js+'</script></body>')
for name,data in assets.items():html=html.replace('assets/'+name,data)
assert 'src="assets/${n}"' not in html
assert html.index('id="modal"')<html.index('const EMBEDDED_ASSETS=')
(out/'STRATO Token Experience.html').write_text(html)
with zipfile.ZipFile(out/'STRATO Token Experience.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in dist.rglob('*'):
  if p.is_file():z.write(p,p.relative_to(dist))
 z.write(root/'README.md','README.md')
print('Created current standalone HTML and static site ZIP.')
