export const mockApi = <T>(mockData: T, occurError = false, ms = 500): Promise<APIData<T>> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (occurError) reject({ status: 400, error: "error ocurred" });
      resolve({ data: mockData, status: 200 });
    }, ms);
  });

export const isApiError = (error: unknown): error is APIError => !!error && typeof error === "object" && "status" in error && typeof error.status === "number";
