# Asset Workflows — Vitasilk Coconut Smooth

Image brief for the Coconut Smooth landing page. Every prompt below targets the
**coconut cream** theme: cream `#faf6ef`, shell `#f2ebdf`, sand `#e7dcc9`, palm
`#1f4d3d`, gold `#c9a227`, bark `#241d16`.

> **⚠ Read this before generating anything.** The `vitasilk_coffee_extract`
> sibling shipped with a documented, still-unresolved defect: all eight of its
> shots came back cream-and-beige light-luxe, art-directed to the *24K* project's
> ivory palette, against a near-black page. Its README still carries a "Palette
> mismatch — unresolved" section as a result.
>
> **This project inverts that risk and it is worth understanding why.** A warm
> cream page is exactly what those mis-delivered shots were made for, so almost
> anything will "not clash" here. That makes the failure mode quieter, not
> absent: what goes wrong on a cream page is not a clashing shot, it is a shot
> with **no dark anchor** — everything pale, nothing to hold the eye, and the
> whole scroll turns into beige soup. So the rule for this SKU is not "match the
> palette", it is:
>
> **every shot needs a deep palm-green or near-black anchor in frame.** A
> polished dark stone surface, a shadowed background, deep green foliage. Reject
> a delivery that is pale end to end, even though it technically matches.

## Rules (always)

- **Product fidelity is sacred.** Never generate the bottle from a text prompt
  alone. Every product shot starts from a real photograph supplied as reference
  or edit input. Reject any output with a warped label, garbled text, or a cap
  that has drifted from the real one.
- The Coconut label is dense — `Vitasilk Professional`, `COCONUT` over two lines
  with a script `Smooth`, a coconut illustration, a green-bordered botanical
  panel carrying `COCONUT OIL AND ALMOND OIL` / `زيت جوز الهند - زيت اللوز`,
  `NOURISHES AND HYDRATES` / `يغذي ويرطب`, `ANTI-FRIZZ COMPLEX` / `مركب مضاد
  للتجعد`, `BRAZILIAN PROTEIN`, `PROFESSIONAL USE`, plus `0%` and `1L 35.01 OZ`.
  Generative models mangle small type and they mangle **bilingual** small type
  worse. Judge every output at 100% zoom on the label, not on the silhouette.
- The bottle is **glossy white with a gold collar, a matte black pump, and a
  SILVER base band**. That silver band is the detail most often lost — every
  other bottle in the Vitasilk line has a gold one, so both the models and any
  human retoucher will drift it to gold to "match". Check it every time.
- Model: **Google Nano Banana 2** — Flash for drafts, Pro for the final pass.
- Deliver into `assets/images/` under the exact filenames in the table below.
  The code imports those names directly; a rename is a build error.

## Source photography

Put generated originals in `C:/Users/Brandshift 01/Downloads/vitasilk coconut img/`
named per the **slot name** in the table below — that is the path `SRC` in
`scripts/process-images.mjs` points at.

**The extension does not matter.** `process-images.mjs` resolves each slot by
basename against `.png / .jpg / .jpeg / .jfif / .webp`, so `hair-after.jfif`
straight out of the generator is picked up with no renaming. sharp decodes by
content rather than by extension, so there was nothing to gain by insisting on
one — and hand-renaming every delivery is exactly the step that gets skipped.

## Shot list

| # | Slot | Source slot name (in `SRC`) | Output | Ratio |
|---|------|-----------------------------|--------|-------|
| 1 | Hero | `bottle-source` *(passed as an argument)* | `bottle-hero.webp` | 3:4 → cutout |
| 2 | Ingredients | `coconut-almond-macro` | `coconut-almond-macro.webp` | 16:9 |
| 3 | Promise card | `studio-pedestal` | `studio-pedestal.webp` | 16:9 |
| 4 | Brand story | `brand-story-grove` | `brand-story-grove.webp` | 16:9 |
| 5a | After | `hair-after` | `hair-after.webp` | 3:4 |
| 5b | Before | `hair-before` | `hair-before.webp` | 3:4 |
| 6 | Offer + OG | `studio-front` | `studio-front.webp` | 1:1 |
| 7 | Testimonials | `testimonial-side` | `testimonial-side.webp` | 4:5 |

