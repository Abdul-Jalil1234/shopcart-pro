#!/usr/bin/env node
/**
 * Seeds your Sanity dataset with demo content for the ShopCart storefront:
 * categories, brands, products, banners, an author, blog categories and blog posts.
 *
 *   pnpm seed              create or update the demo content (safe to re-run)
 *   pnpm seed:reset        delete previously seeded demo content, then seed again
 *   pnpm seed:dry          validate the data and print a summary; no network, no writes
 *
 * Needs, in .env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
 * SANITY_API_TOKEN (a token with Editor/write access to YOUR project).
 *
 * Every seeded document has an _id starting with "seed-", so re-running replaces them
 * in place and --reset only ever deletes those. Your own content is never touched.
 *
 * Images are REAL photographs searched on Pixabay or Unsplash and uploaded into your Sanity
 * dataset (so nothing is hot-linked). Set one of these in .env:
 *
 *   PIXABAY_API_KEY=...        free key: https://pixabay.com/api/docs/
 *   UNSPLASH_ACCESS_KEY=...    free key: https://unsplash.com/developers  (demo apps: 50 req/hour)
 *   PHOTO_PROVIDER=pixabay|unsplash   optional; defaults to Pixabay when both keys are set
 *
 * With no key, generated placeholders (placehold.co) are used so the seed still works.
 * Search results are cached in scripts/.photo-cache.json, so re-runs cost no API calls.
 * Photographer credit is stored on every uploaded asset (source.name / source.url).
 */

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const RESET = args.has("--reset");

// ---------------------------------------------------------------- data

const CATEGORIES = [
  // slug, title, description, "starting from" price, featured on the home page
  ["mobiles", "Mobiles", "Flagship and foldable phones from top makers.", 699, false],
  ["smartphones", "Smartphones", "Everyday smartphones for every budget.", 249, false],
  ["tablets", "Tablets", "Tablets for work, study and play.", 119, true],
  ["television", "Television", "Smart TVs from HD to 4K QLED.", 179, true],
  ["refrigerators", "Refrigerators", "Single, double and french door fridges.", 129, true],
  ["washing-machine", "Washing Machine", "Front load, top load and compact washers.", 189, true],
  ["air-conditioners", "Air Conditioners", "Split, window and portable air conditioners.", 299, true],
  ["kitchen-appliances", "Kitchen Appliances", "Air fryers, kettles, blenders and more.", 22, true],
  ["gadget-accessories", "Gadget Accessories", "Chargers, cables, earbuds and everyday tech.", 9, true],
  ["appliances", "Appliances", "Home appliances that make life easier.", 14, true],
];

const BRANDS = [
  ["hi-tech-limited", "Hi-Tech Limited", "Reliable electronics for every home."],
  ["hp-limited", "HP Limited", "Computing accessories and tablets."],
  ["the-apple-limited", "The Apple Limited", "Premium tablets and devices."],
  ["nova-home", "Nova Home", "Smart, affordable home and kitchen appliances."],
  ["aero-cool", "Aero Cool", "Cooling, laundry and refrigeration specialists."],
  ["pixel-edge", "Pixel Edge", "Phones, wearables and audio."],
];

