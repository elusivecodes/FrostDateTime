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
console.log('Testing isAfter method');
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isAfter([2018, 0, 1, 1, 2, 2]), false);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isAfter([2018, 0, 1, 1, 1, 1]), true);
assert.equal(new DateTime([2018, 0]).isAfter([2019, 1], 'year'), false);
assert.equal(new DateTime([2019, 1]).isAfter([2018, 0], 'year'), true);
assert.equal(new DateTime([2018, 0, 1]).isAfter([2018, 1, 2], 'month'), false);
assert.equal(new DateTime([2018, 1, 2]).isAfter([2018, 0, 1], 'month'), true);
assert.equal(new DateTime([2018, 0, 1, 1]).isAfter([2018, 0, 2, 2], 'day'), false);
assert.equal(new DateTime([2018, 0, 2, 2]).isAfter([2018, 0, 1, 1], 'day'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1]).isAfter([2018, 0, 1, 2, 2], 'hour'), false);
assert.equal(new DateTime([2018, 0, 1, 2, 2]).isAfter([2018, 0, 1, 1, 1], 'hour'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isAfter([2018, 0, 1, 1, 2, 2], 'minute'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isAfter([2018, 0, 1, 1, 1, 1], 'minute'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isAfter([2018, 0, 1, 1, 2, 2], 'second'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isAfter([2018, 0, 1, 1, 1, 1], 'second'), true);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing isBefore method');
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isBefore([2018, 0, 1, 1, 1, 1]), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isBefore([2018, 0, 1, 1, 2, 2]), true);
assert.equal(new DateTime([2019, 1]).isBefore([2018, 0], 'year'), false);
assert.equal(new DateTime([2018, 0]).isBefore([2019, 1], 'year'), true);
assert.equal(new DateTime([2018, 1, 2]).isBefore([2018, 0, 1], 'month'), false);
assert.equal(new DateTime([2018, 0, 1]).isBefore([2018, 1, 2], 'month'), true);
assert.equal(new DateTime([2018, 0, 2, 2]).isBefore([2018, 0, 1, 1], 'day'), false);
assert.equal(new DateTime([2018, 0, 1, 1]).isBefore([2018, 0, 2, 2], 'day'), true);
assert.equal(new DateTime([2018, 0, 1, 2, 2]).isBefore([2018, 0, 1, 1, 1], 'hour'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1]).isBefore([2018, 0, 1, 2, 2], 'hour'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isBefore([2018, 0, 1, 1, 1, 1], 'minute'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isBefore([2018, 0, 1, 1, 2, 2], 'minute'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isBefore([2018, 0, 1, 1, 1, 1], 'second'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isBefore([2018, 0, 1, 1, 2, 2], 'second'), true);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing isBetween method');
assert.equal(new DateTime([2018, 0, 1, 1, 1, 3]).isBetween([2018, 0, 1, 1, 1, 2], [2018, 0, 1, 1, 1, 4]), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isBetween([2018, 0, 1, 1, 1, 2], [2018, 0, 1, 1, 1, 4]), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 5]).isBetween([2018, 0, 1, 1, 1, 2], [2018, 0, 1, 1, 1, 4]), false);
assert.equal(new DateTime([2019]).isBetween([2018], [2020], 'year'), true);
assert.equal(new DateTime([2017]).isBetween([2018], [2020], 'year'), false);
assert.equal(new DateTime([2021]).isBetween([2018], [2020], 'year'), false);
assert.equal(new DateTime([2018, 2]).isBetween([2018, 1], [2018, 3], 'month'), true);
assert.equal(new DateTime([2018, 0]).isBetween([2018, 1], [2018, 3], 'month'), false);
assert.equal(new DateTime([2018, 4]).isBetween([2018, 1], [2018, 3], 'month'), false);
assert.equal(new DateTime([2018, 0, 3]).isBetween([2018, 0, 2], [2018, 0, 4], 'day'), true);
assert.equal(new DateTime([2018, 0, 1]).isBetween([2018, 0, 2], [2018, 0, 4], 'day'), false);
assert.equal(new DateTime([2018, 0, 5]).isBetween([2018, 0, 2], [2018, 0, 4], 'day'), false);
assert.equal(new DateTime([2018, 0, 1, 3]).isBetween([2018, 0, 1, 2], [2018, 0, 1, 4], 'hour'), true);
assert.equal(new DateTime([2018, 0, 1, 1]).isBetween([2018, 0, 1, 2], [2018, 0, 1, 4], 'hour'), false);
assert.equal(new DateTime([2018, 0, 1, 5]).isBetween([2018, 0, 1, 2], [2018, 0, 1, 4], 'hour'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 3]).isBetween([2018, 0, 1, 1, 2], [2018, 0, 1, 1, 4], 'minute'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1]).isBetween([2018, 0, 1, 1, 2], [2018, 0, 1, 1, 4], 'minute'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 5]).isBetween([2018, 0, 1, 1, 2], [2018, 0, 1, 1, 4], 'minute'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 3]).isBetween([2018, 0, 1, 1, 1, 2], [2018, 0, 1, 1, 1, 4], 'second'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isBetween([2018, 0, 1, 1, 1, 2], [2018, 0, 1, 1, 1, 4], 'second'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 5]).isBetween([2018, 0, 1, 1, 1, 2], [2018, 0, 1, 1, 1, 4], 'second'), false);
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
console.log('Testing isSame method');
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSame([2018, 0, 1, 1, 1, 1]), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSame([2018, 0, 1, 1, 1, 1]), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isSame([2018, 0, 1, 1, 1, 1]), true);
assert.equal(new DateTime([2019, 1]).isSame([2018, 0], 'year'), false);
assert.equal(new DateTime([2019, 1]).isSame([2018, 0], 'year'), false);
assert.equal(new DateTime([2018, 1]).isSame([2018, 0], 'year'), true);
assert.equal(new DateTime([2018, 1, 2]).isSame([2018, 0, 1], 'month'), false);
assert.equal(new DateTime([2018, 1, 2]).isSame([2018, 0, 1], 'month'), false);
assert.equal(new DateTime([2018, 0, 2]).isSame([2018, 0, 1], 'month'), true);
assert.equal(new DateTime([2018, 0, 2, 2]).isSame([2018, 0, 1, 1], 'day'), false);
assert.equal(new DateTime([2018, 0, 2, 2]).isSame([2018, 0, 1, 1], 'day'), false);
assert.equal(new DateTime([2018, 0, 1, 2]).isSame([2018, 0, 1, 1], 'day'), true);
assert.equal(new DateTime([2018, 0, 1, 2, 2]).isSame([2018, 0, 1, 1, 1], 'hour'), false);
assert.equal(new DateTime([2018, 0, 1, 2, 2]).isSame([2018, 0, 1, 1, 1], 'hour'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 2]).isSame([2018, 0, 1, 1, 1], 'hour'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSame([2018, 0, 1, 1, 1, 1], 'minute'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSame([2018, 0, 1, 1, 1, 1], 'minute'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSame([2018, 0, 1, 1, 1, 1], 'minute'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSame([2018, 0, 1, 1, 1, 1], 'second'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSame([2018, 0, 1, 1, 1, 1], 'second'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isSame([2018, 0, 1, 1, 1, 1], 'second'), true);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing isSameOrAfter method');
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrAfter([2018, 0, 1, 1, 1, 3]), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrAfter([2018, 0, 1, 1, 1, 1]), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isSameOrAfter([2018, 0, 1, 1, 1, 1]), true);
assert.equal(new DateTime([2019, 1]).isSameOrAfter([2020, 0], 'year'), false);
assert.equal(new DateTime([2019, 1]).isSameOrAfter([2018, 0], 'year'), true);
assert.equal(new DateTime([2018, 1]).isSameOrAfter([2018, 0], 'year'), true);
assert.equal(new DateTime([2018, 1, 2]).isSameOrAfter([2018, 2, 1], 'month'), false);
assert.equal(new DateTime([2018, 1, 2]).isSameOrAfter([2018, 0, 1], 'month'), true);
assert.equal(new DateTime([2018, 0, 2]).isSameOrAfter([2018, 0, 1], 'month'), true);
assert.equal(new DateTime([2018, 0, 2, 2]).isSameOrAfter([2018, 0, 3, 1], 'day'), false);
assert.equal(new DateTime([2018, 0, 2, 2]).isSameOrAfter([2018, 0, 1, 1], 'day'), true);
assert.equal(new DateTime([2018, 0, 1, 2]).isSameOrAfter([2018, 0, 1, 1], 'day'), true);
assert.equal(new DateTime([2018, 0, 1, 2, 2]).isSameOrAfter([2018, 0, 1, 3, 1], 'hour'), false);
assert.equal(new DateTime([2018, 0, 1, 2, 2]).isSameOrAfter([2018, 0, 1, 1, 1], 'hour'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2]).isSameOrAfter([2018, 0, 1, 1, 1], 'hour'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSameOrAfter([2018, 0, 1, 1, 3, 1], 'minute'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSameOrAfter([2018, 0, 1, 1, 1, 1], 'minute'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrAfter([2018, 0, 1, 1, 1, 1], 'minute'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrAfter([2018, 0, 1, 1, 1, 3], 'second'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrAfter([2018, 0, 1, 1, 1, 1], 'second'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isSameOrAfter([2018, 0, 1, 1, 1, 1], 'second'), true);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing isSameOrBefore method');
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrBefore([2018, 0, 1, 1, 1, 1]), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrBefore([2018, 0, 1, 1, 1, 3]), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isSameOrBefore([2018, 0, 1, 1, 1, 1]), true);
assert.equal(new DateTime([2019, 1]).isSameOrBefore([2018, 0], 'year'), false);
assert.equal(new DateTime([2019, 1]).isSameOrBefore([2020, 0], 'year'), true);
assert.equal(new DateTime([2018, 1]).isSameOrBefore([2018, 0], 'year'), true);
assert.equal(new DateTime([2018, 1, 2]).isSameOrBefore([2018, 0, 1], 'month'), false);
assert.equal(new DateTime([2018, 1, 2]).isSameOrBefore([2018, 2, 1], 'month'), true);
assert.equal(new DateTime([2018, 0, 2]).isSameOrBefore([2018, 0, 1], 'month'), true);
assert.equal(new DateTime([2018, 0, 2, 2]).isSameOrBefore([2018, 0, 1, 1], 'day'), false);
assert.equal(new DateTime([2018, 0, 2, 2]).isSameOrBefore([2018, 0, 3, 1], 'day'), true);
assert.equal(new DateTime([2018, 0, 1, 2]).isSameOrBefore([2018, 0, 1, 1], 'day'), true);
assert.equal(new DateTime([2018, 0, 1, 2, 2]).isSameOrBefore([2018, 0, 1, 1, 1], 'hour'), false);
assert.equal(new DateTime([2018, 0, 1, 2, 2]).isSameOrBefore([2018, 0, 1, 3, 1], 'hour'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2]).isSameOrBefore([2018, 0, 1, 1, 1], 'hour'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSameOrBefore([2018, 0, 1, 1, 1, 1], 'minute'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSameOrBefore([2018, 0, 1, 1, 3, 1], 'minute'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrBefore([2018, 0, 1, 1, 1, 1], 'minute'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 2, 2]).isSameOrBefore([2018, 0, 1, 1, 1, 1], 'second'), false);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 2]).isSameOrBefore([2018, 0, 1, 1, 1, 3], 'second'), true);
assert.equal(new DateTime([2018, 0, 1, 1, 1, 1]).isSameOrBefore([2018, 0, 1, 1, 1, 1], 'second'), true);
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
