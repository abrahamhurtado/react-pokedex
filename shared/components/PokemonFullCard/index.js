import React from 'react';
import find from 'array-find';

import PokemonCard from '../PokemonCard';
import PokemonEvolutions from '../PokemonEvolutions';
import PokemonMoves from '../PokemonMoves';

import createPokemonObject from '../../utils/createPokemonObject';
import getEvolutionChain from '../../utils/getEvolutionChain';
import getPokemonMoves from '../../utils/getPokemonMoves';

export default class PokemonFullCard extends React.Component {
  static loadProps (location, cb) {
    Promise
      .all([
        fetch(`http://pokeapi.co/api/v2/pokemon/${Number(location.params.id)}`).then((r) => r.json()),
        fetch(`http://pokeapi.co/api/v2/pokemon-species/${Number(location.params.id)}`).then((r) => r.json())
      ])
      .then(function (results) {
        return Promise.all([
          results[0],
          results[1],
          fetch(results[1].evolution_chain.url).then((r) => r.json())
        ]);
      })
      .then(function (results) {
        let pokemon = {
          generalInformation: results[0],
          speciesInformation: results[1],
          evolutionChain: results[2]
        };

        cb(null, { pokemon });
      });
  }
  componentDidMount () {
    console.log(this.props.pokemon);
  }
  render () {
    let { name, id, types, abilities, stats, height, weight, moves } = this.props.pokemon.generalInformation;
    let { flavor_text_entries: descriptionTexts } = this.props.pokemon.speciesInformation;
    let { chain } = this.props.pokemon.evolutionChain;
    return (
      <div>
        <PokemonCard pokemon={ createPokemonObject(name, id, types) } />
        <h4>Description</h4>
        <p>{ find(descriptionTexts, function (description) {
          return description.language.name === "en"
        }).flavor_text }</p>
        <h4>Weight</h4>
        <p>{ weight / 10 } Kg.</p>
        <h4>Height</h4>
        <p>{ height / 10 } Mts.</p>
        <h4>Abilities</h4>
        <ul>
          { abilities.reverse().map((abilityObj, i) => (
            <li key={ i }>
              { abilityObj.ability.name } { abilityObj.is_hidden ? <span>(Hidden ability)</span> : <span /> }
            </li>
          ))}
        </ul>
        <h4>Stats</h4>
        <ul>
          { stats.reverse().map((statsObj, i) => (
            <li key={ i }>{ statsObj.stat.name }  ({ statsObj.base_stat })</li>
          )) }
        </ul>
        <h4>Moves</h4>
        <h5>Learned by leveling up</h5>
        <PokemonMoves moves={ getPokemonMoves(moves, 'level-up') } />
        <h5>Learned by TM/HM</h5>
        <PokemonMoves moves={ getPokemonMoves(moves, 'machine') } />
        <h5>Learned by tutor</h5>
        <PokemonMoves moves={ getPokemonMoves(moves, 'tutor') } />
        <h4>Evolutions</h4>
        <PokemonEvolutions evolutions={ getEvolutionChain(chain, []) } />
      </div>
    );
  }
}
