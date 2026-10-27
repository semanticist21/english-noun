const text = await Bun.file(new URL("../node_modules/wordnet-db/dict/index.noun", import.meta.url)).text();
const nouns = text
  .split("\n")
  .slice(30)
  .map((line) => line.split(" ")[0]?.toLowerCase())
  .filter((word): word is string => Boolean(word) && /^[a-z]+$/.test(word));
const unique = [...new Set(nouns)];
await Bun.write(new URL("../raw/wordnet-nouns.json", import.meta.url), JSON.stringify(unique, null, 2));
console.log(`extracted ${unique.length} WordNet noun lemmas`);
