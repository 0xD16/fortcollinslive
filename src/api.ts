import { config } from "./config";
import type { Event } from "./types";

export const fetchEvents: () => Promise<Event[]> = async () => fetch(config.apiUrl).then(
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