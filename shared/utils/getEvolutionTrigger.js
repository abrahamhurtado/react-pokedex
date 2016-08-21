import entries from 'object.entries';

export default function getEvolutionTrigger (evolutionDetails) {
  if (!evolutionDetails) return [];
  return entries(evolutionDetails)
    .filter(function (x) { return x[1]; })
    .map(function (x) { return { [x[0]]: x[1] }; });
}
