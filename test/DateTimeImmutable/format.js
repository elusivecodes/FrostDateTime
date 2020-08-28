const assert = require('assert').strict;
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable #format', function() {

    describe('L - Leap Year', function() {
        it('outputs 1 for leap years', function() {
            const date = new DateTimeImmutable([2016, 0, 1], 'UTC');
            assert.equal(
                date.format('L'),
                '1'
            );
        });

        it('outputs 0 for non-leap years', function() {
            const date = new DateTimeImmutable([2018, 0, 1], 'UTC');
            assert.equal(
                date.format('L'),
                '0'
            );
        });
    });

    describe('Y - Full Year', function() {
        it('outputs the full year', function() {
            const date = new DateTimeImmutable([2018, 0, 1], 'UTC');
            assert.equal(
                date.format('Y'),
                '2018'
            );
        })
    });

    describe('y - Short Year', function() {
        it('outputs the short year', function() {
            const date = new DateTimeImmutable([2018, 0, 1], 'UTC');
            assert.equal(
                date.format('y'),
                '18'
            );
        });
    });

    describe('o - ISO Year', function() {
        it('outputs the ISO year', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('o'),
                '2019'
            );
        });

        it('uses the year of Thursday of the current week', function() {
            const date = new DateTimeImmutable([2019, 11, 30], 'UTC');
            assert.equal(
                date.format('o'),
                '2020'
            );
        });
    });

    describe('m - 2-Digit Month', function() {
        it('outputs the 2-digit month', function() {
            const date = new DateTimeImmutable([2019, 5, 1], 'UTC');
            assert.equal(
                date.format('m'),
                '06'
            );
        });
    });

    describe('m - Month', function() {
        it('outputs the month', function() {
            const date = new DateTimeImmutable([2019, 5, 1], 'UTC');
            assert.equal(
                date.format('n'),
                '6'
            );
        });
    });

    describe('F - Month Name', function() {
        it('outputs the month name', function() {
            const date = new DateTimeImmutable([2019, 5, 1], 'UTC');
            assert.equal(
                date.format('F'),
                'June'
            );
        });
    });

    describe('M - Short Month Name', function() {
        it('outputs the short month name', function() {
            const date = new DateTimeImmutable([2019, 5, 1], 'UTC');
            assert.equal(
                date.format('M'),
                'Jun'
            );
        });
    });

    describe('t - Days In Month', function() {
        it('outputs the days in the month', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('t'),
                '31'
            );
        });

        it('works with non-leap years', function() {
            const date = new DateTimeImmutable([2018, 1, 1], 'UTC');
            assert.equal(
                date.format('t'),
                '28'
            );
        });

        it('works with leap years', function() {
            const date = new DateTimeImmutable([2020, 1, 1], 'UTC');
            assert.equal(
                date.format('t'),
                '29'
            );
        });
    });

    describe('W - ISO Week', function() {
        it('outputs the ISO week of the year', function() {
            const date = new DateTimeImmutable([2019, 5, 1], 'UTC');
            assert.equal(
                date.format('W'),
                '22'
            );
        });

        it('uses the ISO year', function() {
            const date = new DateTimeImmutable([2019, 11, 30], 'UTC');
            assert.equal(
                date.format('W'),
                '1'
            );
        });
    });

    describe('z - Day Of The Year', function() {
        it('outputs the day of the year', function() {
            const date = new DateTimeImmutable([2019, 5, 1], 'UTC');
            assert.equal(
                date.format('z'),
                '152'
            );
        });
    });

    describe('d - 2-Digit Date', function() {
        it('outputs the 2-digit date', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('d'),
                '01'
            );
        });
    });

    describe('j - Date', function() {
        it('outputs the date', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('j'),
                '1'
            );
        });
    });

    describe('S - Ordinal Suffix', function() {
        it('outputs the ordinal suffix', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('S'),
                'st'
            );
        });
    });

    describe('N - ISO Day', function() {
        it('outputs the ISO day of the week', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('N'),
                '2'
            );
        });

        it('outputs 1 for Monday', function() {
            const date = new DateTimeImmutable([2019, 11, 30], 'UTC');
            assert.equal(
                date.format('N'),
                '1'
            );
        });

        it('outputs 7 for Sunday', function() {
            const date = new DateTimeImmutable([2019, 11, 29], 'UTC');
            assert.equal(
                date.format('N'),
                '7'
            );
        });
    });

    describe('w - Day', function() {
        it('outputs the day of the week', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('w'),
                '2'
            );
        });

        it('outputs 1 for Monday', function() {
            const date = new DateTimeImmutable([2019, 11, 30], 'UTC');
            assert.equal(
                date.format('w'),
                '1'
            );
        });

        it('outputs 0 for Sunday', function() {
            const date = new DateTimeImmutable([2019, 11, 29], 'UTC');
            assert.equal(
                date.format('w'),
                '0'
            );
        });
    });

    describe('l - Day Name', function() {
        it('outputs the day name', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('l'),
                'Tuesday'
            );
        });
    });

    describe('D - Short Day Name', function() {
        it('outputs the short day name', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('D'),
                'Tue'
            );
        });
    });

    // swatch time

    describe('a - Lower-Case Day Period', function() {
        it('outputs the short day name', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('a'),
                'am'
            );
        });

        it('works with PM', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 12], 'UTC');
            assert.equal(
                date.format('a'),
                'pm'
            );
        });
    });

    describe('A - Upper-Case Day Period', function() {
        it('outputs the short day name', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('A'),
                'AM'
            );
        });

        it('works with PM', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 12], 'UTC');
            assert.equal(
                date.format('A'),
                'PM'
            );
        });
    });

    describe('H - 2-digit 24-hour', function() {
        it('outputs the 2-digit 24-hour', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('H'),
                '00'
            );
        });

        it('works after 12 hours', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 13], 'UTC');
            assert.equal(
                date.format('H'),
                '13'
            );
        });
    });

    describe('G - 24-hour', function() {
        it('outputs the 24-hour', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('G'),
                '0'
            );
        });

        it('works after 12 hours', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 13], 'UTC');
            assert.equal(
                date.format('G'),
                '13'
            );
        });
    });

    describe('h - 2-digit 12-hour', function() {
        it('outputs the 2-digit 12-hour', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('h'),
                '12'
            );
        });

        it('works after 12 hours', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 13], 'UTC');
            assert.equal(
                date.format('h'),
                '01'
            );
        });
    });

    describe('g - 12-hour', function() {
        it('outputs the 12-hour', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('g'),
                '12'
            );
        });

        it('works after 12 hours', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 13], 'UTC');
            assert.equal(
                date.format('g'),
                '1'
            );
        });
    });

    describe('i - Minute', function() {
        it('outputs the minute', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 0, 1], 'UTC');
            assert.equal(
                date.format('i'),
                '01'
            );
        });
    });

    describe('s - Second', function() {
        it('outputs the second', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 0, 0, 1], 'UTC');
            assert.equal(
                date.format('s'),
                '01'
            );
        });
    });

    describe('u - Microsecond', function() {
        it('outputs the microsecond', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 0, 0, 0, 550], 'UTC');
            assert.equal(
                date.format('u'),
                '550000'
            );
        });
    });

    describe('e - Timezone Name', function() {
        it('outputs the timezone name', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'Australia/Brisbane');
            assert.equal(
                date.format('e'),
                'Australia/Brisbane'
            );
        });

        it('works with UTC', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('e'),
                'UTC'
            );
        });
    });

    describe('T - Timezone Abbreviation', function() {
        it('outputs the timezone abbreviation', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'Australia/Brisbane');
            assert.equal(
                date.format('T'),
                'AEST'
            );
        });

        it('works with UTC', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('T'),
                'UTC'
            );
        });

        it('works with DST', function() {
            const date = new DateTimeImmutable([2019, 5, 30], 'America/New_York');
            assert.equal(
                date.format('T'),
                'EDT'
            );
        });
    });

    describe('I - Daylight Savings', function() {
        it('outputs 1 for DST', function() {
            const date = new DateTimeImmutable([2019, 5, 30], 'America/New_York');
            assert.equal(
                date.format('I'),
                '1'
            );
        });

        it('outputs 0 for non-DST', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('I'),
                '0'
            );
        });
    });

    describe('O - Offset', function() {
        it('outputs offset without colon', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'Australia/Brisbane');
            assert.equal(
                date.format('O'),
                '+1000'
            );
        });

        it('works with UTC', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('O'),
                '+0000'
            );
        });

        it('works with negative offsets', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'America/New_York');
            assert.equal(
                date.format('O'),
                '-0500'
            );
        });
    });

    describe('P - Offset With Colon', function() {
        it('outputs offset with colon', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'Australia/Brisbane');
            assert.equal(
                date.format('P'),
                '+10:00'
            );
        });

        it('works with UTC', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('P'),
                '+00:00'
            );
        });

        it('works with negative offsets', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'America/New_York');
            assert.equal(
                date.format('P'),
                '-05:00'
            );
        });
    });

    describe('Z - Offset Seconds', function() {
        it('outputs offset in seconds', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'Australia/Brisbane');
            assert.equal(
                date.format('Z'),
                '36000'
            );
        });

        it('works with UTC', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'UTC');
            assert.equal(
                date.format('Z'),
                '0'
            );
        });

        it('works with negative offsets', function() {
            const date = new DateTimeImmutable([2019, 0, 1], 'America/New_York');
            assert.equal(
                date.format('Z'),
                '-18000'
            );
        });
    });

    describe('c - ISO-8601 Date', function() {
        it('outputs ISO-8601 date', function() {
            const date = new DateTimeImmutable([2019, 0, 1, 12, 30, 59, 500], 'Australia/Brisbane');
            assert.equal(
                date.format('c'),
                '2019-01-01T12:30:59.500+10:00'
            );
        });
    });

    describe('\\ - Escape Character', function() {
        it('outputs the following literal character', function() {
            const date = new DateTimeImmutable();
            assert.equal(
                date.format('\\Y'),
                'Y'
            )
        });
    });

});
