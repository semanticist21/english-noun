import { describe, expect, test } from "bun:test";
import { noun, nouns } from "../src/index.js";

describe("noun", () => {
  test("returns a string", () => {
    expect(typeof noun()).toBe("string");
  });

  test("count filters", () => {
    const picked = nouns(0, { minLength: 100, maxLength: 100 });
    expect(picked).toEqual([]);
  });

  test("case transforms", () => {
    expect(noun({ case: "upper" })).toMatch(/^[A-Z '"-]+$/);
  });

  test("plural + possessive", () => {
    const word = noun({ plural: true, possessive: true, random: () => 0 });
    expect(word.endsWith("'") || word.includes("'s")).toBe(true);
  });

  test("article", () => {
    const word = noun({ article: true, random: () => 0 });
    expect(word.startsWith("a ") || word.startsWith("an ")).toBe(true);
  });

  test("deterministic", () => {
    const a = noun({ random: () => 0.25 });
    const b = noun({ random: () => 0.25 });
    expect(a).toBe(b);
  });

  test("nouns count and uniqueness", () => {
    const picked = nouns(2, { random: () => 0.1 });
    expect(picked.length).toBe(2);
    expect(new Set(picked).size).toBe(2);
  });

  test("throws on bad options", () => {
    expect(() => noun({ top: 0 } as any)).toThrow();
    expect(() => noun({ unknown: true } as any)).toThrow();
    expect(() => nouns(1.5 as any)).toThrow();
  });
});
