import { useEffect, useState } from "preact/hooks";
import type { Event, Venue, VenueLookup } from "../types";
import { fetchEvents } from "../api";
import FilterableEventTable from "./FilterableEventTable";

interface Props {
  venues: VenueLookup;
  initialEvents: Event[];
}

const Events = ({ venues, initialEvents }: Props) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [hasLatestEvents, setHasLatestEvents] = useState(false);
  const loadEvents = async (since?: Date) => {
    const newEvents = await fetchEvents(since);
    setEvents([
      ...initialEvents,
      ...newEvents.filter((event) => !initialEvents.includes(event)),
    ]);
    setHasLatestEvents(true);
  };

  const latestInitialEventDate = initialEvents.reduce((acc, event) => {
    const eventDate = new Date(event["Date Select"]);
    return eventDate > acc ? eventDate : acc;
  }, new Date(0));

  useEffect(() => {
    loadEvents(latestInitialEventDate);
  }, []);

  return (
    <>
      <FilterableEventTable venues={venues} events={events} />
      {!hasLatestEvents && (
        <div class="m-4 w-full text-center">
          Double checking for new events...
        </div>
      )}
    </>
  );
};

export default Events;
