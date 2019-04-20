const assert = require('assert').strict;
const DateTime = require('../dist/frost-datetime.min').DateTime;


console.log('\x1b[0m');
console.log('-- Testing transitons');

const format = 'd/m/Y h:i:s O (e)';

const str1 = '07/04/2019 03:01:00 +1000 (Australia/Sydney)';
assert.equal(
    DateTime.fromFormat(format, str1).format(format),
    str1
);
assert.equal(
    new DateTime([2019, 03, 07, 3, 1, 0, 0], 'Australia/Sydney').format(format),
    str1
);

const str2 = '07/04/2019 02:01:00 +1000 (Australia/Sydney)';
assert.equal(
    DateTime.fromFormat(format, str2).format(format),
    str2
);
assert.equal(
    new DateTime([2019, 03, 07, 2, 1, 0, 0], 'Australia/Sydney').format(format),
    str2
);

const str3 = '07/04/2019 02:01:00 +1100 (Australia/Sydney)';
assert.equal(
    DateTime.fromFormat(format, str3).format(format),
    str3
);

const str4 = '07/04/2019 03:01:00 +1100 (Australia/Sydney)';
assert.equal(
    DateTime.fromFormat(format, str4).isValid,
    false
);

assert.equal(
    DateTime.fromFormat(format, str3).add('1 hour').format(format),
    str2
);

const format2 = 'd/m/Y h:i:s T';

const str5 = '07/04/2019 02:01:00 ACST';
assert.equal(
    DateTime.fromFormat(format2, str5).format(format2),
    str5
);

const str6 = '07/04/2019 03:01:00 ACST';
assert.equal(
    DateTime.fromFormat(format2, str6).format(format2),
    str6
);

const str7 = '07/04/2019 02:01:00 ACDT';
assert.equal(
    DateTime.fromFormat(format2, str7).format(format2),
    str7
);

console.log('\x1b[32m', 'passed');
