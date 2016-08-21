export default function getTypes (types) {
  return types.map((typeObj) => {
    return {
      name: typeObj.type.name
    };
  }).reverse();
}