// name, category, brand, variant, price, discount %, stock, status, featured
const PRODUCTS = [
  // --- variant: gadget
  ["Hi-Tech 5G Smartphone X1", "smartphones", "hi-tech-limited", "gadget", 499, 10, 25, "hot", true],
  ["Hi-Tech Lite Smartphone", "smartphones", "hi-tech-limited", "gadget", 249, 5, 40, "new", false],
  ["Pixel Edge Phone Z", "mobiles", "pixel-edge", "gadget", 699, 12, 15, "sale", true],
  ["Pixel Edge Flip Mini", "mobiles", "pixel-edge", "gadget", 899, 0, 0, "new", false],
  ["Hi-Tech Tab 10", "tablets", "hi-tech-limited", "gadget", 329, 8, 20, "hot", false],
  ["The Apple Limited Slate 11", "tablets", "the-apple-limited", "gadget", 599, 0, 12, "new", true],
  ["HP Limited Kids Tablet 8", "tablets", "hp-limited", "gadget", 119, 15, 30, "sale", false],
  ["Hi-Tech Fast Charger 30W", "gadget-accessories", "hi-tech-limited", "gadget", 24, 0, 120, "hot", false],
  ["USB-C Braided Cable 2m", "gadget-accessories", "pixel-edge", "gadget", 12, 0, 200, undefined, false],
  ["Wireless Earbuds Go", "gadget-accessories", "pixel-edge", "gadget", 45, 20, 60, "sale", true],
  ["Power Bank 10000mAh", "gadget-accessories", "hi-tech-limited", "gadget", 32, 10, 80, "hot", false],
  ["Aluminium Phone Stand", "gadget-accessories", "nova-home", "gadget", 15, 0, 150, undefined, false],
  ["Bluetooth Speaker Mini", "gadget-accessories", "pixel-edge", "gadget", 38, 15, 70, "new", false],
  ["Silent Wireless Mouse", "gadget-accessories", "hp-limited", "gadget", 18, 0, 90, undefined, false],
  ["Mechanical Keyboard TKL", "gadget-accessories", "hp-limited", "gadget", 49, 10, 45, "new", false],
  ["Smart Watch Active", "gadget-accessories", "pixel-edge", "gadget", 89, 25, 35, "sale", true],
  ["Tempered Glass Screen Protector 2-Pack", "gadget-accessories", "nova-home", "gadget", 9, 0, 300, undefined, false],
  // --- variant: appliances
  ["Smart TV 43-inch 4K", "television", "hi-tech-limited", "appliances", 379, 12, 14, "hot", true],
  ["Smart TV 55-inch QLED", "television", "hi-tech-limited", "appliances", 649, 10, 9, "sale", false],
  ["TV 32-inch HD", "television", "nova-home", "appliances", 179, 0, 22, "new", false],
  ["Front Load Washing Machine 8kg", "washing-machine", "nova-home", "appliances", 429, 8, 10, "hot", true],
  ["Top Load Washing Machine 7kg", "washing-machine", "aero-cool", "appliances", 299, 0, 12, undefined, false],
  ["Compact Washing Machine 4kg", "washing-machine", "nova-home", "appliances", 189, 10, 16, "sale", false],
  ["Split Air Conditioner 1.5 Ton Inverter", "air-conditioners", "aero-cool", "appliances", 549, 10, 11, "hot", true],
  ["Window Air Conditioner 1 Ton", "air-conditioners", "aero-cool", "appliances", 349, 5, 13, undefined, false],
  ["Portable Air Conditioner 9000 BTU", "air-conditioners", "aero-cool", "appliances", 299, 0, 8, "new", false],
  ["Air Fryer 4L", "kitchen-appliances", "nova-home", "appliances", 49, 20, 55, "hot", true],
  ["Electric Kettle 1.7L", "kitchen-appliances", "nova-home", "appliances", 28, 0, 100, undefined, false],
  ["Blender 600W", "kitchen-appliances", "nova-home", "appliances", 44, 10, 65, "sale", false],
  ["2-Slice Toaster", "kitchen-appliances", "nova-home", "appliances", 26, 0, 80, "new", false],
  ["Microwave Oven 20L", "kitchen-appliances", "hi-tech-limited", "appliances", 119, 5, 28, undefined, false],
  ["Hand Mixer 5-Speed", "kitchen-appliances", "nova-home", "appliances", 22, 0, 75, undefined, false],
  // --- variant: refrigerators
  ["Double Door Refrigerator 260L", "refrigerators", "aero-cool", "refrigerators", 479, 8, 10, "hot", true],
  ["Single Door Refrigerator 190L", "refrigerators", "aero-cool", "refrigerators", 289, 0, 14, undefined, false],
  ["French Door Refrigerator 500L", "refrigerators", "hi-tech-limited", "refrigerators", 1099, 10, 5, "new", false],
  ["Mini Fridge 45L", "refrigerators", "nova-home", "refrigerators", 129, 15, 30, "sale", true],
  ["Side-by-Side Refrigerator 600L", "refrigerators", "hi-tech-limited", "refrigerators", 1399, 12, 4, "sale", false],
  // --- variant: others
  ["Robot Vacuum Cleaner", "appliances", "pixel-edge", "others", 199, 20, 18, "hot", true],
  ["HEPA Air Purifier", "appliances", "aero-cool", "others", 139, 10, 20, "new", false],
  ["Tower Fan 36-inch", "appliances", "aero-cool", "others", 49, 0, 40, undefined, false],
  ["Steam Iron 2200W", "appliances", "nova-home", "others", 30, 0, 60, undefined, false],
  ["Oil-Filled Radiator Heater", "appliances", "nova-home", "others", 85, 10, 22, "sale", false],
  ["LED Desk Lamp", "appliances", "nova-home", "others", 21, 0, 90, "new", false],
  ["Wi-Fi Smart Plug", "appliances", "pixel-edge", "others", 14, 0, 150, "hot", false],
];

