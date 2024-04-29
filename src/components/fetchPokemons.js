const numOfPokemons = 150;

async function fetchPokemons(
  numOfPokemons,
  setLoadedPokemons,
  setIsLoading,
  setError,
  filterFunction
) {
  const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=";

  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(`${API_URL}${numOfPokemons}`);

    const data = await response.json();
    let pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonDataResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonDataResponse.json();
        return {
          id: pokemonData.id,
          name: pokemon.name,
          image: pokemonData.sprites.front_default,
          abilities: pokemonData.abilities.map((a) => a.ability.name),
          stats: pokemonData.stats.map((s) => ({
            name: s.stat.name,
            base: s.base_stat,
          })),
          types: pokemonData.types.map((t) => t.type.name),
        };
      })
    );

    // Apply the filter function if one was provided
    if (filterFunction) {
      pokemons = pokemons.filter(filterFunction);
    }

    setLoadedPokemons(pokemons);
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
}

export { fetchPokemons, numOfPokemons };
