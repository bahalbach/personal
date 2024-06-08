export function makeCanonical(label: string) {
  return encodeURIComponent(label.toLowerCase().replace(/[ ]/g, "_"));
}
