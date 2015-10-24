const debug = require('debug')('string-packer');

module.exports = function({list, binSize, delimiter = ''}) {
  let packed = [];
  let copy = list.slice();

  debug(`list: ${list.length} elements | bin size is ${binSize} | delimiter is ${delimiter}`);

  // Shortest to longest word length
  copy.sort((a, b) => a.length - b.length);

  if (copy[0].length > binSize) {
    throw new Error('binSize is too small to fit any items');
  }

  let currentElementIndex = 0;
  let pack = '';

  copy.forEach((currentElement, currentElementIndex) => {
    pack += currentElement;

    let next = copy[currentElementIndex + 1];

    let nextCanFit = next && pack.length + delimiter.length + next.length <= binSize;

    if (!nextCanFit) {
      packed.push(pack);
      pack = '';
    } else {
      pack += delimiter;
    }
  });

  debug('packed results: ', packed);
  return packed;
};