const CATEGORY_BLURB = {
  mobiles: "Fast processor, all-day battery and a sharp display.",
  smartphones: "Great camera, long battery life and a smooth display.",
  tablets: "Bright screen and long battery life for work, study and streaming.",
  television: "Crisp picture, built-in streaming apps and voice control.",
  refrigerators: "Energy-efficient cooling with spacious, adjustable shelves.",
  "washing-machine": "Gentle on fabrics with multiple wash programs and quiet operation.",
  "air-conditioners": "Quick, even cooling with low-noise, energy-saving operation.",
  "kitchen-appliances": "Compact, easy to clean and built for everyday cooking.",
  "gadget-accessories": "Dependable everyday tech with a 12-month warranty.",
  appliances: "Practical, energy-conscious and easy to set up.",
};

// Search terms for photos. Product queries are derived from the product name (brand and size
// words removed) with the category term as a fallback.
const CATEGORY_QUERY = {
  mobiles: "smartphone",
  smartphones: "smartphone mobile phone",
  tablets: "tablet computer",
  television: "smart tv living room",
  refrigerators: "refrigerator kitchen",
  "washing-machine": "washing machine laundry",
  "air-conditioners": "air conditioner",
  "kitchen-appliances": "kitchen appliance",
  "gadget-accessories": "tech gadget accessories",
  appliances: "home appliance",
};
const BRAND_WORDS = /\b(hi-tech|pixel edge|hp limited|the apple limited|nova home|aero cool|limited|lite|x1|z|go|mini|active|tkl)\b/gi;
const productQueries = (name, cat) => {
  const cleaned = name
    .replace(BRAND_WORDS, " ")
    .replace(/\b\d+(\.\d+)?\s?-?(inch|l|kg|w|ton|btu|mah|m|v|\+)?\b/gi, " ")
    .replace(/\b(2-pack|4k|hd|qled|inverter|5-speed|2-slice)\b/gi, " ")
    .replace(/[^a-zA-Z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return [cleaned, CATEGORY_QUERY[cat]].filter(Boolean);
};
const BANNER_QUERY = ["online shopping sale", "shopping bags sale", "package delivery"];
const BLOG_QUERY = {};


const BANNERS = [
  {
    id: "seed-banner-mega-summer-sale",
    title: "Mega Summer Sale",
    description: "Get ready for the season with our biggest discounts yet. Up to 70% off on all major categories.",
    badge: "Items from $9.99",
    discountAmount: 70,
  },
  {
    id: "seed-banner-members-get-more",
    title: "Flash Deals & Rewards",
    description: "Sign up today to unlock early access to our weekend flash sales and earn points on every purchase.",
    badge: "Members Get More",
    discountAmount: 30,
  },
  {
    id: "seed-banner-free-delivery",
    title: "Free Delivery Over $50",
    description: "Fast, tracked shipping on every order above $50.",
    badge: "Minimum $20",
    discountAmount: 20,
  },
];

const AUTHOR = { id: "seed-author-shopcart-team", name: "ShopCart Team", slug: "shopcart-team" };

const BLOG_CATEGORIES = [
  ["buying-guides", "Buying Guides", "Plain-English advice for choosing the right product."],
  ["tips-and-tricks", "Tips & Tricks", "Get more out of the things you already own."],
  ["company-news", "Company News", "Updates from the ShopCart team."],
];

const POSTS = [
  {
    slug: "how-to-choose-the-right-air-conditioner",
    title: "How to Choose the Right Air Conditioner",
    category: "buying-guides",
    published: "2026-09-12T09:00:00Z",
    heading: "Start with the room, not the brand",
    paragraphs: [
      "The most common mistake is buying a unit that is too small or too large for the room. A unit that is too small runs constantly and never reaches the temperature you set. One that is too large cools quickly, switches off, and leaves the room damp.",
      "As a rough guide, small bedrooms are comfortable with around 1 ton of cooling, while larger living rooms and sun-facing rooms usually need 1.5 tons or more. Inverter models cost more up front but use noticeably less electricity over a hot season.",
      "Finally, check how easy it is to clean the filters and whether installation is included. Both affect how well the unit performs in its second and third year.",
    ],
  },
  {
    slug: "washing-machine-guide-front-load-vs-top-load",
    title: "Washing Machine Guide: Front Load vs Top Load",
    category: "buying-guides",
    published: "2026-09-26T09:00:00Z",
    heading: "Which one suits your home?",
    paragraphs: [
      "Front load machines are usually gentler on clothes, use less water and spin faster, which means shorter drying times. They can be stacked or fitted under a counter, but they take longer per cycle.",
      "Top load machines are quicker, easier on the back because you do not need to bend, and let you add forgotten items mid-cycle. They tend to use more water and can be rougher on delicate fabrics.",
      "If you wash large loads often and want the lowest running costs, choose front load. If speed and convenience matter most, top load is hard to beat.",
    ],
  },
  {
    slug: "make-your-gadgets-last-longer",
    title: "5 Simple Ways to Make Your Gadgets Last Longer",
    category: "tips-and-tricks",
    published: "2026-10-03T09:00:00Z",
    heading: "Small habits, big difference",
    paragraphs: [
      "Keep batteries between roughly 20% and 80% when you can, and avoid leaving devices in a hot car or in direct sun. Heat is the biggest enemy of battery life.",
      "Use the charger that came with the device or a certified replacement, protect screens and ports from dust, and install software updates, which often include battery and security fixes.",
      "Clean vents and filters regularly on anything that cools itself, from laptops to air purifiers. A few minutes every month can add years of life.",
    ],
  },
  {
    slug: "smart-kitchen-upgrades-worth-making",
    title: "Smart Kitchen Upgrades Worth Making This Year",
    category: "company-news",
    published: "2026-10-14T09:00:00Z",
    heading: "What our customers buy first",
    paragraphs: [
      "An air fryer is the most popular first upgrade in our kitchen range. It cooks quickly, uses little oil and is easy to clean, which makes it a good everyday tool.",
      "Next come a reliable electric kettle and a compact blender, both of which are inexpensive and get used daily. If space allows, a microwave oven with a grill function covers most of the rest.",
      "Browse the Kitchen Appliances category to see current prices and deals.",
    ],
  },
];

// ---------------------------------------------------------------- helpers

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ref = (id) => ({ _type: "reference", _ref: id });
const slug = (current) => ({ _type: "slug", current });
const ids = {
  category: (s) => `seed-category-${s}`,
  brand: (s) => `seed-brand-${s}`,
  product: (s) => `seed-product-${s}`,
  blogCategory: (s) => `seed-blogcategory-${s}`,
  blog: (s) => `seed-blog-${s}`,
};
const toSlug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const PALETTE = [
  ["0f766e", "ecfeff"],
  ["1d4ed8", "eff6ff"],
  ["b45309", "fffbeb"],
  ["7c3aed", "f5f3ff"],
  ["be123c", "fff1f2"],
  ["15803d", "f0fdf4"],
  ["334155", "f8fafc"],
];
const placeholder = (label, w, h, i = 0) => {
  const [bg, fg] = PALETTE[i % PALETTE.length];
  const text = encodeURIComponent(label).replace(/%20/g, "+");
  return `https://placehold.co/${w}x${h}/${bg}/${fg}/png?text=${text}`;
};

const block = (text, style, key) => ({
  _type: "block",
  _key: key,
  style,
  markDefs: [],
  children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
});

// ---------------------------------------------------------------- validate

function validate() {
  const problems = [];
  const catSlugs = new Set(CATEGORIES.map((c) => c[0]));
  const brandSlugs = new Set(BRANDS.map((b) => b[0]));
  const names = new Set();
  const variants = ["gadget", "appliances", "refrigerators", "others"];
  const statuses = ["new", "hot", "sale", undefined];

  for (const [name, cat, brand, variant, price, discount, stock, status] of PRODUCTS) {
    if (!catSlugs.has(cat)) problems.push(`"${name}": unknown category "${cat}"`);
    if (!brandSlugs.has(brand)) problems.push(`"${name}": unknown brand "${brand}"`);
    if (!variants.includes(variant)) problems.push(`"${name}": bad variant "${variant}"`);
    if (!statuses.includes(status)) problems.push(`"${name}": bad status "${status}"`);
    if (!(price > 0)) problems.push(`"${name}": price must be > 0`);
    if (!(discount >= 0)) problems.push(`"${name}": discount must be >= 0`);
    if (!(stock >= 0)) problems.push(`"${name}": stock must be >= 0`);
    const s = toSlug(name);
    if (names.has(s)) problems.push(`duplicate product slug "${s}"`);
    names.add(s);
  }
  for (const p of POSTS) {
    if (!BLOG_CATEGORIES.some((c) => c[0] === p.category)) {
      problems.push(`post "${p.title}": unknown blog category "${p.category}"`);
    }
  }
  return problems;
}

function summary() {
  const byVariant = {};
  for (const p of PRODUCTS) byVariant[p[3]] = (byVariant[p[3]] || 0) + 1;
  const wheelEligible = PRODUCTS.filter((p) => p[6] > 0 && p[4] <= 50).length;
  return [
    `categories: ${CATEGORIES.length} (${CATEGORIES.filter((c) => c[4]).length} featured)`,
    `brands: ${BRANDS.length}`,
    `products: ${PRODUCTS.length} ${JSON.stringify(byVariant)}`,
    `  in stock and <= $50 (eligible for the Spin & Win wheel): ${wheelEligible}`,
    `banners: ${BANNERS.length}`,
    `author: 1, blog categories: ${BLOG_CATEGORIES.length}, blog posts: ${POSTS.length}`,
  ].join("\n");
}

// ---------------------------------------------------------------- main

const problems = validate();
if (problems.length) {
  console.error("Seed data is invalid:\n- " + problems.join("\n- "));
  process.exit(1);
}

if (DRY) {
  console.log("Dry run: data is valid, nothing was uploaded or written.\n");
  console.log(summary());
  process.exit(0);
}

const need = (key) => {
  const value = process.env[key];
  if (!value) {
    console.error(
      `Missing ${key}. Add it to .env (see .env.example) and run via "pnpm seed" so .env is loaded.`
    );
    process.exit(1);
  }
  return value;
};

const projectId = need("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = need("NEXT_PUBLIC_SANITY_DATASET");
const token = need("SANITY_API_TOKEN");

const { createClient } = await import("@sanity/client");
const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-11-09",
  token,
  useCdn: false,
});

console.log(
  `Seeding project ${client.config().projectId}, dataset "${client.config().dataset}"\n`
);


// ---------------------------------------------------------------- photo search

const PIXABAY_KEY = process.env.PIXABAY_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PROVIDER =
  process.env.PHOTO_PROVIDER === "unsplash" && UNSPLASH_KEY
    ? "unsplash"
    : PIXABAY_KEY
      ? "pixabay"
      : UNSPLASH_KEY
        ? "unsplash"
        : null;

if (PROVIDER) console.log(`Photo source: ${PROVIDER}`);
else console.warn("No PIXABAY_API_KEY or UNSPLASH_ACCESS_KEY set — using placeholder images.\n");

const { readFile, writeFile } = await import("node:fs/promises");
const CACHE_FILE = new URL("./.photo-cache.json", import.meta.url);
let searchCache = {};
try {
  searchCache = JSON.parse(await readFile(CACHE_FILE, "utf8"));
} catch {
  /* first run */
}
const searchJobs = new Map();

async function searchProvider(query) {
  if (PROVIDER === "pixabay") {
    const url =
      `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query.slice(0, 100))}` +
      `&image_type=photo&orientation=horizontal&safesearch=true&order=popular&per_page=30`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Pixabay HTTP ${res.status}`);
    const data = await res.json();
    return (data.hits ?? []).map((h) => ({
      id: `pixabay-${h.id}`,
      url: h.largeImageURL,
      credit: h.user,
      page: h.pageURL,
    }));
  }
  const url =
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}` +
    `&per_page=30&content_filter=high`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } });
  if (!res.ok) throw new Error(`Unsplash HTTP ${res.status}`);
  const data = await res.json();
  return (data.results ?? []).map((r) => ({
    id: `unsplash-${r.id}`,
    url: `${r.urls.raw}&w=1200&q=80&fm=jpg&fit=max`,
    credit: r.user?.name,
    page: `${r.links.html}?utm_source=shopcart_seed&utm_medium=referral`,
    track: r.links.download_location,
  }));
}

