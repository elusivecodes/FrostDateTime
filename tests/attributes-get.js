const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;

console.log('\x1b[0m');
console.log('Testing getBeat method');
assert.equal(
    new DateTime([2018, 0, 1, 23, 0, 0, 0], 'UTC')
        .getBeat(),
    0
);
assert.equal(
    new DateTime([2018, 0, 1, 23, 0, 0, 0], 'Australia/Brisbane')
        .getBeat(),
    583
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getDate method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getDate(),
    2
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getDate(),
    31
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getDay method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getDay(),
    5
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getDay(),
    4
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getDayOfYear method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getDayOfYear(),
    33
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getDayOfYear(),
    365
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getHours method');
assert.equal(
    new DateTime([2018, 1, 2, 3])
        .getHours(),
    3
);
assert.equal(
    new DateTime([2015, 11, 31, 23])
        .getHours(),
    23
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getISODay method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getISODay(),
    5
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getISODay(),
    4
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getISOWeek method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getISOWeek(),
    5
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getISOWeek(),
    53
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getISOYear method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getISOYear(),
    2018
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getISOYear(),
    2015
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getMilliseconds method');
assert.equal(
    new DateTime([2018, 1, 2, 3, 4, 5, 6])
        .getMilliseconds(),
    6
);
assert.equal(
    new DateTime([2015, 11, 31, 23, 59, 30, 500])
        .getMilliseconds(),
    500
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getMinutes method');
assert.equal(
    new DateTime([2018, 1, 2, 3, 4])
        .getMinutes(),
    4
);
assert.equal(
    new DateTime([2015, 11, 31, 23, 59])
        .getMinutes(),
    59
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getMonth method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getMonth(),
    1
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getMonth(),
    11
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getQuarter method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getQuarter(),
    1
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getQuarter(),
    4
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getSeconds method');
assert.equal(
    new DateTime([2018, 1, 2, 3, 4, 5])
        .getSeconds(),
    5
);
assert.equal(
    new DateTime([2015, 11, 31, 23, 59, 30])
        .getSeconds(),
    30
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getYear method');
assert.equal(
    new DateTime([2018, 1, 2])
        .getYear(),
    2018
);
assert.equal(
    new DateTime([2015, 11, 31])
        .getYear(),
    2015
);
console.log('\x1b[32m', 'passed');
