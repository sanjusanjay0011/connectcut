import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errMsg;
    try {
      const data = await res.json();
      errMsg = data.message || res.statusText;
    } catch (e) {
      errMsg = res.statusText;
    }
    throw new Error(errMsg);
  }
}

export async function apiRequest<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, init);
  await throwIfResNotOk(res);

  return await res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn = <T>(options: {
  on401: UnauthorizedBehavior;
}) => async ({ queryKey, }: { queryKey: readonly unknown[] }) => {
  const [endpoint] = queryKey;
  try {
    const res = await fetch(endpoint as string);
    
    if (res.status === 401) {
      if (options.on401 === "returnNull") {
        return null as T;
      } else {
        throw new Error("Unauthorized");
      }
    }
    
    await throwIfResNotOk(res);
    return await res.json() as T;
  } catch (e) {
    if ((e as Error).message === "Unauthorized") {
      throw e;
    }
    console.error(`Error fetching from ${endpoint}:`, e);
    throw new Error(`Error fetching data: ${(e as Error).message}`);
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
