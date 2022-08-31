import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },

  paramsSerializer: (param) =>
    queryString.stringify({ ...param, api_key: apiConfig.apiKey }),
});

axiosClient.interceptors.request.use(async (req) => req);
axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res;
    }
    return res;
  },
  (err) => {
    throw err;
  }
);

export default axiosClient;
