export function makeCanonical(label: string) {
  return label.toLowerCase().replace(" ", "%20");
}
