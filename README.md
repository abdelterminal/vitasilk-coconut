# Vitasilk Coconut Smooth — Landing Page

COD landing page for **Vitasilk Coconut Smooth 1L** — a formaldehyde-free
Brazilian protein treatment with coconut and sweet almond oil. Bilingual Arabic
(Moroccan Darija) / French, coconut cream theme (cream / palm / gold).

Next.js 16 App Router · React 19 · Tailwind v4 · Motion.

## Getting started

```
npm install
npm run dev
```

Then open http://localhost:3000. Orders fall back to `data/orders.jsonl` until
`SHEETS_ENDPOINT` is configured, so the form works end to end with zero setup.

## Where things live

| What | Where |
|---|---|
| Prices, WhatsApp number, product name, domain | `lib/config.ts` |
| All copy, both languages | `dictionaries/fr.ts` (shape) + `ar.ts` |
| Palette, fonts, gold gradients, the two CTAs | `app/globals.css` `@theme` |
| Section order | `app/page.tsx` |
| Order intake | `app/api/order/route.ts` + `apps-script/Code.gs` |
| Image brief and prompts | `WORKFLOWS.md` |

## Where this came from

A hybrid fork, because neither sibling was right alone. The components, `app/`
and `lib/` come from **`vitasilk_24k`**, which is light-first and had already
solved the light-theme problems — `-on-dark` gold variants, a substitute for the
glow that is invisible on a pale ground, light elevation shadows. The `scripts/`
come from **`vitasilk_blue_silk`**, which is newer and has two things 24k never
got: `make-placeholders.mjs` and `hero-from-cutout.mjs`.

## Positioning

This SKU is **coconut-first, and the argument is penetration.** Four Vitasilk
pages share a shelf, so each needs a spine of its own: 24K leads on luxury, Blue
Silk on Moroccan argan, Coffee Extract on Amazon sourcing. This one leads on the
single thing coconut oil does that other oils do not — its lauric acid has a
small enough molecule to enter the hair shaft rather than sit on top of it.

That matters commercially because the customer has almost certainly already
tried coconut oil as a home remedy and been underwhelmed. The `problem` section
is written to explain *why* that failed rather than to talk around it. If you
rewrite copy, keep the order: **coconut penetrates → almond softens → protein
rebuilds → frizz stops.** Every section is built on it.

**The product name stays in Latin letters in both languages** — "Coconut
Smooth", "Vitasilk Professional". It is what is printed on the bottle, so an
Arabic transliteration would not match what the customer is holding when the
parcel arrives. Arabic copy wraps around the Latin name rather than replacing it
(`"وعد Coconut Smooth"`). Bidi handles the mixing — the hero puts each word in
its own block span, so there is no reordering to manage.

## Changing the price

Edit `PRICE_DH` and `OLD_PRICE_DH` in `lib/config.ts` — nothing else. Every
visible price derives from those two numbers through `formatDh`, and the discount
badge from `DISCOUNT_PCT`. The dictionaries take an already-formatted price as a
*function argument* and never hardcode one, so the copy cannot desync.

`formatDh` groups thousands with a narrow no-break space by hand rather than
using `toLocaleString`. That is deliberate: ICU data can differ between the Node
server and the browser, and the price renders inside the first viewport, so the
mismatch would surface as a hydration error.

## The contrast rules

Three, and the third is the one a token sweep from a sibling will break.

**1. Gold is display-only.** The page is cream `#faf6ef`, where brand gold
`#c9a227` measures **2.0:1**. The `.text-gold-*` ramp is capped at `#9a7b1e` —
the lightest gold still clearing the 3:1 large-text threshold against shell
(3.4:1) — and nothing under 24px is ever gold. Inherited verbatim from
`vitasilk_24k`, whose entire type system is built around this limit.

**2. `palm` is the text accent, and it is what 24k lacks.** `#1f4d3d` measures
**8.9:1** on cream, 8.1:1 on shell, 7.1:1 on sand. Every small accent that the
ivory sibling was forced to render in flat espresso — eyebrows, step numerals,
icon strokes, FAQ toggles, focus rings, carousel dots — is palm green here.
Reaching for gold on small text is always the wrong move; reach for palm.

**3. `sand` is the tightest surface on the palette.** `gold-deep` on `sand`
measures **2.96:1**, failing even the 3:1 large-text floor by a hair. Gold
display type sits on cream or shell **only**, never on a sand chip. `palm` on
sand is 7.1:1 and `husk` is 4.8:1, so both are safe there — gold is not.

On the one full-bleed dark band (`Offer`, `palm-dark`) the polarity inverts and
gold is freed: gold on palm-deep is 5.7:1 and carries text at any size. That is
what the `-on-dark` variants exist for. `frond` `#8fc4a8` is the text-capable
green *there* (6.9:1) and is far too light for cream (1.9:1) — `palm` and
`frond` are mirrors and are never interchangeable.

Note that `BrandStory` is **not** a dark band on this project, unlike on the
dark siblings. It veils only the bottom 3/5 in cream and leaves the photograph
at full brightness above.

### The CTA is two classes, not one

`.cta-primary` is a **palm green fill with cream text**, diverging from all three
siblings, which fill the button with the gold gradient. The reason is contrast,
not taste: on a dark page a gold surface separates from the ground at 8:1, but
on cream it is 2.0:1. The label stays legible either way (bark on gold is 6.5:1)
— what fails is the button's own *edge*, against the 3:1 non-text floor, so the
control stops reading as a control. Palm separates at 5.9:1 and takes cream text
at 5.9:1. Gold is not lost, it is demoted to trim: the hairline ring and the
shimmer sweep.

