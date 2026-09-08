// Fetches Power Stack's live post archive from Substack at build/revalidate
// time, so the Writing section never needs a manual per-post code change
// again. Revalidates hourly; falls back to a small static list (as of
// Sep 2026) if Substack is unreachable, so a fetch failure never breaks
// the page.

export interface SubstackPost {
  /** Display date, e.g. "Sep 2026". */
  date: string;
  title: string;
  subtitle: string;
  href: string;
  /** Substack's own cover image for the post — always current, no local
      screenshot to capture or maintain. */
  preview: string;
}

const ARCHIVE_URL =
  "https://powerstackhq.substack.com/api/v1/archive?sort=new&limit=30";

interface RawPost {
  type?: string;
  slug?: string;
  post_date?: string;
  title?: string;
  subtitle?: string;
  canonical_url?: string;
  cover_image?: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  // Use UTC getters — the post_date is UTC and a build server's local zone
  // should never shift an issue into the wrong month.
  const month = d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const year = d.getUTCFullYear();
  return `${month} ${year}`;
}

// Last known-good snapshot (as of issue 010, Sep 2026) — used only if the
// live fetch fails, so the section degrades gracefully instead of breaking.
const FALLBACK_POSTS: SubstackPost[] = [
  {
    date: "Sep 2026",
    title: "“Defense Platforms, Data centers, and Advanced Electronics”",
    subtitle:
      "That is how the Pentagon described a $35.6 million mining investment made during the same week as new commitments to rare-earth supply and microreactors.",
    href: "https://powerstackhq.substack.com/p/defense-platforms-data-centers-and",
    preview:
      "https://substackcdn.com/image/fetch/$s_!DNZH!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2cfc167-d775-417b-aae2-a1e705a4bf2a_3200x1800.png",
  },
  {
    date: "Aug 2026",
    title: "The 482-Megawatt Head Start",
    subtitle:
      "An AI campus is inheriting the grid connection of a closed aluminum smelter. It shows how the industry is beginning to work around its real constraint.",
    href: "https://powerstackhq.substack.com/p/the-482-megawatt-head-start",
    preview:
      "https://substackcdn.com/image/fetch/$s_!S7MW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d19c695-8a1b-4a3f-aee2-23ab207d389d_1600x900.png",
  },
  {
    date: "Aug 2026",
    title: "What Happens After You Find the Power?",
    subtitle:
      "Texas and Pennsylvania are adding a second test for AI data centers: prove the project is real, prove it can pay, and prove the community will take it.",
    href: "https://powerstackhq.substack.com/p/what-happens-after-you-find-the-power",
    preview:
      "https://substackcdn.com/image/fetch/$s_!O1t9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffbbaecbf-b169-45e0-9b4a-d51a2fb03789_3200x1800.png",
  },
  {
    date: "Aug 2026",
    title: "Amazon Found a Way Around the Grid. Sort Of.",
    subtitle:
      "Pacifico Energy's West Texas filing shows what moving around the grid requires, while most private generation remains on paper.",
    href: "https://powerstackhq.substack.com/p/amazon-found-a-way-around-the-grid",
    preview:
      "https://substackcdn.com/image/fetch/$s_!KSpj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F94733a17-845e-4ebb-ad35-feff3ccae7b2_3200x1800.png",
  },
  {
    date: "Aug 2026",
    title: "Texas Was Supposed to Sort Its Data-Center Queue. Then the Questions Changed.",
    subtitle:
      "ERCOT missed its August deadline as Virginia and Britain raised what projects must put behind grid access.",
    href: "https://powerstackhq.substack.com/p/texas-was-supposed-to-sort-its-data",
    preview:
      "https://substackcdn.com/image/fetch/$s_!riCf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e3369d9-9afe-4267-b65b-56f645ee6e12_3200x1800.png",
  },
  {
    date: "Aug 2026",
    title: "Three Gigawatts Vanished from the Grid. The Lights Only Flickered.",
    subtitle:
      "A Northern Virginia transmission fault pushed data centers onto backup power. Washington is assigning the cost, Europe is pricing the behavior, and a federal site is building its own.",
    href: "https://powerstackhq.substack.com/p/three-gigawatts-vanished-from-the",
    preview:
      "https://substackcdn.com/image/fetch/$s_!TOtD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d0b0291-013d-46e1-850c-1cb3ac24b5d0_3200x1800.png",
  },
  {
    date: "Jul 2026",
    title: "2031 Is the Earliest You Can Buy a Large Gas Turbine",
    subtitle:
      "GE Vernova expects its gas turbine slots to be mostly sold out through 2030 by December, and the AI buildout's escape route from the grid now runs through the turbine factory.",
    href: "https://powerstackhq.substack.com/p/2031-is-the-earliest-you-can-buy",
    preview:
      "https://substackcdn.com/image/fetch/$s_!wXb-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffdd2085e-e75e-4d97-82bd-c5f13c78e9c6_2144x1214.png",
  },
  {
    date: "Jul 2026",
    title: "Who Gets to Say No to a Data Center",
    subtitle:
      "New York paused permits for 50-megawatt data centers, PJM cleared at its price ceiling and still missed its reliability target, and the buildout is already moving toward dedicated generation.",
    href: "https://powerstackhq.substack.com/p/who-gets-to-say-no-to-a-data-center",
    preview:
      "https://substackcdn.com/image/fetch/$s_!DnRq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2817d95a-7919-480f-a7c0-6589dd279f00_3200x1800.png",
  },
  {
    date: "Jul 2026",
    title: "Why Texas Stopped Studying Data Centers One at a Time",
    subtitle:
      "Texas is being asked for five times the electricity it has ever used, and it can no longer tell which of that demand will ever exist.",
    href: "https://powerstackhq.substack.com/p/why-texas-stopped-studying-data-centers",
    preview:
      "https://substackcdn.com/image/fetch/$s_!XfNh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a21debc-0468-424c-abc0-1af5758a1804_1672x941.png",
  },
  {
    date: "Jul 2026",
    title: "Why Walmart Signed a 15-Year Nuclear Deal",
    subtitle:
      "AI made firm power scarce enough that a grocery retailer just locked up nuclear for 15 years.",
    href: "https://powerstackhq.substack.com/p/why-walmart-signed-a-15-year-nuclear",
    preview:
      "https://substackcdn.com/image/fetch/$s_!6YHY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F654cb14b-e555-4cbd-9185-126adfd38704_1672x941.png",
  },
];

export async function getPowerStackPosts(): Promise<SubstackPost[]> {
  try {
    const res = await fetch(ARCHIVE_URL, {
      // Revalidate hourly — new issues appear on the live site within an
      // hour of publishing, with no redeploy needed.
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PowerStackSiteBot/1.0)" },
    });
    if (!res.ok) throw new Error(`Substack archive fetch failed: ${res.status}`);

    const raw: RawPost[] = await res.json();
    const posts = raw
      .filter((p) => p.type === "newsletter" && p.slug && p.canonical_url && p.title)
      .map((p) => ({
        date: formatDate(p.post_date!),
        title: p.title!.trim(),
        subtitle: (p.subtitle || "").trim(),
        href: p.canonical_url!,
        preview: p.cover_image || "",
      }))
      .filter((p) => p.preview); // skip any post missing a cover image

    return posts.length > 0 ? posts : FALLBACK_POSTS;
  } catch {
    return FALLBACK_POSTS;
  }
}
