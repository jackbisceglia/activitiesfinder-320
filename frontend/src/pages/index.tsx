import { EventCard, GenericEvent } from "@/components/EventCard";
import { useEffect, useReducer, useState } from "react";

import Link from "next/link";

export type EventActions =
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "ADD"; payload: { event: GenericEvent } }
  | { type: "LOAD_ALL" };

const eventReducer = (
  events: GenericEvent[],
  action: EventActions
): GenericEvent[] => {
  switch (action.type) {
    case "REMOVE":
      const filteredEvents = events.filter((e) => e.id !== action.payload.id);
      localStorage.setItem("events", JSON.stringify(filteredEvents));
      return filteredEvents;
    case "ADD":
      const newEvents = [...events, action.payload.event];
      localStorage.setItem("events", JSON.stringify(newEvents));
      return newEvents;
    case "LOAD_ALL":
      return JSON.parse(localStorage.getItem("events") ?? "[]");
    default:
      console.log("default");
      return events;
  }
};

// Event State
const useEventState = () => {
  const defaultState: GenericEvent[] = [];
  const [events, dispatchEvents] = useReducer(eventReducer, defaultState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      dispatchEvents({
        type: "LOAD_ALL",
      });
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return { events, loading, error, eventStateDispatch: dispatchEvents };
};

const FindEventsPanel = ({ hasEvents }: { hasEvents: boolean }) => {
  const fullScreenStyle =
    " justify-center flex-grow items-center my-auto rounded-md bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 flex min-h-[30rem]";
  const singleColumnStyle =
    "flex items-center justify-center rounded-md bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 w-72";

  return (
    <div className={hasEvents ? singleColumnStyle : fullScreenStyle}>
      <Link
        href="results"
        className="px-6 py-3 font-medium transition-colors duration-300 rounded-md shadow-md bg-sky-100 hover:bg-sky-50"
      >
        {hasEvents ? "Find More Events" : "Find Events"}
      </Link>
    </div>
  );
};

// HOMEPAGE
export default function Home() {
  const { events, loading, error, eventStateDispatch } = useEventState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const EventList = () => (
    <div className="flex flex-col flex-1 w-auto gap-4">
      {events.map((e) => (
        <EventCard
          key={e.id}
          event={e}
          eventStateDispatch={eventStateDispatch}
          eventSaved={true}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full gap-6 py-12 sm:flex-row ">
      {events.length ? (
        <>
          <EventList />
          <FindEventsPanel hasEvents={true} />
        </>
      ) : (
        <FindEventsPanel hasEvents={false} />
      )}
    </div>
  );
}
