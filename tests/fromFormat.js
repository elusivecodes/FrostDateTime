const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;

console.log('\x1b[0m');
console.log('-- Testing fromFormat method');

console.log('\x1b[0m');
console.log('Testing year');
assert.equal(DateTime.fromFormat('2018', 'Y').getYear(), 2018);
assert.equal(DateTime.fromFormat('1950', 'Y').getYear(), 1950);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short year');
assert.equal(DateTime.fromFormat('18', 'y').getYear(), 2018);
assert.equal(DateTime.fromFormat('70', 'y').getYear(), 1970);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing month name');
assert.equal(DateTime.fromFormat('January', 'F').getMonth(), 0);
assert.equal(DateTime.fromFormat('June', 'F').getMonth(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short month name');
assert.equal(DateTime.fromFormat('Jan', 'M').getMonth(), 0);
assert.equal(DateTime.fromFormat('Jun', 'M').getMonth(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit month');
assert.equal(DateTime.fromFormat('01', 'm').getMonth(), 0);
assert.equal(DateTime.fromFormat('06', 'm').getMonth(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing month');
assert.equal(DateTime.fromFormat('1', 'n').getMonth(), 0);
assert.equal(DateTime.fromFormat('6', 'n').getMonth(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit date');
assert.equal(DateTime.fromFormat('01', 'd').getDate(), 1);
assert.equal(DateTime.fromFormat('25', 'd').getDate(), 25);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing date');
assert.equal(DateTime.fromFormat('1', 'j').getDate(), 1);
assert.equal(DateTime.fromFormat('25', 'j').getDate(), 25);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing ordinal suffix');
assert.equal(DateTime.fromFormat('1st', 'jS').getDate(), 1);
assert.equal(DateTime.fromFormat('25th', 'jS').getDate(), 25);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing day name');
assert.equal(DateTime.fromFormat('Monday', 'l').getDay(), 1);
assert.equal(DateTime.fromFormat('Friday', 'l').getDay(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short day name');
assert.equal(DateTime.fromFormat('Mon', 'D').getDay(), 1);
assert.equal(DateTime.fromFormat('Fri', 'D').getDay(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing lower-case day period');
assert.equal(DateTime.fromFormat('5am', 'ga').getHours(), 5);
assert.equal(DateTime.fromFormat('5pm', 'ga').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing upper-case day period');
assert.equal(DateTime.fromFormat('5AM', 'gA').getHours(), 5);
assert.equal(DateTime.fromFormat('5PM', 'gA').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit 24-hour');
assert.equal(DateTime.fromFormat('05', 'H').getHours(), 5);
assert.equal(DateTime.fromFormat('17', 'H').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 24-hour');
assert.equal(DateTime.fromFormat('5', 'G').getHours(), 5);
assert.equal(DateTime.fromFormat('17', 'G').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit 12-hour');
assert.equal(DateTime.fromFormat('05', 'h').getHours(), 5);
assert.equal(DateTime.fromFormat('05PM', 'hA').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 12-hour');
assert.equal(DateTime.fromFormat('5', 'g').getHours(), 5);
assert.equal(DateTime.fromFormat('5PM', 'gA').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing minute');
assert.equal(DateTime.fromFormat('01', 'i').getMinutes(), 1);
assert.equal(DateTime.fromFormat('59', 'i').getMinutes(), 59);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing minute');
assert.equal(DateTime.fromFormat('01', 's').getSeconds(), 1);
assert.equal(DateTime.fromFormat('59', 's').getSeconds(), 59);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing microsecond');
assert.equal(DateTime.fromFormat('500000', 'u').format('u'), '500000');
assert.equal(DateTime.fromFormat('750000', 'u').format('u'), '750000');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing timezone');
assert.equal(DateTime.fromFormat('UTC', 'e').getTimezone(), 'UTC');
assert.equal(DateTime.fromFormat('America/New_York', 'e').getTimezone(), 'America/New_York');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing timezone abbreviation');
assert.equal(DateTime.fromFormat('UTC', 'T').getTimezone(), 'UTC');
assert.equal(DateTime.fromFormat('AEST', 'T').getTimezone(), 'Australia/Brisbane');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing offset');
assert.equal(DateTime.fromFormat('+0000', 'O').getTimezoneOffset(), 0);
assert.equal(DateTime.fromFormat('+1000', 'O').getTimezoneOffset(), -600);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing offset with colon');
assert.equal(DateTime.fromFormat('+00:00', 'P').getTimezoneOffset(), 0);
assert.equal(DateTime.fromFormat('+10:00', 'P').getTimezoneOffset(), -600);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing timestamp');
assert.equal(DateTime.fromFormat('123456789', 'U').getTimestamp(), 123456789);
assert.equal(DateTime.fromFormat('987654321', 'U').getTimestamp(), 987654321);
console.log('\x1b[32m', 'passed');
