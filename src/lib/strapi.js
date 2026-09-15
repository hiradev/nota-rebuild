const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const DEFAULT_REVALIDATE = 60;

// Strapi reads nested populate/filters via bracket-notation query params
// (the `qs` shape) — hand-rolled here since shapes are fixed and known ahead.
function toQueryString(params, prefix) {
  const pairs = [];
  for (const key of Object.keys(params)) {
    const value = params[key];
    const bracketKey = prefix ? `${prefix}[${key}]` : key;
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${bracketKey}[${index}]`;
        if (item !== null && typeof item === "object") {
          pairs.push(toQueryString(item, arrayKey));
        } else {
          pairs.push(`${encodeURIComponent(arrayKey)}=${encodeURIComponent(item)}`);
        }
      });
    } else if (typeof value === "object") {
      pairs.push(toQueryString(value, bracketKey));
    } else {
      pairs.push(`${encodeURIComponent(bracketKey)}=${encodeURIComponent(value)}`);
    }
  }
  return pairs.filter(Boolean).join("&");
}

export function strapiMediaUrl(media) {
  if (!media?.url) return null;
  return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

async function strapiFetch(path, { query, revalidate } = {}) {
  const qs = query ? toQueryString(query) : "";
  const url = `${STRAPI_URL}/api${path}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {},
    next: { revalidate: revalidate ?? DEFAULT_REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${path} (${res.status})`);
  }

  const json = await res.json();
  return json.data;
}

export async function getGlobal() {
  return strapiFetch("/global", {
    query: { populate: { favicon: true, defaultSeo: { populate: ["shareImage"] } } },
  });
}

export async function getHeader() {
  return strapiFetch("/header", {
    query: { populate: ["nav", "cta", "modal"] },
  });
}

export async function getFooter() {
  return strapiFetch("/footer", {
    query: { populate: ["contactLinks", "creditLinks"] },
  });
}

export async function getHomepage() {
  return strapiFetch("/homepage", {
    query: {
      populate: {
        hero: { populate: ["lottieAnimation"] },
        specs: { populate: { penImage: true, cards: { populate: ["lines"] } } },
        who: { populate: ["audienceLines", "theses", "backgroundVideo"] },
        paper: { populate: { slides: { populate: ["image"] } } },
        inside: { populate: { blinds: { populate: ["image"] } } },
        details: { populate: { cards: { populate: ["image"] }, backgroundVideo: true } },
        colors: { populate: { slides: { populate: ["image"] } } },
        seo: { populate: ["shareImage"] },
      },
    },
  });
}

export async function submitWaitlist({ email, honeypot, source }) {
  const res = await fetch(`${STRAPI_URL}/api/waitlist-submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { email, honeypot, source } }),
  });

  if (!res.ok) {
    throw new Error(`Waitlist submission failed (${res.status})`);
  }

  return res.json();
}
