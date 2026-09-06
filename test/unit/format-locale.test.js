import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime #format (Locale)', function() {
    it('uses the Gregorian calendar', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 2, 1], { locale: 'fa-IR' })
                .format('MMMM yyyy GGGG'),
            'فوریهٔ ۲۰۱۸ میلادی',
        );
    });

    describe('Era', function() {
        it.each([
            ['GGG: outputs AD era', [2018], 'GGG', 'н. э.'],
            ['GGG: outputs BC era', [-5], 'GGG', 'до н. э.'],
            ['GGGG: outputs AD era', [2018], 'GGGG', 'от Рождества Христова'],
            ['GGGG: outputs BC era', [-5], 'GGGG', 'до Рождества Христова'],
            ['GGGGG: outputs AD era', [2018], 'GGGGG', 'н.э.'],
            ['GGGGG: outputs BC era', [-5], 'GGGGG', 'до н.э.'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ru' }).format(pattern),
                expected,
            );
        });
    });

    describe('Calendar year', function() {
        it.each([
            ['y: outputs full year', [2018], 'y', '٢٠١٨'],
            ['y: does not zero pad', [5], 'y', '٥'],
            ['yy: outputs 2 low-order digits of year', [2018], 'yy', '١٨'],
            ['yy: zero pads to 2-digits', [5], 'yy', '٠٥'],
            ['yyy: outputs full year', [2018], 'yyy', '٢٠١٨'],
            ['yyy: zero pads to 3-digits', [5], 'yyy', '٠٠٥'],
            ['yyyy: outputs full year', [2018], 'yyyy', '٢٠١٨'],
            ['yyyy: zero pads to 4-digits', [5], 'yyyy', '٠٠٠٥'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Week year', function() {
        it.each([
            ['Y: outputs full week year', [2018], 'Y', '٢٠١٨'],
            ['Y: uses the year of current week', [2019, 12, 30], 'Y', '٢٠٢٠'],
            ['Y: does not zero pad', [5, 2], 'Y', '٥'],
            ['YY: outputs 2 low-order digits of year', [2018], 'YY', '١٨'],
            ['YY: uses the year of current week', [2019, 12, 30], 'YY', '٢٠'],
            ['YY: zero pads to 2-digits', [5, 2], 'YY', '٠٥'],
            ['YYY: outputs full week year', [2018], 'YYY', '٢٠١٨'],
            ['YYY: uses the year of current week', [2019, 12, 30], 'YYY', '٢٠٢٠'],
            ['YYY: zero pads to 3-digits', [5, 2], 'YYY', '٠٠٥'],
            ['YYYY: outputs full week year', [2018], 'YYYY', '٢٠١٨'],
            ['YYYY: uses the year of current week', [2019, 12, 30], 'YYYY', '٢٠٢٠'],
            ['YYYY: zero pads to 4-digits', [5, 2], 'YYYY', '٠٠٠٥'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Quarter', function() {
        it.each([
            ['q: outputs quarter', 'q', '٣'],
            ['q: outputs quarter zero padded to 2-digits', 'qq', '٠٣'],
            ['Q: outputs quarter', 'Q', '٣'],
            ['Q: outputs quarter zero padded to 2-digits', 'QQ', '٠٣'],
        ])('%s', function(_, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray([2018, 8], { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Month', function() {
        it.each([
            ['M: outputs month', [2018, 10], 'M', '١٠', { locale: 'ar-eg' }],
            ['M: does not zero pad', [2018, 1], 'M', '١', { locale: 'ar-eg' }],
            ['MM: outputs month', [2018, 10], 'MM', '١٠', { locale: 'ar-eg' }],
            ['MM: zero pads to 2-digits', [2018, 1], 'MM', '٠١', { locale: 'ar-eg' }],
            ['MMM: outputs month name', [2018, 10], 'MMM', 'окт.', { locale: 'ru' }],
            ['MMMM: outputs month name', [2018, 10], 'MMMM', 'октября', { locale: 'ru' }],
            ['MMMMM: outputs month name', [2018, 10], 'MMMMM', 'О', { locale: 'ru' }],
            ['L: outputs month', [2018, 10], 'L', '١٠', { locale: 'ar-eg' }],
            ['L: does not zero pad', [2018, 1], 'L', '١', { locale: 'ar-eg' }],
            ['LL: outputs month', [2018, 10], 'LL', '١٠', { locale: 'ar-eg' }],
            ['LL: zero pads to 2-digits', [2018, 1], 'LL', '٠١', { locale: 'ar-eg' }],
            ['LLL: outputs month name', [2018, 10], 'LLL', 'окт.', { locale: 'ru' }],
            ['LLLL: outputs month name', [2018, 10], 'LLLL', 'октябрь', { locale: 'ru' }],
            ['LLLLL: outputs month name', [2018, 10], 'LLLLL', 'О', { locale: 'ru' }],
        ])('%s', function(_, input, pattern, expected, options = {}) {
            assert.strictEqual(
                DateTime.fromArray(input, options).format(pattern),
                expected,
            );
        });
    });

    describe('Week of year', function() {
        it.each([
            ['w: outputs week of year', [2018, 6], 'w', '٢٢'],
            ['w: does not zero pad', [2018, 1], 'w', '١'],
            ['ww: outputs week of year', [2018, 6], 'ww', '٢٢'],
            ['ww: zero pads to 2-digits', [2018, 1], 'ww', '٠١'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Week of month', function() {
        it.each([
            ['W: outputs the week of the month', [2019, 6, 1], '١'],
            ['W: uses the local week', [2019, 6, 8], '٢'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format('W'),
                expected,
            );
        });
    });

    describe('Day of month', function() {
        it.each([
            ['d: outputs the day of the month', [2019, 1, 21], 'd', '٢١'],
            ['d: does not zero pad', [2019, 1, 1], 'd', '١'],
            ['dd: outputs the day of the month', [2019, 1, 21], 'dd', '٢١'],
            ['dd: zero pads to 2-digits', [2019, 1, 1], 'dd', '٠١'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Day of year', function() {
        it.each([
            ['D: outputs the day of the year', [2019, 6, 1], 'D', '١٥٢'],
            ['D: does not zero pad', [2019, 1, 1], 'D', '١'],
            ['DD: outputs the day of the year', [2019, 6, 1], 'DD', '١٥٢'],
            ['DD: zero pads to 2-digits', [2019, 1, 1], 'DD', '٠١'],
            ['DDD: outputs the day of the year', [2019, 6, 1], 'DDD', '١٥٢'],
            ['DDD: zero pads to 3-digits', [2019, 1, 1], 'DDD', '٠٠١'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
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
                DateTime.fromArray(input, { locale: 'ar-eg' }).format('F'),
                '١',
            );
        });
    });

    describe('Weekday', function() {
        it.each([
            ['EEE: outputs day name', 'EEE', 'пт', { locale: 'ru' }],
            ['EEEE: outputs day name', 'EEEE', 'пятница', { locale: 'ru' }],
            ['EEEEE: outputs day name', 'EEEEE', 'П', { locale: 'ru' }],
            ['e: outputs day', 'e', '٧', { locale: 'ar-eg' }],
            ['ee: outputs day', 'ee', '٠٧', { locale: 'ar-eg' }],
            ['eee: outputs day name', 'eee', 'пт', { locale: 'ru' }],
            ['eeee: outputs day name', 'eeee', 'пятница', { locale: 'ru' }],
            ['eeeee: outputs day name', 'eeeee', 'П', { locale: 'ru' }],
            ['c: outputs day', 'c', '٧', { locale: 'ar-eg' }],
            ['cc: outputs day', 'cc', '٧', { locale: 'ar-eg' }],
            ['ccc: outputs day name', 'ccc', 'пт', { locale: 'ru' }],
            ['cccc: outputs day name', 'cccc', 'пятница', { locale: 'ru' }],
            ['ccccc: outputs day name', 'ccccc', 'П', { locale: 'ru' }],
        ])('%s', function(_, pattern, expected, options = {}) {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], options).format(pattern),
                expected,
            );
        });
    });

    describe('Day period', function() {
        it.each([
            ['aaa: outputs AM day period', [2018, 1, 1, 0], 'aaa', '上午'],
            ['aaa: outputs pm day period', [2018, 1, 1, 12], 'aaa', '下午'],
            ['aaaa: outputs AM day period', [2018, 1, 1, 0], 'aaaa', '上午'],
            ['aaaa: outputs pm day period', [2018, 1, 1, 12], 'aaaa', '下午'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'zh' }).format(pattern),
                expected,
            );
        });
    });

    describe('Hours', function() {
        it.each([
            ['h: outputs the hour [1-12]', [2019, 1, 1, 12], 'h', '١٢'],
            ['h: does not zero pad', [2019, 1, 1, 1], 'h', '١'],
            ['hh: outputs the hour [1-12]', [2019, 1, 1, 23], 'hh', '١١'],
            ['hh: zero pads to 2-digits', [2019, 1, 1, 1], 'hh', '٠١'],
            ['H: outputs the hour [0-23]', [2019, 1, 1, 23], 'H', '٢٣'],
            ['H: does not zero pad', [2019, 1, 1, 0], 'H', '٠'],
            ['HH: outputs the hour [0-23]', [2019, 1, 1, 23], 'HH', '٢٣'],
            ['HH: zero pads to 2-digits', [2019, 1, 1, 0], 'HH', '٠٠'],
            ['K: outputs the hour [0-11]', [2019, 1, 1, 23], 'K', '١١'],
            ['K: does not zero pad', [2019, 1, 1, 0], 'K', '٠'],
            ['KK: outputs the hour [0-11]', [2019, 1, 1, 23], 'KK', '١١'],
            ['KK: zero pads to 2-digits', [2019, 1, 1, 0], 'KK', '٠٠'],
            ['k: outputs the hour [1-24]', [2019, 1, 1, 0], 'k', '٢٤'],
            ['k: does not zero pad', [2019, 1, 1, 1], 'k', '١'],
            ['kk: outputs the hour [1-24]', [2019, 1, 1, 0], 'kk', '٢٤'],
            ['kk: zero pads to 2-digits', [2019, 1, 1, 1], 'kk', '٠١'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Minutes', function() {
        it.each([
            ['m: outputs the minute', [2019, 1, 1, 0, 25], 'm', '٢٥'],
            ['m: does not zero pad', [2019, 1, 1, 0, 1], 'm', '١'],
            ['mm: outputs the minute', [2019, 1, 1, 0, 25], 'mm', '٢٥'],
            ['mm: zero pads to 2-digits', [2019, 1, 1, 0, 1], 'mm', '٠١'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Seconds', function() {
        it.each([
            ['s: outputs the second', [2019, 1, 1, 0, 0, 25], 's', '٢٥'],
            ['s: does not zero pad', [2019, 1, 1, 0, 0, 1], 's', '١'],
            ['ss: outputs the second', [2019, 1, 1, 0, 0, 25], 'ss', '٢٥'],
            ['ss: zero pads to 2-digits', [2019, 1, 1, 0, 0, 1], 'ss', '٠١'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Fractional seconds', function() {
        it.each([
            ['S: zero pads milliseconds to 3 digits', [2019, 1, 1, 0, 0, 0, 1], 'SSS', '٠٠١'],
            ['S: outputs the fractional second', [2019, 1, 1, 0, 0, 0, 123], 'SSS', '١٢٣'],
            ['S: truncates to token length', [2019, 1, 1, 0, 0, 0, 123], 'S', '١'],
            ['S: pads to token length', [2019, 1, 1, 0, 0, 0, 123], 'SSSSSS', '١٢٣٠٠٠'],
        ])('%s', function(_, input, pattern, expected) {
            assert.strictEqual(
                DateTime.fromArray(input, { locale: 'ar-eg' }).format(pattern),
                expected,
            );
        });
    });

    describe('Time zones', function() {
        it.each([
            ['zzz: outputs the time zone', 'zzz', 'UTC', { locale: 'ru' }],
            ['zzz: works with time zones', 'zzz', 'GMT+10', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['zzzz: outputs the time zone', 'zzzz', 'Всемирное координированное время', { locale: 'ru' }],
            ['zzzz: works with time zones', 'zzzz', 'Восточная Австралия, стандартное время', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['ZZZ: outputs the time zone', 'ZZZ', '+0000', { locale: 'ru' }],
            ['ZZZ: works with time zones', 'ZZZ', '+1000', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['ZZZZ: outputs the time zone', 'ZZZZ', 'GMT', { locale: 'ru' }],
            ['ZZZZ: works with time zones', 'ZZZZ', 'GMT+10:00', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['ZZZZZ: outputs the time zone', 'ZZZZZ', 'Z', { locale: 'ru' }],
            ['ZZZZZ: works with time zones', 'ZZZZZ', '+10:00', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['O: outputs the time zone', 'O', 'GMT', { locale: 'ru' }],
            ['O: works with time zones', 'O', 'GMT+10', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['OOOO: outputs the time zone', 'OOOO', 'GMT', { locale: 'ru' }],
            ['OOOO: works with time zones', 'OOOO', 'GMT+10:00', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['VV: outputs the time zone', 'VV', 'UTC', { locale: 'ru' }],
            ['VV: works with time zones', 'VV', 'Australia/Brisbane', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['X: outputs the time zone', 'X', 'Z', { locale: 'ru' }],
            ['X: works with time zones', 'X', '+10', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['XX: outputs the time zone', 'XX', 'Z', { locale: 'ru' }],
            ['XX: works with time zones', 'XX', '+1000', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['XXX: outputs the time zone', 'XXX', 'Z', { locale: 'ru' }],
            ['XXX: works with time zones', 'XXX', '+10:00', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['x: outputs the time zone', 'x', '+00', { locale: 'ru' }],
            ['x: works with time zones', 'x', '+10', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['xx: outputs the time zone', 'xx', '+0000', { locale: 'ru' }],
            ['xx: works with time zones', 'xx', '+1000', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
            ['xxx: outputs the time zone', 'xxx', '+00:00', { locale: 'ru' }],
            ['xxx: works with time zones', 'xxx', '+10:00', { timeZone: 'Australia/Brisbane', locale: 'ru' }],
        ])('%s', function(_, pattern, expected, options = {}) {
            assert.strictEqual(DateTime.now(options).format(pattern), expected);
        });
    });
});
