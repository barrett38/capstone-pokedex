export default function PokemonImage({ pokemon }) {
  return (
    <div>
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <h2>{pokemon.name}</h2>
    </div>
  );
}
