const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable #fromFormat', function() {

    describe('Y - Full Year', function() {
        it('parses the full year', function() {
            const date = DateTimeImmutable.fromFormat('Y', '2018');
            assert.strictEqual(
                date.getYear(),
                2018
            );
        });
    });

    describe('y - Short Year', function() {
        it('parses the short year', function() {
            const date = DateTimeImmutable.fromFormat('y', '18');
            assert.strictEqual(
                date.getYear(),
                2018
            );
        });

        it('works with dates from the 1900s', function() {
            const date = DateTimeImmutable.fromFormat('y', '70');
            assert.strictEqual(
                date.getYear(),
                1970
            );
        });
    });

    describe('m - 2-Digit Month', function() {
        it('parses the 2-digit month', function() {
            const date = DateTimeImmutable.fromFormat('m', '06');
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('m - Month', function() {
        it('parses the month', function() {
            const date = DateTimeImmutable.fromFormat('n', '6');
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('F - Month Name', function() {
        it('parses the month name', function() {
            const date = DateTimeImmutable.fromFormat('F', 'June');
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('M - Short Month Name', function() {
        it('parses the short month name', function() {
            const date = DateTimeImmutable.fromFormat('M', 'Jun');
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('d - 2-Digit Date', function() {
        it('parses the 2-digit date', function() {
            const date = DateTimeImmutable.fromFormat('d', '01');
            assert.strictEqual(
                date.getDate(),
                1
            );
        });
    });

    describe('j - Date', function() {
        it('parses the date', function() {
            const date = DateTimeImmutable.fromFormat('j', '1');
            assert.strictEqual(
                date.getDate(),
                1
            );
        });
    });

    describe('S - Ordinal Suffix', function() {
        it('parses the ordinal suffix', function() {
            const date = DateTimeImmutable.fromFormat('jS', '1st');
            assert.strictEqual(
                date.getDate(),
                1
            );
        });
    });

    describe('l - Day Name', function() {
        it('parses the day name', function() {
            const date = DateTimeImmutable.fromFormat('l', 'Tuesday');
            assert.strictEqual(
                date.getDay(),
                2
            );
        });
    });

    describe('D - Short Day Name', function() {
        it('parses the short day name', function() {
            const date = DateTimeImmutable.fromFormat('D', 'Tue');
            assert.strictEqual(
                date.getDay(),
                2
            );
        });
    });

    describe('a - Lower-Case Day Period', function() {
        it('parses the short day name', function() {
            const date = DateTimeImmutable.fromFormat('ga', '1am');
            assert.strictEqual(
                date.getHours(),
                1
            );
        });

        it('works with PM', function() {
            const date = DateTimeImmutable.fromFormat('ga', '1pm');
            assert.strictEqual(
                date.getHours(),
                13
            );
        });
    });

    describe('A - Upper-Case Day Period', function() {
        it('parses the short day name', function() {
            const date = DateTimeImmutable.fromFormat('gA', '1AM');
            assert.strictEqual(
                date.getHours(),
                1
            );
        });

        it('works with PM', function() {
            const date = DateTimeImmutable.fromFormat('gA', '1PM');
            assert.strictEqual(
                date.getHours(),
                13
            );
        });
    });

    describe('H - 2-digit 24-hour', function() {
        it('parses the 2-digit 24-hour', function() {
            const date = DateTimeImmutable.fromFormat('H', '01');
            assert.strictEqual(
                date.getHours(),
                1
            );
        });

        it('works after 12 hours', function() {
            const date = DateTimeImmutable.fromFormat('H', '13');
            assert.strictEqual(
                date.getHours(),
                13
            );
        });
    });

    describe('G - 24-hour', function() {
        it('parses the 24-hour', function() {
            const date = DateTimeImmutable.fromFormat('G', '1');
            assert.strictEqual(
                date.getHours(),
                1
            );
        });

        it('works after 12 hours', function() {
            const date = DateTimeImmutable.fromFormat('G', '13');
            assert.strictEqual(
                date.getHours(),
                13
            );
        });
    });

    describe('h - 2-digit 12-hour', function() {
        it('parses the 2-digit 12-hour', function() {
            const date = DateTimeImmutable.fromFormat('h', '01');
            assert.strictEqual(
                date.getHours(),
                1
            );
        });

        it('works after 12 hours', function() {
            const date = DateTimeImmutable.fromFormat('h A', '01 PM');
            assert.strictEqual(
                date.getHours(),
                13
            );
        });
    });

    describe('h - 12-hour', function() {
        it('parses the 12-hour', function() {
            const date = DateTimeImmutable.fromFormat('g', '1');
            assert.strictEqual(
                date.getHours(),
                1
            );
        });

        it('works after 12 hours', function() {
            const date = DateTimeImmutable.fromFormat('gA', '1PM');
            assert.strictEqual(
                date.getHours(),
                13
            );
        });
    });

    describe('i - Minute', function() {
        it('parses the minute', function() {
            const date = DateTimeImmutable.fromFormat('i', '01');
            assert.strictEqual(
                date.getMinutes(),
                1
            );
        });
    });

    describe('s - Second', function() {
        it('parses the second', function() {
            const date = DateTimeImmutable.fromFormat('s', '01');
            assert.strictEqual(
                date.getSeconds(),
                1
            );
        });
    });

    describe('v - Millisecond', function() {
        it('parses the millisecond', function() {
            const date = DateTimeImmutable.fromFormat('v', '1');
            assert.strictEqual(
                date.getMilliseconds(),
                1
            );
        });
    });

    describe('u - Microsecond', function() {
        it('parses the microsecond', function() {
            const date = DateTimeImmutable.fromFormat('u', '1000');
            assert.strictEqual(
                date.getMilliseconds(),
                1
            );
        });
    });

    describe('e - Timezone Name', function() {
        it('parses the timezone name', function() {
            const date = DateTimeImmutable.fromFormat('e', 'Australia/Brisbane');
            assert.strictEqual(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with UTC', function() {
            const date = DateTimeImmutable.fromFormat('e', 'UTC');
            assert.strictEqual(
                date.getTimeZone(),
                'UTC'
            );
        });
    });

    describe('T - Timezone Abbreviation', function() {
        it('parses the timezone abbreviation', function() {
            const date = DateTimeImmutable.fromFormat('T', 'AEST');
            assert.strictEqual(
                date.getTimeZone(),
                'AEST'
            );
        });

        it('works with UTC', function() {
            const date = DateTimeImmutable.fromFormat('T', 'UTC');
            assert.strictEqual(
                date.getTimeZone(),
                'UTC'
            );
        });
    });

    describe('O - Offset', function() {
        it('parses offset without colon', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('O', '+1000')
                    .getTimeZoneOffset(),
                -600
            );
        });

        it('works with UTC', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('O', '+0000')
                    .getTimeZoneOffset(),
                0
            );
        });

        it('works with negative offsets', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('O', '-0500')
                    .getTimeZoneOffset(),
                300
            );
        });
    });

    describe('P - Offset With Colon', function() {
        it('parses offset with colon', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('P', '+10:00')
                    .getTimeZoneOffset(),
                -600
            );
        });

        it('works with UTC', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('P', '+00:00')
                    .getTimeZoneOffset(),
                0
            );
        });

        it('works with negative offsets', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('P', '-05:00')
                    .getTimeZoneOffset(),
                300
            );
        });
    });

    describe('U - Timestamp', function() {
        it('parses timestamp', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('U', '123456789')
                    .getTimestamp(),
                123456789
            );
        });
    });

    describe('\\ - Escape Character', function() {
        it('parses the following literal character', function() {
            const date = DateTimeImmutable.fromFormat('\\YY', 'Y2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
        });
    });

    describe(' - Space', function() {
        it('parses a whitespace character', function() {
            const date = DateTimeImmutable.fromFormat('F Y', 'June 2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('# - Hash Separators', function() {
        it('parses a semicolon character', function() {
            const date = DateTimeImmutable.fromFormat('F# Y', 'June; 2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses a colon character', function() {
            const date = DateTimeImmutable.fromFormat('H#i', '12:00')
            assert.strictEqual(
                date.getHours(),
                12
            );
            assert.strictEqual(
                date.getMinutes(),
                0
            );
        });

        it('parses a forward slash character', function() {
            const date = DateTimeImmutable.fromFormat('m#Y', '06/2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses a period character', function() {
            const date = DateTimeImmutable.fromFormat('m#Y', '06.2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses a comma character', function() {
            const date = DateTimeImmutable.fromFormat('F# Y', 'June, 2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses a dash character', function() {
            const date = DateTimeImmutable.fromFormat('m#Y', '06-2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses parentheses', function() {
            const date = DateTimeImmutable.fromFormat('F #Y#', 'June (2018)')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('Separators', function() {
        it('parses a semicolon character', function() {
            const date = DateTimeImmutable.fromFormat('F; Y', 'June; 2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses a colon character', function() {
            const date = DateTimeImmutable.fromFormat('H:i', '12:00')
            assert.strictEqual(
                date.getHours(),
                12
            );
            assert.strictEqual(
                date.getMinutes(),
                0
            );
        });

        it('parses a forward slash character', function() {
            const date = DateTimeImmutable.fromFormat('m/Y', '06/2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses a period character', function() {
            const date = DateTimeImmutable.fromFormat('m.Y', '06.2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses a comma character', function() {
            const date = DateTimeImmutable.fromFormat('F, Y', 'June, 2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses a dash character', function() {
            const date = DateTimeImmutable.fromFormat('m-Y', '06-2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses parentheses', function() {
            const date = DateTimeImmutable.fromFormat('F (Y)', 'June (2018)')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('? - Random Byte', function() {
        it('parses a single byte character', function() {
            const date = DateTimeImmutable.fromFormat('m?Y', '06_2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('* - Random Bytes', function() {
        it('parses random bytes until the next separator', function() {
            const date = DateTimeImmutable.fromFormat('m-*-Y', '06-test-2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });

        it('parses random bytes until the next separator', function() {
            const date = DateTimeImmutable.fromFormat('m*Y', '06test2018')
            assert.strictEqual(
                date.getYear(),
                2018
            );
            assert.strictEqual(
                date.getMonth(),
                6
            );
        });
    });

    describe('! - Epoch Reset', function() {
        it('resets all fields to the unix epoch', function() {
            const date = DateTimeImmutable.fromFormat('!', '')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with year (before)', function() {
            const date = DateTimeImmutable.fromFormat('Y!', '2018')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month (before)', function() {
            const date = DateTimeImmutable.fromFormat('m!', '06')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with date (before)', function() {
            const date = DateTimeImmutable.fromFormat('d!', '15')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with hours (before)', function() {
            const date = DateTimeImmutable.fromFormat('H!', '12')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with minutes (before)', function() {
            const date = DateTimeImmutable.fromFormat('i!', '30')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with seconds (before)', function() {
            const date = DateTimeImmutable.fromFormat('s!', '30')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with microseconds (before)', function() {
            const date = DateTimeImmutable.fromFormat('u!', '500000')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with offset (before)', function() {
            const date = DateTimeImmutable.fromFormat('P!', '+10:00')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with timezone name (after)', function() {
            const date = DateTimeImmutable.fromFormat('e!', 'Australia/Brisbane')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with timezone abbreviation (after)', function() {
            const date = DateTimeImmutable.fromFormat('T!', 'AEST')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with year (after)', function() {
            const date = DateTimeImmutable.fromFormat('!Y', '2018')
            assert.strictEqual(
                date.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month (after)', function() {
            const date = DateTimeImmutable.fromFormat('!m', '06')
            assert.strictEqual(
                date.toISOString(),
                '1970-06-01T00:00:00.0+00:00'
            );
        });

        it('works with date (after)', function() {
            const date = DateTimeImmutable.fromFormat('!d', '15')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-15T00:00:00.0+00:00'
            );
        });

        it('works with hours (after)', function() {
            const date = DateTimeImmutable.fromFormat('!H', '12')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T12:00:00.0+00:00'
            );
        });

        it('works with minutes (after)', function() {
            const date = DateTimeImmutable.fromFormat('!i', '30')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:30:00.0+00:00'
            );
        });

        it('works with seconds (after)', function() {
            const date = DateTimeImmutable.fromFormat('!s', '30')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:30.0+00:00'
            );
        });

        it('works with microseconds (after)', function() {
            const date = DateTimeImmutable.fromFormat('!u', '500000')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.500+00:00'
            );
        });

        it('works with offset (after)', function() {
            const date = DateTimeImmutable.fromFormat('!P', '+10:00')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone name (after)', function() {
            const date = DateTimeImmutable.fromFormat('!e', 'Australia/Brisbane')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone abbreviation (after)', function() {
            const date = DateTimeImmutable.fromFormat('!T', 'AEST')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });
    });

    describe('| - Epoch Reset', function() {
        it('resets all fields to the unix epoch', function() {
            const date = DateTimeImmutable.fromFormat('|', '')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with year (before)', function() {
            const date = DateTimeImmutable.fromFormat('Y|', '2018')
            assert.strictEqual(
                date.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month (before)', function() {
            const date = DateTimeImmutable.fromFormat('m|', '06')
            assert.strictEqual(
                date.toISOString(),
                '1970-06-01T00:00:00.0+00:00'
            );
        });

        it('works with date (before)', function() {
            const date = DateTimeImmutable.fromFormat('d|', '15')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-15T00:00:00.0+00:00'
            );
        });

        it('works with hours (before)', function() {
            const date = DateTimeImmutable.fromFormat('H|', '12')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T12:00:00.0+00:00'
            );
        });

        it('works with minutes (before)', function() {
            const date = DateTimeImmutable.fromFormat('i|', '30')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:30:00.0+00:00'
            );
        });

        it('works with seconds (before)', function() {
            const date = DateTimeImmutable.fromFormat('s|', '30')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:30.0+00:00'
            );
        });

        it('works with microseconds (before)', function() {
            const date = DateTimeImmutable.fromFormat('u|', '500000')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.500+00:00'
            );
        });

        it('works with offset (before)', function() {
            const date = DateTimeImmutable.fromFormat('P|', '+10:00')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone name (after)', function() {
            const date = DateTimeImmutable.fromFormat('e|', 'Australia/Brisbane')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone abbreviation (after)', function() {
            const date = DateTimeImmutable.fromFormat('T|', 'AEST')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with year (after)', function() {
            const date = DateTimeImmutable.fromFormat('|Y', '2018')
            assert.strictEqual(
                date.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month (after)', function() {
            const date = DateTimeImmutable.fromFormat('|m', '06')
            assert.strictEqual(
                date.toISOString(),
                '1970-06-01T00:00:00.0+00:00'
            );
        });

        it('works with date (after)', function() {
            const date = DateTimeImmutable.fromFormat('|d', '15')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-15T00:00:00.0+00:00'
            );
        });

        it('works with hours (after)', function() {
            const date = DateTimeImmutable.fromFormat('|H', '12')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T12:00:00.0+00:00'
            );
        });

        it('works with minutes (after)', function() {
            const date = DateTimeImmutable.fromFormat('|i', '30')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:30:00.0+00:00'
            );
        });

        it('works with seconds (after)', function() {
            const date = DateTimeImmutable.fromFormat('|s', '30')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:30.0+00:00'
            );
        });

        it('works with microseconds (after)', function() {
            const date = DateTimeImmutable.fromFormat('|u', '500000')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.500+00:00'
            );
        });

        it('works with offset (after)', function() {
            const date = DateTimeImmutable.fromFormat('|P', '+10:00')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone name (after)', function() {
            const date = DateTimeImmutable.fromFormat('|e', 'Australia/Brisbane')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone abbreviation (after)', function() {
            const date = DateTimeImmutable.fromFormat('|T', 'AEST')
            assert.strictEqual(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });
    });

    describe('Timezone', function() {
        it('works with timezone argument', function() {
            const date = DateTimeImmutable.fromFormat('Y', '2018', 'Australia/Brisbane');
            assert.strictEqual(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with offset with colon', function() {
            const date = DateTimeImmutable.fromFormat('Y', '2018', '+10:00');
            assert.strictEqual(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offset without colon', function() {
            const date = DateTimeImmutable.fromFormat('Y', '2018', '+1000');
            assert.strictEqual(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('does not overwrite timezone when specified in string', function() {
            const date = DateTimeImmutable.fromFormat('d/m/Y H:i:s.u e', '01/01/2018 01:00:00.0 UTC', 'Australia/Brisbane');
            assert.strictEqual(
                date.toISOString(),
                '2018-01-01T01:00:00.0+00:00'
            );
        });
    });

    describe('Invalid', function() {
        it('throws an error from invalid character in format', function() {
            assert.throws(_ => {
                DateTimeImmutable.fromFormat('_', '2019');
            });
        });

        it('throws an error from unmatched character in string', function() {
            assert.throws(_ => {
                DateTimeImmutable.fromFormat('Y', 'INVALID');
            });
        });
    });

});
