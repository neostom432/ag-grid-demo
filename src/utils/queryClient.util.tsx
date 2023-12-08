import { toaster } from "@parte-ds/ui";
import { DefaultOptions, MutationCache, QueryCache } from "@tanstack/react-query";
import { ZodError } from "zod";
import { handleAPIError } from "./error.util";

export const SuspenseOptions = {
  suspense: true,
  useErrorBoundary: true,
};

export const queryCache = new QueryCache({
  onError: (error, query) => {
    if (error instanceof ZodError) {
      const errorFields = error.issues.map(({ path }) => path).join(", ");
      toaster.notify({
        status: "error",
        children: (
          <>
            {`스키마 에러가 발생했습니다. ${errorFields}를 확인 해주세요.`}
            <br />
            {`해당 parsing error는 ${query.queryKey}에서 발생했습니다`}
          </>
        ),
        duration: 10000,
      });
    }
    handleAPIError(error);
  },
});

export const mutationCache = new MutationCache({
  onError: (error) => {
    handleAPIError(error);
  },
});

export const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};