**Status: all eight slots hold real photography** (~1.4 MB total), installed
2026-07-28. Every shot carries a dark anchor, so the beige-soup failure this file
warns about did not occur. `scripts/make-placeholders.mjs` never overwrites an
existing file, so it stays safe to re-run — it will now report every slot as
"already present".

`SRC` also holds `bottle-source.png`, the hero shot on its original grey ground.
The shipping hero was cut from `bottle-cutout.png` (a Magnific background
removal of that same frame) rather than from the grey version, so
`cutout-hero.mjs` was never needed. Keep `bottle-source.png` anyway — if the
cutout ever has to be redone from scratch, that is the input.

---

## 1 — Hero bottle (`bottle-hero.webp`)

The LCP element, and the only shot that must ship with **real transparency**:
`Hero.tsx` feeds the file to CSS `maskImage` so the light sweep is clipped to
the bottle's own silhouette. A flat white background makes the sweep cross the
whole box and the effect collapses.

> Studio product photograph of a 1 litre cosmetic pump bottle, glossy opaque
> white plastic with a polished gold collar, a brushed silver band at the base
> and a matte black pump head. Straight-on, centred, slight three-quarter turn.
> Soft key light from the upper left, and a distinctly darker warm-grey rim
> shadow down the right edge to separate the white body from the ground.
> Seamless mid-grey background, smooth and continuous, clearly darker than the
> bottle. No props, no reflections on the floor, no text overlays.
> Photorealistic, sharp label.

**"Clearly darker than the bottle" is doing real work in that prompt, not
styling.** This is a white product, and it is the hardest cutout in the Vitasilk
line. The blue sibling's README calls its own bottle "the easy case" — a
saturated blue body steps hard against white and the default knobs sealed the
ring first try. A white body against the pale grey these shots default to gives
the edge detector almost nothing: the two overlap in luminance and the white
carries no chroma to separate on instead. Push the ground darker at generation
time and the cutout stops being a fight. It is far cheaper than retuning.

**In the event, the shipping hero sidestepped the problem entirely** — the
background was removed externally (Magnific) and `hero-from-cutout.mjs` used its
alpha as-is, so `cutout-hero.mjs` never ran. That is the recommended route for
this SKU precisely *because* it is the hard case: an external matte on a white
bottle beats a locally-detected one, and the script verifies the alpha is real
rather than a flattened preview before trusting it. Keep the guidance above for
whoever has to redo it without that tool.

Two constraints come from `scripts/cutout-hero.mjs`, which floods inward from
the border until a detected outline ring stops it:

- **The bottle must not touch the left or right frame edge.** The fill starts at
  every border pixel; if the product touches an edge, the fill seeds inside it.
- **The background must stay smooth and continuous.** Gradients and vignettes
  are fine — that is the point of the edge-ring method — but a hard-edged prop
  or a second backdrop panel will register as outline and leave a slab behind.

Run it with the source as an argument:

```
node scripts/cutout-hero.mjs "C:/path/to/bottle.png"
```

Check `scripts/_cutout-check.png` after every run — it composites the result
over magenta so halos and holes are obvious. Three failure signatures specific
to this product, in the order they show up:

1. **A ghost at the base.** The silver band is a mid-grey ring on a grey ground,
   the lowest-contrast boundary in the frame. This is the one to check first.
2. **A bitten or missing pump head.** The fill walked into the black cap from
   above, which means the ring broke at the collar.
3. **A hollow bottle.** The ring broke outright — lower `EDGE`.

The script header lists the knobs and what each one does. On a white bottle,
expect to reach for a *lower* `EDGE` before a higher one, and do not set
`DENOISE` to zero under any circumstance.

## 2 — Ingredients macro (`coconut-almond-macro.webp`)

The formula shot. Coconut leads the section, so coconut leads the frame — and
this is the shot most likely to come back as beige soup, so the dark surface is
non-negotiable.

> Extreme macro still life: a cracked coconut showing white flesh beside a
> shallow dish of clear coconut oil, with a small pile of blanched almonds and
> one cracked almond shell, arranged on a dark polished green-black stone
> surface. Warm directional light raking from the left, deep shadows, small gold
> specular highlights on the oil surface. Cream, warm white and deep green
> palette with strong dark anchoring in the lower third. Shallow depth of field.
> 16:9.

## 3 — Promise card (`studio-pedestal.webp`)

Sits at the top of the promise card in `ProblemPromise.tsx`, cropped fairly
short — keep the subject centred and leave headroom.

