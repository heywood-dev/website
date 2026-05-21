// Writing index. Add entries here as essays are published.
// Each essay lives at src/app/writing/[slug]/page.mdx
// Export metadata from each .mdx file: title, date (ISO string), description

export default function WritingIndex() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
      <p
        className="text-base text-[#6B6B63]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        More soon.
      </p>
    </div>
  );
}
