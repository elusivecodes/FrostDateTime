const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;

console.log('\x1b[0m');
console.log('-- Testing fromFormat method');

console.log('\x1b[0m');
console.log('Testing year');
assert.equal(DateTime.fromFormat('Y', '2018').getYear(), 2018);
assert.equal(DateTime.fromFormat('Y', '1950').getYear(), 1950);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short year');
assert.equal(DateTime.fromFormat('y', '18').getYear(), 2018);
assert.equal(DateTime.fromFormat('y', '70').getYear(), 1970);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing month name');
assert.equal(DateTime.fromFormat('F', 'January').getMonth(), 0);
assert.equal(DateTime.fromFormat('F', 'June').getMonth(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short month name');
assert.equal(DateTime.fromFormat('M', 'Jan').getMonth(), 0);
assert.equal(DateTime.fromFormat('M', 'Jun').getMonth(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit month');
assert.equal(DateTime.fromFormat('m', '01').getMonth(), 0);
assert.equal(DateTime.fromFormat('m', '06').getMonth(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing month');
assert.equal(DateTime.fromFormat('n', '1').getMonth(), 0);
assert.equal(DateTime.fromFormat('n', '6').getMonth(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit date');
assert.equal(DateTime.fromFormat('d', '01').getDate(), 1);
assert.equal(DateTime.fromFormat('d', '25').getDate(), 25);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing date');
assert.equal(DateTime.fromFormat('j', '1').getDate(), 1);
assert.equal(DateTime.fromFormat('j', '25').getDate(), 25);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing ordinal suffix');
assert.equal(DateTime.fromFormat('jS', '1st').getDate(), 1);
assert.equal(DateTime.fromFormat('jS', '25th').getDate(), 25);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing day name');
assert.equal(DateTime.fromFormat('l', 'Monday').getDay(), 1);
assert.equal(DateTime.fromFormat('l', 'Friday').getDay(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing short day name');
assert.equal(DateTime.fromFormat('D', 'Mon').getDay(), 1);
assert.equal(DateTime.fromFormat('D', 'Fri').getDay(), 5);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing lower-case day period');
assert.equal(DateTime.fromFormat('ga', '5am').getHours(), 5);
assert.equal(DateTime.fromFormat('ga', '5pm').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing upper-case day period');
assert.equal(DateTime.fromFormat('gA', '5AM').getHours(), 5);
assert.equal(DateTime.fromFormat('gA', '5PM').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit 24-hour');
assert.equal(DateTime.fromFormat('H', '05').getHours(), 5);
assert.equal(DateTime.fromFormat('H', '17').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 24-hour');
assert.equal(DateTime.fromFormat('G', '5').getHours(), 5);
assert.equal(DateTime.fromFormat('G', '17').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 2-digit 12-hour');
assert.equal(DateTime.fromFormat('h', '05').getHours(), 5);
assert.equal(DateTime.fromFormat('hA', '05PM').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing 12-hour');
assert.equal(DateTime.fromFormat('g', '5').getHours(), 5);
assert.equal(DateTime.fromFormat('gA', '5PM').getHours(), 17);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing minute');
assert.equal(DateTime.fromFormat('i', '01').getMinutes(), 1);
assert.equal(DateTime.fromFormat('i', '59').getMinutes(), 59);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing second');
assert.equal(DateTime.fromFormat('s', '01').getSeconds(), 1);
assert.equal(DateTime.fromFormat('s', '59').getSeconds(), 59);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing microsecond');
assert.equal(DateTime.fromFormat('u', '500000').format('u'), '500000');
assert.equal(DateTime.fromFormat('u', '750000').format('u'), '750000');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing timezone');
assert.equal(DateTime.fromFormat('e', 'UTC').getTimezone(), 'UTC');
assert.equal(DateTime.fromFormat('e', 'America/New_York').getTimezone(), 'America/New_York');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing timezone abbreviation');
assert.equal(DateTime.fromFormat('T', 'UTC').getTimezone(), 'UTC');
assert.equal(DateTime.fromFormat('T', 'AEST').getTimezone(), 'Australia/Brisbane');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing offset');
assert.equal(DateTime.fromFormat('O', '+0000').getTimezoneOffset(), 0);
assert.equal(DateTime.fromFormat('O', '+1000').getTimezoneOffset(), -600);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing offset with colon');
assert.equal(DateTime.fromFormat('P', '+00:00').getTimezoneOffset(), 0);
assert.equal(DateTime.fromFormat('P', '+10:00').getTimezoneOffset(), -600);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing timestamp');
assert.equal(DateTime.fromFormat('U', '123456789').getTimestamp(), 123456789);
assert.equal(DateTime.fromFormat('U', '987654321').getTimestamp(), 987654321);
console.log('\x1b[32m', 'passed');
