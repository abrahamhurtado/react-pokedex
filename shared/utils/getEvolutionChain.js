import getIdFromURL from './getIdFromURL';
import getEvolutionTrigger from './getEvolutionTrigger';

export default function getEvolutionChain (actualPokemon, evolutionChain, deepLevel) {
  var deep = deepLevel ? deepLevel : 1;
  if (!actualPokemon) {
    return evolutionChain;
  }
  evolutionChain.push({
    name: actualPokemon.species.name,
    id: getIdFromURL(actualPokemon.species.url),
    details: getEvolutionTrigger(actualPokemon.evolution_details[0]),
    deepLevel: deep
  });
  if (actualPokemon.evolves_to.length > 1) {
    deep++;
    actualPokemon.evolves_to.forEach((evolution) => {
      evolutionChain.push({
        name: evolution.species.name,
        id: getIdFromURL(evolution.species.url),
        details: getEvolutionTrigger(evolution.evolution_details[0]),
        deepLevel: deep
      });
      return evolutionChain;
    });
  }
  if (actualPokemon.evolves_to.length === 1) {
    return getEvolutionChain(actualPokemon.evolves_to[0], evolutionChain, deep + 1);
  } else {
    return evolutionChain;
  }
}
