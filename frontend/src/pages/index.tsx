import { useEffect, useState } from "react";

import Link from "next/link";

type Event = {
  id: number;
  title: string;
  location: string;
  // change to Date type
  date: string;
  time: string;
};

const mockEvents = [
  {
    id: 1,
    title: "Event 1",
    location: "Event 1 location",
    date: "Event 1 date",
    time: "Event 1 time",
  },
  {
    id: 2,
    title: "Event 2",
    location: "Event 2 location",
    date: "Event 2 date",
    time: "Event 2 time",
  },
  {
    id: 3,
    title: "Event 3",
    location: "Event 3 location",
    date: "Event 3 date",
    time: "Event 3 time",
  },
  {
    id: 4,
    title: "Event 4",
    location: "Event 4 location",
    date: "Event 4 date",
    time: "Event 4 time",
  },
  {
    id: 5,
    title: "Event 5",
    location: "Event 5 location",
    date: "Event 5 date",
    time: "Event 5 time",
  },
];

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // WILL FETCH FROM LOCAL STORAGE IN FUTURE
    const fetchEvents = async () => {
      setLoading(true);
      setEvents(() => mockEvents);
      // setEvents(() => []);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

const FindEventsPanel = ({ hasEvents }: { hasEvents: boolean }) => {
  const buttonText = hasEvents ? "Find More Events" : "Find Events";

  const fullScreenStyle =
    " justify-center items-center my-auto rounded-md bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 flex w-full min-h-[25rem]";
  const singleColumnStyle =
    "flex items-center justify-center rounded-md bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 w-72";

  const divStyle = hasEvents ? singleColumnStyle : fullScreenStyle;

  return (
    <div className={divStyle}>
      <Link
        href="results"
        className="px-6 py-3 font-medium transition-colors duration-300 rounded-md shadow-md bg-sky-100 hover:bg-sky-50"
      >
        {buttonText}
      </Link>
    </div>
  );
};

const EventsList = ({ events }: { events: Event[] }) => {
  return (
    <div className="flex flex-col flex-1 w-auto gap-4">
      {events.map((e) => (
        <div
          className="flex flex-col px-6 py-4 bg-gray-600 rounded-md text-neutral-300"
          key={e.id}
        >
          <p className="text-xl font-black">{e.title}</p>
          <p>{e.location}</p>
          <p>{e.date}</p>
          <p>{e.time}</p>
        </div>
      ))}
    </div>
  );
};

// HOMEPAGE
export default function Home() {
  const { events, loading, error } = useEvents();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="flex flex-col gap-4 py-12 sm:flex-row ">
      {events.length ? (
        <>
          <EventsList events={events} />
          <FindEventsPanel hasEvents={true} />
        </>
      ) : (
        <FindEventsPanel hasEvents={false} />
      )}
    </div>
  );
}
