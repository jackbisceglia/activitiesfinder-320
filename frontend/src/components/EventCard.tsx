import React, { useState } from "react";

export type GenericEvent = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  url: string;
  saved?: boolean;
};

type EventCardProps = {
  event: GenericEvent;
  showSaveButton?: boolean;
  onSave?: (event: GenericEvent) => void;
};

export function EventCard({ event, showSaveButton = false, onSave }: EventCardProps) {
  const [isSaved, setIsSaved] = useState(event.saved || false);

  const handleSave = () => {
    setIsSaved(true);
    if (onSave) {
      onSave(event);
    }
  };

  return (
    <div className={`border border-gray-200 p-4 rounded-md ${isSaved ? "bg-green-100" : ""}`}>
      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-500 mb-1">{event.location}</p>
      <p className="mb-2">
        {event.date} at {event.time}
      </p>
      <a href={event.url} className="text-blue-500" target="_blank" rel="noreferrer">
        Visit Event Website
      </a>
      {showSaveButton && !isSaved && (
        <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>
          Save
        </button>
      )}
    </div>
  );
}