async function searchPhotos(query) {
  if (!PROVIDER) return [];
  const key = `${PROVIDER}:${query.toLowerCase()}`;
  if (searchCache[key]) return searchCache[key];
  if (!searchJobs.has(key)) {
    searchJobs.set(
      key,
      (async () => {
        try {
          const results = await searchProvider(query);
          if (results.length) searchCache[key] = results;
          return results;
        } catch (error) {
          console.warn(`  ! photo search failed for "${query}": ${error.message}`);
          return [];
        }
      })()
    );
  }
  return searchJobs.get(key);
}

const usedPhotos = new Set();

/** Returns the next unused photo for the first query that has results. */
async function pickPhoto(queries) {
  for (const query of queries) {
    const results = await searchPhotos(query);
    const hit = results.find((r) => !usedPhotos.has(r.id));
    if (hit) {
      usedPhotos.add(hit.id);
      return hit;
    }
  }
  return null;
}

// Upload images (cached, retried, a few at a time).
const uploads = new Map();
async function uploadImage(url, filename, photo = null) {
  if (uploads.has(url)) return uploads.get(url);
  const job = (async () => {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        const contentType = res.headers.get("content-type")?.split(";")[0] || "image/jpeg";
        const asset = await client.assets.upload("image", buffer, {
          filename,
          contentType,
          ...(photo
            ? {
                source: { id: photo.id, name: `${PROVIDER}${photo.credit ? ` — ${photo.credit}` : ""}`, url: photo.page },
              }
            : {}),
        });
        if (photo?.track) fetch(photo.track, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }).catch(() => {});
        return { _type: "image", asset: ref(asset._id) };
      } catch (error) {
        if (attempt === 3) {
          console.warn(`  ! could not upload ${filename}: ${error.message}`);
          return null;
        }
        await sleep(600 * attempt);
      }
    }
  })();
  uploads.set(url, job);
  return job;
}

