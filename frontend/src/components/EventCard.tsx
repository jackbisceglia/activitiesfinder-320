export type GenericEvent = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
};

type EventCardProps = {
  event: GenericEvent;
  eventSaved: boolean;
  removeEvent: (id: string) => void;
};

export const EventCard = ({
  event,
  eventSaved,
  removeEvent,
}: EventCardProps) => {
  const buttonTerm = eventSaved ? "Remove" : "Save";

  // wrap handler with id context
  const handleRemoveEvent = () => removeEvent(event.id);

  return (
    <div
      className="grid grid-cols-[auto_auto] place-items-start place-content-between px-6 py-4 bg-gray-50/90 border border-gray-300  shadow-sm rounded-md text-gray-950"
      key={event.id}
    >
      <div className="flex flex-col w-max">
        <p className="text-xl font-black">{event.title}</p>
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
