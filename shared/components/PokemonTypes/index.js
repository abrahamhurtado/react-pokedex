import React from 'react';
import capitalizeString from '../../utils/capitalizeString';
import styles from './PokemonLabel.css';
let colors = require('../../utils/movesToTypes');

function getTypeLabelColor (type) {
  return {
    backgroundColor: `${colors[type]}`
  };
}

export default class PokemonType extends React.Component {
  render () {
    return (
      <ul
        className={ styles.PokemonLabelList }
      >
        {this.props.types.map(({ name }, i) => (
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