/**
 * A real photo for `queries` (tried in order), or a labelled placeholder when no photo
 * provider is configured / nothing was found.
 */
async function photoImage({ queries, filename, label, w, h, i = 0 }) {
  const picked = await pickPhoto(queries);
  if (picked) return uploadImage(picked.url, filename.replace(/\.png$/, ".jpg"), picked);
  return uploadImage(placeholder(label, w, h, i), filename);
}

async function inBatches(items, size, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += size) {
    results.push(...(await Promise.all(items.slice(i, i + size).map(fn))));
  }
  return results;
}

async function commit(label, docs) {
  for (let i = 0; i < docs.length; i += 50) {
    const tx = client.transaction();
    docs.slice(i, i + 50).forEach((doc) => tx.createOrReplace(doc));
    await tx.commit();
  }
  console.log(`  ${label}: ${docs.length}`);
}

if (RESET) {
  const old = await client.fetch(`*[_id match "seed-*"]._id`);
  if (old.length) {
    const tx = client.transaction();
    old.forEach((id) => tx.delete(id));
    try {
      await tx.commit();
      console.log(`Deleted ${old.length} previously seeded documents.\n`);
    } catch (error) {
      console.error(
        "Could not delete old seeded documents (an order may reference a seeded product):",
        error.message
      );
      process.exit(1);
    }
  }
}

