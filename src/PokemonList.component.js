import { useEffect, useState } from "react";

function PokemonList() {
  const [pokemons, setPokemons] = useState(null);
  useEffect(() => {
    fetchPokemons().then((p) => setPokemons(p));
  });
  if (!pokemons) return "...";
  return (
    <ul>
      {pokemons.map((p) => (
        <li key={p.id}>
          <span>{p.name}</span>
          <img alt={p.name} src={p.image} />
        </li>
      ))}
    </ul>
  );
}

function fetchPokemons() {
  const queryPokemons = `
  query pokemons($first: Int!){
    pokemons(first: $first){
      id
      number
      name
      image
    }
  }  `;

  return window
    .fetch("https://graphql-pokemon2.vercel.app", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        query: queryPokemons,
        variables: { first: 10 }
      })
    })
    .then((r) => r.json())
    .then((r) => r.data.pokemons);
}

export default PokemonList;
