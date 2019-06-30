import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});
