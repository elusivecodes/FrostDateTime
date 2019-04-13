const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;

console.log('\x1b[0m');
console.log('Testing diff method');

const diff1 = new DateTime([2018, 11, 5, 10, 50, 25, 300]).diff([2018, 5, 20, 23, 30, 5, 900]);
assert.equal(diff1.y, 0);
assert.equal(diff1.m, 5);
assert.equal(diff1.d, 14);
assert.equal(diff1.h, 11);
assert.equal(diff1.i, 20);
assert.equal(diff1.s, 19);
assert.equal(diff1.f, 400000);
assert.equal(diff1.invert, false);

const diff2 = new DateTime([2018, 5, 20, 23, 50, 5, 300]).diff([2017, 11, 5, 10, 30, 25, 900]);
assert.equal(diff2.y, 0);
assert.equal(diff2.m, 6);
assert.equal(diff2.d, 15);
assert.equal(diff2.h, 13);
assert.equal(diff2.i, 19);
assert.equal(diff2.s, 39);
assert.equal(diff2.f, 400000);
assert.equal(diff2.invert, false);

const diff3 = new DateTime([2018, 11, 5, 23, 30, 25, 900]).diff([2017, 5, 20, 10, 50, 5, 300]);
assert.equal(diff3.y, 1);
assert.equal(diff3.m, 5);
assert.equal(diff3.d, 15);
assert.equal(diff3.h, 12);
assert.equal(diff3.i, 40);
assert.equal(diff3.s, 20);
assert.equal(diff3.f, 600000);
assert.equal(diff3.invert, false);

const diff4 = new DateTime([2018, 5, 5, 10, 50, 25, 300]).diff([2018, 11, 20, 23, 30, 5, 900]);
assert.equal(diff4.y, 0);
assert.equal(diff4.m, 6);
assert.equal(diff4.d, 15);
assert.equal(diff4.h, 12);
assert.equal(diff4.i, 39);
assert.equal(diff4.s, 40);
assert.equal(diff4.f, 600000);
assert.equal(diff4.invert, true);

const diff5 = new DateTime([2018, 11, 20, 23, 50, 5, 300]).diff([2019, 5, 5, 10, 30, 25, 900]);
assert.equal(diff5.y, 0);
assert.equal(diff5.m, 5);
assert.equal(diff5.d, 15);
assert.equal(diff5.h, 10);
assert.equal(diff5.i, 40);
assert.equal(diff5.s, 20);
assert.equal(diff5.f, 600000);
assert.equal(diff5.invert, true);

const diff6 = new DateTime([2018, 5, 5, 23, 30, 25, 900]).diff([2019, 11, 20, 10, 50, 5, 300]);
assert.equal(diff6.y, 1);
assert.equal(diff6.m, 6);
assert.equal(diff6.d, 14);
assert.equal(diff6.h, 11);
assert.equal(diff6.i, 19);
assert.equal(diff6.s, 39);
assert.equal(diff6.f, 400000);
assert.equal(diff6.invert, true);

console.log('\x1b[32m', 'passed');