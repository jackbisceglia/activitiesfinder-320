import { useAuth } from "@clerk/nextjs";

export default function useFetch() {
  const { getToken } = useAuth();

  const authenticatedFetch = async (url: string, body?: RequestInit) => {
    return fetch(url, {
      ...body,
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        ...body?.headers,
      },
    });
  };

  return authenticatedFetch;
}