console.log("Uploading images...");
const categoryDocs = await inBatches(CATEGORIES, 4, async ([s, title, description, range, featured], i) => ({
  _id: ids.category(s),
  _type: "category",
  title,
  slug: slug(s),
  description,
  range,
  featured,
  image: await photoImage({ queries: [CATEGORY_QUERY[s]], filename: `category-${s}.png`, label: title, w: 600, h: 600, i }),
}));

const brandDocs = await inBatches(BRANDS, 4, async ([s, title, description], i) => ({
  _id: ids.brand(s),
  _type: "brand",
  title,
  slug: slug(s),
  description,
  image: await uploadImage(placeholder(title, 400, 400, i + 3), `brand-${s}.png`), // brands are fictional: logo-style placeholders on purpose
}));

const authorDoc = {
  _id: AUTHOR.id,
  _type: "author",
  name: AUTHOR.name,
  slug: slug(AUTHOR.slug),
  image: await uploadImage(placeholder("ShopCart", 300, 300, 0), "author-shopcart.png"),
};

const blogCategoryDocs = BLOG_CATEGORIES.map(([s, title, description]) => ({
  _id: ids.blogCategory(s),
  _type: "blogcategory",
  title,
  slug: slug(s),
  description,
}));

// Referenced documents must exist before the documents that point at them.
console.log("\nWriting documents...");
await commit("categories", categoryDocs);
await commit("brands", brandDocs);
await commit("authors", [authorDoc]);
await commit("blog categories", blogCategoryDocs);

