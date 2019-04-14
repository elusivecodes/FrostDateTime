const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;

console.log('\x1b[0m');
console.log('Testing add method');
assert.equal(new DateTime([2018, 0, 1]).add('1 year').getYear(), 2019);
assert.equal(new DateTime([2018, 0, 1]).add('1 month').getMonth(), 1);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing sub method');
assert.equal(new DateTime([2018, 0, 1]).sub('1 year').getYear(), 2017);
assert.equal(new DateTime([2018, 0, 1]).sub('1 month').getMonth(), 11);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing startOfYear method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).startOfYear().format('Y-m-d H:i:s'), '2018-01-01 00:00:00');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing startOfMonth method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).startOfMonth().format('Y-m-d H:i:s'), '2018-06-01 00:00:00');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing startOfDay method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).startOfDay().format('Y-m-d H:i:s'), '2018-06-15 00:00:00');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing startOfWeek method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).startOfWeek().format('Y-m-d H:i:s'), '2018-06-11 00:00:00');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing startOfHour method');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).startOfHour().format('Y-m-d H:i:s'), '2018-06-15 12:00:00');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing startOfMinute method');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).startOfMinute().format('Y-m-d H:i:s'), '2018-06-15 12:30:00');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing startOfSecond method');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).startOfSecond().format('Y-m-d H:i:s'), '2018-06-15 12:30:30');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing endOfYear method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).endOfYear().format('Y-m-d H:i:s'), '2018-12-31 23:59:59');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing endOfMonth method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).endOfMonth().format('Y-m-d H:i:s'), '2018-06-30 23:59:59');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing endOfDay method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).endOfDay().format('Y-m-d H:i:s'), '2018-06-15 23:59:59');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing endOfWeek method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).endOfWeek().format('Y-m-d H:i:s'), '2018-06-17 23:59:59');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing endOfHour method');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).endOfHour().format('Y-m-d H:i:s'), '2018-06-15 12:59:59');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing endOfMinute method');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).endOfMinute().format('Y-m-d H:i:s'), '2018-06-15 12:30:59');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing endOfSecond method');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).endOfSecond().format('Y-m-d H:i:s'), '2018-06-15 12:30:30');
console.log('\x1b[32m', 'passed');
