import { pluralize } from "./pluralize.js";

export interface TransformOptions {
  plural?: boolean;
  case?: "lower" | "title" | "upper";
  article?: true | "a" | "an" | "the";
  possessive?: boolean;
}

export function transform(word: string, options: TransformOptions): string {
  let result = word;

  if (options.plural) result = pluralize(result);
  if (options.possessive) result += result.toLowerCase().endsWith("s") ? "'" : "'s";
  if (options.article) {
    const article =
      options.article === true ? chooseArticle(result) : options.article;
    result = `${article} ${result}`;
  }
  switch (options.case) {
    case "title":
      result = titleCase(result);
      break;
    case "upper":
      result = result.toUpperCase();
      break;
    case "lower":
    default:
      result = result.toLowerCase();
  }
  return result;
}

function chooseArticle(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function titleCase(value: string) {
  return value.replace(/(^|\s)\S/g, (m) => m.toUpperCase());
}
