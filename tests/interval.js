const assert = require('assert').strict;
const DateInterval = require('../dist/frost-datetime.min').DateInterval;

console.log('\x1b[0m');
console.log('Testing constructor method');
const i1 = new DateInterval('P1Y2M3DT4H5M6S');
assert.equal(i1.y, 1);
assert.equal(i1.m, 2);
assert.equal(i1.d, 3);
assert.equal(i1.h, 4);
assert.equal(i1.i, 5);
assert.equal(i1.s, 6);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing fromString method');
const i2 = DateInterval.fromString('1 year, 2 months, 3 days, 4 hours, 5 minutes and 6 seconds');
assert.equal(i1.y, 1);
assert.equal(i1.m, 2);
assert.equal(i1.d, 3);
assert.equal(i1.h, 4);
assert.equal(i1.i, 5);
assert.equal(i1.s, 6);
console.log('\x1b[32m', 'passed');
