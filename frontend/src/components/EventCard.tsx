import React, { useState } from "react";

import { API_URL } from "@/utils/vars";
import Link from "next/link";
import useFetch from "@/utils/useFetch";
import useToggleSave from "@/utils/useToggleSave";

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
  dateTime: {
    startTime: string;
    endTime: string;
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
  eventSaved?: boolean;
  onSave: (id: number, action: "SAVE" | "UNSAVE") => void;
};

export function EventCard({ event, eventSaved, onSave }: EventCardProps) {
  const isPassed = new Date(event.dateTime.startTime) < new Date();
  return (
    <div
      className="hover:border-gray-400/60 hover:pl-8 text-left grid grid-cols-[auto_auto] place-items-start place-content-between px-6 py-4 bg-gray-50/90 border border-gray-300 transition-all duration-300 hover:shadow-md shadow-sm rounded-md text-gray-950 "
      key={event.eventId}
    >
      <div className="flex flex-col w-max">
        <Link
          target="_blank"
          href={event.eventUrl}
          className="py-0.5 pr-4 text-xl font-black w-fit hover:underline underline-offset-2"
        >
          {event.title}
        </Link>
        <p className="capitalize">
          {event.location.Building}, {event.location.Town}
        </p>
        <p className="mb-2">
          <span className="font-bold text-transparent bg-gradient-to-tr from-violet-500 to-sky-600 bg-clip-text">
            {new Date(event.dateTime.startTime).toDateString()},{" "}
          </span>
          {new Date(event.dateTime.startTime).toLocaleTimeString()}
        </p>
      </div>
      <button
        onClick={() => onSave(event.eventId, eventSaved ? "UNSAVE" : "SAVE")}
        disabled={isPassed}
        className={`${
          eventSaved
            ? "bg-gray-400 hover:bg-gray-500"
            : "bg-gradient-to-tr from-violet-500 to-sky-500 text-neutral-100"
        } disabled:bg-gray-300 disabled:bg-gradient-to-t disabled:from-gray-300 disabled:via-gray-300  disabled:to-gray-300 px-4 py-[0.375rem] text-xs transition-all duration-100 bg-gray-400 rounded-md  text-white w-min h-min hover:shadow-md shadow-black`}
      >
        {eventSaved ? "Unsave" : "Save"}
      </button>
    </div>
  );
}
