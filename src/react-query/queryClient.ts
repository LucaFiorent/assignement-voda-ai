import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { triggerToast } from "../stores/toastStore";

// create a custom error title based on the error
function createTitle(errorMessage: string, actionType: "query" | "mutate") {
  const action = actionType === "query" ? "fetch" : "update";

  // return a formatted error title
  return `Error - Could not ${action} data: ${
    errorMessage ?? "error connecting to server"
  }`;
}

// error handler that triggers a toast notification
function errorHandler(title: string) {
  triggerToast(title, "error");
}

// pre config default options for queryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, //10min
      gcTime: 900000, //15min
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    // error handler for queries that fail
    onError: (error) => {
      const title = createTitle(error.message, "query");
      errorHandler(title);
    },
  }),
  mutationCache: new MutationCache({
    // error handler for mutation that fail
    onError: (error) => {
      console.log("errrr", error);
      const title = createTitle(error.message, "mutate");
      errorHandler(title);
    },
  }),
});
