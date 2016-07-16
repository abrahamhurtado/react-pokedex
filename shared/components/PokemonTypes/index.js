import React from 'react';
import capitalizeString from '../../utils/capitalizeString.js';
import styles from './PokemonLabel.css';
var colors = require('../../utils/movesToTypes.js');

function getTypeLabelColor (type) {
  return {
    backgroundColor: `${colors[type]}`
  }
}

export default class PokemonType extends React.Component {
  render() {
    return (
      <ul
        className={ styles.PokemonLabelList }
      >
        {this.props.types.map(({id, name}, i) => (
            <li
              style={ getTypeLabelColor(name) }
              className={ styles.PokemonLabel }
              key={ i }
            >
              {capitalizeString(name)}
            </li>
        ))}
      </ul>
    );
  }
}
