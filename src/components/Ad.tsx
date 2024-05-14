import { useEffect, useState } from "preact/hooks";
import type { Event } from "../types";
import { fetchEvents } from "../api";

const slogans = [
  "live music index",
  "consume. the. music.",
  "just bands, no bullsh*t",
  "the site says listen",
  "you should go to a show",
  "apply directly to the ears",
  "the music is (a)live",
];

const randomSlogan = () => slogans[Math.floor(Math.random() * slogans.length)];

const datesForThisWeekend = (): [Date, Date] => {
  const today = new Date();
  const todayDay = today.getDay();
  const friday = new Date(today);
  friday.setDate(today.getDate() + ((5 - todayDay + 7) % 7));
  friday.setHours(0, 0, 0, 0);
  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);
  sunday.setHours(23, 59, 59, 999);
  return [friday, sunday];
};

const dateMonday = () => {
  const today = new Date();
  const todayDay = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() + ((1 - todayDay + 7) % 7));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const numberSuffix = (n: number) => {
  if (n % 100 === 11 || n % 100 === 12 || n % 100 === 13) {
    return "th";
  }
  if (n % 10 === 1) {
    return "st";
  }
  if (n % 10 === 2) {
    return "nd";
  }
  if (n % 10 === 3) {
    return "rd";
  }
  return "th";
};

const dateToDay = (date: Date) => date.getDate() + numberSuffix(date.getDate());

const datesToString = (dates: [Date, Date]) => [
  [months[dates[0].getMonth()], dateToDay(dates[0])].join(" "),
  [
    dates[0].getMonth() === dates[1].getMonth()
      ? undefined
      : months[dates[1].getMonth()],
    dateToDay(dates[1]),
  ].join(" "),
];

const latestEventDate = (events: Event[]): Date =>
  events.reduce((latest, event) => {
    const date = new Date(event.Date);
    return date > latest ? date : latest;
  }, new Date(0));

const Ad = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [thisWeekend, setThisWeekend] = useState<Event[]>([]);
  const [friday, sunday] = datesForThisWeekend();
  const monday = dateMonday();

  const isThisWeekend = (date: Date): boolean => {
    return date >= friday && date <= sunday;
  };

  const isThisWeek = (date: Date): boolean => {
    return date >= monday && date <= sunday;
  };

  const loadEvents = async () => {
    const events = (await fetchEvents()).reverse();
    setEvents(events.filter((event) => isThisWeek(new Date(event.Date))));
    setThisWeekend(
      events.filter((event) => isThisWeekend(new Date(event.Date)))
    );
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div
      style={{
        fontFamily: "unifont, lucida console, monospace, Monaco;",
        width: "5in",
        height: "5in",
      }}
      class={"bg-black text-white p-4 justify-between flex flex-col"}
    >
      <div>
        Live Music For{" "}
        {datesToString([monday, latestEventDate(events)]).join(" to ")}
      </div>
      <div class={"overflow-hidden text-wrap text-justify"}>
        {events.map((event) => {
          const date = new Date(event.Date);
          return (
            <span class={"pr-2"}>
              <span class={"text-sm text-blue-300 text-wrap pr-2"}>
                {event["Band/DJ/Musician Name"]}
              </span>
              <span class={"italic text-xs pr-1 text-wrap text-slate-400"}>
                {event["Bar or Venue Name"]}
              </span>
              <span
                class={
                  "text-slate-400 text-xs text-wrap pr-1 border-r-2 border-slate-700"
                }
              >
                {months[date.getMonth()]} {date.getDate()}
              </span>
            </span>
          );
        })}
      </div>
      <div class={"flex flex-row justify-between"}>
        <div>fortcollinslive.com</div>
        <div>{randomSlogan()}</div>
      </div>
    </div>
  );
};

export default Ad;
