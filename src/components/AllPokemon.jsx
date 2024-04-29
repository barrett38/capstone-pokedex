import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import PokemonCard from "./pokemonCard.jsx";
import { fetchPokemons, numOfPokemons } from "./fetchPokemons.js";

function createStatComponent(stat, title) {
  const statLevel = 110;

  return function StatComponent() {
    const [loadedPokemons, setLoadedPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      let filterFunction;
      if (stat !== "all") {
        filterFunction = (pokemon) =>
          pokemon.stats.some((s) => s.name === stat && s.base >= statLevel);
      }
      fetchPokemons(
        numOfPokemons,
        setLoadedPokemons,
        setIsLoading,
        setError,
        filterFunction
      );
    }, []);

    if (isLoading) {
      return <div id="loading-header">Loading...</div>;
    }

    if (error) {
      return <div id="loading-header">Error: {error}</div>;
    }

    return (
      <div>
        <h3 id="component-header">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h3>

        <NavBar />
        <ul id="pokemons">
          {loadedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </ul>
      </div>
    );
  };
}

/////////////////////////////////
/// RUNNING FOR EACH STAT //////
///////////////////////////////

export const AllPokemon = createStatComponent("all", "All Pokemon");
export const BestAttacks = createStatComponent("attack", "Best Attacks");
export const BestSpeed = createStatComponent("speed", "Best Speed");
export const BestEndurance = createStatComponent("hp", "Best Endurance");
export const BestDefense = createStatComponent("defense", "Best Defense");
