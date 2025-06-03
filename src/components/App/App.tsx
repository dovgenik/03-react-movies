import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal.tsx";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import searchMovies from "../../services/movieService.ts";
import SearchBar from "../SearchBar/SearchBar.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import Loader from "../Loader/Loader.tsx";

const notify = () =>
  toast((t) => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <span>
        <span style={{ color: "#c678dd" }}>No </span>movies{" "}
        <span style={{ color: "#e6c07b" }}>found</span>{" "}
        <span style={{ color: "#c678dd" }}>for</span> your request.
      </span>
      <button onClick={() => toast.dismiss(t.id)}>Close</button>
    </div>
  ));

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseData, setResponseData] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (data: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await searchMovies(data);
      setResponseData(result.results);
      if (result.results.length === 0) {
        notify();
      }
    } catch (error) {
      setIsError(true);
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (selectedMovie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(selectedMovie);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={openModal} movies={responseData} />
      )}

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster />
    </>
  );
}
