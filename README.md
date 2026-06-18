# Nataly Andruson — Architecture & Interiors

## Deploy to Vercel
1. Push to GitHub
2. Connect repo on vercel.com
3. Deploy (no config needed — static site)

## Deploy to Netlify
1. Drag & drop the `nataly-site` folder to netlify.com/drop
   OR
2. Push to GitHub → connect on netlify.com

## File structure
nataly-site/
├── index.html       ← entire site (single file)
├── images/          ← all project photos
│   ├── p1_new01.jpg .. p1_new09.jpg  (Project 1 — Master Suite)
│   ├── p2_new01.jpg .. p2_new08.jpg  (Project 2 — Private Residence)
│   ├── p3_01.jpg .. p3_11.jpg        (Project 3 — From Dream to Reality)
│   ├── p4_new01.jpg .. p4_new05.jpg  (Project 4 — Kitchen & Dining)
│   ├── p5_new01.jpg .. p5_new04.jpg  (Project 5 — Villa Exterior)
│   ├── p6_01.jpg .. p6_11.jpg        (Project 6 — Munters Office)
│   ├── nataly_01..03.jpg             (Portrait photos)
│   └── logo_naan.png                 (Studio logo)
└── README.md

## Contact form — ACTION REQUIRED before deploy
The form submits to Formspree. Replace YOUR_FORM_ID:
1. Sign up free at formspree.io
2. Create a new form → copy the Form ID
3. In index.html, search for: YOUR_FORM_ID
4. Replace with your actual ID (e.g. xpzgkwqr)
Until replaced, the form falls back to mailto: automatically.

## WhatsApp direct link
Pre-filled message: "Hi Nataly, I'd love to discuss a project with you."
Number: +972-54-431-4285

## Adding more projects
Open index.html, find the PROJECTS array in the <script> section,
and add a new object following the same pattern.

## Changelog (v18)
Round 1 — Critical fixes:
- Removed unused Raleway font (faster load)
- Fixed hero title line-height (was clipping letters)
- Removed dated gold hero-bar stripe
- All font sizes raised to 10px minimum
- why-grid: 4-col → 2×2 tablet → 1-col mobile
- Project 2 cover image corrected (p2_new06)
- Contact form: Formspree + loading state + success message
- WhatsApp added as direct contact channel

Round 2 — Marketing & copy:
- Hero tagline: "Where architecture meets the art of living"
- Stats bar redesigned (no more plain-text "Arch. Engineer")
- CTA copy upgraded: "Start your project" / "Request a consultation"
- Why card 02: "15+ Years" duplicate → "Engineer's Precision"
- About body: geographies added (Israel, Cyprus, Europe)
- Milan Design Week mentioned in My Approach text
- New Services section (Architecture / Interior / Project Management)
- Meta description & OG tags upgraded

Round 3 — Security & performance:
- CSP, Referrer-Policy, X-Content-Type-Options, Permissions-Policy meta tags
- frame-ancestors: none (clickjacking protection)
- preconnect to fonts.gstatic.com
- decoding="async" on all lazy images
- contain:layout on project cards
- passive scroll/touch listeners
- prefers-reduced-motion support (marquee + transitions)
- Touch swipe on hero slider (mobile)
- Logo img width/height attributes (CLS prevention)

## Changelog (v18)
Round 3 — Content, social proof & conversion:
- Nav renamed: Portfolio→Projects, About→Studio (more boutique)
- Nav: "Book a Call" CTA button (WhatsApp direct)
- Hero: "Based in Israel · Working Internationally" badge
- Stats: added 100+ Projects completed
- Featured Project / Case Study block (From Dream to Reality)
- Social proof badges strip: 15yrs / 100+ / geographies / Milan DW
- Testimonials: replaced marquee with 3 full quote cards (placeholder)
- Our Process: 6-step section (Discovery→Handover)
- Rich footer: 4-column layout with Studio / Location / Contact / Instagram
- Contact form CTA: "Send your enquiry"
- All new sections: mobile-responsive breakpoints
