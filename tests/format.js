const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;

console.log('\x1b[0m');
console.log('-- Testing format method');

console.log('\x1b[0m');
console.log('Testing leap year');
assert.equal(new DateTime([2018, 0, 1]).format('L'), '0');
assert.equal(new DateTime([2016, 0, 1]).format('L'), '1');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing year');
assert.equal(new DateTime([2018, 0, 1]).format('Y'), '2018');
assert.equal(new DateTime([1950, 0, 1]).format('Y'), '1950');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short year');
assert.equal(new DateTime([2018, 0, 1]).format('y'), '18');
assert.equal(new DateTime([1950, 0, 1]).format('y'), '50');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing ISO year');
assert.equal(new DateTime([2018, 0, 1]).format('o'), '2018');
assert.equal(new DateTime([1950, 0, 1]).format('o'), '1949');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing month name');
assert.equal(new DateTime([2018, 0, 1]).format('F'), 'January');
assert.equal(new DateTime([2018, 5, 1]).format('F'), 'June');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short month name');
assert.equal(new DateTime([2018, 0, 1]).format('M'), 'Jan');
assert.equal(new DateTime([2018, 5, 1]).format('M'), 'Jun');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit month');
assert.equal(new DateTime([2018, 0, 1]).format('m'), '01');
assert.equal(new DateTime([2018, 5, 1]).format('m'), '06');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing month');
assert.equal(new DateTime([2018, 0, 1]).format('n'), '1');
assert.equal(new DateTime([2018, 5, 1]).format('n'), '6');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing days in month');
assert.equal(new DateTime([2018, 0, 1]).format('t'), '31');
assert.equal(new DateTime([2018, 5, 1]).format('t'), '30');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing ISO week');
assert.equal(new DateTime([2018, 0, 1]).format('W'), '1');
assert.equal(new DateTime([2018, 5, 1]).format('W'), '22');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing day of year');
assert.equal(new DateTime([2018, 0, 1]).format('z'), '1');
assert.equal(new DateTime([2018, 5, 1]).format('z'), '152');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit date');
assert.equal(new DateTime([2018, 0, 1]).format('d'), '01');
assert.equal(new DateTime([2018, 5, 30]).format('d'), '30');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing date');
assert.equal(new DateTime([2018, 0, 1]).format('j'), '1');
assert.equal(new DateTime([2018, 5, 30]).format('j'), '30');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing ordinal suffix');
assert.equal(new DateTime([2018, 0, 1]).format('S'), 'st');
assert.equal(new DateTime([2018, 5, 30]).format('S'), 'th');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing ISO day');
assert.equal(new DateTime([2018, 0, 1]).format('N'), '1');
assert.equal(new DateTime([2018, 5, 30]).format('N'), '6');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing day');
assert.equal(new DateTime([2018, 0, 1]).format('w'), '1');
assert.equal(new DateTime([2018, 5, 30]).format('w'), '6');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing day name');
assert.equal(new DateTime([2018, 0, 1]).format('l'), 'Monday');
assert.equal(new DateTime([2018, 5, 30]).format('l'), 'Saturday');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short day name');
assert.equal(new DateTime([2018, 0, 1]).format('D'), 'Mon');
assert.equal(new DateTime([2018, 5, 30]).format('D'), 'Sat');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing lower-case day period');
assert.equal(new DateTime([2018, 0, 1]).format('a'), 'am');
assert.equal(new DateTime([2018, 5, 30, 23]).format('a'), 'pm');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing upper-case day period');
assert.equal(new DateTime([2018, 0, 1]).format('A'), 'AM');
assert.equal(new DateTime([2018, 5, 30, 23]).format('A'), 'PM');
console.log('\x1b[32m', 'passed');

// swatch time

console.log('\x1b[0m');
console.log('Testing 2-digit 24-hour');
assert.equal(new DateTime([2018, 0, 1]).format('H'), '00');
assert.equal(new DateTime([2018, 5, 30, 23]).format('H'), '23');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 24-hour');
assert.equal(new DateTime([2018, 0, 1]).format('G'), '0');
assert.equal(new DateTime([2018, 5, 30, 23]).format('G'), '23');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit 12-hour');
assert.equal(new DateTime([2018, 0, 1, 5]).format('h'), '05');
assert.equal(new DateTime([2018, 5, 30, 23]).format('h'), '11');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 12-hour');
assert.equal(new DateTime([2018, 0, 1, 5]).format('g'), '5');
assert.equal(new DateTime([2018, 5, 30, 23]).format('g'), '11');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing minute');
assert.equal(new DateTime([2018, 0, 1, 5, 1]).format('i'), '01');
assert.equal(new DateTime([2018, 5, 30, 23, 59]).format('i'), '59');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing second');
assert.equal(new DateTime([2018, 0, 1, 5, 0, 1]).format('s'), '01');
assert.equal(new DateTime([2018, 5, 30, 23, 0, 59]).format('s'), '59');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing microsecond');
assert.equal(new DateTime([2018, 0, 1, 5, 0, 1, 500]).format('u'), '500000');
assert.equal(new DateTime([2018, 5, 30, 23, 0, 59, 750]).format('u'), '750000');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing millisecond');
assert.equal(new DateTime([2018, 0, 1, 5, 0, 1, 500]).format('v'), '500');
assert.equal(new DateTime([2018, 5, 30, 23, 0, 59, 750]).format('v'), '750');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing timezone');
assert.equal(new DateTime([2018, 0, 1], 'UTC').format('e'), 'UTC');
assert.equal(new DateTime([2018, 5, 30, 23, 0, 59, 750], 'Australia/Brisbane').format('e'), 'Australia/Brisbane');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing abbreviation');
assert.equal(new DateTime([2018, 0, 1], 'UTC').format('T'), 'UTC');
assert.equal(new DateTime([2018, 5, 30], 'Australia/Brisbane').format('T'), 'AEST');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing daylight savings');
assert.equal(new DateTime([2018, 0, 1], 'UTC').format('I'), '0');
assert.equal(new DateTime([2018, 5, 30], 'America/New_York').format('I'), '1');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing offset');
assert.equal(new DateTime([2018, 0, 1], 'UTC').format('O'), '+0000');
assert.equal(new DateTime([2018, 5, 30], 'Australia/Brisbane').format('O'), '+1000');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing offset with colon');
assert.equal(new DateTime([2018, 0, 1], 'UTC').format('P'), '+00:00');
assert.equal(new DateTime([2018, 5, 30], 'Australia/Brisbane').format('P'), '+10:00');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing offset seconds');
assert.equal(new DateTime([2018, 0, 1], 'UTC').format('Z'), '0');
assert.equal(new DateTime([2018, 5, 30], 'Australia/Brisbane').format('Z'), '36000');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing ISO-8601 date');
assert.equal(new DateTime([2018, 0, 1, 12, 30, 59, 500], 'UTC').format('c'), '2018-01-01T12:30:59.500+00:00');
assert.equal(new DateTime([2018, 5, 30, 12, 30, 59, 500], 'Australia/Brisbane').format('c'), '2018-06-30T12:30:59.500+10:00');
console.log('\x1b[32m', 'passed');
