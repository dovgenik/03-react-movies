import axios from "axios";
import { Movie } from "../types/movie";

export default async function movieService(data: string) {
  axios.defaults.baseURL = "https://api.themoviedb.org";
  axios.defaults.headers.common["Authorization"] =
    import.meta.env.VITE_TMDB_TOKEN;
  axios.defaults.headers.common["accept"] = "application/json";

  const response = await axios.get(
    `/3/search/movie?query=${data}&include_adult=false&language=en-US&page=1`
  );

  console.log("List:", response.data);
}
