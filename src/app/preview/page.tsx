import Link from "next/link";

export default function PreviewIndex() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6">
      <div className="text-center">
        <h1
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300 }}
          className="text-4xl md:text-5xl tracking-tight"
        >
          Redesign previews
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          Two directions. Your live site at / is untouched.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <Link
          href="/preview/a"
          className="rounded-md border px-8 py-6 text-center transition-colors hover:border-[var(--accent)]"
          style={{ borderColor: "var(--hairline)" }}
        >
          <span className="block text-lg" style={{ fontFamily: "var(--font-fraunces)" }}>
            Direction A
          </span>
          <span className="block mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Editorial · texture, no face, amber
          </span>
        </Link>
        <Link
          href="/preview/b"
          className="rounded-md border px-8 py-6 text-center transition-colors hover:border-[var(--accent)]"
          style={{ borderColor: "var(--hairline)" }}
        >
          <span className="block text-lg" style={{ fontFamily: "var(--font-fraunces)" }}>
            Direction B
          </span>
          <span className="block mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Refined operator · duotone portrait
          </span>
        </Link>
      </div>
    </main>
  );
}
