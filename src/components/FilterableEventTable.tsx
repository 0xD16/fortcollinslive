import { useEffect, useState } from "preact/hooks";
import type { DateFilter, Event, VenueLookup } from "../types";
import EventTable from "./EventTable.tsx";
import { clsx, costFilters, dateFilters, dateSorts } from "../utils.ts";
import FilterSelect from "./FilterSelect.tsx";
import { fetchEvents } from "../api.ts";
import TimeframeSelect from "./TimeframeSelect.tsx";

interface Props {
  events: Event[];
  venues: VenueLookup;
}

export const FilterableEventTable = ({
  events: initialEvents,
  venues,
}: Props) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [dateFilter, setDateFilter] = useState<DateFilter>("Upcoming");
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
        <TimeframeSelect onFilterChange={setDateFilter} />
        <FilterSelect filter={costFilter} onFilterChange={setCostFilter} />
      </div>
      <div class={"mt-2"}>
        <EventTable
          venues={venues}
          events={[...filteredEvents].sort(dateSorts[dateFilter])}
        />
      </div>
      {dateFilter === "Past" && (
        <div class={"m-2 text-center italic text-xs"}>
          Looking for an older event? We didn't forget about it, "back catalog"
          coming soon...
        </div>
      )}
    </div>
  );
};

export default FilterableEventTable;
