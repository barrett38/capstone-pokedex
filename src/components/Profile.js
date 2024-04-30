import { useContext, useEffect, useState, useCallback } from "react";
import AuthContext from "../store/authContext";

const Profile = () => {
  const {
    state: { userId, token },
  } = useContext(AuthContext);

  const [randomPokemon, setRandomPokemon] = useState(null);

  const fetchRandomPokemon = useCallback(async () => {
    const totalNumOfPokemons = 150;
    const randomId = Math.floor(Math.random() * totalNumOfPokemons) + 1;
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    try {
      const response = await fetch(API_URL);
      const pokemonData = await response.json();

      const pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
        abilities: pokemonData.abilities.map((a) => a.ability.name),
        stats: pokemonData.stats.map((s) => ({
          name: s.stat.name,
          base: s.base_stat,
        })),
        types: pokemonData.types.map((t) => t.type.name),
      };

      setRandomPokemon(pokemon);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchRandomPokemon();
  }, [fetchRandomPokemon]);

  return (
    <main>
      {randomPokemon ? (
        <div>
          <h1>Your random Pokemon is: {randomPokemon.name}</h1>
          <img src={randomPokemon.image} alt={randomPokemon.name} />
          <p>Abilities: {randomPokemon.abilities.join(", ")}</p>
          <p>Types: {randomPokemon.types.join(", ")}</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
};

export default Profile;
