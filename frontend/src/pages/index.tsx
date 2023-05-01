import { EventCard, GenericEvent } from "@/components/EventCard";
import { useEffect, useReducer, useState } from "react";

import Link from "next/link";
import { useEventState } from "@/utils/useSavedEvents";

const FindEventsPanel = ({ hasEvents }: { hasEvents: boolean }) => {
  const fullScreenStyle =
    " justify-center flex-grow items-center my-auto rounded-md bg-gradient-to-tr from-violet-500 to-sky-500 flex min-h-[30rem]";
  const singleColumnStyle =
    "flex items-center justify-center rounded-md bg-gradient-to-tr from-violet-500 to-sky-500 w-72";

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
  console.log(events)
  const EventList = () => (
    <div className="flex flex-col self-stretch flex-1 gap-4">
      {events.map((e) => (
        <EventCard
          key={e.eventId}
          event={e}
          eventStateDispatch={eventStateDispatch}
          eventSaved={true}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col flex-1 h-full gap-6 py-12 sm:flex-row ">
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
