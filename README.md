# Nataly Andruson - Website

Single-page site (`index.html` + `app.js`) with self-hosted fonts and responsive WebP images.

## Deploy
Drag-and-drop this folder onto Vercel, or run any static file server.
`vercel.json` sets the security headers (Content-Security-Policy, HSTS,
X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy,
Cross-Origin-Opener-Policy) and cache headers for fonts and images.
Netlify users should convert it to a `_headers` file with the same values.

To update the existing Vercel deployment, copy these files into the local
folder that already has the hidden `.vercel` folder, then run:
```
npx vercel --prod --yes
```

## Before going live - please review
1. **Legal page**: Business details, Privacy Policy, Terms, Client Agreement
   and Accessibility Statement were rewritten in October 2026. Have a lawyer
   and a certified service-accessibility consultant review before publishing.
   Confirm the registration line (Practical Engineers and Technicians Law,
   5773-2012) matches Nataly's actual registration.
2. **Domain**: the live site is `https://natalyandruson.vercel.app/` (GitHub repo
   `cindy12anderson-ui/natalyandruson`, auto-deployed by Vercel on every push).
   The Open Graph tags and canonical link use that URL. If a custom domain is
   connected later, replace it in the `<head>`.
3. **The Bronze House** is marked "Status: In Progress". Remove that spec row
   once the project is complete.
4. **Project "Area (sqm)"**: not included - no figures were provided.
5. **Instagram handle** `@nataly_andruson_architecture`: confirm it is current.
6. **Rights and consents** (cannot be solved in code - this is the real legal
   exposure): written consent from each client whose home is shown; permission
   from Munters to show its logo in the office photos; a licence from any
   photographer or visualisation studio that produced the images.
7. **Studio name**: the protected title "architect" is never used on the site,
   but confirm with a lawyer that "Architecture" in the studio name is fine.
8. **GitHub**: consider making the repo Private (Settings > General > Danger
   Zone > Change visibility). Vercel keeps deploying from a private repo.

## Projects (10), in tab order
| # | Project | Location | Photos | URL |
|---|---|---|---|---|
| 1 | The Linear Apartment | Herzliya | 7 | `#/projects/linear` |
| 2 | The Bronze House (in progress) | Herzliya | 11 | `#/projects/bronze` |
| 3 | The Courtyard Villa | Herzliya | 10 | `#/projects/courtyard` |
| 4 | The Sage House | Herzliya | 11 | `#/projects/sage` |
| 5 | The Levanto House | Ra'anana | 11 | `#/projects/levanto` |
| 6 | Munters Office | Petah Tikva | 11 | `#/projects/munters` |
| 7 | The Ember Loft | Tel Aviv | 11 | `#/projects/ember` |
| 8 | The Noir Apartment | Azur | 13 | `#/projects/noir` |
| 9 | The Travertine Apartment | Herzliya | 8 | `#/projects/travertine` |
| 10 | The Graphite Apartment | Tel Aviv | 9 | `#/projects/graphite` |

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
index.html   - all 5 "pages" (Home, Projects, Studio, Contact, Legal)
app.js       - routing, menus, accessibility settings, lightbox, hero
fonts/       - Cormorant Garamond + Inter (woff2) and their licences
images/      - name-800.webp / name-1600.webp / name-2400.webp per photo,
               logo PNGs, og-image.jpg
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
