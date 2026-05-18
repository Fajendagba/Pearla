# Pearla — Next.js

West African recipe site converted from static HTML to Next.js 15 App Router. All pages are statically pre-rendered at build time.

---

## Tech Stack

- **Next.js 15** — App Router, `generateStaticParams` for recipe pages
- **React 19** — server components by default, client components only where state is needed
- **CSS** — global stylesheet with custom properties, no Tailwind or CSS-in-JS
- **next/font** — Playfair Display + Lato loaded without render blocking

---

## Requirements

- Node.js 18+

---

## Setup

```bash
git clone https://github.com/Fajendagba/Pearla
cd "pearla - nextjs"
npm install
npm run dev
```

App runs on `http://localhost:3000`.

---

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
```

---

## Routes

| Route | Page |
|-------|------|
| `/` | Home — hero, featured recipes, filter tabs |
| `/recipes` | All recipes with category filter |
| `/about` | Story, regions, values |
| `/recipes/[slug]` | Recipe detail — ingredients, steps, tips |

Recipe slugs: `jollof-rice`, `egusi-soup`, `suya`, `pounded-yam`, `akara`, `dodo`

---

## Structure

```
pearla - nextjs/
├── app/
│   ├── layout.js
│   ├── globals.css
│   ├── page.js
│   ├── about/page.js
│   └── recipes/
│       ├── page.js
│       └── [slug]/page.js
├── components/
│   ├── Navbar.jsx      (client)
│   ├── Footer.jsx
│   ├── RecipeCard.jsx
│   └── FilterTabs.jsx  (client)
└── data/
    └── recipes.js
```
