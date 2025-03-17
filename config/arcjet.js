import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import { ARCJET_ENV, ARCJET_KEY } from "./config.js";

const isDev = ARCJET_ENV === "development";

export const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    !isDev &&
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE"],
      }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ].filter(Boolean),
});
