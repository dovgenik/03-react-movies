//import { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmitSearchBar: (value:string)=> void;
}


export default function SearchBar({onSubmitSearchBar}: SearchBarProps) {   
 const handleSubmit = (formData: FormData) =>{

const queryStr= formData.get("query") as string;
if (queryStr === "") {
      alert("Please enter search topic!");
      return;
    }
 
onSubmitSearchBar(queryStr);
 }
 
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
