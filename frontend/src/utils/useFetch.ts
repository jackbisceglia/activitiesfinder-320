import { useAuth } from "@clerk/nextjs";

export default function useFetch() {
  const { getToken } = useAuth();

  const authenticatedFetch = async (url: string, body?: RequestInit) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        ...body?.headers,
      },
      ...body,
    });

  return authenticatedFetch;
}
