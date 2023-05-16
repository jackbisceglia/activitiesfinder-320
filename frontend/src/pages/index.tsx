import { EventCard, GenericEvent } from "@/components/EventCard";
import { useEffect, useReducer, useState } from "react";

import { API_URL } from "@/utils/vars";
import Link from "next/link";
import useFetch from "@/utils/useFetch";
import useToggleSave from "@/utils/useToggleSave";

const FindEventsPanel = ({ hasEvents }: { hasEvents: boolean }) => {
  const fullScreenStyle =
    " justify-center flex-grow items-center my-auto rounded-md bg-gradient-to-tr from-violet-500 to-sky-500 flex min-h-[30rem]";
  const singleColumnStyle =
    "flex items-center justify-center rounded-md bg-gradient-to-tr from-violet-500 to-sky-500 w-72";

  return (
    <div className={hasEvents ? singleColumnStyle : fullScreenStyle}>
      <Link
        href="preferences"
        className="px-6 py-3 font-medium transition-colors duration-300 rounded-md shadow-md bg-sky-100 hover:bg-sky-50"
      >
        {hasEvents ? "Find More Events" : "Find Events"}
      </Link>
    </div>
  );
};

export const useSavedEvents = () => {
  const [data, setData] = useState<GenericEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const authedFetch = useFetch();

  const fetchData = async () => {
    try {
      const res = await authedFetch(`${API_URL}/users/event`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  };

  const refetch = () => {
    fetchData();
  };

  const remove = (eventId: number) =>
    setData([...data.filter((e) => e.eventId !== eventId)]);

  useEffect(() => {
    fetchData();
  }, []);

  return { events: data, loading, error, refetch, remove };
};

// HOMEPAGE
export default function Home() {
  const { events, loading, error, refetch, remove } = useSavedEvents();
  const { mutate } = useToggleSave();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const onSave = async (eventId: number) => {
    try {
      const removedEvent = await mutate(eventId, "UNSAVE");
      remove(removedEvent?.event_id);
    } catch (e) {
      console.log(e);
    }
  };

  const EventList = () => (
    <div className="flex flex-col self-stretch flex-1 gap-4">
      {events.map((e) => (
        <EventCard
          key={e.eventId}
          event={e}
          eventSaved={true}
          onSave={onSave}
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
