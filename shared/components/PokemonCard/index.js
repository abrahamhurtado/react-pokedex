import React from 'react';
import { Link } from 'react-router';
import PokemonTypes from '../PokemonTypes'
import capitalizeString from '../../utils/capitalizeString';
import displayName from '../../utils/changeName';
import leftPad from 'left-pad';
import styles from './PokemonCard.css';

function createPokemonBackground (pokemonId) {
  return {
    backgroundImage: `url('/static/sprites/${leftPad(pokemonId, 3, 0)}.png')`
  }
}

export default class PokemonCard extends React.Component {
  render () {
    return (
        <div className={ styles.pokemonCard }>
          <Link to={ `/pokemon/${this.props.pokemon.id}` }>
            <div className={ `${styles.pokemonCardImage} pokemon-${leftPad(this.props.pokemon.id, 3, 0)}` }></div>
            <div className={ styles.pokemonCardNumber }>
              <span style={{lineHeight: '40px'}}>{this.props.pokemon.id}</span>
              </div>
            <h3 className={ styles.pokemonCardName }>{displayName(capitalizeString(this.props.pokemon.name))}</h3>
          </Link>
          <PokemonTypes types={this.props.pokemon.types} />
        </div>
    )
  }
}
