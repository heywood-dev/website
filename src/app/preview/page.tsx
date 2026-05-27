import Link from "next/link";

export const metadata = {
  title: "Preview index — Devanté Heywood",
};

const variants = [
  { slug: "a", title: "Variant A", blurb: "Warm cream editorial with italic serif accents" },
  { slug: "b", title: "Variant B", blurb: "Warm cream + subtle liquid-glass panels" },
  { slug: "c", title: "Variant C", blurb: "Just warm the palette" },
];

export default function PreviewIndex() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full space-y-10">
        <div>
          <p
            className="small-caps text-xs tracking-widest"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
          >
            Preview
          </p>
          <h1
            className="mt-3 text-4xl md:text-5xl leading-tight"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              color: "var(--foreground)",
            }}
          >
            Three palette directions
          </h1>
          <p
            className="mt-4 text-base leading-relaxed max-w-prose"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
          >
            Each is a full-site build with the warm cream palette. They differ only in
            type detailing and panel treatment. Scroll each end to end.
          </p>
        </div>

        <ul className="space-y-3 border-t" style={{ borderColor: "var(--hairline)" }}>
          {variants.map((v) => (
            <li key={v.slug} className="border-b" style={{ borderColor: "var(--hairline)" }}>
              <Link
                href={`/preview/${v.slug}`}
                className="flex items-baseline gap-6 py-5 group"
              >
                <span
                  className="w-20 shrink-0 small-caps text-xs tracking-widest"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
                >
                  /{v.slug}
                </span>
                <span className="flex-1">
                  <span
                    className="block text-xl md:text-2xl leading-tight transition-colors"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontWeight: 300,
                      color: "var(--foreground)",
                    }}
                  >
                    {v.title}
                  </span>
                  <span
                    className="block mt-1 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
                  >
                    {v.blurb}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