const productDocs = await inBatches(PRODUCTS, 5, async (row, index) => {
  const [name, cat, brand, variant, price, discount, stock, status, featured] = row;
  const s = toSlug(name);
  const queries = productQueries(name, cat);
  const front = await photoImage({ queries, filename: `${s}-1.png`, label: name, w: 800, h: 800, i: index });
  const back = await photoImage({ queries, filename: `${s}-2.png`, label: `${name} (side)`, w: 800, h: 800, i: index + 2 });
  return {
    _id: ids.product(s),
    _type: "product",
    name,
    slug: slug(s),
    images: [front, back]
      .filter(Boolean)
      .map((image, i) => ({ ...image, _key: `${s}-img-${i}` })),
    description: `${name}. ${CATEGORY_BLURB[cat]}`,
    price,
    discount,
    categories: [{ ...ref(ids.category(cat)), _key: `${s}-cat` }],
    stock,
    brand: ref(ids.brand(brand)),
    ...(status ? { status } : {}),
    variant,
    isFeatured: featured,
    totalReviews: 0,
  };
});
await commit("products", productDocs);

const bannerDocs = await inBatches(BANNERS, 3, async (b, i) => ({
  _id: b.id,
  _type: "banner",
  title: b.title,
  description: b.description,
  badge: b.badge,
  discountAmount: b.discountAmount,
  image: await photoImage({ queries: [BANNER_QUERY[i % BANNER_QUERY.length], "ecommerce shopping"], filename: `${b.id}.png`, label: b.title, w: 1200, h: 600, i: i + 1 }),
}));
await commit("banners", bannerDocs);

const postDocs = await inBatches(POSTS, 4, async (post, i) => ({
  _id: ids.blog(post.slug),
  _type: "blog",
  title: post.title,
  slug: slug(post.slug),
  author: ref(AUTHOR.id),
  mainImage: await photoImage({ queries: [post.photoQuery ?? "technology gadgets", "technology"], filename: `blog-${post.slug}.png`, label: post.title, w: 1200, h: 600, i: i + 2 }),
  blogcategories: [{ ...ref(ids.blogCategory(post.category)), _key: `${post.slug}-cat` }],
  publishedAt: post.published,
  isLatest: true,
  body: [
    block(post.heading, "h2", `${post.slug}-h`),
    ...post.paragraphs.map((text, n) => block(text, "normal", `${post.slug}-p${n}`)),
  ],
}));
await commit("blog posts", postDocs);

const failed = [...uploads.values()].length - (await Promise.all(uploads.values())).filter(Boolean).length;
console.log(
  `\nDone.${failed ? ` ${failed} image(s) failed to upload; re-run "pnpm seed" to retry them.` : ""}`
);
await writeFile(CACHE_FILE, JSON.stringify(searchCache, null, 1)).catch(() => {});
if (!PROVIDER) console.log("Add PIXABAY_API_KEY or UNSPLASH_ACCESS_KEY to .env and run `pnpm seed:reset` for real photos.");
console.log(summary());
