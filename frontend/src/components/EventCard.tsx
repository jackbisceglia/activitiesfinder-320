import { Dispatch } from "react";
import { EventActions } from "@/pages";
import Link from "next/link";

export type GenericEvent = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  url: string;
};

type EventCardProps = {
  event: GenericEvent;
  eventSaved: boolean;
  eventStateDispatch: Dispatch<EventActions>;
};

export const EventCard = ({
  event,
  eventSaved,
  eventStateDispatch,
}: EventCardProps) => {
  const buttonTerm = eventSaved ? "Remove" : "Save";

  // wrap dispatch with id context
  const handleRemoveEvent = () =>
    eventStateDispatch({
      type: "REMOVE",
      payload: {
        id: event.id,
      },
    });

  return (
    <div
      className="hover:border-gray-400/60 grid grid-cols-[auto_auto] place-items-start place-content-between px-6 py-4 bg-gray-50/90 border border-gray-300 transition-all duration-200 hover:shadow-md shadow-sm rounded-md text-gray-950 "
      key={event.id}
    >
      <div className="flex flex-col w-max">
        <Link
          target="_blank"
          href={event.url}
          className="pr-4 text-xl font-black w-fit hover:underline underline-offset-2"
        >
          {event.title}
        </Link>
        <p>{event.location}</p>
        <p>{event.date}</p>
        <p>{event.time}</p>
      </div>
      <button
        onClick={handleRemoveEvent}
        className="px-4 py-[0.375rem] text-xs transition-all duration-100 bg-gray-400 rounded-md hover:bg-gray-500 text-white w-min h-min"
      >
        {buttonTerm}
      </button>
    </div>
  );
};
