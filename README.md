# Nataly Andruson - Website

Static multi-page site for **https://natalyandruson.com** (GitHub repo
`cindy12anderson-ui/natalyandruson`, deployed automatically by Vercel on every push).

## Pages and URLs (round 3: technical SEO)
| URL | File |
|---|---|
| `/` | `index.html` |
| `/projects/<project>` (10 pages) | `projects/<project>.html` |
| `/studio` | `studio.html` |
| `/contact` | `contact.html` |
| `/legal` (+ `#legal-privacy`, `#legal-terms`, `#legal-accessibility`) | `legal.html` |
| custom 404 | `404.html` |

`/projects` redirects to the first project. `vercel.json` sets `cleanUrls` (no
`.html` in addresses), removes trailing slashes, and permanently redirects
`natalyandruson.vercel.app` to `natalyandruson.com`. Old links with `#/` (for
example `/#/projects/bronze`) are forwarded to the new address by `app-init.js`.

## What was added for search engines
- Every page is full HTML that works without JavaScript; a unique title,
  meta description, canonical URL and social preview (Open Graph) per page.
- One `h1` per page (on project pages, the project name).
- Structured data (JSON-LD): the studio (ProfessionalService), Nataly
  (Person, "Interior Designer and Architectural Practical Engineer" - never
  "architect"), each project (CreativeWork with city), breadcrumbs.
- Descriptive alt text on every project photo.
- `sitemap.xml` (14 pages + all project images) and `robots.txt` (search
  engines and AI assistants allowed).
- Per-project preview images in `images/og/` for WhatsApp and social shares.

## Google Search Console (do once, after this version is live)
1. Go to https://search.google.com/search-console and choose **Add property**
   > **Domain** > `natalyandruson.com`.
2. Google shows a **TXT record**. In Vercel: Team > Domains >
   natalyandruson.com > DNS Records > Add: type `TXT`, name `@`, value = the
   code from Google. Wait a few minutes, then click **Verify** in Google.
3. In Search Console > **Sitemaps**, submit `sitemap.xml`.
4. Use **URL Inspection** on the homepage and a project page and click
   **Request indexing**.

## Still to review (outside the code)
1. Lawyer and certified accessibility consultant review of the Legal page.
2. Written client consent for published homes; permission from Munters for its
   logo; licences for any photos or visualisations made by third parties.
3. "The Bronze House" shows "Status: In Progress" - remove when complete.
4. Consider making the GitHub repo Private (Vercel keeps deploying).
5. Off-site: Google Business Profile, Houzz, LinkedIn, Pinterest, and real
   Google reviews from clients - these drive local rankings more than code.

## Editing later
Pages are generated from one template, so a text change that appears on every
page (nav, footer) must be made in every HTML file. For larger edits, ask for
a rebuild rather than editing the files by hand.

## Projects (10), in tab order
| # | Project | Location | Photos | URL |
|---|---|---|---|---|
| 1 | The Linear Apartment | Herzliya | 7 | `/projects/the-linear-apartment` |
| 2 | The Bronze House (in progress) | Herzliya | 11 | `/projects/the-bronze-house` |
| 3 | The Courtyard Villa | Herzliya | 10 | `/projects/the-courtyard-villa` |
| 4 | The Sage House | Herzliya | 11 | `/projects/the-sage-house` |
| 5 | The Levanto House | Ra'anana | 11 | `/projects/the-levanto-house` |
| 6 | Munters Office | Petah Tikva | 11 | `/projects/munters-office` |
| 7 | The Ember Loft | Tel Aviv | 11 | `/projects/the-ember-loft` |
| 8 | The Noir Apartment | Azur | 13 | `/projects/the-noir-apartment` |
| 9 | The Travertine Apartment | Herzliya | 8 | `/projects/the-travertine-apartment` |
| 10 | The Graphite Apartment | Tel Aviv | 9 | `/projects/the-graphite-apartment` |

A separate project (travertine-and-dark-wood house with a suspended fireplace)
is still held back until its content and photos are finalised.

