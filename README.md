# Move You Movers — Website

SvelteKit + Cloudflare Pages. Local moving company site for Move You Movers, Fairfield OH.

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Deployment (Cloudflare Pages)

### 1. Install Wrangler
```bash
npm install -g wrangler
wrangler login
```

### 2. Set up email (Resend)
1. Create a free account at https://resend.com
2. Verify your sending domain (or use their sandbox for testing)
3. Get your API key
4. Add it to Cloudflare Pages environment variables:
   - Dashboard → Pages → move-you-movers → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `re_xxxxxxxxxxxx`
5. Update the `from` address in `src/routes/api/quote/+server.js`

### 3. Deploy
```bash
npm run deploy
```

Or connect your GitHub repo to Cloudflare Pages for automatic deploys on push.

### 4. Set up subdomain
In Cloudflare DNS:
- Add a CNAME record pointing your subdomain to your Pages project URL
- Cloudflare handles SSL automatically

---

## Adding Photos

Drop photos into `static/images/`:
- `static/images/crew.jpg` — hero section (shown on desktop)
- `static/images/team.jpg` — about section

Recommended: real photos of the crew and truck. Minimum 1200px wide, JPEG compressed.

---

## Customization

All brand colors are in `src/app.css` under `:root`. Key variables:
- `--color-primary` — deep forest green (#1a3320)
- `--color-accent` — warm amber (#c8873a)

Reviews are hardcoded in `+page.svelte` — update with real quotes when available.

---

## Project Structure

```
src/
  app.html          — HTML shell, fonts
  app.css           — Global styles, CSS variables
  routes/
    +layout.svelte  — SEO meta, schema.org markup
    +page.svelte    — Full homepage
    api/
      quote/
        +server.js  — Form submission → email via Resend
static/
  favicon.svg
  images/           — Drop crew/team photos here
wrangler.toml       — Cloudflare config
```