> The white Coconut Smooth bottle on a low matte-black stone pedestal,
> three-quarter angle. Warm cream studio background falling to deep shadow at
> the edges, with a soft pool of gold light behind the product. A few whole
> almonds and a split coconut half at the base. Moody, premium, editorial
> product photography. 16:9.

## 4 — Brand story (`brand-story-grove.webp`)

Full-bleed parallax band. Note that `BrandStory.tsx` on this project is
**deliberately light** — it veils only the bottom 3/5 in cream and leaves the
photograph at full brightness above that. (The dark-theme siblings scrim the
whole frame; that treatment was removed here because it dragged a bright, airy
shot down to a brown smudge.) So: put the interest in the top two-thirds and
keep the lower third quiet enough to carry `bark` text.

> Coconut palm grove at golden hour, shot low and wide: tall palms against a
> warm cream sky, deep green fronds catching the light, long shadows across pale
> sand. A weathered wooden table in the near foreground holding a split coconut
> and a small glass dish of coconut oil. Warm creams and deep greens, cinematic,
> airy but with real depth in the foliage. 16:9.

## 5 — Before / after pair

**Order matters.** Generate the **after** first, then generate the **before** as
an *edit* passing the after-image as `references[{type: image}]`. Generating them
independently produces two different photographs, and the drag slider in
`BeforeAfter.tsx` reads as a jump cut mid-drag rather than a transformation.

**5a — after** (`hair-after.webp`):
> Back view of a woman with long, glossy, healthy dark hair falling in smooth
> defined lengths. Silky surface, no frizz, soft natural movement. Warm key
> light with a gold rim light down one side, warm cream background with soft
> shadow falloff. Luxury haircare advertisement. 3:4.

**5b — before** (`hair-before.webp`), as an edit of 5a:
> Keep the exact same woman, pose, framing, lighting and background — but the
> hair is dry, dull and frizzy, with flyaways, split ends and a matte lifeless
> texture. Same camera position.

## 6 — Offer card + OG image (`studio-front.webp`)

Worth the most effort of any shot: it is both the offer card and the Open Graph
image, so it is what people see when the link is shared. Generate at 1:1 2k and
upscale to 4k before downsizing.

**This one is the exception to the cream rule.** It sits inside the `palm-dark`
Offer band — the only full-bleed dark section on the page — so a cream-ground
shot punches a bright hole in it. Shoot it dark.

> The white Coconut Smooth bottle front-facing on a glossy near-black surface
> with a soft reflection beneath it. Background is a deep green-to-black
> gradient with a subtle gold glow behind the bottle. Gold collar, silver base
> band and black pump all clearly rendered. Label fully legible and sharp,
> straight-on. Premium e-commerce hero shot. 1:1.

## 7 — Testimonials (`testimonial-side.webp`)

Sits beside the quote carousel, cropped to a tall portrait — keep the face in
the upper half.

> Moroccan woman in her early thirties with long healthy dark hair, soft natural
> smile, looking slightly off-camera. Soft warm lighting, warm cream background
> with gentle shadow falloff, subtle gold rim light on her hair. Natural skin
> texture, editorial beauty portrait. 4:5.

---

## Local processing

```
node scripts/make-placeholders.mjs        # fills any empty slot, never overwrites
node scripts/process-images.mjs           # SRC → resized WebP for slots 2–7
node scripts/cutout-hero.mjs <path>       # slot 1, cut out from a raw photo
node scripts/hero-from-cutout.mjs <path>  # slot 1, from an already-cut-out file
```

`assets/images/` must **exist** before `cutout-hero.mjs` runs — that script
writes without creating the directory. `make-placeholders.mjs` does create it,
so running it first is always safe.

Use `hero-from-cutout.mjs` when the background was removed elsewhere (Magnific,
remove.bg, Photoshop). It also repairs **flattened previews** — if you "save
image as" on a background remover's web preview, the transparency checkerboard
is captured as literal grey pixels and the alpha channel comes back fully
opaque. That file looks right in a viewer and is unusable as an asset: the page
shows a chessboard behind the bottle, and the CSS mask sees a solid rectangle so
the light sweep crosses the whole box. The script detects this and rebuilds the
alpha. Prefer the tool's real transparent download when you can get it — a
reconstruction cannot recover the true antialiased edge, it approximates it.

Both processing scripts read their paths from constants at the top of the file.
