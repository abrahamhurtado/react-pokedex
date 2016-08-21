export default function getPokemonMoves (moves, stringTest) {
  return moves
    .filter(function (moveObj) {
      return moveObj.version_group_details.filter(function (x) {
        return x.version_group.name === 'omega-ruby-alpha-sapphire';
      }).length;
    })
    .filter(function (x) {
      return x.version_group_details[x.version_group_details.length - 1].move_learn_method.name === stringTest;
    })
    .sort(function (x, y) {
      let xlg = x.version_group_details[x.version_group_details.length - 1];
      let ylg = y.version_group_details[y.version_group_details.length - 1];
      return xlg.level_learned_at - ylg.level_learned_at;
    });
}
