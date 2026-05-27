// Writing index. Add entries here as essays are published.
// Each essay lives at src/app/writing/[slug]/page.mdx
// Export metadata from each .mdx file: title, date (ISO string), description

export default function WritingIndex() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p
        className="text-base"
        style={{ fontFamily: "var(--font-sans)", color: "rgba(255, 255, 255, 0.7)" }}
      >
        More soon.
      </p>
    </div>
  );
}
