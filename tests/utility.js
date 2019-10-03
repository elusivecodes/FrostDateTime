const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;

console.log('\x1b[0m');
console.log('Testing clone method');
const d1 = new DateTime([2018, 0, 1]);
const c1 = d1.clone();
assert.equal(c1.getTime(), d1.getTime());
assert.equal(c1.getTimeZone(), d1.getTimeZone());
d1.setYear(2019);
assert.notEqual(c1.getTime(), d1.getTime());
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing dateSuffix method');
assert.equal(new DateTime([2018, 0, 1]).dateSuffix(), 'st');
assert.equal(new DateTime([2018, 0, 2]).dateSuffix(), 'nd');
assert.equal(new DateTime([2018, 0, 3]).dateSuffix(), 'rd');
assert.equal(new DateTime([2018, 0, 4]).dateSuffix(), 'th');
assert.equal(new DateTime([2018, 0, 11]).dateSuffix(), 'th');
assert.equal(new DateTime([2018, 0, 12]).dateSuffix(), 'th');
assert.equal(new DateTime([2018, 0, 13]).dateSuffix(), 'th');
assert.equal(new DateTime([2018, 0, 14]).dateSuffix(), 'th');
assert.equal(new DateTime([2018, 0, 21]).dateSuffix(), 'st');
assert.equal(new DateTime([2018, 0, 22]).dateSuffix(), 'nd');
assert.equal(new DateTime([2018, 0, 23]).dateSuffix(), 'rd');
assert.equal(new DateTime([2018, 0, 24]).dateSuffix(), 'th');
assert.equal(new DateTime([2018, 0, 30]).dateSuffix(), 'th');
assert.equal(new DateTime([2018, 0, 31]).dateSuffix(), 'st');
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing dayName method');
assert.equal(
    new DateTime([2018, 1, 2])
        .dayName(),
    'Friday'
);
assert.equal(
    new DateTime([2015, 11, 31])
        .dayName(),
    'Thursday'
);
assert.equal(
    new DateTime([2018, 1, 2])
        .dayName('short'),
    'Fri'
);
assert.equal(
    new DateTime([2015, 11, 31])
        .dayName('short'),
    'Thur'
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing daysInMonth method');
assert.equal(new DateTime([2018, 0]).daysInMonth(), 31);
assert.equal(new DateTime([2018, 1]).daysInMonth(), 28);
assert.equal(new DateTime([2018, 5]).daysInMonth(), 30);
assert.equal(new DateTime([2016, 1]).daysInMonth(), 29);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing daysInYear method');
assert.equal(new DateTime([2018]).daysInYear(), 365);
assert.equal(new DateTime([2016]).daysInYear(), 366);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing isDST method');
assert.equal(new DateTime([2018], 'UTC').isDST(), false);
assert.equal(new DateTime([2018, 6], 'America/New_York').isDST(), true);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing isLeapYear method');
assert.equal(new DateTime([2018]).isLeapYear(), false);
assert.equal(new DateTime([2016]).isLeapYear(), true);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing monthName method');
assert.equal(
    new DateTime([2018, 1, 2])
        .monthName(),
    'February'
);
assert.equal(
    new DateTime([2015, 11, 31])
        .monthName(),
    'December'
);
assert.equal(
    new DateTime([2018, 1, 2])
        .monthName('short'),
    'Feb'
);
assert.equal(
    new DateTime([2015, 11, 31])
        .monthName('short'),
    'Dec'
);
console.log('\x1b[32m', 'passed');
