import React, {Component} from 'react';
import { Link } from 'react-router';
import capitalizeString from '../../utils/capitalizeString.js';
import styles from './PokemonLabel.css';
var colors = require('../../utils/movesToTypes.js');

function getTypeLabelColor (type) {
  return {
    backgroundColor: `${colors[type]}`
  }
}

export default class PokemonType extends Component {
  render() {
    return (
      <ul
        className={ styles.PokemonLabelList }
      >
        {this.props.types.reverse().map((typeObj, i) => (
          <Link
            to={ `/types/${typeObj.type.url.split("/").filter(x => Boolean(x)).pop()}` }
            key={ i }
          >
            <li
              style={ getTypeLabelColor(typeObj.type.name) }
              className={ styles.PokemonLabel }
            >
              {capitalizeString(typeObj.type.name)}
            </li>
          </Link>
        ))}
      </ul>
    );
  }
}
