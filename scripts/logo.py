# Alpine Digital's wordmark, from Instrument Sans: "Alpine" bold then "digital" regular on one baseline,
# with the A's crossbar left out. Writes the paths for src/lib/components/Logo.svelte,
# static/alpine-digital.svg and static/favicon.svg, and src/lib/fonts/wordmark-a.woff2: a font holding only
# that A, which the h1 (.wordmark in app.css) sets as real text. Then run node scripts/og.mjs.
# Keep .wordmark's sizes and tracking in step with DIGITAL and the TRACK_ values here.
# Needs fontTools and brotli:
#   nix shell --impure --expr 'with import <nixpkgs> {}; python3.withPackages (p: [p.fonttools p.brotli])' -c python3 scripts/logo.py
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import DecomposingRecordingPen

FONT = "node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2"
font = TTFont(FONT)
cmap = font.getBestCmap()

CAP = 92  # height of "Alpine"'s capital, in logo units
SCALE = CAP / font["OS/2"].sCapHeight
DIGITAL = 0.82  # "digital" size relative to "Alpine"
SPACE = 210  # gap between the two words' ink, in font units (about a word space)
TRACK_ALPINE = -0.02  # em
TRACK_DIGITAL = -0.015


def glyph(ch, wght):
    gs = font.getGlyphSet(location={"wght": wght})
    rec = DecomposingRecordingPen(gs)
    gs[cmap[ord(ch)]].draw(rec)
    if ch == "A":  # drop the crossbar: the A is two legs and a bar, the bar last
        starts = [i for i, (op, _) in enumerate(rec.value) if op == "moveTo"]
        rec.value = rec.value[: starts[2]]
    adv = font.getGlyphSet(location={"wght": wght})[cmap[ord(ch)]].width
    return rec, adv


def word(text, wght, track):
    """Glyph recordings with x offsets in font units, and the word's ink bounds."""
    out, x = [], 0
    for ch in text:
        rec, adv = glyph(ch, wght)
        out.append((rec, x))
        x += adv + track * 1000
    b = BoundsPen(None)
    for rec, dx in out:
        rec.replay(TransformPen(b, (1, 0, 0, 1, dx, 0)))
    return out, b.bounds


def paths(glyphs, scale, x0, baseline):
    """One SVG path per glyph, y flipped, rounded to 0.01."""
    res = []
    for rec, dx in glyphs:
        pen = SVGPathPen(None, ntos=lambda v: f"{round(v, 2):g}")
        rec.replay(TransformPen(pen, (scale, 0, 0, -scale, x0 + dx * scale, baseline)))
        res.append(pen.getCommands())
    return res


alpine, ab = word("Alpine", 700, TRACK_ALPINE)
digital, db = word("digital", 400, TRACK_DIGITAL)
ds = SCALE * DIGITAL

a_left = -ab[0] * SCALE
a_right = a_left + ab[2] * SCALE
base = max(ab[3] * SCALE, db[3] * ds)  # tallest ink sits at y 0
d_x0 = a_right + SPACE * SCALE - db[0] * ds
p = paths(alpine, SCALE, a_left, base) + paths(digital, ds, d_x0, base)

width = round(d_x0 + db[2] * ds, 2)
height = round(base - min(ab[1] * SCALE, db[1] * ds), 2)
w, h = f"{width:g}", f"{height:g}"
print("viewBox", w, h)

# Logo.svelte
svelte = "src/lib/components/Logo.svelte"
src = open(svelte).read()
head = src[: src.index("<svg")]
body = "\n".join(f'  <path d="{d}" />' for d in p)
open(svelte, "w").write(
    head + f'<svg class={{cls}} viewBox="0 0 {w} {h}" fill="currentColor" aria-hidden="true">\n{body}\n</svg>\n'
)

# static/alpine-digital.svg
body = "\n".join(f'<path d="{d}" fill="#EAEFF6"/>' for d in p)
open("static/alpine-digital.svg", "w").write(
    f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none" xmlns="http://www.w3.org/2000/svg">\n{body}\n</svg>\n'
)

# static/favicon.svg: the A alone, centred in a 32px tile
rec, _ = glyph("A", 700)
b = BoundsPen(None)
rec.replay(b)
x0, y0, x1, y1 = b.bounds
s = 19 / (y1 - y0)
pen = SVGPathPen(None, ntos=lambda v: f"{round(v, 2):g}")
tx = 16 - (x0 + x1) / 2 * s
ty = 16 + (y0 + y1) / 2 * s
rec.replay(TransformPen(pen, (s, 0, 0, -s, tx, ty)))
open("static/favicon.svg", "w").write(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">\n'
    '  <rect width="32" height="32" rx="7" fill="#090a0d"/>\n'
    f'  <path d="{pen.getCommands()}" fill="#EAEFF6"/>\n'
    "</svg>\n"
)

# src/lib/fonts/wordmark-a.woff2: Instrument Sans's A at weight 700 without its bar, and nothing else
from fontTools.varLib import instancer
from fontTools.subset import Subsetter, Options
from fontTools.ttLib.tables._g_l_y_f import GlyphCoordinates

a_font = instancer.instantiateVariableFont(TTFont(FONT), {"wght": 700})
opts = Options()
opts.layout_features = []
opts.name_IDs = [1, 2]
sub = Subsetter(opts)
sub.populate(unicodes=[ord("A")])
sub.subset(a_font)
glyf = a_font["glyf"]
a = glyf[a_font.getBestCmap()[ord("A")]]
assert a.numberOfContours == 3, "expected the A as two legs and a bar"
keep = a.endPtsOfContours[1] + 1
a.coordinates = GlyphCoordinates(a.coordinates[:keep])
a.flags = a.flags[:keep]
a.endPtsOfContours = a.endPtsOfContours[:2]
a.numberOfContours = 2
a.recalcBounds(glyf)
a_font.flavor = "woff2"
a_font.save("src/lib/fonts/wordmark-a.woff2")
