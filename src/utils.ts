import type { Event } from "./types";

export const clsx = (...classes: (string | boolean | undefined)[]): string =>
    classes.filter(Boolean).join(" ");

export const eventEquals = (a: Event, b: Event): boolean =>
    a["Date"] === b["Date"] &&
    a["Music Start Time"] === b["Music Start Time"] &&
    a["Bar or Venue Name"] === b["Bar or Venue Name"] &&
    a["Band/DJ/Musician Name"] === b["Band/DJ/Musician Name"] &&
    a["Cost Select"] === b["Cost Select"] &&
    a["Cost"] === b["Cost"] &&
    a["Date Select"] === b["Date Select"] &&
    a['"Specials" at Venue'] === b['"Specials" at Venue'];

export const listContainsEvent = (list: Event[], event: Event): boolean =>
    list.some((e) => eventEquals(e, event));