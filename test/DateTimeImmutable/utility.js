const assert = require('assert').strict;
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Utility Tests', function() {

    describe('#clone', function() {
        it('creates a clone object', function() {
            const date1 = new DateTimeImmutable([2019, 0, 1], 'UTC');
            const date2 = date1.clone();
            assert.equal(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('does not create a reference object', function() {
            const date1 = new DateTimeImmutable([2019, 0, 1], 'UTC');
            const date2 = date1.clone();
            const date3 = date2.setYear(2018);
            assert.equal(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date3.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });
    });

    describe('#dateSuffix', function() {
        it('returns the ordinal suffix', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1], 'UTC')
                    .dateSuffix(),
                'st'
            );
        });

        it('works with 2', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 2], 'UTC')
                    .dateSuffix(),
                'nd'
            );
        });

        it('works with 3', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 3], 'UTC')
                    .dateSuffix(),
                'rd'
            );
        });

        it('works with 4', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 4], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 10', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 10], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 11', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 11], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 12', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 12], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 13', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 13], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 14', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 14], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 20', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 20], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 21', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 21], 'UTC')
                    .dateSuffix(),
                'st'
            );
        });

        it('works with 22', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 22], 'UTC')
                    .dateSuffix(),
                'nd'
            );
        });

        it('works with 23', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 23], 'UTC')
                    .dateSuffix(),
                'rd'
            );
        });

        it('works with 24', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 24], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 30', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 30], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 31', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 31], 'UTC')
                    .dateSuffix(),
                'st'
            );
        });
    });

    describe('#dayName', function() {
        it('returns the day name', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1], 'UTC')
                    .dayName(),
                'Tuesday'
            );
        });

        it('works with short names', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1], 'UTC')
                    .dayName('short'),
                'Tue'
            );
        });

        it('works with minimal names', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1], 'UTC')
                    .dayName('min'),
                'Tu'
            );
        });
    });

    describe('#daysInMonth', function() {
        it('returns the days in the month', function() {
            assert.equal(
                new DateTimeImmutable([2018, 0, 1], 'UTC')
                    .daysInMonth(),
                31
            );
        });

        it('works with non-leap years', function() {
            assert.equal(
                new DateTimeImmutable([2019, 1, 1], 'UTC')
                    .daysInMonth(),
                28
            );
        });

        it('works with leap years', function() {
            assert.equal(
                new DateTimeImmutable([2020, 1, 1], 'UTC')
                    .daysInMonth(),
                29
            );
        });
    });

    describe('#isDST', function() {
        it('returns false if the date is not DST', function() {
            assert.equal(
                new DateTimeImmutable([2018, 0, 1], 'UTC')
                    .isDST(),
                false
            );
        });

        it('returns true if the date is DST', function() {
            assert.equal(
                new DateTimeImmutable([2018, 5, 1], 'America/New_York')
                    .isDST(),
                true
            );
        });
    });

    describe('#isLeapYear', function() {
        it('returns false if the year is not a leap year', function() {
            assert.equal(
                new DateTimeImmutable([2019], 'UTC')
                    .isLeapYear(),
                false
            );
        });

        it('returns true if the year is a leap year', function() {
            assert.equal(
                new DateTimeImmutable([2016], 'UTC')
                    .isLeapYear(),
                true
            );
        });
    });

    describe('#monthName', function() {
        it('returns the month name', function() {
            assert.equal(
                new DateTimeImmutable([2019, 5, 1], 'UTC')
                    .monthName(),
                'June'
            );
        });

        it('works with short names', function() {
            assert.equal(
                new DateTimeImmutable([2019, 5, 1], 'UTC')
                    .monthName('short'),
                'Jun'
            );
        });
    });

});
