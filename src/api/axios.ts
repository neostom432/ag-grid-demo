import axios from "axios";
import qs from "query-string";

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { arrayFormat: "comma" });
};
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
