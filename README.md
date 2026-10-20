# Nataly Andruson - Website

Static multi-page site for **https://natalyandruson.com**.
GitHub repo `cindy12anderson-ui/natalyandruson`; Vercel deploys automatically on every push to `main`.

## Pages and URLs
| URL | File |
|---|---|
| `/` | `index.html` |
| `/projects/<project>` (10 pages) | `projects/<project>.html` |
| `/studio` | `studio.html` |
| `/contact` | `contact.html` |
| `/legal` (+ `#legal-privacy`, `#legal-terms`, `#legal-accessibility`) | `legal.html` |
| custom 404 | `404.html` |

`/projects` redirects to the first project. `vercel.json` sets `cleanUrls` (no `.html` in
addresses), removes trailing slashes, redirects `natalyandruson.vercel.app` to
`natalyandruson.com`, and sets the security headers (CSP, HSTS, X-Content-Type-Options,
X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP) and cache headers.
Old links with `#/` (for example `/#/projects/bronze`) are forwarded by `app-init.js`.

## Projects (10), in tab order
| # | Project | Location | URL |
|---|---|---|---|
| 1 | The Linear Apartment | Herzliya | `/projects/the-linear-apartment` |
| 2 | The Bronze House (in progress) | Herzliya | `/projects/the-bronze-house` |
| 3 | The Courtyard Villa | Herzliya | `/projects/the-courtyard-villa` |
| 4 | The Sage House | Herzliya | `/projects/the-sage-house` |
| 5 | The Levanto House | Ra'anana | `/projects/the-levanto-house` |
| 6 | Munters Office | Petah Tikva | `/projects/munters-office` |
| 7 | The Ember Loft | Tel Aviv | `/projects/the-ember-loft` |
| 8 | The Noir Apartment | Azur | `/projects/the-noir-apartment` |
| 9 | The Travertine Apartment | Herzliya | `/projects/the-travertine-apartment` |
| 10 | The Graphite Apartment | Tel Aviv | `/projects/the-graphite-apartment` |

## Search engines
- Every page is complete HTML (works without JavaScript) with a unique title, meta
  description, canonical URL and Open Graph preview (per-project images in `images/og/`).
- One `h1` per page; structured data (JSON-LD) for the studio, Nataly (Person, "Interior
  Designer and Architectural Practical Engineer" - never "architect"), each project
  (CreativeWork with city) and breadcrumbs.
- Descriptive alt text on every project photo.
- `sitemap.xml` (14 pages + project images) and `robots.txt` (search engines and AI
  assistants allowed).
- Google Search Console: Domain property verified by DNS TXT in Vercel; sitemap submitted.

## Final check (October 2026)
- Privacy Policy matches the site: no cookies or local storage, no analytics, hosting by
  Vercel, how enquiries are used and kept, rights under Israeli law and the GDPR.
- Automated WCAG 2.1 AA audit (axe-core) on every page: 0 violations.
- Tabnav scan fixes: page landmarks (header = banner, footer = contentinfo, outside main),
  accessibility-button icon marked decorative, and "(opens in a new window)" text for
  screen readers on every external link.
- Lighthouse (mobile, local server without compression): Accessibility 100, Best
  Practices 100, SEO 100, Performance 91-93 (Vercel adds compression, so higher live).
- Verified: no cookies set, no broken internal links or missing files, no layout overflow
  at 1440 / 768 / 390 / 320px, no console errors under the CSP.

## Identity (October 2026 update)
- Titles, descriptions and structured data now lead with "Architecture & Interior
  Design" and "Architectural Practical Engineer and Interior Designer", Israeli-qualified.
- LinkedIn profile added to the structured data (sameAs). Its address contains the word
  "architect" - recommended to change it in LinkedIn (protected title in Israel) and
  then update the URL in `build` / every page's JSON-LD.

## Still to review (outside the code)
1. Lawyer and certified service-accessibility consultant review of the Legal page.
   Confirm the registration line (Practical Engineers and Technicians Law, 5773-2012).
2. Written client consent for published homes; permission from Munters for its logo;
   licences for photos or visualisations made by third parties.
3. "The Bronze House" shows "Status: In Progress" - remove when complete.
4. Consider making the GitHub repo Private (Vercel keeps deploying).
5. Off-site: Google Business Profile, Houzz, LinkedIn, Pinterest, real Google reviews.
6. If analytics (e.g. Google Analytics) is ever added, a cookie consent banner and a
   Privacy Policy update are required first.

## Structure
```
index.html, studio.html, contact.html, legal.html, 404.html, projects/*.html
app-init.js  - runs first: enables animations, forwards old #/ links
app.js       - menus, accessibility settings, lightbox, hero, Start a Project
fonts/       - Cormorant Garamond + Inter (woff2) and their licences
images/      - name-800/1600/2400.webp per photo, logos, og-image.jpg, og/<project>.jpg
sitemap.xml, robots.txt, vercel.json
```

## Notes
- All copy is in British English, third person (the studio's voice), regular hyphens only.
- Pages share one template: nav and footer changes must be made in every HTML file,
  so ask for a rebuild for larger edits.
