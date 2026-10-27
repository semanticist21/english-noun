import { noun as n1 } from "../src/top10.js";
import { noun as n2 } from "../src/top25.js";
import { noun as n3 } from "../src/top50.js";
import { noun as n4 } from "../src/index.js";

for (const fn of [n1, n2, n3, n4]) {
  const value = fn();
  if (typeof value !== "string" || value.length === 0) throw new Error("invalid noun");
}
console.log("e2e ok");
