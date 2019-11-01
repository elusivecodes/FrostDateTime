const assert = require('assert').strict;
const { DateTime, DateInterval } = require('../dist/frost-datetime.min');

const oneYear = new DateInterval('P1Y');
const oneMonth = new DateInterval('P1M');

console.log('\x1b[0m');
console.log('Testing add method');
assert.equal(new DateTime([2018, 0, 1]).add('1 year').getYear(), 2019);
assert.equal(new DateTime([2018, 0, 1]).add('1 month').getMonth(), 1);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing addInterval method');
assert.equal(new DateTime([2018, 0, 1]).addInterval(oneYear).getYear(), 2019);
assert.equal(new DateTime([2018, 0, 1]).addInterval(oneMonth).getMonth(), 1);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing sub method');
assert.equal(new DateTime([2018, 0, 1]).sub('1 year').getYear(), 2017);
assert.equal(new DateTime([2018, 0, 1]).sub('1 month').getMonth(), 11);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing subInterval method');
assert.equal(new DateTime([2018, 0, 1]).subInterval(oneYear).getYear(), 2017);
assert.equal(new DateTime([2018, 0, 1]).subInterval(oneMonth).getMonth(), 11);
console.log('\x1b[32m', 'passed');
console.log('\x1b[0m');

console.log('Testing startOf method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).startOf('year').format('Y-m-d H:i:s'), '2018-01-01 00:00:00');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).startOf('month').format('Y-m-d H:i:s'), '2018-06-01 00:00:00');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).startOf('day').format('Y-m-d H:i:s'), '2018-06-15 00:00:00');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).startOf('week').format('Y-m-d H:i:s'), '2018-06-10 00:00:00');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).startOf('hour').format('Y-m-d H:i:s'), '2018-06-15 12:00:00');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).startOf('minute').format('Y-m-d H:i:s'), '2018-06-15 12:30:00');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).startOf('second').format('Y-m-d H:i:s'), '2018-06-15 12:30:30');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing endOf method');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).endOf('year').format('Y-m-d H:i:s'), '2018-12-31 23:59:59');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).endOf('month').format('Y-m-d H:i:s'), '2018-06-30 23:59:59');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).endOf('day').format('Y-m-d H:i:s'), '2018-06-15 23:59:59');
assert.equal(new DateTime([2018, 5, 15, 11, 30, 30, 500]).endOf('week').format('Y-m-d H:i:s'), '2018-06-16 23:59:59');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).endOf('hour').format('Y-m-d H:i:s'), '2018-06-15 12:59:59');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).endOf('minute').format('Y-m-d H:i:s'), '2018-06-15 12:30:59');
assert.equal(new DateTime([2018, 5, 15, 12, 30, 30, 500]).endOf('second').format('Y-m-d H:i:s'), '2018-06-15 12:30:30');
console.log('\x1b[32m', 'passed');
