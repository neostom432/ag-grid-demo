import { APIErrorSchema } from "@/schema";
import { toaster } from "@parte-ds/ui";
import { AxiosError } from "axios";

export const handleAPIError = (error: unknown) => {
  if (error instanceof AxiosError) {
    let errorMessage = "네트워크 에러가 발생 했습니다";
    let errorCode = "";
    let path = error.config?.url;
    if (error.response?.data) {
      const parseResult = APIErrorSchema.safeParse(error.response.data);
      if (parseResult.success) {
        const apiError = parseResult.data;
        if (apiError.message) errorMessage = apiError.message;
        if (apiError.errorCode) errorCode = apiError.errorCode;
        path = apiError.path;
      }
    }
    toaster.notify({
      status: "error",
      children: (
        <>
          {`${errorMessage} `}
          <br />
          code: {`${errorCode}`}
          <br />
          {`path: ${path}`}
        </>
      ),
      duration: 10000,
    });
  }
};
