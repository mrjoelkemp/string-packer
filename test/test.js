const packer = require('../src');
const assert = require('assert');

describe('packer', function() {
  beforeEach(function() {
    this.list = ['foo', 'bar', 'car'];
  });

  it('packs a list into strings of a max size', function() {
    const results = packer({
      list: this.list,
      binSize: 9
    });

    assert.equal(results.length, 1);
    assert.equal(results[0], this.list.join(''));
  });

  it('can fit multiple strings into a single bin', function() {
    const results = packer({
      list: this.list,
      // Two elements plus a delimiter
      binSize: 7,
      delimiter: ','
    });

    assert.equal(results.length, 2);
    assert.equal(results[0], this.list.slice(0, 2).join(','));
    assert.equal(results[1], this.list[2]);
  });

  it('supports a per-element delimiter', function() {
    const results = packer({
      list: this.list,
      binSize: 11,
      delimiter: ','
    });

    assert.equal(results.length, 1);
    assert.equal(results[0], this.list.join(','));
  });

  it('accounts for the delimiter when packing', function() {
    const results = packer({
      list: this.list,
      // Would include the second if the delimiter wasn't accounted for
      binSize: 6,
      delimiter: ','
    });

    assert.equal(results.length, 3);
    assert.deepEqual(results, this.list);
  });

  it('throws when none of the elements can fit the bin size', function() {
    assert.throws(function() {
      packer({
        list: this.list,
        binSize: 1
      });
    }, 'binSize is too small to fit any items');
  });

  it('does not account for a delimiter after the last element', function() {
    const [result] = packer({
      list: this.list,
      // Sum of the strings plus a delimiter between each
      binSize: 11,
      delimiter: ','
    });

    assert.equal(result, this.list.join(','));
  });

  it('returns additional packed strings if the first string was full', function() {
    const results = packer({
      list: this.list,
      binSize: 6
    });

    assert.equal(results.length, 2);
    assert.equal(results[0], this.list[0] + this.list[1]);
    assert.equal(results[1], this.list[2]);
  });

  it('sorts the elements in the list to pack the shorted values first', function() {
    this.list = ['food', 'bar', 'bo'];

    const results = packer({
      list: this.list,
      binSize: 6,
      delimiter: ','
    });

    assert.equal(results.length, 2);
    assert.equal(results[0], `${this.list[2]},${this.list[1]}`);
    assert.equal(results[1], this.list[0]);
  });

  it('will not overpack with padding', function() {
    const results = packer({
      list: this.list,
      // Fits the first (with padding) but doesn't fit the second
      binSize: 5,
      delimiter: ','
    });

    assert.equal(results.length, 3);
    assert.equal(results[0], this.list[0]);
  });

  it('includes all of the elements', function() {
    const results = packer({
      list: this.list,
      binSize: 3
    });

    assert.equal(results.length, this.list.length);
  });
});
