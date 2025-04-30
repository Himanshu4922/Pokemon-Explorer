import React from "react";
import styles from "./Search.module.css";
import { useState } from "react";

function Search({ handlePokemonData }) {

  function handleInputChange(e) {
    e.currentTarget.value = e.currentTarget.value.trimStart();
    handlePokemonData(e.currentTarget.value);
  }
  return (
    <>
      <div className={styles["input-container"]}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for a pokemon..."
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default Search;
