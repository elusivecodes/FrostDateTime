const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;

console.log('\x1b[0m');
console.log('Testing setBeat method');
assert.equal(
    new DateTime([2018, 0, 1, 11, 5, 3, 0], 'UTC')
        .setBeat(0)
        .getBeat(),
    0
);
assert.equal(
    new DateTime([2018, 0, 1, 12, 6, 04, 0], 'Australia/Brisbane')
        .setBeat(583)
        .getBeat(),
    583
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setDate method');
assert.equal(
    new DateTime([2018, 0, 1])
        .setDate(21)
        .getDate(),
    21
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setDay method');
assert.equal(
    new DateTime([2018, 0, 1])
        .setDay(0)
        .getDay(),
    0
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setDayOfYear method');
assert.equal(
    new DateTime([2018, 0, 1])
        .setDayOfYear(250)
        .getDayOfYear(),
    250
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setHours method');
assert.equal(
    new DateTime([2018, 0, 1, 0])
        .setHours(20)
        .getHours(),
    20
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setISODay method');
assert.equal(
    new DateTime([2018, 0, 1])
        .setISODay(1)
        .getISODay(),
    1
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setISOWeek method');
assert.equal(
    new DateTime([2018, 0, 1])
        .setISOWeek(36)
        .getISOWeek(),
    36
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setISOYear method');
assert.equal(
    new DateTime([2018])
        .setISOYear(2016)
        .getISOYear(),
    2016
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setMilliseconds method');
assert.equal(
    new DateTime([2018, 0, 1, 0, 0, 0, 0])
        .setMilliseconds(500)
        .getMilliseconds(),
    500
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setMinutes method');
assert.equal(
    new DateTime([2018, 0, 1, 0, 0])
        .setMinutes(30)
        .getMinutes(),
    30
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setMonth method');
assert.equal(
    new DateTime([2018, 0])
        .setMonth(11)
        .getMonth(),
    11
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setQuarter method');
assert.equal(
    new DateTime([2018, 0])
        .setQuarter(4)
        .getQuarter(),
    4
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setSeconds method');
assert.equal(
    new DateTime([2018, 0, 1, 0, 0, 0])
        .setSeconds(59)
        .getSeconds(),
    59
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setYear method');
assert.equal(
    new DateTime([2018])
        .setYear(2017)
        .getYear(),
    2017
);
console.log('\x1b[32m', 'passed');
