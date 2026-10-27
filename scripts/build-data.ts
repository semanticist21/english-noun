import { words as popularWords } from "../node_modules/popular-english-words/words.js";

const WORDNET_INDEX = new URL("../node_modules/wordnet-db/dict/index.noun", import.meta.url);
const OUTPUT_DIR = new URL("../src/data/", import.meta.url);

const rank = new Map<string, number>();
for (let i = 0; i < popularWords.length; i++) {
  const key = String(popularWords[i]).toLowerCase();
  if (!rank.has(key)) rank.set(key, i);
}

const text = await Bun.file(WORDNET_INDEX).text();
const lemmas = new Set<string>();
for (const line of text.split("\n").slice(30)) {
  if (!line.trim()) continue;
  const lemma = line.split(" ")[0]?.toLowerCase();
  if (!lemma) continue;
  if (!/^[a-z]+$/.test(lemma)) continue;
  lemmas.add(lemma);
}

const entries = [...lemmas].map((word) => ({
  word,
  freq: rank.has(word) ? popularWords.length - rank.get(word)! : 1
}));
entries.sort((a, b) => b.freq - a.freq || a.word.localeCompare(b.word));
const top = entries.slice(0, 100_000);

const t10 = top.slice(0, 10_000);
const t25 = top.slice(10_000, 25_000);
const t50 = top.slice(25_000, 50_000);
const t100 = top.slice(50_000, 100_000);

async function writeChunk(name: string, chunk: { word: string; freq: number }[]) {
  const body = chunk.map((e) => `${e.word}\t${e.freq}`).join("\n") + "\n";
  const content = `const data = ${JSON.stringify(body)};\nexport default data;\n`;
  await Bun.write(new URL(`${name}.ts`, OUTPUT_DIR), content);
}

await writeChunk("t10", t10);
await writeChunk("t25", t25);
await writeChunk("t50", t50);
await writeChunk("t100", t100);

console.log(`built ${top.length} nouns: t10=${t10.length}, t25=${t25.length}, t50=${t50.length}, t100=${t100.length}`);