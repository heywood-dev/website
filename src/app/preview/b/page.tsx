import { PreviewShell, WARM_CREAM_SHADER } from "../_lib/preview-shell";

export const metadata = {
  title: "Preview B — Devanté Heywood",
};

export default function PreviewB() {
  return (
    <PreviewShell
      variant="b"
      shaderColors={WARM_CREAM_SHADER}
      label="Variant B"
      blurb="Warm cream + italics + liquid-glass panels"
    />
  );
}
