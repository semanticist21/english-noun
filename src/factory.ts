import { create, parseOptions } from "./core.js";
import { transform } from "./transform.js";

export function makeApi(chunks: string[]) {
  const api = create(chunks);

  function noun(options?: any) {
    const parsed = parseOptions(options);
    const selected = api.noun(options);
    return transform(selected, parsed);
  }

  function nouns(count: number, options?: any) {
    const parsed = parseOptions(options);
    const selected = api.nouns(count, options);
    return selected.map((word: string) => transform(word, parsed));
  }

  return { noun, nouns };
}
