export function makeCanonical(label: string) {
  return label.toLowerCase().replace(/ /g, "_");
}
