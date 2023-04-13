import React, { useState } from "react";

import { EventActions } from "@/utils/useSavedEvents";
import Link from "next/link";

export type Tag =
  | "sports"
  | "recreational"
  | "music"
  | "outdoor"
  | "indoor"
  | "educational";

export type GenericEvent = {
  eventId: number;
  title: string;
  date: string;
  time: {
    start: number;
    end: number;
  };
  // make into types Town and Building
  location: {
    Town: string;
    Building: string;
  };
  eventUrl: string;
  imageUrl?: string;
  saves: number;
  tags: Tag[];
  saved?: boolean;
};

type EventCardProps = {
  event: GenericEvent;
  showSaveButton?: boolean;
  eventStateDispatch?: React.Dispatch<EventActions>;
  eventSaved?: boolean;
  onSave?: (event: GenericEvent) => void;
};

export function EventCard({
  event,
  eventSaved,
  eventStateDispatch,
  showSaveButton = false,
  onSave,
}: EventCardProps) {
  const [isSaved, setIsSaved] = useState(event.saved || false);

  const handleSave = () => {
    if (!eventStateDispatch) {
      console.log("not updating state yet");
      return;
    }
    if (eventSaved) {
      console.log("adding");
      eventStateDispatch({
        type: "REMOVE",
        payload: {
          id: event.eventId,
        },
      });
    } else {
      console.log("removing");
      eventStateDispatch({
        type: "ADD",
        payload: {
          event,
        },
      });
    }
  };

  return (
    <div
      className="hover:border-gray-400/60 text-left grid grid-cols-[auto_auto] place-items-start place-content-between px-6 py-4 bg-gray-50/90 border border-gray-300 transition-all duration-200 hover:shadow-md shadow-sm rounded-md text-gray-950 "
      key={event.eventId}
    >
      <div className="flex flex-col w-max">
        <Link
          target="_blank"
          href={event.eventUrl}
          className="pr-4 text-xl font-black w-fit hover:underline underline-offset-2"
        >
          {event.title}
        </Link>
        <p>
          {event.location.Building}, {event.location.Town}
        </p>
        {/* <p className="mb-2">
          {event.date} from {event.time.start} to {event.time.end}
        </p> */}
        <Link
          href={event.eventUrl}
          className="text-sky-500"
          target="_blank"
          rel="noreferrer"
        >
          Visit Event Website
        </Link>
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-[0.375rem] text-xs transition-all duration-100 bg-gray-400 rounded-md hover:bg-gray-500 text-white w-min h-min"
      >
        {eventSaved ? "Unsave" : "Save"}
      </button>
    </div>
  );
}
