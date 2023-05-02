import { useEffect, useReducer, useState } from "react";

import { GenericEvent } from "@/components/EventCard";

export type EventActions =
  | { type: "REMOVE"; payload: { id: number } }
  | { type: "ADD"; payload: { event: GenericEvent } }
  | { type: "LOAD_ALL" };

const eventReducer = (
  events: GenericEvent[],
  action: EventActions
): GenericEvent[] => {
  switch (action.type) {
    case "REMOVE":
      const filteredEvents = events.filter(
        (e) => e.eventId !== action.payload.id
      );
      localStorage.setItem("events", JSON.stringify(filteredEvents));
      return filteredEvents;
    case "ADD":
      const newEvents = [...events, action.payload.event];
      localStorage.setItem("events", JSON.stringify(newEvents));
      return newEvents;
    case "LOAD_ALL":
      return JSON.parse(localStorage.getItem("events") ?? "[]");
    default:
      return events;
  }
};

// Event State
export const useEventState = (defaultEvents?: GenericEvent[]) => {
  const [events, dispatchEvents] = useReducer(
    eventReducer,
    defaultEvents ?? []
  );
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

    if (!defaultEvents) {
      fetchEvents();
    }
  }, []);

  return { events, loading, error, eventStateDispatch: dispatchEvents };
};
