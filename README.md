# By David

David Okafor’s portfolio is a static site with independent chapter URLs and paper page turns. The `site` directory is the deployment artifact; Vercel rewrites and the legacy project redirect are configured in `vercel.json`.

## Local preview

From `C:\Users\admin\Documents\Redesign`:

```powershell
python site\serve.py
```

Open `http://127.0.0.1:4174/`.

## Source layout

- `app.js`: chapter routing, history, page-turn animation, project-map paths, and artwork/project-image viewers.
- `content.js`: project records, verified stacks, and chapter content.
- `styles.css`: paper layout, responsive rules, folder interaction, and reduced-motion behavior.
- `assets/`: supplied project screenshots, artwork, portrait stickers, technology icons, Manchester City crest, paper texture, page-capture library, and public CV.

Internal links marked `direct` resolve to the correct forward, backward, open, or close turn. Normal turns use a fixed viewport capture with a travelling fold, paper underside and contact shadow. The fold is painted on an `OffscreenCanvas` worker, with progress based on elapsed `requestAnimationFrame` time. The visible turning surface has the same dimensions for short and long chapters; long pages continue to scroll normally between turns. Reduced motion changes pages directly, and an emergency DOM turn remains available if capture or the worker fails.

Auto Job Serve is the first featured project and is described as a collaborative Bincom internship contribution. Its verified technology list is Next.js, React, Tailwind CSS, Supabase, and Supabase Authentication. The live URL is linked. David supplied authentic landing-page and sign-in screen captures, shown with their proportions intact. The dashboard graphic is illustrative; authentication, matching, and signed-in behavior are not claimed as verified.

ArrayCalc, Reach, and MCC School Portal are text-led repository entries with their GitHub links and known stacks. Their map and case entries contain no project previews. The removed Smart Leads URL redirects to Selected Works. BOI uses demonstration data; AnkaraWears is a sample storefront; Caelum Media’s marketing results are not attributed to this portfolio contribution.

## Verification status

JavaScript syntax checks pass for `app.js`, `content.js`, and `paper-turn-worker.js`; `vercel.json` parses successfully. Edge browser review covered 18 chapter/project routes at 13 viewport sizes from 320 px mobile through 1920 px desktop, plus landscape. The audit found no document overflow, clipped content, or missing local images. Touch emulation checked the design folder, artwork and project screenshot viewers, and their close/return behavior at 320, 390, 768, and 1440 px. Forward/backward chapter turns, keyboard focus, resize during a turn, orientation change, browser Back, reduced motion, and direct route refresh were also checked.

Testing used headless Microsoft Edge on Windows with mobile viewport/touch emulation. No physical iOS or Android browser was available. There is no package manifest, development bundle, or production build step. Vercel serves this directory directly with the rewrites in `vercel.json`; test results and the remaining cold-first-turn frame gap are documented in [the performance report](../recordings/performance-report.md).
