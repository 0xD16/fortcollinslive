import { config } from "./config";
import type { Event, Venue, VenueLookup } from "./types";

/**
 * Returns a date object as YYYY-MM-DD
 */
const dateToFilterString = (date: Date) => {
    return date.toISOString().split("T")[0];
}

const twoMonthsAgo = () => {
    const now = new Date();
    // TODO: fix before next year
    now.setMonth(now.getMonth() - 2);
    return now;
}

export const fetchEvents = async (after?: Date): Promise<Event[]> =>
    fetch(config.apiUrl + (
        "/events" + (after ? "?after=" + dateToFilterString(after) : "?after=" + dateToFilterString(twoMonthsAgo()))

    )).then(
        async (r) =>
            (await r.json())
                .map((event: Event) => ({
                    ...event,
                    "Date Select": new Date(event["Date Select"]),
                }))
                .filter(
                    (event: Event) =>
                        event["Date Select"] instanceof Date &&
                        !isNaN(event["Date Select"].getTime())
                )
                .sort(
                    (a: Event, b: Event) =>
                        b["Date Select"].getTime() - a["Date Select"].getTime()
                )
    );

export const fetchVenues: () => Promise<Venue[]> = async () => fetch(config.apiUrl + "/venues").then(
    async (r) =>
        (await r.json())
);

export const fetchVenueLookup = async (): Promise<VenueLookup> => {
    const venues = await fetchVenues();
    return venues.reduce((acc, venue) => {
        acc.byName[venue["Bar or Venue Name"]] = venue;
        acc.byId[venue.id] = venue;
        return acc;
    }, {
        byId: {},
        byName: {},
    } as VenueLookup);
}