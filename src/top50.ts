import data from "./data/t50.js";
import { makeApi } from "./factory.js";

const api = makeApi([data]);
export const noun = api.noun;
export const nouns = api.nouns;
