#### string-packer [![npm](http://img.shields.io/npm/v/string-packer.svg)](https://npmjs.org/package/string-packer) [![npm](http://img.shields.io/npm/dm/string-packer.svg)](https://npmjs.org/package/string-packer)

> First-fit bin packing to turn a list into delimiter-separated strings

`npm install string-packer`

Built this to optimize the batching of data within an http get request.
i.e., if you have a list of items that need to fit into a url, squeeze them in there.

You tell it the list of items, the maximum size of the generated string, optionally
supply a delimiter for separating the elements, and you'll get back a list of
packed strings.

* The algorithm first sorts a copy of the list to pack the shortest strings first.

#### Usage

Returns a list of packed strings.

```js
const packer = require('string-packer');

const results = packer({
  list: ['foo', 'bar', 'car'],
  binSize: 7,
  delimiter: ',' // optional (default is an empty string)
});

console.log(results); // ['foo,bar', 'car']
```

* Throws if the `binSize` is too small to fit any items.

###### Sorted example (packing the smallest items first):

```js
const packer = require('string-packer');

const results = packer({
  list: ['food', 'bar', 'do'],
  binSize: 6
});

console.log(results); // ['bardo', 'food']
```

#### License:

MIT