import { PreviewShell, WARM_CREAM_SHADER } from "../_lib/preview-shell";

export const metadata = {
  title: "Preview A — Devanté Heywood",
};

export default function PreviewA() {
  return (
    <PreviewShell
      variant="a"
      shaderColors={WARM_CREAM_SHADER}
      label="Variant A"
      blurb="Warm cream, italic serif accents"
    />
  );
}
