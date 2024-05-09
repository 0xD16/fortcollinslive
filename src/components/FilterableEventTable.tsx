import { useEffect, useState } from "preact/hooks";
import type { Event } from "../types";
import EventTable from "./EventTable.tsx";
import { clsx } from "../utils.ts";
import FilterSelect from "./FilterSelect.tsx";
import { fetchEvents } from "../api.ts";

interface Props {
  events: Event[];
}

const sameDay = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

const dateFilters: {
  [key: string]: (event: Event) => boolean;
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

const costFilterFactory = (cost: string) => (event: Event) =>
  event["Cost Select"] === cost;

const costFilters: {
  [key: string]: (event: Event) => boolean;
} = {
  "All Events": () => true,
  Free: costFilterFactory("Free"),
  "Free-ish": costFilterFactory("Free-ish"),
  "$5-10": costFilterFactory("$5-10"),
  "$11-20": costFilterFactory("$11-20"),
  "$21+": costFilterFactory("$21+"),
};

export const FilterableEventTable = ({ events: initialEvents }: Props) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [dateFilter, setDateFilter] = useState("Upcoming");
  const [costFilter, setCostFilter] = useState("All Events");

  const filterEvents = () =>
    events.filter(dateFilters[dateFilter]).filter(costFilters[costFilter]);

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(filterEvents());

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  useEffect(() => {
    setFilteredEvents(filterEvents());
  }, [dateFilter, events, costFilter]);

  return (
    <div>
      <div class={"flex flex-row items-end"}>
        <div class={clsx("flex flex-row items-end justify-center w-full")}>
          <div
            class={clsx(
              "flex flex-row",
              "mt-2 mx-2",
              "border-slate-400 border-x-2 border-2 rounded-md"
            )}
          >
            <div
              class={clsx(
                classes.date.base,
                dateFilter === "Upcoming" ? classes.date.active : ""
              )}
              onClick={() => setDateFilter("Upcoming")}
            >
              Upcoming Events
            </div>
            <div
              class={clsx(
                classes.date.base,
                dateFilter === "Past" ? classes.date.active : ""
              )}
              onClick={() => setDateFilter("Past")}
            >
              Past Events
            </div>
          </div>
        </div>
        <FilterSelect filter={costFilter} onFilterChange={setCostFilter} />
      </div>
      <div class={"mt-2"}>
        <EventTable
          events={filteredEvents}
        />
      </div>
    </div>
  );
};

const classes = {
  date: {
    base: "cursor-pointer px-4 py-2",
    active: "font-bold bg-slate-400",
  },
};

export default FilterableEventTable;
