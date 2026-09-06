import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime #fromFormat', function() {
    beforeEach(function() {
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date('2026-09-06T12:00:00.000Z'));
    });

    afterEach(function() {
        vi.useRealTimers();
    });

    describe('Literals', function() {
        it.each([
            ['parses ordinary quoted text', `yyyy 'year'`, '2019 year'],
            ['parses an escaped apostrophe', `yyyy''`, `2019'`],
            ['parses an escaped apostrophe inside quoted text', `yyyy 'o''clock'`, `2019 o'clock`],
        ])('%s', function(_, pattern, input) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getYear(), 2019);
            assert.strictEqual(date.isValid, true);
        });

        it.each([
            [`yyyy'😀'MM-dd`, '2024😀01-01'],
            [`'😀'yyyy-MM-dd`, '😀2024-01-01'],
            [`yyyy-MM-dd'😀'`, '2024-01-01😀'],
            ['😀yyyy-MM-dd', '😀2024-01-01'],
            ['yyyy😀MM-dd', '2024😀01-01'],
            ['yyyy-MM-dd😀', '2024-01-01😀'],
            [`yyyy'👩🏽‍💻'MM-dd`, '2024👩🏽‍💻01-01'],
            [`yyyy'😀''🗓️'MM-dd`, `2024😀'🗓️01-01`],
        ])('parses Unicode literals in %s', function(pattern, input) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.toIsoString(), '2024-01-01T00:00:00.000+00:00');
            assert.strictEqual(date.isValid, true);
        });

        it.each([
            [`yyyy'😀'MM-dd`, '2024😃01-01'],
            [`yyyy'👩🏽‍💻'MM-dd`, '2024👩01-01'],
            [`yyyy'😀abc'MM-dd`, '2024😀abx01-01'],
            [`yyyy-MM-dd'😀'`, '2024-01-01'],
            [`yyyy-MM-dd'😀'`, '2024-01-01\uD83D'],
        ])('rejects mismatched or incomplete Unicode literals in %s with input %j', function(pattern, input) {
            assert.throws(() => DateTime.fromFormat(pattern, input), /Unmatched literal in DateTime string:/);
        });

        it('rejects trailing characters after a matching Unicode literal', function() {
            assert.throws(
                () => DateTime.fromFormat(`yyyy-MM-dd'😀'`, '2024-01-01😀x'),
                /Unmatched trailing characters in DateTime string:/,
            );
        });
    });

    describe('Token anchoring', function() {
        it.each([
            [`MMM'Feb'`, '???Feb'],
            [`EEE'Tue'`, '???Tue'],
            [`ZZZZ'GMT'`, '???GMT'],
            [`XXX'Z'`, '?Z'],
            [`yyyy MMM'Feb'`, '2024 ???Feb'],
        ])('rejects unmatched prefixes in %s', function(pattern, input) {
            assert.throws((_) => {
                DateTime.fromFormat(pattern, input, { locale: 'en-US' });
            }, /Unmatched token in DateTime string:/);
        });

        it.each([
            [`MMM'Feb'`, 'FebFeb', '1970-02-01T00:00:00.000+00:00'],
            [`EEE'Tue'`, 'TueTue', '1969-12-30T00:00:00.000+00:00'],
            [`ZZZZ'GMT'`, 'GMTGMT', '1970-01-01T00:00:00.000+00:00'],
            [`XXX'Z'`, 'ZZ', '1970-01-01T00:00:00.000+00:00'],
            [`yyyy MMM'Feb'`, '2024 FebFeb', '2024-02-01T00:00:00.000+00:00'],
        ])('accepts valid alternatives and following literals in %s', function(pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input, { locale: 'en-US' });

            assert.strictEqual(date.toIsoString(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Compact numeric patterns', function() {
        it.each([
            ['parses adjacent fixed-width tokens', 'yyyyMMddHHmmss', '20190102123456', '2019-01-02T12:34:56.000+00:00'],
            ['parses wider PHP numeric patterns', 'yyyyyMMMMMMdddd', '020180000060001', '2018-06-01T00:00:00.000+00:00'],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.toIsoString(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it('does not limit standalone numeric tokens', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy', '20190')
                    .getYear(),
                20190,
            );
        });

        it('rejects trailing input in ambiguous patterns', function() {
            assert.throws((_) => {
                DateTime.fromFormat('Md', '123');
            }, /Unmatched trailing characters in DateTime string: 3/);
        });
    });

    describe('Token widths', function() {
        it('parses numeric quarter fallback widths', function() {
            assert.strictEqual(
                DateTime.fromFormat('QQQQQ', '2')
                    .getQuarter(),
                2,
            );
        });

        it('parses localized GMT fallback widths', function() {
            assert.strictEqual(
                DateTime.fromFormat(
                    'dd/MM/yyyy HH:mm:ss ZZZZZZ',
                    '01/01/2019 00:00:00 GMT+10:00',
                ).toIsoString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });

        it.each([
            ['QQQ', 'Q2', /Unsupported parsing token in DateTime format: QQQ/],
            ['EEEEEE', 'Fr', /Unsupported parsing token in DateTime format: EEEEEE/],
            ['aaaaa', 'p', /Unsupported parsing token in DateTime format: aaaaa/],
            ['OO', '', /Unsupported parsing token in DateTime format: OO/],
            ['V', 'usnyc', /Unsupported parsing token in DateTime format: V/],
            ['xxxxxx', '', /Unsupported parsing token in DateTime format: xxxxxx/],
            ['z', 'UTC', /Unsupported parsing token in DateTime format: z/],
        ])('rejects unsupported token %s', function(pattern, input, error) {
            assert.throws(() => DateTime.fromFormat(pattern, input), error);
        });
    });

    describe('Era', function() {
        it.each([
            ['GGG: parses AD era', 'yyyy GGG', '1970 AD', 1970],
            ['GGG: parses BC era', 'yyyy GGG', '1970 BC', -1969],
            ['GGGG: parses AD era', 'yyyy GGGG', '1970 Anno Domini', 1970],
            ['GGGG: parses BC era', 'yyyy GGGG', '1970 Before Christ', -1969],
            ['GGGGG: parses AD era', 'yyyy GGGGG', '1970 A', 1970],
            ['GGGGG: parses BC era', 'yyyy GGGGG', '1970 B', -1969],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getYear(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Calendar year', function() {
        it.each([
            ['y: parses full year', 'y', '2018', 2018],
            ['y: parses 1-digit year', 'y', '5', 5],
            ['yy: parses full year', 'yy', '2018', 2018],
            ['yyy: parses full year', 'yyy', '2018', 2018],
            ['yyy: parses zero padded year', 'yyy', '088', 88],
            ['yyyy: parses full year', 'yyyy', '2018', 2018],
            ['yyyy: parses zero padded year', 'yyyy', '0088', 88],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getYear(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it.each([
            ['00', 2000],
            ['01', 2001],
            ['05', 2005],
            ['09', 2009],
            ['40', 2040],
            ['41', 2041],
            ['88', 1988],
            ['99', 1999],
            ['5', 5],
            ['005', 5],
            ['0088', 88],
        ])('parses year %s as %i', function(value, expected) {
            assert.strictEqual(
                DateTime.fromFormat('yy-MM-dd', `${value}-01-01`)
                    .getYear(),
                expected,
            );
        });
    });

    describe('Week year', function() {
        it.each([
            ['Y: parses full year', 'Y w e', '2018 1 1', 2018],
            ['Y: parses 1-digit year', 'Y w e', '5 1 1', 5],
            ['YY: parses full year', 'YY w e', '2018 1 1', 2018],
            ['YYY: parses full year', 'YYY w e', '2018 1 1', 2018],
            ['YYY: parses zero padded year', 'YYY w e', '088 1 1', 88],
            ['YYYY: parses full year', 'YYYY w e', '2018 1 1', 2018],
            ['YYYY: parses zero padded year', 'YYYY w e', '0088 1 1', 88],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getWeekYear(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it.each([
            ['00', 2000],
            ['01', 2001],
            ['05', 2005],
            ['09', 2009],
            ['40', 2040],
            ['41', 2041],
            ['88', 1988],
            ['99', 1999],
            ['5', 5],
            ['005', 5],
            ['0088', 88],
        ])('parses week year %s as %i', function(value, expected) {
            assert.strictEqual(
                DateTime.fromFormat('YY w e', `${value} 1 1`)
                    .getWeekYear(),
                expected,
            );
        });
    });

    describe('Quarter', function() {
        it.each([
            ['q: parses quarter', 'q', '3'],
            ['qq: parses quarter', 'qq', '03'],
            ['Q: parses quarter', 'Q', '3'],
            ['QQ: parses quarter', 'QQ', '03'],
        ])('%s', function(_, pattern, input) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getQuarter(), 3);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Month', function() {
        it.each([
            ['M: parses month', 'M', '10', 10],
            ['M: parses 1-digit month', 'M', '1', 1],
            ['MM: parses month', 'MM', '10', 10],
            ['MM: parses zero padded month', 'MM', '01', 1],
            ['MMM: parses month name', 'MMM', 'Oct', 10],
            ['MMMM: parses month name', 'MMMM', 'October', 10],
            ['L: parses month', 'L', '10', 10],
            ['L: parses 1-digit month', 'L', '1', 1],
            ['LL: parses month', 'LL', '10', 10],
            ['LL: parses zero padded month', 'LL', '01', 1],
            ['LLL: parses month name', 'LLL', 'Oct', 10],
            ['LLLL: parses month name', 'LLLL', 'October', 10],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getMonth(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it('MMMMM: throws because narrow month parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('MMMMM', 'O');
            }, /Unsupported parsing token in DateTime format: MMMMM/);
        });

        it('LLLLL: throws because narrow standalone month parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('LLLLL', 'O');
            }, /Unsupported parsing token in DateTime format: LLLLL/);
        });
    });

    describe('Week of year', function() {
        it.each([
            ['w: parses week of year', 'w', '22', 22],
            ['w: parses 1-digit week of year', 'w', '1', 1],
            ['ww: parses week of year', 'ww', '22', 22],
            ['ww: parses zero padded week of year', 'ww', '01', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getWeek(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Week of month', function() {
        it('W: parses the week of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('W', '3')
                    .getWeekOfMonth(),
                3,
            );
        });
    });

    describe('Day of month', function() {
        it.each([
            ['d: parses the day of the month', 'd', '21', 21],
            ['d: parses 1-digit day of the month', 'd', '1', 1],
            ['dd: parses the day of the month', 'dd', '21', 21],
            ['dd: parses zero padded day of the month', 'dd', '01', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getDate(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Day of year', function() {
        it.each([
            ['D: parses the day of the year', 'D', '152', 152],
            ['D: parses 1-digit day of the year', 'D', '1', 1],
            ['DD: parses the day of the year', 'DD', '152', 152],
            ['DD: parses zero padded day of the year', 'DD', '01', 1],
            ['DDD: parses the day of the year', 'DDD', '152', 152],
            ['DDD: parses zero padded day of the year', 'DDD', '001', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getDayOfYear(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Weekday occurrence', function() {
        it('F: parses the day of week in the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('F', '3')
                    .getWeekDayInMonth(),
                3,
            );
        });
    });

    describe('Weekday', function() {
        it.each([
            ['EEE: parses day name', 'EEE', 'Fri'],
            ['EEEE: parses day name', 'EEEE', 'Friday'],
            ['e: parses day', 'e', '6'],
            ['ee: parses day', 'ee', '06'],
            ['eee: parses day name', 'eee', 'Fri'],
            ['eeee: parses day name', 'eeee', 'Friday'],
            ['c: parses day', 'c', '6'],
            ['cc: parses day', 'cc', '06'],
            ['ccc: parses day name', 'ccc', 'Fri'],
            ['cccc: parses day name', 'cccc', 'Friday'],
        ])('%s', function(_, pattern, input) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getWeekDay(), 6);
            assert.strictEqual(date.isValid, true);
        });

        it('EEEEE: throws because narrow weekday parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('EEEEE', 'F');
            }, /Unsupported parsing token in DateTime format: EEEEE/);
        });

        it('eeeee: throws because narrow weekday parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('eeeee', 'F');
            }, /Unsupported parsing token in DateTime format: eeeee/);
        });

        it('ccccc: throws because narrow standalone weekday parsing is unsupported', function() {
            assert.throws(() => {
                DateTime.fromFormat('ccccc', 'F');
            }, /Unsupported parsing token in DateTime format: ccccc/);
        });
    });

    describe('Day period', function() {
        it.each([
            ['aaa: parses AM day period', 'aaa', 'AM', 0],
            ['aaa: parses pm day period', 'aaa', 'PM', 12],
            ['aaaa: parses AM day period', 'aaaa', 'AM', 0],
            ['aaaa: parses pm day period', 'aaaa', 'PM', 12],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getHours(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Hours', function() {
        it.each([
            ['h: parses the hour [1-12]', 'h', '12', 0],
            ['h: parses 1-digit hour', 'h', '1', 1],
            ['hh: parses the hour [1-12]', 'hh', '12', 0],
            ['hh: parses zero padded hour', 'hh', '01', 1],
            ['H: parses the hour [0-23]', 'H', '23', 23],
            ['H: parses 1-digit hour', 'H', '0', 0],
            ['HH: parses the hour [0-23]', 'HH', '23', 23],
            ['HH: parses zero padded hour', 'HH', '00', 0],
            ['K: parses the hour [0-11]', 'K', '11', 11],
            ['K: parses 1-digit hour', 'K', '0', 0],
            ['KK: parses the hour [0-11]', 'KK', '11', 11],
            ['KK: parses zero padded hour', 'KK', '00', 0],
            ['k: parses the hour [1-24]', 'k', '24', 0],
            ['k: parses 1-digit hour', 'k', '1', 1],
            ['kk: parses the hour [1-24]', 'kk', '24', 0],
            ['kk: parses zero padded hour', 'kk', '01', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getHours(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Minutes', function() {
        it.each([
            ['m: parses the minute', 'm', '25', 25],
            ['m: parses 1-digit minute', 'm', '1', 1],
            ['mm: parses the minute', 'mm', '25', 25],
            ['mm: parses zero padded minute', 'mm', '01', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getMinutes(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Seconds', function() {
        it.each([
            ['s: parses the second', 's', '25', 25],
            ['s: parses 1-digit second', 's', '1', 1],
            ['ss: parses the second', 'ss', '25', 25],
            ['ss: parses zero padded second', 'ss', '01', 1],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.getSeconds(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    describe('Fractional seconds', function() {
        it.each([
            ['S: parses a single fractional digit', 'S', '1', 100],
            ['S: parses two fractional digits', 'SS', '12', 120],
            ['S: parses the fractional second', 'SSS', '123', 123],
            ['S: truncates fractional precision beyond milliseconds', 'SSSSSS', '123987', 123],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

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
            ['ZZZZZ: works with second-precision offsets', 'dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +00:09:21', '2018-12-31T23:50:39.000+00:00'],
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
            ['XXXX: works without offset seconds', 'dd/MM/yyyy HH:mm:ss XXXX', '01/01/2019 00:00:00 +1000', '2018-12-31T14:00:00.000+00:00'],
            ['XXXX: works with second-precision offsets', 'dd/MM/yyyy HH:mm:ss XXXX', '01/01/2019 00:00:00 +000921', '2018-12-31T23:50:39.000+00:00'],
            ['XXXXX: works with second-precision offsets', 'dd/MM/yyyy HH:mm:ss XXXXX', '01/01/2019 00:00:00 +00:09:21', '2018-12-31T23:50:39.000+00:00'],
            ['x: parses the time zone', 'dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +00', '2019-01-01T00:00:00.000+00:00'],
            ['x: works with time zones', 'dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +10', '2018-12-31T14:00:00.000+00:00'],
            ['xx: parses the time zone', 'dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +0000', '2019-01-01T00:00:00.000+00:00'],
            ['xx: works with time zones', 'dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +1000', '2018-12-31T14:00:00.000+00:00'],
            ['xxx: parses the time zone', 'dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +00:00', '2019-01-01T00:00:00.000+00:00'],
            ['xxx: works with time zones', 'dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +10:00', '2018-12-31T14:00:00.000+00:00'],
        ])('%s', function(_, pattern, input, expected) {
            const date = DateTime.fromFormat(pattern, input);

            assert.strictEqual(date.toIsoString(), expected);
            assert.strictEqual(date.isValid, true);
        });

        it.each([
            ['VV: works with time zones containing hyphens', '01/01/2019 00:00:00 US/East-Indiana', 'Tue Jan 01 2019 00:00:00 -0500 (US/East-Indiana)', { timeZone: 'US/East-Indiana' }],
            ['VV: works with time zones containing plus signs and digits', '01/01/2019 00:00:00 Etc/GMT+1', 'Tue Jan 01 2019 00:00:00 -0100 (Etc/GMT+1)', { timeZone: 'Etc/GMT+1' }],
        ])('%s', function(_, input, expected, options = {}) {
            const date = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss VV', input, options);

            assert.strictEqual(date.toString(), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    it('creates time only dates from January 01 1970', function() {
        assert.strictEqual(
            DateTime.fromFormat('hh:mm a', '12:00 PM')
                .toIsoString(),
            '1970-01-01T12:00:00.000+00:00',
        );
    });

    it('creates time only dates from January 01 1970 in western time zones', function() {
        assert.strictEqual(
            DateTime.fromFormat('HH:mm', '12:00', { timeZone: 'America/New_York' })
                .format('yyyy-MM-dd HH:mm'),
            '1970-01-01 12:00',
        );
    });

    it('creates time only dates from January 01 1970 in eastern time zones', function() {
        assert.strictEqual(
            DateTime.fromFormat('HH:mm', '12:00', { timeZone: 'Australia/Brisbane' })
                .format('yyyy-MM-dd HH:mm'),
            '1970-01-01 12:00',
        );
    });

    it('throws on trailing characters', function() {
        assert.throws((_) => {
            DateTime.fromFormat('yyyy-MM-dd', '2019-01-01abc');
        });
    });

    it('returns a new DateTime', function() {
        assert.ok(
            DateTime.fromFormat('yyyy', '2018').constructor === DateTime,
        );
    });

    it('does not mutate options', function() {
        const options = {};

        DateTime.fromFormat('yyyy-MM-dd', '2019-01-01', options);

        assert.deepStrictEqual(
            options,
            {},
        );
    });
});