## Latest round (October 2026, round 2)
- Tighter spacing on Studio and Projects (less dead white space).
- "Start a Project" is a gold-on-hover button again and opens an email to
  Nataly with the subject "New Project Enquiry". It also copies the address
  and shows a short message, so it still works on computers without a mail
  app. Also added to the mobile menu.
- Project titles capped at 48px.
- Munters Office tile on the homepage refocused on the blue glass office.
- Custom circle cursor removed (native cursor, as on the reference studios).
- Terms of Use expanded: "as is" / no professional advice, no warranty and
  limitation of liability, third-party links, trademarks in images, Israeli
  law and Tel Aviv-Jaffa courts.
- Studio page: a row of practice areas under the banner, then About, then the
  Approach section on a warm sand band (#EFE9DF) before the closing call to action.
- Contact page: split layout - the photograph in full on one side, contact
  details on ivory on the other (stacked on mobile).
- Canonical / Open Graph URL updated to natalyandruson.vercel.app.

## Previous round
**Content**
- Homepage credentials strip (15+ years, etc.) removed.
- Studio page: "Why Clients Choose" and "The Design Process" removed, replaced
  by a quiet three-step "Approach" section (Understanding, Design, Realisation).
- New project: The Bronze House (Interior Design, Herzliya, In Progress).
- Facebook added to the footer and the Contact page.
- Contact: the phone card is now labelled "WhatsApp" (it opens WhatsApp).
- British spelling throughout (realisation, specialising, colour, centre).

**Design**
- Unified type scale; project titles enlarged (36-56px); no text below 11px.
- Nav "Start a Project" is now a refined text link that opens the Contact page
  (more reliable than `mailto:`, which does nothing without a mail app).
- Studio banner rules lengthened (72px desktop / 44px mobile), optically symmetric.
- Footer: logo now sits beside a two-line lockup (name + tagline).
- Project tabs wrap as two balanced rows on desktop.

**Accessibility (IS 5568 / WCAG AA)**
- Small gold text darkened to `#7A5E2C` (5.5:1 contrast).
- Visible keyboard focus everywhere; homepage project tiles are real links.
- Gallery images are buttons; lightbox traps focus, returns it on close,
  supports Escape, arrow keys and swipe.
- Pause/Play control for the hero slideshow; reduced-motion respected.
- Proper heading structure (one `h1` per page), labelled controls,
  external links announce "opens in a new window".
- Text-size buttons now scale all text (sizes are in rem); real high-contrast
  mode (no CSS filter, which had broken the fixed nav).
- Accessibility statement lists features, known limitations and a contact email.

**Performance, mobile and security**
- All photos converted to WebP at 800 / 1600 / up to 2400px with `srcset`:
  phones download roughly 4-5MB of images in total instead of 33MB.
- Fonts self-hosted (`/fonts`, SIL Open Font License) - faster, and no visitor
  data sent to Google.
- Each page and project has its own URL; the phone's Back button works and
  project links can be shared directly.
- Open Graph image and text for WhatsApp / social previews (`images/og-image.jpg`).
- All JavaScript moved to `app.js` (no inline handlers), enabling a strict CSP.
- Tested at 1440 / 768 / 390 / 320px: zero layout overflow, zero console
  errors, zero failed requests, with the CSP active.

## Structure
```
index.html, studio.html, contact.html, legal.html, 404.html, projects/*.html
app-init.js  - runs first: enables animations, forwards old #/ links
app.js       - menus, accessibility settings, lightbox, hero, Start a Project
fonts/       - Cormorant Garamond + Inter (woff2) and their licences
images/      - name-800.webp / name-1600.webp / name-2400.webp per photo,
               logo PNGs, og-image.jpg, og/<project>.jpg
sitemap.xml, robots.txt
vercel.json  - security and cache headers
```

## Adding a photo later
Export three WebP sizes (800, 1600 and full width up to 2400) named
`name-800.webp`, `name-1600.webp`, `name-2400.webp`, then copy an existing
`<button class="img-btn">` block in the project's gallery and update the
file names, `data-index` (next number) and the descriptive text.

## Notes
- All copy is in third person (the studio's voice).
- Regular hyphens (-) only, never em/en dashes.
- Professional title: "Architectural Practical Engineer" (not "Architectural
  Engineer", which is a different regulated title).