`.cta-on-dark` is the same button inside the `palm-dark` Offer band, where a
palm fill would drop to **2.6:1** — the identical failure arriving from the
other side. There, gold is the high-contrast option and the siblings' gold
button is correct. **Do not unify these two into one class.**

Both live in `globals.css` rather than inline because there are five call sites
(Hero, Offer, StickyCta, and two in OrderForm), and five copies of a 40-token
class string is precisely how a palette drifts.

## Order intake (Google Sheets)

1. Create a Google Sheet.
2. **Extensions › Apps Script**, paste `apps-script/Code.gs`, run `setupSheet`
   once and approve the permissions.
3. **Deploy › New deployment › Web app**, execute as *Me*, access *Anyone*.
4. Copy the `/exec` URL into `.env.local` as `SHEETS_ENDPOINT`.

Read server-side only — never rename it to `NEXT_PUBLIC_*`, or the write endpoint
ends up in the client bundle where anyone can post to your sheet.

If Sheets fails, the route still appends the lead to `data/orders.jsonl` flagged
`sheetsError: true`, returns 502, and the form surfaces the WhatsApp fallback.
Orders are never silently dropped.

Three things are duplicated by design and must stay in sync: the phone regex
`/^(?:\+212|0)[5-7]\d{8}$/` (client and route), the qty bounds 1–5 (client and
route), and the `HEADERS` order in `Code.gs` against the keys the route sends.

**`total` is not one of them, and this diverges from the three siblings.** They
record `Number(body.total) || 0` — whatever the browser posted. This route
computes `qty * PRICE_DH` and ignores the client's figure entirely. The client
still sends one; it is dropped. The reason is the invariant the rest of the
project is built on: every price derives from `lib/config.ts` and cannot desync.
The order log was the one place it could, because a browser holding a stale
bundle after a price change writes the *old* total into your sheet — and the
value was caller-controlled besides. `qty` is already validated to an integer
1–5 before this point, so it is the same arithmetic the client does, done
somewhere it cannot drift. If you port this back to a sibling, port the
`OrderPayload` type change with it.

The localStorage keys are namespaced per SKU (`vitasilk-coco-lang`,
`vitasilk-coco-offer-deadline`) so the four Vitasilk sites cannot collide if they
ever share a domain.

## Images

**All eight slots hold real photography** (~1.4 MB total), installed 2026-07-28.
`WORKFLOWS.md` carries the brief and the prompt set each was generated from.

Every shot came back with a dark anchor in frame, so the beige-soup failure
described below did not occur. The before/after pair is a true edit pair — same
woman, pose, lighting and palm-frond shadow — so the drag slider reads as a
transformation rather than a jump cut. `studio-front` is correctly dark for the
Offer band.

Every image is a **static import**, so a missing file is a build error rather
than a blank box. `make-placeholders.mjs` never overwrites an existing file, so
it is safe to re-run at any point.

To replace a slot, drop the file into the source folder under the expected slot
name and re-run:

```
node scripts/process-images.mjs           # slots 2–7
node scripts/cutout-hero.mjs <path>       # slot 1, from a raw photo
node scripts/hero-from-cutout.mjs <path>  # slot 1, already background-removed
```

**The extension does not matter.** `process-images.mjs` resolves each slot by
basename against `.png / .jpg / .jpeg / .jfif / .webp`, so a file straight out
of the generator is picked up without renaming — sharp decodes by content.

Two things to know before replacing anything, both explained at length in
`WORKFLOWS.md`:

- **The hero is the hardest cutout in the line.** A white bottle on a pale grey
  ground overlaps the background in luminance and carries no chroma to separate
  on. The shipping hero avoided this by having the background removed externally
  (Magnific) and running `hero-from-cutout.mjs`, which verified the alpha was
  real rather than a flattened preview and used it as-is — `cutout-hero.mjs`
  never ran. Prefer that route. If you must detect locally, the silver base band
  is the first thing to check in `scripts/_cutout-check.png`; it is a mid-grey
  ring on a grey ground and the lowest-contrast boundary in the frame.
- **The failure mode on a cream page is beige soup, not clashing.** Almost
  anything will "match" here, so the rule is that every shot needs a deep
  palm-green or near-black anchor in frame. `studio-front` is the exception in
  the other direction: it sits inside the dark Offer band and must be shot dark.

The hero ships at 419×1250 against a 192 CSS px LCP element, which covers 2×
comfortably. Only worth re-sourcing if you want it crisp at 3×.

Raw originals live in `C:/Users/Brandshift 01/Downloads/vitasilk coconut img/`
under their slot names, not in the repo — `assets/` holds only processed WebP.

### Why images live in `assets/`, not `public/`

They are *statically imported*, which buys two things. Content-hashed URLs, so a
swapped image can never serve stale — a `public/` URL never changes and
`next/image` sends `Cache-Control: max-age=14400`, meaning a replaced file shows
the old version for four hours. And dimensions read off the file itself, so there
are no width/height props to drift. Unimported files are not emitted at all.

`public/` holds only the two logo SVGs, referenced by plain path.

## Before going live

- [x] ~~Replace all eight image slots with real photography~~ — done 2026-07-28
- [ ] Verify `WHATSAPP_NUMBER` in `lib/config.ts`
- [ ] Replace `SITE_URL` — still `localhost:3000`, which breaks the OG tags
- [ ] Set `SHEETS_ENDPOINT` in the deploy environment
- [ ] Confirm `OLD_PRICE_DH` (1700) is the price you want struck through —
      `PRICE_DH` (1499) was specified, the strike-through was carried over from
      the Blue Silk sibling and never confirmed
