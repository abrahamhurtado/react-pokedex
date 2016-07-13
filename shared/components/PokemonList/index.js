import React from 'react';
import 'isomorphic-fetch';
import PokemonCard from '../PokemonCard';

import range from '../../utils/range';
var pokemonNames = require('../../data/pokemonNames.json');
var pokemonTypes = require('../../data/pokemonTypes.json');

function createInitialState (pokemonNameList, pokemonIdList, pokemonTypeList) {
  return pokemonIdList.map((id) => ({
    name: pokemonNameList[id - 1],
    id,
    types: pokemonTypeList[id - 1]
  }));
}


export default class PokemonList extends React.Component {
  constructor () {
    super();
    this.state = {
      pokemon: createInitialState(pokemonNames, range(1, 722), pokemonTypes)
    };
  }
  componentDidMount () {
   console.log('Se renderizó el componente =)');
  }
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        {this.state.pokemon.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={ pokemon }
          />
        ))}
      </div>
    )
  }
}
