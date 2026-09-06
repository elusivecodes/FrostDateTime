import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime #format', function() {
    describe('Literals', function() {
        it.each([
            ['outputs ordinary quoted text', `yyyy 'year'`, '2019 year'],
            ['outputs an escaped apostrophe', `yyyy''`, `2019'`],
            ['outputs an escaped apostrophe inside quoted text', `yyyy 'o''clock'`, `2019 o'clock`],
        ])('%s', function(_, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray([2019]).format(pattern),
                expected,
            );
        });
    });

    describe('Token widths', function() {
        it('uses PHP padding for wider numeric patterns', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('yyyyy MMMMMM www dddd WWWW FFFF'),
                '02018 000006 022 0001 0001 0001',
            );
        });

        it('uses PHP fallback behavior after textual widths', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('GGGGGG QQQQQ qqqqq EEEEEEE eeeeeee ccccccc zzzzzz ZZZZZZ'),
                'AD 2 2 Fri Fri Fri Coordinated Universal Time GMT',
            );
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { timeZone: 'Australia/Brisbane' })
                    .format('ZZZZZZ'),
                'GMT+10:00',
            );
        });

        it.each([
            ['QQQ', /Unsupported token in DateTime format: QQQ/],
            ['EEEEEE', /Unsupported token in DateTime format: EEEEEE/],
            ['aaaaa', /Unsupported token in DateTime format: aaaaa/],
            ['OO', /Unsupported token in DateTime format: OO/],
            ['V', /Unsupported token in DateTime format: V/],
            ['XXXXXX', /Unsupported token in DateTime format: XXXXXX/],
        ])('rejects unsupported token %s', function(pattern, error) {
            const date = DateTime.fromArray([2018, 6, 1]);

            assert.throws(() => date.format(pattern), error);
        });
    });

    describe('Era', function() {
        it.each([
            ['GGG: outputs AD era', [2018], 'GGG', 'AD'],
            ['GGG: outputs BC era', [-5], 'GGG', 'BC'],
            ['GGGG: outputs AD era', [2018], 'GGGG', 'Anno Domini'],
            ['GGGG: outputs BC era', [-5], 'GGGG', 'Before Christ'],
            ['GGGGG: outputs AD era', [2018], 'GGGGG', 'A'],
            ['GGGGG: outputs BC era', [-5], 'GGGGG', 'B'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Calendar year', function() {
        it.each([
            ['y: outputs full year', [2018], 'y', '2018'],
            ['y: does not zero pad', [5], 'y', '5'],
            ['y: outputs the year of era', [-2000], 'y', '2001'],
            ['yy: outputs 2 low-order digits of year', [2018], 'yy', '18'],
            ['yy: zero pads to 2-digits', [5], 'yy', '05'],
            ['yy: outputs the year of era', [-2000], 'yy', '01'],
            ['yyy: outputs full year', [2018], 'yyy', '2018'],
            ['yyy: zero pads to 3-digits', [5], 'yyy', '005'],
            ['yyy: outputs the year of era', [-2000], 'yyy', '2001'],
            ['yyyy: outputs full year', [2018], 'yyyy', '2018'],
            ['yyyy: zero pads to 4-digits', [5], 'yyyy', '0005'],
            ['yyyy: outputs the year of era', [-2000], 'yyyy', '2001'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Week year', function() {
        it.each([
            ['Y: outputs full week year', [2018], 'Y', '2018'],
            ['Y: uses the year of current week', [2019, 12, 30], 'Y', '2020'],
            ['Y: does not zero pad', [5], 'Y', '5'],
            ['Y: outputs absolute year', [-2000, 1, 4], 'Y', '2000'],
            ['YY: outputs 2 low-order digits of year', [2018], 'YY', '18'],
            ['YY: uses the year of current week', [2019, 12, 30], 'YY', '20'],
            ['YY: zero pads to 2-digits', [5], 'YY', '05'],
            ['YY: outputs absolute year', [-2000, 1, 4], 'YY', '00'],
            ['YYY: outputs full week year', [2018], 'YYY', '2018'],
            ['YYY: uses the year of current week', [2019, 12, 30], 'YYY', '2020'],
            ['YYY: zero pads to 3-digits', [5], 'YYY', '005'],
            ['YYY: outputs absolute year', [-2000, 1, 4], 'YYY', '2000'],
            ['YYYY: outputs full week year', [2018], 'YYYY', '2018'],
            ['YYYY: uses the year of current week', [2019, 12, 30], 'YYYY', '2020'],
            ['YYYY: zero pads to 4-digits', [5], 'YYYY', '0005'],
            ['YYYY: outputs absolute year', [-2000, 1, 4], 'YYYY', '2000'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Quarter', function() {
        it.each([
            ['q: outputs quarter', 'q', '3'],
            ['q: outputs quarter zero padded to 2-digits', 'qq', '03'],
            ['Q: outputs quarter', 'Q', '3'],
            ['Q: outputs quarter zero padded to 2-digits', 'QQ', '03'],
        ])('%s', function(_, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray([2018, 8]).format(pattern),
                expected,
            );
        });
    });

    describe('Month', function() {
        it.each([
            ['M: outputs month', [2018, 10], 'M', '10'],
            ['M: does not zero pad', [2018, 1], 'M', '1'],
            ['MM: outputs month', [2018, 10], 'MM', '10'],
            ['MM: zero pads to 2-digits', [2018, 1], 'MM', '01'],
            ['MMM: outputs month name', [2018, 10], 'MMM', 'Oct'],
            ['MMMM: outputs month name', [2018, 10], 'MMMM', 'October'],
            ['MMMMM: outputs month name', [2018, 10], 'MMMMM', 'O'],
            ['L: outputs month', [2018, 10], 'L', '10'],
            ['L: does not zero pad', [2018, 1], 'L', '1'],
            ['LL: outputs month', [2018, 10], 'LL', '10'],
            ['LL: zero pads to 2-digits', [2018, 1], 'LL', '01'],
            ['LLL: outputs month name', [2018, 10], 'LLL', 'Oct'],
            ['LLLL: outputs month name', [2018, 10], 'LLLL', 'October'],
            ['LLLLL: outputs month name', [2018, 10], 'LLLLL', 'O'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Week of year', function() {
        it.each([
            ['w: outputs week of year', [2018, 6], 'w', '22'],
            ['w: does not zero pad', [2018, 1], 'w', '1'],
            ['ww: outputs week of year', [2018, 6], 'ww', '22'],
            ['ww: zero pads to 2-digits', [2018, 1], 'ww', '01'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Week of month', function() {
        it.each([
            ['W: outputs the week of the month', [2019, 6, 1], '1'],
            ['W: uses the local week', [2019, 6, 3], '2'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format('W'),
                expected,
            );
        });
    });

    describe('Day of month', function() {
        it.each([
            ['d: outputs the day of the month', [2019, 1, 21], 'd', '21'],
            ['d: does not zero pad', [2019, 1, 1], 'd', '1'],
            ['dd: outputs the day of the month', [2019, 1, 21], 'dd', '21'],
            ['dd: zero pads to 2-digits', [2019, 1, 1], 'dd', '01'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Day of year', function() {
        it.each([
            ['D: outputs the day of the year', [2019, 6, 1], 'D', '152'],
            ['D: does not zero pad', [2019, 1, 1], 'D', '1'],
            ['DD: outputs the day of the year', [2019, 6, 1], 'DD', '152'],
            ['DD: zero pads to 2-digits', [2019, 1, 1], 'DD', '01'],
            ['DDD: outputs the day of the year', [2019, 6, 1], 'DDD', '152'],
            ['DDD: zero pads to 3-digits', [2019, 1, 1], 'DDD', '001'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Weekday occurrence', function() {
        it.each([
            ['F: outputs the day of week in the month', [2019, 6, 1]],
            ['F: counts the weekday occurrence within the month', [2019, 6, 7]],
        ])('%s', function(_, input) {
            assert.strictEqual(
                DateTime.fromArray(input).format('F'),
                '1',
            );
        });
    });

    describe('Weekday', function() {
        it.each([
            ['EEE: outputs day name', 'EEE', 'Fri'],
            ['EEEE: outputs day name', 'EEEE', 'Friday'],
            ['EEEEE: outputs day name', 'EEEEE', 'F'],
            ['e: outputs day', 'e', '6'],
            ['ee: outputs day', 'ee', '06'],
            ['eee: outputs day name', 'eee', 'Fri'],
            ['eeee: outputs day name', 'eeee', 'Friday'],
            ['eeeee: outputs day name', 'eeeee', 'F'],
            ['c: outputs day', 'c', '6'],
            ['cc: outputs day', 'cc', '6'],
            ['ccc: outputs day name', 'ccc', 'Fri'],
            ['cccc: outputs day name', 'cccc', 'Friday'],
            ['ccccc: outputs day name', 'ccccc', 'F'],
        ])('%s', function(_, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1]).format(pattern),
                expected,
            );
        });
    });

    describe('Day period', function() {
        it.each([
            ['aaa: outputs AM day period', [2018, 1, 1, 0], 'aaa', 'AM'],
            ['aaa: outputs pm day period', [2018, 1, 1, 12], 'aaa', 'PM'],
            ['aaaa: outputs AM day period', [2018, 1, 1, 0], 'aaaa', 'AM'],
            ['aaaa: outputs pm day period', [2018, 1, 1, 12], 'aaaa', 'PM'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Hours', function() {
        it.each([
            ['h: outputs the hour [1-12]', [2019, 1, 1, 12], 'h', '12'],
            ['h: does not zero pad', [2019, 1, 1, 1], 'h', '1'],
            ['hh: outputs the hour [1-12]', [2019, 1, 1, 23], 'hh', '11'],
            ['hh: zero pads to 2-digits', [2019, 1, 1, 1], 'hh', '01'],
            ['H: outputs the hour [0-23]', [2019, 1, 1, 23], 'H', '23'],
            ['H: does not zero pad', [2019, 1, 1, 0], 'H', '0'],
            ['HH: outputs the hour [0-23]', [2019, 1, 1, 23], 'HH', '23'],
            ['HH: zero pads to 2-digits', [2019, 1, 1, 0], 'HH', '00'],
            ['K: outputs the hour [0-11]', [2019, 1, 1, 23], 'K', '11'],
            ['K: does not zero pad', [2019, 1, 1, 0], 'K', '0'],
            ['KK: outputs the hour [0-11]', [2019, 1, 1, 23], 'KK', '11'],
            ['KK: zero pads to 2-digits', [2019, 1, 1, 0], 'KK', '00'],
            ['k: outputs the hour [1-24]', [2019, 1, 1, 0], 'k', '24'],
            ['k: does not zero pad', [2019, 1, 1, 1], 'k', '1'],
            ['kk: outputs the hour [1-24]', [2019, 1, 1, 0], 'kk', '24'],
            ['kk: zero pads to 2-digits', [2019, 1, 1, 1], 'kk', '01'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Minutes', function() {
        it.each([
            ['m: outputs the minute', [2019, 1, 1, 0, 25], 'm', '25'],
            ['m: does not zero pad', [2019, 1, 1, 0, 1], 'm', '1'],
            ['mm: outputs the minute', [2019, 1, 1, 0, 25], 'mm', '25'],
            ['mm: zero pads to 2-digits', [2019, 1, 1, 0, 1], 'mm', '01'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Seconds', function() {
        it.each([
            ['s: outputs the second', [2019, 1, 1, 0, 0, 25], 's', '25'],
            ['s: does not zero pad', [2019, 1, 1, 0, 0, 1], 's', '1'],
            ['ss: outputs the second', [2019, 1, 1, 0, 0, 25], 'ss', '25'],
            ['ss: zero pads to 2-digits', [2019, 1, 1, 0, 0, 1], 'ss', '01'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Fractional seconds', function() {
        it.each([
            ['S: zero pads milliseconds to 3 digits', [2019, 1, 1, 0, 0, 0, 1], 'SSS', '001'],
            ['S: outputs the fractional second', [2019, 1, 1, 0, 0, 0, 123], 'SSS', '123'],
            ['S: truncates to token length', [2019, 1, 1, 0, 0, 0, 123], 'S', '1'],
            ['S: pads to token length', [2019, 1, 1, 0, 0, 0, 123], 'SSSSSS', '123000'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input).format(pattern),
                expected,
            );
        });
    });

    describe('Time zones', function() {
        it.each([
            ['zzz: outputs the time zone', 'zzz', 'UTC'],
            ['zzz: works with time zones', 'zzz', 'GMT+10', { timeZone: 'Australia/Brisbane' }],
            ['zzzz: outputs the time zone', 'zzzz', 'Coordinated Universal Time'],
            ['zzzz: works with time zones', 'zzzz', 'Australian Eastern Standard Time', { timeZone: 'Australia/Brisbane' }],
            ['ZZZ: outputs the time zone', 'ZZZ', '+0000'],
            ['ZZZ: works with time zones', 'ZZZ', '+1000', { timeZone: 'Australia/Brisbane' }],
            ['ZZZZ: outputs the time zone', 'ZZZZ', 'GMT'],
            ['ZZZZ: works with time zones', 'ZZZZ', 'GMT+10:00', { timeZone: 'Australia/Brisbane' }],
            ['ZZZZZ: outputs the time zone', 'ZZZZZ', 'Z'],
            ['ZZZZZ: works with time zones', 'ZZZZZ', '+10:00', { timeZone: 'Australia/Brisbane' }],
            ['ZZZZZ: works with second-precision offsets', 'ZZZZZ', '+00:09:21', { timeZone: '+00:09:21' }],
            ['O: outputs the time zone', 'O', 'GMT'],
            ['O: works with time zones', 'O', 'GMT+10', { timeZone: 'Australia/Brisbane' }],
            ['OOOO: outputs the time zone', 'OOOO', 'GMT'],
            ['OOOO: works with time zones', 'OOOO', 'GMT+10:00', { timeZone: 'Australia/Brisbane' }],
            ['VV: outputs the time zone', 'VV', 'UTC'],
            ['VV: works with time zones', 'VV', 'Australia/Brisbane', { timeZone: 'Australia/Brisbane' }],
            ['X: outputs the time zone', 'X', 'Z'],
            ['X: works with time zones', 'X', '+10', { timeZone: 'Australia/Brisbane' }],
            ['XX: outputs the time zone', 'XX', 'Z'],
            ['XX: works with time zones', 'XX', '+1000', { timeZone: 'Australia/Brisbane' }],
            ['XXX: outputs the time zone', 'XXX', 'Z'],
            ['XXX: works with time zones', 'XXX', '+10:00', { timeZone: 'Australia/Brisbane' }],
            ['XXXX: works with second-precision offsets', 'XXXX', '+000921', { timeZone: '+00:09:21' }],
            ['XXXXX: works with second-precision offsets', 'XXXXX', '+00:09:21', { timeZone: '+00:09:21' }],
            ['x: outputs the time zone', 'x', '+00'],
            ['x: works with time zones', 'x', '+10', { timeZone: 'Australia/Brisbane' }],
            ['xx: outputs the time zone', 'xx', '+0000'],
            ['xx: works with time zones', 'xx', '+1000', { timeZone: 'Australia/Brisbane' }],
            ['xxx: outputs the time zone', 'xxx', '+00:00'],
            ['xxx: works with time zones', 'xxx', '+10:00', { timeZone: 'Australia/Brisbane' }],
        ])('%s', function(_, pattern, expected, options = {}) {
            assert.strictEqual(DateTime.now(options).format(pattern), expected);
        });
    });
});
