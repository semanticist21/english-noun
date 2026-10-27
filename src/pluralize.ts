const IRREGULAR: Record<string, string> = {
  child: "children",
  man: "men",
  woman: "women",
  mouse: "mice",
  goose: "geese",
  foot: "feet",
  tooth: "teeth",
  person: "people",
  analysis: "analyses",
  hypothesis: "hypotheses",
  thesis: "theses",
  crisis: "crises",
  phenomenon: "phenomena",
  datum: "data",
  medium: "media",
  criterion: "criteria",
  fungus: "fungi",
  cactus: "cacti",
  nucleus: "nuclei",
  syllabus: "syllabi",
  index: "indices",
  matrix: "matrices"
};

export function pluralize(word: string): string {
  const lower = word.toLowerCase();
  if (IRREGULAR[lower]) {
    const plural = IRREGULAR[lower];
    return matchCase(word, plural);
  }
  if (/(s|x|z|ch|sh)$/i.test(word)) return word + "es";
  if (/[^aeiou]y$/i.test(word)) return word.slice(0, -1) + "ies";
  return word + "s";
}

function matchCase(original: string, replacement: string) {
  if (original === original.toUpperCase()) return replacement.toUpperCase();
  if (original[0] === original[0].toUpperCase())
    return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}
