import React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "./Home.module.css";
import Card from "./Card";
import Search from "./Search";
import Dropdown from "./Dropdown";
import CardShimmer from "./CardShimmer";
import { useThemeContext } from "./../hooks/useThemeContext";

function Home() {
  const [inputText, setInputText] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [error, setError] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(false);

  function handlePokemonData(input) {
    setInputText(input);
  }

  const [isDark, setIsDark] = useThemeContext();

  useEffect(
    function () {
      async function fetchPokemonData() {
        try {
          const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=150"
          );
          const { results } = await response.json();

          const detailedPokemonData = results.map(async function (pokemon) {
            const resp = await fetch(`${pokemon.url}`);
            const data = await resp.json();
            return data;
          });
          const detailedData = await Promise.all(detailedPokemonData);
          setPokemonData(
            detailedData.filter(function (pokemon) {
              return pokemon.name
                .toLowerCase()
                .includes(inputText.toLowerCase());
            })
          );
          setAllPokemonData(detailedData);
          setLoading(false);
          window.scrollTo(0, 0);
        } catch (error) {
          console.log("Error in fetching data", error);
          setLoading(false);
          setError(true);
        }
      }
      fetchPokemonData();
    },
    [retryTrigger]
  );

  useEffect(
    function () {
      setPokemonData(
        allPokemonData.filter(function (pokemon) {
          return pokemon.name.toLowerCase().includes(inputText.toLowerCase());
        })
      );
    },
    [inputText]
  );

  useEffect(
    function () {
      setPokemonData(
        allPokemonData.filter(function (pokemon) {
          return pokemon.types.some(function (pokemonType) {
            return pokemonType.type.name
              .toLowerCase()
              .includes(filterType.toLowerCase());
          });
        })
      );
    },
    [filterType]
  );

  if (loading) {
    return (
      <>
        <main className={styles["home-main"]}>
          <div className={styles["search-field"]}>
            <Search handlePokemonData={handlePokemonData} />
            <Dropdown />
          </div>

          <div className={styles["countries-container"]}>
            < CardShimmer/>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <main className={styles["home-main"]}>

        <div className={styles["empty-container"]}>
          <div className={styles["error-box"]}>
            <h2 className={styles["error-title"]}>
              Oops! Something went wrong.
            </h2>
            <p className={styles["error-message"]}>
              We couldn’t load the country data. Please check your connection or
              try again later.
            </p>
            <button
              className={styles["retry-button"]}
              onClick={() => {
                setRetryTrigger((prev) => !prev);
                setError(false);
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={styles["home-main"]}>
        <div className={styles["search-field"]}>
          <Search handlePokemonData={handlePokemonData} />
          <Dropdown
            setFilterType={setFilterType}
            inputText={inputText}
          />
        </div>
        {pokemonData.length === 0 ? (
          <div className={styles["empty-container"]}>
            <h1>No such pokemon exists</h1>
          </div>
        ) : (
          <div className={styles["countries-container"]}>
            {pokemonData.map(function (pokemon) {
              return (
                <Card
                  img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  key={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types}
                  data={pokemon}
                  id={pokemon.id}
                />
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
