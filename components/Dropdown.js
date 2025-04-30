import { useState, useEffect } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ setFilterType, inputText }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("Filter by Type");

  function handleDropdownMenu() {
    setIsOpen(!isOpen);
  }

  function handleOption(e) {
    if (e.currentTarget.innerText === "All") {
      setFilterType("");
      setFilter(e.currentTarget.innerText);
    } else {
      setFilterType(e.currentTarget.innerText);
      setFilter(e.currentTarget.innerText);
    }
  }

  useEffect(
    function () {
      setFilter("Filter by Type");
    },
    [inputText]
  );

  return (
    <>
      <div
        className={styles["dropdown-container"]}
        onClick={handleDropdownMenu}
      >
        <span className="filter">{filter}</span>
        <i className="fa-solid fa-chevron-down"></i>
        <ul
          className={
            isOpen ? styles["dropdown-menu-open"] : styles["dropdown-menu"]
          }
        >
          <li onClick={handleOption}>All</li>
          <li onClick={handleOption}>Grass</li>
          <li onClick={handleOption}>Poison</li>
          <li onClick={handleOption}>Fire</li>
          <li onClick={handleOption}>Water</li>
          <li onClick={handleOption}>Flying</li>
          <li onClick={handleOption}>Bug</li>
          <li onClick={handleOption}>Normal</li>
          <li onClick={handleOption}>Ground</li>
          <li onClick={handleOption}>Electric</li>
          <li onClick={handleOption}>Dragon</li>
          <li onClick={handleOption}>Psychic</li>
          <li onClick={handleOption}>Rock</li>
          <li onClick={handleOption}>Ice</li>
          <li onClick={handleOption}>Fairy</li>
          <li onClick={handleOption}>Fighting</li>
          <li onClick={handleOption}>Ghost</li>
          <li onClick={handleOption}>Steel</li>
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
