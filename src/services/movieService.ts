import axios from "axios";
import type { Movie, InitAxios } from "../types/movie";
interface HttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function movieService(data: string, {baseURL, authorization, accept}: InitAxios): Promise<HttpResponse> {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common["Authorization"] = authorization;
  axios.defaults.headers.common["accept"] = accept;

  return (
    await axios.get<HttpResponse>(
      `/3/search/movie?query=${data}&include_adult=false&language=en-US&page=1`
    )
  ).data;
}
