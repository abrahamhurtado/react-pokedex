module.exports = function range (maxOrMin, max, pattern) {
  let array = [];
  if (max && pattern) {
    for (let i = maxOrMin; i < max; i += pattern) {
      array.push(i);
    }
    return array;
  }
  if (max) {
    for (let i = maxOrMin; i < max; i++) {
      array.push(i);
    }
    return array;
  }
  for (let i = 0; i < maxOrMin; i++) {
    array.push(i);
  }
  return array;
};
