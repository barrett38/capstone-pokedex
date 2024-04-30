const { Pokemon } = require("./fetchRandomPokemon");

async function fetchRandomPokemon(userId) {
  const totalNumOfPokemons = 150;
  const randomId = Math.floor(Math.random() * totalNumOfPokemons) + 1;
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  try {
    const response = await fetch(API_URL);
    const pokemonData = await response.json();

    const pokemon = {
      pokemonId: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      abilities: pokemonData.abilities.map((a) => a.ability.name),
      stats: pokemonData.stats.map((s) => ({
        name: s.stat.name,
        base: s.base_stat,
      })),
      types: pokemonData.types.map((t) => t.type.name),
      userId: userId,
    };

    // Save the Pokemon to the database
    await Pokemon.upsert(pokemon);

    console.log(`Stored Pokemon ${pokemon.name} for user ${userId}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function with a specific userId
fetchRandomPokemon(1);
