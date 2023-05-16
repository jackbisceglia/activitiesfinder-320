import { API_URL } from "./vars";
import useFetch from "./useFetch";

type Opts = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useToggleSave = (opts?: Opts) => {
  const authedFetch = useFetch();

  const mutateSingleEvent = async (url: string, body?: RequestInit) => {
    console.log("mutateSingleEvent: ", url, body);
    const res = await authedFetch(url, body);
    const mutatedEvent = await res.json();

    return mutatedEvent;
  };

  const handleSave = async (id: number, action: "SAVE" | "UNSAVE") => {
    const url = `${API_URL}/users/event`;
    const body = JSON.stringify({ eventId: id });
    const method = {
      SAVE: "POST",
      UNSAVE: "DELETE",
    }[action];

    // unsave
    try {
      const mutatedEvent = await mutateSingleEvent(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
        body: body,
      });
      return mutatedEvent;
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  return { mutate: handleSave };
};

export default useToggleSave;
