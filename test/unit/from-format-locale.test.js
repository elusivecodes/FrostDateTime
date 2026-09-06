import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime #fromFormat (Locale)', function() {
    beforeEach(function() {
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date('2026-09-06T12:00:00.000Z'));
    });

    afterEach(function() {
        vi.useRealTimers();
    });

    it('parses two-digit years with astral numbering-system digits', function({ skip }) {
        const locale = 'en-u-nu-mathbold';
        if (new Intl.NumberFormat(locale).resolvedOptions().numberingSystem !== 'mathbold') {
            skip();
        }

        assert.strictEqual(
            DateTime.fromFormat('yy-MM-dd', '𝟎𝟓-𝟎𝟏-𝟎𝟏', { locale }).getYear(),
            2005,
        );
        assert.strictEqual(
            DateTime.fromFormat('YY w e', '𝟎𝟓 𝟏 𝟏', { locale }).getWeekYear(),
            2005,
        );
    });

    it('parses astral numbering-system digits', function({ skip }) {
        const locale = 'en-u-nu-mathbold';
        if (new Intl.NumberFormat(locale).resolvedOptions().numberingSystem !== 'mathbold') {
            skip();
        }

        assert.strictEqual(
            DateTime.fromFormat('yyyy-MM-dd', '𝟐𝟎𝟏𝟖-𝟎𝟔-𝟎𝟏', { locale })
                .toIsoString(),
            '2018-06-01T00:00:00.000+00:00',
        );
    });

    describe('Era', function() {
        it.each([
            ['GGG: parses AD era', 'yyyy GGG', '1970 н. э.', 1970],
            ['GGG: parses BC era', 'yyyy GGG', '1970 до н. э.', -1969],
            ['GGGG: parses AD era', 'yyyy GGGG', '1970 от Рождества Христова', 1970],
            ['GGGG: parses BC era', 'yyyy GGGG', '1970 до Рождества Христова', -1969],
            ['GGGGG: parses AD era', 'yyyy GGGGG', '1970 н.э.', 1970],
            ['GGGGG: parses BC era', 'yyyy GGGGG', '1970 до н.э.', -1969],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ru' });

            assert.strictEqual(date.getYear(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it('GGG: throws on malformed eras with punctuation', function() {
            assert.throws((_) => {
                DateTime.fromFormat('yyyy GGG', '1970 нx эx', { locale: 'ru' });
            });
        });
    });

    describe('Calendar year', function() {
        it.each([
            ['y: parses full year', 'y', '٢٠١٨', 2018],
            ['y: parses 1-digit year', 'y', '٥', 5],
            ['yy: parses full year', 'yy', '٢٠١٨', 2018],
            ['yyy: parses full year', 'yyy', '٢٠١٨', 2018],
            ['yyy: parses zero padded year', 'yyy', '٠٨٨', 88],
            ['yyyy: parses full year', 'yyyy', '٢٠١٨', 2018],
            ['yyyy: parses zero padded year', 'yyyy', '٠٠٨٨', 88],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getYear(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it.each([
            ['٠٠', 2000],
            ['٠٥', 2005],
            ['٠٩', 2009],
            ['٨٨', 1988],
        ])('parses year %s as %i', function(value, expected) {
            assert.strictEqual(
                DateTime.fromFormat('yy', value, { locale: 'ar-eg' })
                    .getYear(),
                expected,
            );
        });
    });

    describe('Week year', function() {
        it.each([
            ['Y: parses full year', 'Y w e', '٢٠١٨ ١ ٣', 2018],
            ['Y: parses 1-digit year', 'Y w e', '٥ ١ ١', 5],
            ['YY: parses full year', 'YY w e', '٢٠١٨ ١ ٣', 2018],
            ['YYY: parses full year', 'YYY w e', '٢٠١٨ ١ ٣', 2018],
            ['YYY: parses zero padded year', 'YYY w e', '٠٨٨ ١ ٦', 88],
            ['YYYY: parses full year', 'YYYY w e', '٢٠١٨ ١ ٣', 2018],
            ['YYYY: parses zero padded year', 'YYYY w e', '٠٠٨٨ ١ ٦', 88],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getWeekYear(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it.each([
            ['٠٠', 2000],
            ['٠٥', 2005],
            ['٠٩', 2009],
            ['٨٨', 1988],
        ])('parses week year %s as %i', function(value, expected) {
            assert.strictEqual(
                DateTime.fromFormat('YY w e', `${value} ١ ٦`, { locale: 'ar-eg' })
                    .getWeekYear(),
                expected,
            );
        });
    });

    describe('Quarter', function() {
        it.each([
            ['q: parses quarter', 'q', '٣'],
            ['qq: parses quarter', 'qq', '٠٣'],
            ['Q: parses quarter', 'Q', '٣'],
            ['QQ: parses quarter', 'QQ', '٠٣'],
        ])('%s', function(_, pattern, input) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getQuarter(), 3);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Month', function() {
        it.each([
            ['M: parses month', 'M', '١٠', 10, { locale: 'ar-eg' }],
            ['M: parses 1-digit month', 'M', '١', 1, { locale: 'ar-eg' }],
            ['MM: parses month', 'MM', '١٠', 10, { locale: 'ar-eg' }],
            ['MM: parses zero padded month', 'MM', '٠١', 1, { locale: 'ar-eg' }],
            ['MMM: parses month name', 'MMM', 'окт.', 10, { locale: 'ru' }],
            ['MMMM: parses month name', 'MMMM', 'октября', 10, { locale: 'ru' }],
            ['L: parses month', 'L', '١٠', 10, { locale: 'ar-eg' }],
            ['L: parses 1-digit month', 'L', '١', 1, { locale: 'ar-eg' }],
            ['LL: parses month', 'LL', '١٠', 10, { locale: 'ar-eg' }],
            ['LL: parses zero padded month', 'LL', '٠١', 1, { locale: 'ar-eg' }],
            ['LLL: parses month name', 'LLL', 'окт.', 10, { locale: 'ru' }],
            ['LLLL: parses month name', 'LLLL', 'октябрь', 10, { locale: 'ru' }],
        ])('%s', function(_, pattern, input, expected, options = {}) {
            const date = DateTime.fromFormat(pattern, input, options);

            assert.strictEqual(date.getMonth(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it('MMM: throws on malformed month names with punctuation', function() {
            assert.throws((_) => {
                DateTime.fromFormat('MMM', 'октя', { locale: 'ru' });
            });
        });

        it('MMMMM: throws because narrow month parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('MMMMM', 'О', { locale: 'ru' });
            }, /Unsupported parsing token in DateTime format: MMMMM/);
        });

        it('LLLLL: throws because narrow standalone month parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('LLLLL', 'О', { locale: 'ru' });
            }, /Unsupported parsing token in DateTime format: LLLLL/);
        });
    });

    describe('Week of year', function() {
        it.each([
            ['w: parses week of year', 'w', '٢٢', 22],
            ['w: parses 1-digit week of year', 'w', '١', 1],
            ['ww: parses week of year', 'ww', '٢٢', 22],
            ['ww: parses zero padded week of year', 'ww', '٠١', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getWeek(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Week of month', function() {
        it('W: parses the week of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('W', '٣', { locale: 'ar-eg' })
                    .getWeekOfMonth(),
                3,
            );
        });
    });

    describe('Day of month', function() {
        it.each([
            ['d: parses the day of the month', 'd', '٢١', 21],
            ['d: parses 1-digit day of the month', 'd', '١', 1],
            ['dd: parses the day of the month', 'dd', '٢١', 21],
            ['dd: parses zero padded day of the month', 'dd', '٠١', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getDate(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Day of year', function() {
        it.each([
            ['D: parses the day of the year', 'D', '١٥٢', 152],
            ['D: parses 1-digit day of the year', 'D', '١', 1],
            ['DD: parses the day of the year', 'DD', '١٥٢', 152],
            ['DD: parses zero padded day of the year', 'DD', '٠١', 1],
            ['DDD: parses the day of the year', 'DDD', '١٥٢', 152],
            ['DDD: parses zero padded day of the year', 'DDD', '٠٠١', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getDayOfYear(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Weekday occurrence', function() {
        it('F: parses the day of week in the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('F', '٣', { locale: 'ar-eg' })
                    .getWeekDayInMonth(),
                3,
            );
        });
    });

    describe('Weekday', function() {
        it.each([
            ['EEE: parses day name', 'EEE', 'пт', { locale: 'ru' }],
            ['EEEE: parses day name', 'EEEE', 'пятница', { locale: 'ru' }],
            ['e: parses day', 'e', '٥', { locale: 'ar-eg' }],
            ['ee: parses day', 'ee', '٠٥', { locale: 'ar-eg' }],
            ['eee: parses day name', 'eee', 'пт', { locale: 'ru' }],
            ['eeee: parses day name', 'eeee', 'пятница', { locale: 'ru' }],
            ['c: parses day', 'c', '٥', { locale: 'ar-eg' }],
            ['cc: parses day', 'cc', '٠٥', { locale: 'ar-eg' }],
            ['ccc: parses day name', 'ccc', 'пт', { locale: 'ru' }],
            ['cccc: parses day name', 'cccc', 'пятница', { locale: 'ru' }],
        ])('%s', function(_, pattern, input, options = {}) {
            const date = DateTime.fromFormat(pattern, input, options);

            assert.strictEqual(date.getWeekDay(), 5);
            assert.strictEqual(date.isValid, true);
        });

        it('EEEEE: throws because narrow weekday parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('EEEEE', 'П', { locale: 'ru' });
            }, /Unsupported parsing token in DateTime format: EEEEE/);
        });

        it('eeeee: throws because narrow weekday parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('eeeee', 'П', { locale: 'ru' });
            }, /Unsupported parsing token in DateTime format: eeeee/);
        });

        it('ccccc: throws because narrow standalone weekday parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('ccccc', 'П', { locale: 'ru' });
            }, /Unsupported parsing token in DateTime format: ccccc/);
        });
    });

    describe('Day period', function() {
        it.each([
            ['aaa: parses AM day period', 'aaa', '上午', 0],
            ['aaa: parses pm day period', 'aaa', '下午', 12],
            ['aaaa: parses AM day period', 'aaaa', '上午', 0],
            ['aaaa: parses pm day period', 'aaaa', '下午', 12],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'zh' });

            assert.strictEqual(date.getHours(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Hours', function() {
        it.each([
            ['h: parses the hour [1-12]', 'h', '١٢', 0],
            ['h: parses 1-digit hour', 'h', '١', 1],
            ['hh: parses the hour [1-12]', 'hh', '١٢', 0],
            ['hh: parses zero padded hour', 'hh', '٠١', 1],
            ['H: parses the hour [0-23]', 'H', '٢٣', 23],
            ['H: parses 1-digit hour', 'H', '٠', 0],
            ['HH: parses the hour [0-23]', 'HH', '٢٣', 23],
            ['HH: parses zero padded hour', 'HH', '٠٠', 0],
            ['K: parses the hour [0-11]', 'K', '١١', 11],
            ['K: parses 1-digit hour', 'K', '٠', 0],
            ['KK: parses the hour [0-11]', 'KK', '١١', 11],
            ['KK: parses zero padded hour', 'KK', '٠٠', 0],
            ['k: parses the hour [1-24]', 'k', '٢٤', 0],
            ['k: parses 1-digit hour', 'k', '١', 1],
            ['kk: parses the hour [1-24]', 'kk', '٢٤', 0],
            ['kk: parses zero padded hour', 'kk', '٠١', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getHours(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Minutes', function() {
        it.each([
            ['m: parses the minute', 'm', '٢٥', 25],
            ['m: parses 1-digit minute', 'm', '١', 1],
            ['mm: parses the minute', 'mm', '٢٥', 25],
            ['mm: parses zero padded minute', 'mm', '٠١', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getMinutes(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Seconds', function() {
        it.each([
            ['s: parses the second', 's', '٢٥', 25],
            ['s: parses 1-digit second', 's', '١', 1],
            ['ss: parses the second', 'ss', '٢٥', 25],
            ['ss: parses zero padded second', 'ss', '٠١', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getSeconds(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Fractional seconds', function() {
        it.each([
            ['S: parses a single fractional digit', 'S', '١', 100],
            ['S: parses the fractional second', 'SSS', '١٢٣', 123],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ar-eg' });

            assert.strictEqual(date.getMilliseconds(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Time zones', function() {
        it.each([
            ['ZZZ: parses the time zone', 'dd/MM/yyyy HH:mm:ss ZZZ', '01/01/2019 00:00:00 +0000', '2019-01-01T00:00:00.000+00:00'],
            ['ZZZ: works with time zones', 'dd/MM/yyyy HH:mm:ss ZZZ', '01/01/2019 00:00:00 +1000', '2018-12-31T14:00:00.000+00:00'],
            ['ZZZZ: parses the time zone', 'dd/MM/yyyy HH:mm:ss ZZZZ', '01/01/2019 00:00:00 GMT+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['ZZZZ: works with time zones', 'dd/MM/yyyy HH:mm:ss ZZZZ', '01/01/2019 00:00:00 GMT+10:00', '2018-12-31T14:00:00.000+00:00'],
            ['ZZZZZ: parses the time zone', 'dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +00:00', '2019-01-01T00:00:00.000+00:00'],
            ['ZZZZZ: works with time zones', 'dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +10:00', '2018-12-31T14:00:00.000+00:00'],
            ['O: parses the time zone', 'dd/MM/yyyy HH:mm:ss O', '01/01/2019 00:00:00 GMT+00', '2019-01-01T00:00:00.000+00:00'],
            ['O: works with time zones', 'dd/MM/yyyy HH:mm:ss O', '01/01/2019 00:00:00 GMT+10', '2018-12-31T14:00:00.000+00:00'],
            ['OOOO: parses the time zone', 'dd/MM/yyyy HH:mm:ss OOOO', '01/01/2019 00:00:00 GMT+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['OOOO: works with time zones', 'dd/MM/yyyy HH:mm:ss OOOO', '01/01/2019 00:00:00 GMT+10:00', '2018-12-31T14:00:00.000+00:00'],
            ['VV: parses the time zone', 'dd/MM/yyyy HH:mm:ss VV', '01/01/2019 00:00:00 UTC', '2019-01-01T00:00:00.000+00:00'],
            ['VV: works with time zones', 'dd/MM/yyyy HH:mm:ss VV', '01/01/2019 00:00:00 Australia/Brisbane', '2018-12-31T14:00:00.000+00:00'],
            ['X: parses the time zone', 'dd/MM/yyyy HH:mm:ss X', '01/01/2019 00:00:00 Z', '2019-01-01T00:00:00.000+00:00'],
            ['X: works with time zones', 'dd/MM/yyyy HH:mm:ss X', '01/01/2019 00:00:00 +10', '2018-12-31T14:00:00.000+00:00'],
            ['XX: parses the time zone', 'dd/MM/yyyy HH:mm:ss XX', '01/01/2019 00:00:00 Z', '2019-01-01T00:00:00.000+00:00'],
            ['XX: works with time zones', 'dd/MM/yyyy HH:mm:ss XX', '01/01/2019 00:00:00 +1000', '2018-12-31T14:00:00.000+00:00'],
            ['XXX: parses the time zone', 'dd/MM/yyyy HH:mm:ss XXX', '01/01/2019 00:00:00 Z', '2019-01-01T00:00:00.000+00:00'],
            ['XXX: works with time zones', 'dd/MM/yyyy HH:mm:ss XXX', '01/01/2019 00:00:00 +10:00', '2018-12-31T14:00:00.000+00:00'],
            ['x: parses the time zone', 'dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +00', '2019-01-01T00:00:00.000+00:00'],
            ['x: works with time zones', 'dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +10', '2018-12-31T14:00:00.000+00:00'],
            ['xx: parses the time zone', 'dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +0000', '2019-01-01T00:00:00.000+00:00'],
            ['xx: works with time zones', 'dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +1000', '2018-12-31T14:00:00.000+00:00'],
            ['xxx: parses the time zone', 'dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +00:00', '2019-01-01T00:00:00.000+00:00'],
            ['xxx: works with time zones', 'dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +10:00', '2018-12-31T14:00:00.000+00:00'],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'ru' });

            assert.strictEqual(date.toIsoString(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });
});
