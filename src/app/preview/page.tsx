import Link from "next/link";

export const metadata = {
  title: "Preview index — Devanté Heywood",
};

const heroOptions = [
  { slug: "waves",  title: "A. Waves",  blurb: "Slow organic waves, mouse bends the surface" },
  { slug: "grain",  title: "B. Grain",  blurb: "Drifting cream texture, mouse swirls it locally" },
  { slug: "clouds", title: "C. Clouds", blurb: "Drifting volumetric clouds, mouse parts them" },
];

const paletteVariants = [
  { slug: "a", title: "Variant A", blurb: "Warm cream + italic serif accents" },
  { slug: "b", title: "Variant B", blurb: "Warm cream + italics + liquid-glass panels" },
  { slug: "c", title: "Variant C", blurb: "Warm cream palette only" },
];

export default function PreviewIndex() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full space-y-14">
        <div>
          <p
            className="small-caps text-xs tracking-widest"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
          >
            Stage 1 — Hero backgrounds
          </p>
          <h1
            className="mt-3 text-4xl md:text-5xl leading-tight"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              color: "var(--foreground)",
            }}
          >
            Three hero options
          </h1>
          <p
            className="mt-4 text-base leading-relaxed max-w-prose"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
          >
            Same warm-cream baseline (italic serif accents, liquid-glass panels). Only
            the hero background changes. Move the mouse over each hero to feel the
            interaction.
          </p>
        </div>

        <ul className="space-y-3 border-t" style={{ borderColor: "var(--hairline)" }}>
          {heroOptions.map((h) => (
            <li key={h.slug} className="border-b" style={{ borderColor: "var(--hairline)" }}>
              <Link href={`/preview/${h.slug}`} className="flex items-baseline gap-6 py-5 group">
                <span
                  className="w-24 shrink-0 small-caps text-xs tracking-widest"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
                >
                  /{h.slug}
                </span>
                <span className="flex-1">
                  <span
                    className="block text-xl md:text-2xl leading-tight"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontWeight: 300,
                      color: "var(--foreground)",
                    }}
                  >
                    {h.title}
                  </span>
                  <span
                    className="block mt-1 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
                  >
                    {h.blurb}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <p
            className="small-caps text-xs tracking-widest"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
          >
            Earlier — Palette comparison
          </p>
          <ul className="mt-4 space-y-1">
            {paletteVariants.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/preview/${v.slug}`}
                  className="text-sm transition-colors"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
                >
                  /{v.slug} — {v.blurb}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
