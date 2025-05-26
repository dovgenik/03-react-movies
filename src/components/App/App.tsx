//import css from './App.module.css';
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal.tsx";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import movieService from "../../services/movieService.ts";
import SearchBar from "../SearchBar/SearchBar.tsx";

const notify = () =>
  toast((t) => (
    <span>
      No movies found for your request.
      <button onClick={() => toast.dismiss(t.id)}>Close x</button>
    </span>
  ));

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseData, setResponseData] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  const handleSearch = async (data: string) => {
    try {
      const result = await movieService(data);
      setResponseData(result.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      
    }
  };

  const openModal = (selectedMovie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(selectedMovie);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSubmitSearchBar={handleSearch} />
      <MovieGrid onSelect={openModal} movies={responseData} />
      {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </>
  );
}
