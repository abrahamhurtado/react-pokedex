import React from 'react';
import PokemonTypes from '../PokemonTypes'
import capitalizeString from '../../utils/capitalizeString';
import styles from './PokemonCard.css';

function createPokemonBackground (pokemonName) {
  return {
    backgroundImage: `url('http://www.smogon.com/dex/media/sprites/xy/${pokemonName}.gif')`,
    backgroundPosition: "center center",
    backgroundRepeat: 'no-repeat',
    width: 100,
    height: 100,
    margin: '0 auto 2px',
    border: '1px solid #f7f7f7',
    borderRadius: '100%'
  }
}

export default class PokemonCard extends React.Component {
  render () {
    return (
      <div className={ styles.pokemonCard }>
        <div style={ createPokemonBackground(this.props.pokemon.name) }></div>
        <div className={ styles.pokemonCardNumber }>
          <span style={{lineHeight: '40px'}}>{this.props.pokemon.id}</span>
        </div>
        <h3 className={ styles.pokemonCardName }>{capitalizeString(this.props.pokemon.name)}</h3>
        <PokemonTypes types={this.props.pokemon.types} />
      </div>
    )
  }
}
