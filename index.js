'use strict';

var debug = require('debug')('string-packer');

module.exports = function (_ref) {
  var list = _ref.list;
  var binSize = _ref.binSize;
  var _ref$delimiter = _ref.delimiter;
  var delimiter = _ref$delimiter === undefined ? '' : _ref$delimiter;

  var packed = [];
  var copy = list.slice();

  debug('list: ' + list.length + ' elements | bin size is ' + binSize + ' | delimiter is ' + delimiter);

  // Shortest to longest word length
  copy.sort(function (a, b) {
    return a.length - b.length;
  });

  if (copy[0].length > binSize) {
    throw new Error('binSize is too small to fit any items');
  }

  var currentElementIndex = 0;
  var pack = '';

  copy.forEach(function (currentElement, currentElementIndex) {
    pack += currentElement;

    var next = copy[currentElementIndex + 1];

    var nextCanFit = next && pack.length + delimiter.length + next.length <= binSize;

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
