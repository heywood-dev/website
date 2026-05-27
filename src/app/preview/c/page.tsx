import { PreviewShell, WARM_CREAM_SHADER } from "../_lib/preview-shell";

export const metadata = {
  title: "Preview C — Devanté Heywood",
};

export default function PreviewC() {
  return (
    <PreviewShell
      variant="c"
      shaderColors={WARM_CREAM_SHADER}
      label="Variant C"
      blurb="Warm cream palette only"
    />
  );
}
