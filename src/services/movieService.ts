import axios from "axios";
import type { Movie } from "../types/movie";
interface HttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


export default async function searchMovies(data: string): Promise<HttpResponse> {
  axios.defaults.baseURL = "https://api.themoviedb.org";
  axios.defaults.headers.common["Authorization"] = import.meta.env.VITE_TMDB_TOKEN;
  axios.defaults.headers.common["accept"] = "application/json";

  return (
    await axios.get<HttpResponse>(
      `/3/search/movie?query=${data}&include_adult=false&language=en-US&page=1`
    )
  ).data;
}
