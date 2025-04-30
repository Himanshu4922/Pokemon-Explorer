import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router";

function Card({ img, name, types, data, id }) {
  const pokemonTypes =
    types &&
    types.map(function (pokemonType, index) {
      return (
        pokemonType.type.name.charAt(0).toUpperCase() +
        pokemonType.type.name.slice(1)
      );
    });
  return (
    <>
      <div state={data} className={styles["card"]}>
        <img src={img} alt={name} />
        <div className={styles["card-text-content"]}>
          <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
          <p>
            Types : <span>{pokemonTypes && pokemonTypes.join(" , ")}</span>
          </p>
          <p>
            ID : <span>{id}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
