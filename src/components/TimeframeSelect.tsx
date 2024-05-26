import { useState } from "preact/hooks";
import { clsx } from "../utils";
import type { DateFilter } from "../types";

interface Props {
  onFilterChange: (filter: DateFilter) => void;
}

const TimeframeSelect = ({ onFilterChange }: Props) => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("Upcoming");

  const updateFilter = (filter: DateFilter) => {
    setDateFilter(filter);
    onFilterChange(filter);
  };

  return (
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
            dateFilter === "Upcoming" ? classes.date.active : "",
            "plausble-event-name=Upcoming+Events"
          )}
          onClick={() => updateFilter("Upcoming")}
        >
          Upcoming Events
        </div>
        <div
          class={clsx(
            classes.date.base,
            dateFilter === "Past" ? classes.date.active : "",
            "plausble-event-name=Past+Events"
          )}
          onClick={() => updateFilter("Past")}
        >
          Past Events
        </div>
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

export default TimeframeSelect;
