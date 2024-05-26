import type { DateFilter, Event } from "./types";

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

export const sameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

export const dateFilters: {
    [key in DateFilter]: (event: Event) => boolean;
} = {
    Upcoming: (event: Event) => {
        const eventDate = new Date(event["Date Select"]);
        return sameDay(eventDate, new Date()) || eventDate >= new Date();
    },
    Past: (event: Event) => {
        const eventDate = new Date(event["Date Select"]);
        return !sameDay(eventDate, new Date()) && eventDate < new Date();
    },
};

export const dateSorts: {
    [key in DateFilter]: (a: Event, b: Event) => number;
} = {
    Upcoming: (a: Event, b: Event) =>
        new Date(a["Date Select"]).getTime() - new Date(b["Date Select"]).getTime(),
    Past: (a: Event, b: Event) =>
        new Date(b["Date Select"]).getTime() - new Date(a["Date Select"]).getTime(),
};

export const costFilterFactory = (cost: string) => (event: Event) =>
    event["Cost Select"] === cost;

export const costFilters: {
    [key: string]: (event: Event) => boolean;
} = {
    "All Events": () => true,
    Free: costFilterFactory("Free"),
    "Free-ish": costFilterFactory("Free-ish"),
    "$5-10": costFilterFactory("$5-10"),
    "$11-20": costFilterFactory("$11-20"),
    "$21+": costFilterFactory("$21+"),
};