import React from 'react';
import Helmet from 'react-helmet';
import { InfiniteLoader, VirtualScroll } from 'react-virtualized';
import 'isomorphic-fetch';
import 'react-virtualized/styles.css';
import PokemonCard from '../PokemonMin'

let list = [
  'Abraham Hurtado',
  'Diego Hurtado',
  'Rolando Valenzuela',
  'Ramón Ramirez'
];

// function isRowLoaded ({ index }) {
//   return !!list[index];
// }
//
// function loadMoreRows ({ startIndex, stopIndex }) {
//   return fetch(`http://pokeapi.co/api/v2/pokemon/?limit=${stopIndex - startIndex}&offset=${startIndex}`)
//     .then(response => response.json())
//     .then(pokemon => {
//       return Promise.all(
//         pokemon.results.map(x => fetch(x.url).then(r => r.json()))
//       )
//     })
//     .then(pokemonList => {
//       console.log(pokemonList);
//       pokemonList.forEach(pokemon => {
//         list.splice(pokemon.id, 0, pokemon)
//       });
//     });
// }

export default class PokemonList extends React.Component {
  static loadProps (params, cb) {
    fetch ('http://pokeapi.co/api/v2/pokemon/?limit=30')
      .then(response => response.json())
      .then(pokelist => Promise.all(
        pokelist.results.map(pokemon => fetch(pokemon.url).then(r => r.json()))
      ))
      .then(pokemonList => cb(null, {
        pokemon: pokemonList.map(pokemon => ({
          name: pokemon.name,
          sprite: pokemon.sprites.front_default,
          id: pokemon.id,
          types: pokemon.types
        }))
      }))
  }
  render () {
    return (
      <div>
        {this.props.children}
        <div>
        {this.props.pokemon.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={ pokemon }
          />
        ))}
        </div>
        <Helmet title="Pokédex" />
      </div>
    )
  }
}
