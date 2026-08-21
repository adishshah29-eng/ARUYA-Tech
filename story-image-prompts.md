# Story image prompts v2 — locked camera, one desk, new palette

**What changed from v1**: the previous set used a consistent desk for beats
1–4 but then cut to a totally different wide office for beats 5–6. That
breaks the "locked camera" feel and also crops badly on mobile (a wide
establishing shot loses all its meaning cropped to a phone-width strip).

**This version never moves the camera and never leaves the desk.** Scale
is shown by *more monitors appearing on the same desk over the sequence*
— 1 laptop → 2 screens → 3 screens, same framing throughout, like a
time-lapse of the same tripod-mounted shot. This also fixes the mobile
crop problem: no wide shot to lose.

## Shared setup — paste this before EVERY prompt, unchanged, word for word

> Camera fixed and unmoving across the whole sequence: eye-level, straight
> on, same 35mm-equivalent framing, same crop, same distance from the desk
> — like a single tripod-mounted camera shooting a time-lapse, nothing
> about the camera position ever changes. A wooden desk in front of a
> large window on the left letting in warm natural light, a small stack
> of books and two potted plants on the windowsill, a corkboard with
> papers pinned to it on the wall behind and to the right of the desk, a
> ceramic coffee mug near the left edge of the desk. No people, no hands,
> no faces, photorealistic, 35mm film photography look.

## Palette — paste this into every prompt too

> Every screen, UI mockup, and glowing element uses this exact palette:
> near-black backgrounds (#140f0b), a vivid orange-red accent (#e2551c),
> soft coral highlights (#f3946a), warm gold accents (#d9a53f), a deep
> teal counterpoint used sparingly (#1f6f62), and cream/off-white text
> (#faf3ea). No blue anywhere, no green except the specified teal, no
> purple.

---

**1. Discover — The Mess**
> [shared setup] + [palette]. Only one laptop on the desk, no external
> monitor yet. The laptop screen shows a cluttered spreadsheet with
> messy color-coded cells in the specified orange/gold tones on a cream
> background. The desk is covered in loose papers, sticky notes, a
> notebook, a calculator. Soft early-morning light.

**2. Build — Designing the System**
> [shared setup, but a second monitor now sits beside the laptop —
> everything else about the desk and camera identical to image 1] +
> [palette]. The laptop screen now shows a clean wireframe/UI mockup:
> near-black background, vivid orange accents, cream text blocks. The
> second monitor shows a code editor with syntax highlighting in the
> orange/gold/teal palette. Papers now organized into a small stack.
> Light slightly brighter and warmer than image 1.

**3. Automate — Connecting the Workflow**
> [shared setup, same desk and same two monitors as image 2, camera
> unchanged] + [palette]. The second monitor now shows a workflow/
> automation diagram — connected nodes and arrows glowing in vivid
> orange, with one or two teal accent nodes for contrast, on a near-
> black background. Cables on the desk now visibly tidied. Same warm
> light, slightly more golden.

**4. Automate — Running Live**
> [shared setup, same desk and same two monitors, camera unchanged] +
> [palette]. The workflow diagram on the second monitor is now lit up
> and active. The laptop screen now shows a live dashboard with bar and
> line charts in orange, gold and teal on a near-black background.
> Golden-hour light now streaming more directly through the window.

**5. Scale — More Systems**
> [shared setup, same desk, but a THIRD monitor now appears beside the
> other two — camera and crop still completely unchanged] + [palette].
> The third monitor shows a second dashboard with more charts and data
> in the same palette. The original two screens still show the workflow
> diagram and live dashboard. Papers now reduced to one tidy stack. Same
> warm golden light.

**6. Scale — At Full Capacity**
> [shared setup, same desk, same camera, all three monitors from image 5
> now fully lit and glowing] + [palette]. All three screens together
> show a rich, cohesive set of dashboards, a storefront mockup, and the
> workflow diagram, fully in the specified palette with cream highlight
> text. Warm late-afternoon golden light fully filling the room, coffee
> mug still in its same spot. A sense of a mature system running — but
> still unmistakably the same desk and camera angle as image 1.

---

## Generating

Do all 6 in the same ChatGPT session, in order, and reference the
previous image each time ("same desk, same camera angle, same crop as
the last image — only add the described change"). If one drifts, redo it
referencing the one before it specifically.

## After generating

Save as:
- `public/story/1-discover-mess.jpg`
- `public/story/2-build-design.jpg`
- `public/story/3-automate-connect.jpg`
- `public/story/4-automate-run.jpg`
- `public/story/5-scale-expand.jpg`
- `public/story/6-scale-thrive.jpg`

Same filenames as before — dropping these in overwrites the current set,
no code changes needed.
