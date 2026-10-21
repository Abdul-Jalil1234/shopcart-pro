# ShopCart + Spin & Win — setup

This is the `shopcartpro-yt` storefront (Next.js 16, Sanity, Clerk, Stripe) with a
**Spin & Win wheel** ported from `Temu-clone-uprgrade` and rebuilt for this stack.
It has NOT been built or run yet — install and build it on your machine first.

## 1. Accounts and keys
Copy `.env.example` to `.env` and fill it in with **your own** accounts:
- Sanity project + dataset + API tokens (products, categories, brands, blog, orders)
- Clerk publishable + secret keys (sign-in, protected cart/checkout)
- Stripe secret key + webhook secret (card payments)
- `WHEEL_SECRET` — any long random string: `openssl rand -hex 32`
- `WHEEL_MAX_PRIZE_PRICE` (optional) — most expensive product the wheel may give away (default 50)

Note: the original starter committed a real `.env`. Don't reuse its keys, and `.env` is now in `.gitignore`.

## 2. Run
```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # run this once to catch type errors
```
## 2b. Demo content (seed)
The storefront shows "No products found" until your Sanity dataset has content. To load demo
content (10 categories, 6 brands, 44 products, 3 banners, 4 blog posts):
```bash
pnpm seed:dry     # optional: validate the data, no network
pnpm seed         # create/update demo content (safe to re-run)
pnpm seed:reset   # delete previously seeded content, then seed again
```
It needs `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `SANITY_API_TOKEN`
(an Editor token for YOUR project) in `.env`. Seeded documents have ids starting with `seed-`,
so your own content is never touched. Images are generated placeholders: replace them with real
photos in Sanity Studio at `/studio`. Eighteen seeded products are in stock and under $50, so
the Spin & Win wheel has prizes straight away.

## 3. Spin & Win
See `docs/SPIN_WHEEL.md`.
