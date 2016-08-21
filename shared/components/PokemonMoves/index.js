import React from 'react';

export default class PokemonMoves extends React.Component {
  componentDidMount () {
    // console.log('moves', this.props.moves);
  }
  render () {
    return (
      <ul>
        {this.props.moves.map((moveDetails, i) => {
          let lastGenInfo = moveDetails.version_group_details[moveDetails.version_group_details.length - 1];
          return (
            <li key={ i }>
              <span>{lastGenInfo.level_learned_at ? lastGenInfo.level_learned_at : "—"}</span>
              <span>{moveDetails.move.name}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}
