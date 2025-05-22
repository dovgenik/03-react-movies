//import css from './App.module.css';
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal.tsx";
import movieService from "../../services/movieService.ts";
import SearchBar from "../SearchBar/SearchBar.tsx";

export default function App() {
  const handleSearch = (data: string) => {
    movieService(data);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSubmitSearchBar={handleSearch} />
      <button onClick={openModal}>Open modal</button>
      {isModalOpen && <MovieModal onClose={closeModal} />}
    </>
  );
}
