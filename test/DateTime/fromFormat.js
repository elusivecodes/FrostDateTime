const assert = require('assert').strict;
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime #fromFormat', function() {

    describe('Y - Full Year', function() {
        it('parses the full year', function() {
            const date = DateTime.fromFormat('Y', '2018');
            assert.equal(
                date.getYear(),
                2018
            );
        });
    });

    describe('y - Short Year', function() {
        it('parses the short year', function() {
            const date = DateTime.fromFormat('y', '18');
            assert.equal(
                date.getYear(),
                2018
            );
        });

        it('works with dates from the 1900s', function() {
            const date = DateTime.fromFormat('y', '70');
            assert.equal(
                date.getYear(),
                1970
            );
        });
    });

    describe('m - 2-Digit Month', function() {
        it('parses the 2-digit month', function() {
            const date = DateTime.fromFormat('m', '06');
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('m - Month', function() {
        it('parses the month', function() {
            const date = DateTime.fromFormat('n', '6');
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('F - Month Name', function() {
        it('parses the month name', function() {
            const date = DateTime.fromFormat('F', 'June');
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('M - Short Month Name', function() {
        it('parses the short month name', function() {
            const date = DateTime.fromFormat('M', 'Jun');
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('d - 2-Digit Date', function() {
        it('parses the 2-digit date', function() {
            const date = DateTime.fromFormat('d', '01');
            assert.equal(
                date.getDate(),
                1
            );
        });
    });

    describe('j - Date', function() {
        it('parses the date', function() {
            const date = DateTime.fromFormat('j', '1');
            assert.equal(
                date.getDate(),
                1
            );
        });
    });

    describe('S - Ordinal Suffix', function() {
        it('parses the ordinal suffix', function() {
            const date = DateTime.fromFormat('jS', '1st');
            assert.equal(
                date.getDate(),
                1
            );
        });
    });

    describe('l - Day Name', function() {
        it('parses the day name', function() {
            const date = DateTime.fromFormat('l', 'Tuesday');
            assert.equal(
                date.getDay(),
                2
            );
        });
    });

    describe('D - Short Day Name', function() {
        it('parses the short day name', function() {
            const date = DateTime.fromFormat('D', 'Tue');
            assert.equal(
                date.getDay(),
                2
            );
        });
    });

    describe('a - Lower-Case Day Period', function() {
        it('parses the short day name', function() {
            const date = DateTime.fromFormat('ga', '1am');
            assert.equal(
                date.getHours(),
                1
            );
        });

        it('works with PM', function() {
            const date = DateTime.fromFormat('ga', '1pm');
            assert.equal(
                date.getHours(),
                13
            );
        });
    });

    describe('A - Upper-Case Day Period', function() {
        it('parses the short day name', function() {
            const date = DateTime.fromFormat('gA', '1AM');
            assert.equal(
                date.getHours(),
                1
            );
        });

        it('works with PM', function() {
            const date = DateTime.fromFormat('gA', '1PM');
            assert.equal(
                date.getHours(),
                13
            );
        });
    });

    describe('H - 2-digit 24-hour', function() {
        it('parses the 2-digit 24-hour', function() {
            const date = DateTime.fromFormat('H', '01');
            assert.equal(
                date.getHours(),
                1
            );
        });

        it('works after 12 hours', function() {
            const date = DateTime.fromFormat('H', '13');
            assert.equal(
                date.getHours(),
                13
            );
        });
    });

    describe('G - 24-hour', function() {
        it('parses the 24-hour', function() {
            const date = DateTime.fromFormat('G', '1');
            assert.equal(
                date.getHours(),
                1
            );
        });

        it('works after 12 hours', function() {
            const date = DateTime.fromFormat('G', '13');
            assert.equal(
                date.getHours(),
                13
            );
        });
    });

    describe('h - 2-digit 12-hour', function() {
        it('parses the 2-digit 12-hour', function() {
            const date = DateTime.fromFormat('h', '01');
            assert.equal(
                date.getHours(),
                1
            );
        });

        it('works after 12 hours', function() {
            const date = DateTime.fromFormat('h A', '01 PM');
            assert.equal(
                date.getHours(),
                13
            );
        });
    });

    describe('h - 12-hour', function() {
        it('parses the 12-hour', function() {
            const date = DateTime.fromFormat('g', '1');
            assert.equal(
                date.getHours(),
                1
            );
        });

        it('works after 12 hours', function() {
            const date = DateTime.fromFormat('gA', '1PM');
            assert.equal(
                date.getHours(),
                13
            );
        });
    });

    describe('i - Minute', function() {
        it('parses the minute', function() {
            const date = DateTime.fromFormat('i', '01');
            assert.equal(
                date.getMinutes(),
                1
            );
        });
    });

    describe('s - Second', function() {
        it('parses the second', function() {
            const date = DateTime.fromFormat('s', '01');
            assert.equal(
                date.getSeconds(),
                1
            );
        });
    });

    describe('v - Millisecond', function() {
        it('parses the millisecond', function() {
            const date = DateTime.fromFormat('v', '1');
            assert.equal(
                date.getMilliseconds(),
                1
            );
        });
    });

    describe('u - Microsecond', function() {
        it('parses the microsecond', function() {
            const date = DateTime.fromFormat('u', '1000');
            assert.equal(
                date.getMilliseconds(),
                1
            );
        });
    });

    describe('e - Timezone Name', function() {
        it('parses the timezone name', function() {
            const date = DateTime.fromFormat('e', 'Australia/Brisbane');
            assert.equal(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with UTC', function() {
            const date = DateTime.fromFormat('e', 'UTC');
            assert.equal(
                date.getTimeZone(),
                'UTC'
            );
        });
    });

    describe('T - Timezone Abbreviation', function() {
        it('parses the timezone abbreviation', function() {
            const date = DateTime.fromFormat('T', 'AEST');
            assert.equal(
                date.getTimeZone(),
                'AEST'
            );
        });

        it('works with UTC', function() {
            const date = DateTime.fromFormat('T', 'UTC');
            assert.equal(
                date.getTimeZone(),
                'UTC'
            );
        });
    });

    describe('O - Offset', function() {
        it('parses offset without colon', function() {
            assert.equal(
                DateTime.fromFormat('O', '+1000')
                    .getTimeZoneOffset(),
                -600
            );
        });

        it('works with UTC', function() {
            assert.equal(
                DateTime.fromFormat('O', '+0000')
                    .getTimeZoneOffset(),
                0
            );
        });

        it('works with negative offsets', function() {
            assert.equal(
                DateTime.fromFormat('O', '-0500')
                    .getTimeZoneOffset(),
                300
            );
        });
    });

    describe('P - Offset With Colon', function() {
        it('parses offset with colon', function() {
            assert.equal(
                DateTime.fromFormat('P', '+10:00')
                    .getTimeZoneOffset(),
                -600
            );
        });

        it('works with UTC', function() {
            assert.equal(
                DateTime.fromFormat('P', '+00:00')
                    .getTimeZoneOffset(),
                0
            );
        });

        it('works with negative offsets', function() {
            assert.equal(
                DateTime.fromFormat('P', '-05:00')
                    .getTimeZoneOffset(),
                300
            );
        });
    });

    describe('U - Timestamp', function() {
        it('parses timestamp', function() {
            assert.equal(
                DateTime.fromFormat('U', '123456789')
                    .getTimestamp(),
                123456789
            );
        });
    });

    describe('\\ - Escape Character', function() {
        it('parses the following literal character', function() {
            const date = DateTime.fromFormat('\\YY', 'Y2018')
            assert.equal(
                date.getYear(),
                2018
            );
        });
    });

    describe(' - Space', function() {
        it('parses a whitespace character', function() {
            const date = DateTime.fromFormat('F Y', 'June 2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('# - Hash Separators', function() {
        it('parses a semicolon character', function() {
            const date = DateTime.fromFormat('F# Y', 'June; 2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses a colon character', function() {
            const date = DateTime.fromFormat('H#i', '12:00')
            assert.equal(
                date.getHours(),
                12
            );
            assert.equal(
                date.getMinutes(),
                0
            );
        });

        it('parses a forward slash character', function() {
            const date = DateTime.fromFormat('m#Y', '06/2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses a period character', function() {
            const date = DateTime.fromFormat('m#Y', '06.2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses a comma character', function() {
            const date = DateTime.fromFormat('F# Y', 'June, 2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses a dash character', function() {
            const date = DateTime.fromFormat('m#Y', '06-2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses parentheses', function() {
            const date = DateTime.fromFormat('F #Y#', 'June (2018)')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('Separators', function() {
        it('parses a semicolon character', function() {
            const date = DateTime.fromFormat('F; Y', 'June; 2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses a colon character', function() {
            const date = DateTime.fromFormat('H:i', '12:00')
            assert.equal(
                date.getHours(),
                12
            );
            assert.equal(
                date.getMinutes(),
                0
            );
        });

        it('parses a forward slash character', function() {
            const date = DateTime.fromFormat('m/Y', '06/2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses a period character', function() {
            const date = DateTime.fromFormat('m.Y', '06.2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses a comma character', function() {
            const date = DateTime.fromFormat('F, Y', 'June, 2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses a dash character', function() {
            const date = DateTime.fromFormat('m-Y', '06-2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses parentheses', function() {
            const date = DateTime.fromFormat('F (Y)', 'June (2018)')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('? - Random Byte', function() {
        it('parses a single byte character', function() {
            const date = DateTime.fromFormat('m?Y', '06_2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('* - Random Bytes', function() {
        it('parses random bytes until the next separator', function() {
            const date = DateTime.fromFormat('m-*-Y', '06-test-2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });

        it('parses random bytes until the next separator', function() {
            const date = DateTime.fromFormat('m*Y', '06test2018')
            assert.equal(
                date.getYear(),
                2018
            );
            assert.equal(
                date.getMonth(),
                6
            );
        });
    });

    describe('! - Epoch Reset', function() {
        it('resets all fields to the unix epoch', function() {
            const date = DateTime.fromFormat('!', '')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with year (before)', function() {
            const date = DateTime.fromFormat('Y!', '2018')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month (before)', function() {
            const date = DateTime.fromFormat('m!', '06')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with date (before)', function() {
            const date = DateTime.fromFormat('d!', '15')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with hours (before)', function() {
            const date = DateTime.fromFormat('H!', '12')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with minutes (before)', function() {
            const date = DateTime.fromFormat('i!', '30')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with seconds (before)', function() {
            const date = DateTime.fromFormat('s!', '30')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with microseconds (before)', function() {
            const date = DateTime.fromFormat('u!', '500000')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with offset (before)', function() {
            const date = DateTime.fromFormat('P!', '+10:00')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with timezone name (after)', function() {
            const date = DateTime.fromFormat('e!', 'Australia/Brisbane')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with timezone abbreviation (after)', function() {
            const date = DateTime.fromFormat('T!', 'AEST')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with year (after)', function() {
            const date = DateTime.fromFormat('!Y', '2018')
            assert.equal(
                date.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month (after)', function() {
            const date = DateTime.fromFormat('!m', '06')
            assert.equal(
                date.toISOString(),
                '1970-06-01T00:00:00.0+00:00'
            );
        });

        it('works with date (after)', function() {
            const date = DateTime.fromFormat('!d', '15')
            assert.equal(
                date.toISOString(),
                '1970-01-15T00:00:00.0+00:00'
            );
        });

        it('works with hours (after)', function() {
            const date = DateTime.fromFormat('!H', '12')
            assert.equal(
                date.toISOString(),
                '1970-01-01T12:00:00.0+00:00'
            );
        });

        it('works with minutes (after)', function() {
            const date = DateTime.fromFormat('!i', '30')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:30:00.0+00:00'
            );
        });

        it('works with seconds (after)', function() {
            const date = DateTime.fromFormat('!s', '30')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:30.0+00:00'
            );
        });

        it('works with microseconds (after)', function() {
            const date = DateTime.fromFormat('!u', '500000')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.500+00:00'
            );
        });

        it('works with offset (after)', function() {
            const date = DateTime.fromFormat('!P', '+10:00')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone name (after)', function() {
            const date = DateTime.fromFormat('!e', 'Australia/Brisbane')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone abbreviation (after)', function() {
            const date = DateTime.fromFormat('!T', 'AEST')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });
    });

    describe('| - Epoch Reset', function() {
        it('resets all fields to the unix epoch', function() {
            const date = DateTime.fromFormat('|', '')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+00:00'
            );
        });

        it('works with year (before)', function() {
            const date = DateTime.fromFormat('Y|', '2018')
            assert.equal(
                date.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month (before)', function() {
            const date = DateTime.fromFormat('m|', '06')
            assert.equal(
                date.toISOString(),
                '1970-06-01T00:00:00.0+00:00'
            );
        });

        it('works with date (before)', function() {
            const date = DateTime.fromFormat('d|', '15')
            assert.equal(
                date.toISOString(),
                '1970-01-15T00:00:00.0+00:00'
            );
        });

        it('works with hours (before)', function() {
            const date = DateTime.fromFormat('H|', '12')
            assert.equal(
                date.toISOString(),
                '1970-01-01T12:00:00.0+00:00'
            );
        });

        it('works with minutes (before)', function() {
            const date = DateTime.fromFormat('i|', '30')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:30:00.0+00:00'
            );
        });

        it('works with seconds (before)', function() {
            const date = DateTime.fromFormat('s|', '30')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:30.0+00:00'
            );
        });

        it('works with microseconds (before)', function() {
            const date = DateTime.fromFormat('u|', '500000')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.500+00:00'
            );
        });

        it('works with offset (before)', function() {
            const date = DateTime.fromFormat('P|', '+10:00')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone name (after)', function() {
            const date = DateTime.fromFormat('e|', 'Australia/Brisbane')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone abbreviation (after)', function() {
            const date = DateTime.fromFormat('T|', 'AEST')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with year (after)', function() {
            const date = DateTime.fromFormat('|Y', '2018')
            assert.equal(
                date.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month (after)', function() {
            const date = DateTime.fromFormat('|m', '06')
            assert.equal(
                date.toISOString(),
                '1970-06-01T00:00:00.0+00:00'
            );
        });

        it('works with date (after)', function() {
            const date = DateTime.fromFormat('|d', '15')
            assert.equal(
                date.toISOString(),
                '1970-01-15T00:00:00.0+00:00'
            );
        });

        it('works with hours (after)', function() {
            const date = DateTime.fromFormat('|H', '12')
            assert.equal(
                date.toISOString(),
                '1970-01-01T12:00:00.0+00:00'
            );
        });

        it('works with minutes (after)', function() {
            const date = DateTime.fromFormat('|i', '30')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:30:00.0+00:00'
            );
        });

        it('works with seconds (after)', function() {
            const date = DateTime.fromFormat('|s', '30')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:30.0+00:00'
            );
        });

        it('works with microseconds (after)', function() {
            const date = DateTime.fromFormat('|u', '500000')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.500+00:00'
            );
        });

        it('works with offset (after)', function() {
            const date = DateTime.fromFormat('|P', '+10:00')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone name (after)', function() {
            const date = DateTime.fromFormat('|e', 'Australia/Brisbane')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });

        it('works with timezone abbreviation (after)', function() {
            const date = DateTime.fromFormat('|T', 'AEST')
            assert.equal(
                date.toISOString(),
                '1970-01-01T00:00:00.0+10:00'
            );
        });
    });

    describe('Timezone', function() {
        it('works with timezone argument', function() {
            const date = DateTime.fromFormat('Y', '2018', 'Australia/Brisbane');
            assert.equal(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with offset with colon', function() {
            const date = DateTime.fromFormat('Y', '2018', '+10:00');
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offset without colon', function() {
            const date = DateTime.fromFormat('Y', '2018', '+1000');
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('does not overwrite timezone when specified in string', function() {
            const date = DateTime.fromFormat('d/m/Y H:i:s.u e', '01/01/2018 01:00:00.0 UTC', 'Australia/Brisbane');
            assert.equal(
                date.toISOString(),
                '2018-01-01T01:00:00.0+00:00'
            );
        });
    });

    describe('Invalid', function() {
        it('throws an error from invalid character in format', function() {
            assert.throws(_ => {
                DateTime.fromFormat('_', '2019');
            });
        });

        it('throws an error from unmatched character in string', function() {
            assert.throws(_ => {
                DateTime.fromFormat('Y', 'INVALID');
            });
        });
    });

});
