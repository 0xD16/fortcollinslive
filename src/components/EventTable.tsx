import type { Event, VenueLookup } from "../types";

interface Props {
  events: Event[];
  venues: VenueLookup;
}

const EventTable = ({ events, venues }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-2">
      {events.length === 0 && (
        <div class="justify-center flex items-center w-full h-32 text-center p-2 m-2">
          Loading...
        </div>
      )}
      {events.map((event: Event) => {
        const venue =
          event.Venue !== undefined
            ? venues.byId[event.Venue[0]]
            : venues.byName[event["Bar or Venue Name"].trim()];

        return (
          <div class={classes.eventCard.root}>
            <div class="font-semibold">{event["Band/DJ/Musician Name"]}</div>
            <div class="">
              @{" "}
              {venue !== undefined ? (
                <a
                  href={venue.Website}
                  target="_blank"
                  rel="noopener noreferrer"
                  class={"underline underline-offset-1"}
                >
                  {event["Bar or Venue Name"]}
                </a>
              ) : (
                event["Bar or Venue Name"]
              )}
            </div>
            <div>{event["Date Select"].toDateString()}</div>
            <div>{event["Music Start Time"]}</div>
            <div>{event["Cost"]}</div>

            {/* <td>{event['"Specials" at Venue']}</td> */}
          </div>
        );
      })}
      <div class={classes.voteCard.root}>
        <div class="font-semibold">Vote!</div>
        <div class="">
          fortcollinslive.com doesn't care who/what you vote for, but be sure to
          make your voice heard!
        </div>
        <div>
          <a
            href="https://leg.colorado.gov/content/initiatives/initiatives-blue-book-overview/ballot-information-booklet-blue-book"
            target="_blank"
            rel="noopener noreferrer"
            class={"underline underline-offset-1"}
          >
            Colorado Ballot Information Booklet (Blue Book)
          </a>
        </div>
        <div>
          <a
            href="https://www.coloradosos.gov/voter/pages/pub/home.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            class={"underline underline-offset-1"}
          >
            Register to Vote
          </a>
        </div>
        <div>
          <a
            href="https://www.larimer.gov/clerk/elections"
            target="_blank"
            rel="noopener noreferrer"
            class={"underline underline-offset-1"}
          >
            Larimer County Election Information
          </a>
        </div>
      </div>
    </div>
  );
};

const classes = {
  eventCard: {
    root: "flex flex-col justify-center h-full w-full sm:w-1/4 bg-slate-300 m-2 sm:m-0 p-2 gap-1 rounded-lg shadow-inner",
  },
  voteCard: {
    root: "flex flex-col justify-center h-full w-full sm:w-1/4 bg-blue-200 m-2 sm:m-0 p-2 gap-1 rounded-lg shadow-inner",
  },
};

export default EventTable;
