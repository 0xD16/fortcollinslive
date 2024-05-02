import type { Event } from "../types";
import { clsx } from "../utils";
interface Props {
  events: Event[];
}

const EventTable = ({ events }: Props) => {
  return (
    <table class={classes.table.root}>
      <thead class={classes.table.head}>
        <th>Bar or Venue Name</th>
        <th>Band/DJ/Musician Name</th>
        <th>When</th>
        <th>Cost</th>
        {/* <th>"Specials"</th> */}
      </thead>
      <tbody class={classes.table.body}>
        {events.length === 0 && (
          <tr>
            <td
              class={[classes.table.cell, "justify-center"].join(" ")}
              colSpan={4}
            >
              Loading...
            </td>
          </tr>
        )}
        {events.map((event: Event) => (
          <tr>
            <td class={classes.table.cell}>{event["Bar or Venue Name"]}</td>
            <td class={clsx(classes.table.cell, "w-64")}>
              {event["Band/DJ/Musician Name"]}
            </td>
            <td>
              {event["Date Select"].toLocaleDateString()}
              <br />
              {event["Music Start Time"]}
            </td>
            <td>{event["Cost"]}</td>
            {/* <td>{event['"Specials" at Venue']}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const classes = {
  table: {
    root: "table-auto w-full",
    head: "py-8 bg-slate-400",
    body: "",
    cell: "p-2",
  },
};

export default EventTable;
