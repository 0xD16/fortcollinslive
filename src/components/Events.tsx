import { useEffect, useState } from "preact/hooks";
import type { Event } from "../types";
import { fetchEvents } from "../api";
import { Suspense } from "preact/compat";
import FilterableEventTable from "./FilterableEventTable";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const loadEvents = async () => {
    const events = await fetchEvents();
    setEvents(events);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <>
      <FilterableEventTable events={events} />
    </>
  );
};

export default Events;
