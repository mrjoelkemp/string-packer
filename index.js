const debug = require('debug')('string-packer');

module.exports = function({list, binSize, delimiter = ''}) {
  let packed = [];
  let copy = list.slice();

  debug(`original list: ${copy.join(' ')}`);
  debug(`list consists of ${list.length} elements`);
  debug(`bin size is ${binSize}`);
  debug(`delimiter is ${delimiter}`);

  // Shortest to longest word length
  copy.sort((a, b) => a.length - b.length);

  debug(`length sorted list: ${copy.join(' ')}`);

  if (copy[0].length > binSize) {
    throw new Error('binSize is too small to fit any items');
  }

  let currentElementIndex = 0;
  let pack = '';

  while (true) {
    const currentElement = copy[currentElementIndex];
    debug(`packing current element ${currentElement}`);

    pack += currentElement;
    debug(`pack so far: ${pack}`);

    let next = copy[currentElementIndex + 1];
    debug(`next element is ${next}`);

    let nextCanFit = next && pack.length + delimiter.length + next.length <= binSize;

    debug(`can the next one fit? ${nextCanFit}`);

    if (!nextCanFit) {
      debug('next one cannot fit');
      packed.push(pack);
      debug('packed results so far: ', packed);
      pack = '';
    } else {
      debug('adding delimiter');
      pack += delimiter;
      debug(`packed delimiter: ${pack}`);
    }

    debug(`pack so far: ${pack}`);

    currentElementIndex += 1;

    if (currentElementIndex === copy.length) {
      debug(`should stop? true`);
      break;
    }
  }

  debug('packed results: ', packed);
  return packed;
};