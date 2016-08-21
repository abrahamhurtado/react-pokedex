import React from 'react';
import leftPad from 'left-pad';
import displayName from '../../utils/changeName';
import capitalizeString from '../../utils/capitalizeString';

function NoEvolution ({ name }) {
  return <h2>{ capitalizeString(displayName(name)) } doesn't have an evolution</h2>;
}

function RenderEvolutions (pokemon, key) {
  return (
    <div key={ key }>
      <div
        style={ { width: 100, height: 100 } }
        className={ `pokemon-${leftPad(pokemon.id, 3, 0)}` }
      />
      <h3>{ capitalizeString(displayName(pokemon.name)) }</h3>
    </div>
  );
}

export default class PokemonEvolutions extends React.Component {
  componentDidMount () {
    console.log(this.props.evolutions);
  }
  render () {
    if (this.props.evolutions.length === 1) {
      return NoEvolution(this.props.evolutions[0]);
    } else {
      return (
        <div>
          { this.props.evolutions.map((pokemon, i) => (RenderEvolutions(pokemon, i))) }
        </div>
      );
    }
  }
}
