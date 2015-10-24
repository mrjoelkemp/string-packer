'use strict';

var debug = require('debug')('string-packer');

module.exports = function (_ref) {
  var list = _ref.list;
  var binSize = _ref.binSize;
  var _ref$delimiter = _ref.delimiter;
  var delimiter = _ref$delimiter === undefined ? '' : _ref$delimiter;

  var packed = [];
  var copy = list.slice();

  debug('original list: ' + copy.join(' '));
  debug('list consists of ' + list.length + ' elements');
  debug('bin size is ' + binSize);
  debug('delimiter is ' + delimiter);

  // Shortest to longest word length
  copy.sort(function (a, b) {
    return a.length - b.length;
  });

  debug('length sorted list: ' + copy.join(' '));

  if (copy[0].length > binSize) {
    throw new Error('binSize is too small to fit any items');
  }

  var currentElementIndex = 0;
  var pack = '';

  copy.forEach(function (currentElement, currentElementIndex) {
    debug('packing current element ' + currentElement);

    pack += currentElement;
    debug('pack so far: ' + pack);

    var next = copy[currentElementIndex + 1];
    debug('next element is ' + next);

    var nextCanFit = next && pack.length + delimiter.length + next.length <= binSize;

    debug('can the next one fit? ' + nextCanFit);

    if (!nextCanFit) {
      debug('next one cannot fit');
      packed.push(pack);
      debug('packed results so far: ', packed);
      pack = '';
    } else {
      debug('adding delimiter');
      pack += delimiter;
      debug('packed delimiter: ' + pack);
    }

    debug('pack so far: ' + pack);
  });

  debug('packed results: ', packed);
  return packed;
};
