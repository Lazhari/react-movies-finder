import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

client.interceptors.request.use(
  function(config) {
    // Do something before request is sent

    return {
      ...config,
      params: {
        api_key: "fed69657ba4cc6e1078d2a6a95f51c8c",
        language: "en-US"
      }
    };
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
