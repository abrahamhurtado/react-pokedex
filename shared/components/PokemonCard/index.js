import React from 'react';
import { Link } from 'react-router';
import PokemonTypes from '../PokemonTypes'
import capitalizeString from '../../utils/capitalizeString';
import styles from './PokemonCard.css';

function createPokemonBackground (pokemonName) {
  return {
    backgroundImage: `url('http://www.smogon.com/dex/media/sprites/xy/${pokemonName}.gif')`,
    backgroundPosition: "center center",
    backgroundRepeat: 'no-repeat',
  }
}

export default class PokemonCard extends React.Component {
  render () {
    return (
        <div className={ styles.pokemonCard }>
          <Link to={ `/pokemon/${this.props.pokemon.id}` }>
            <div style={ createPokemonBackground(this.props.pokemon.name) } className={ styles.pokemonCardImage }></div>
            <div className={ styles.pokemonCardNumber }>
              <span style={{lineHeight: '40px'}}>{this.props.pokemon.id}</span>
              </div>
            <h3 className={ styles.pokemonCardName }>{capitalizeString(this.props.pokemon.name)}</h3>
          </Link>
          <PokemonTypes types={this.props.pokemon.types} />
        </div>
    )
  }
}
