import getTypes from './getTypes';

export default function createPokemonObject (name, id, types) {
  return {
    name,
    id,
    types: getTypes(types)
  };
}
