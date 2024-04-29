import Stats from "./Stats";
import PokemonImage from "./PokemonImage";

export default function PokemonCard({ pokemon }) {
  return (
    <li key={pokemon.id}>
      <div className="pokemon-card">
        <PokemonImage pokemon={pokemon} />
        <Stats pokemon={pokemon} />
      </div>
    </li>
  );
}
