export default function Stats({ pokemon }) {
  return (
    <div className="pokemon-card-parts">
      <h3>Abilities</h3>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability}</li>
        ))}
      </ul>
      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            {stat.name}: {stat.base}
          </li>
        ))}
      </ul>
    </div>
  );
}
