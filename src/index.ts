import data100 from "./data/t100.js";
import data50 from "./data/t50.js";
import data25 from "./data/t25.js";
import data10 from "./data/t10.js";
import { makeApi } from "./factory.js";

export * from "./transform.js";
const api = makeApi([data10, data25, data50, data100]);
export const noun = api.noun;
export const nouns = api.nouns;
