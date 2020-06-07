const assert = require('assert').strict;
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Utility Tests', function() {

    describe('#clone', function() {
        it('creates a clone object', function() {
            const date1 = new DateTime([2019, 0, 1], 'UTC');
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
            const date1 = new DateTime([2019, 0, 1], 'UTC');
            const date2 = date1.clone();
            date2.setYear(2018);
            assert.equal(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });
    });

    describe('#dateSuffix', function() {
        it('returns the ordinal suffix', function() {
            assert.equal(
                new DateTime([2019, 0, 1], 'UTC')
                    .dateSuffix(),
                'st'
            );
        });

        it('works with 2', function() {
            assert.equal(
                new DateTime([2019, 0, 2], 'UTC')
                    .dateSuffix(),
                'nd'
            );
        });

        it('works with 3', function() {
            assert.equal(
                new DateTime([2019, 0, 3], 'UTC')
                    .dateSuffix(),
                'rd'
            );
        });

        it('works with 4', function() {
            assert.equal(
                new DateTime([2019, 0, 4], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 10', function() {
            assert.equal(
                new DateTime([2019, 0, 10], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 11', function() {
            assert.equal(
                new DateTime([2019, 0, 11], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 12', function() {
            assert.equal(
                new DateTime([2019, 0, 12], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 13', function() {
            assert.equal(
                new DateTime([2019, 0, 13], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 14', function() {
            assert.equal(
                new DateTime([2019, 0, 14], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 20', function() {
            assert.equal(
                new DateTime([2019, 0, 20], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 21', function() {
            assert.equal(
                new DateTime([2019, 0, 21], 'UTC')
                    .dateSuffix(),
                'st'
            );
        });

        it('works with 22', function() {
            assert.equal(
                new DateTime([2019, 0, 22], 'UTC')
                    .dateSuffix(),
                'nd'
            );
        });

        it('works with 23', function() {
            assert.equal(
                new DateTime([2019, 0, 23], 'UTC')
                    .dateSuffix(),
                'rd'
            );
        });

        it('works with 24', function() {
            assert.equal(
                new DateTime([2019, 0, 24], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 30', function() {
            assert.equal(
                new DateTime([2019, 0, 30], 'UTC')
                    .dateSuffix(),
                'th'
            );
        });

        it('works with 31', function() {
            assert.equal(
                new DateTime([2019, 0, 31], 'UTC')
                    .dateSuffix(),
                'st'
            );
        });
    });

    describe('#dayName', function() {
        it('returns the day name', function() {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            for (const i in dayNames) {
                assert.equal(
                    new DateTime([2019, 0, 1], 'UTC')
                        .setDay(i)
                        .dayName(),
                    dayNames[i]
                );
            }
        });

        it('works with short names', function() {
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
            for (const i in dayNames) {
                assert.equal(
                    new DateTime([2019, 0, 1], 'UTC')
                        .setDay(i)
                        .dayName('short'),
                    dayNames[i]
                );
            }
        });

        it('works with minimal names', function() {
            const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            for (const i in dayNames) {
                assert.equal(
                    new DateTime([2019, 0, 1], 'UTC')
                        .setDay(i)
                        .dayName('min'),
                    dayNames[i]
                );
            }
        });
    });

    describe('#daysInMonth', function() {
        it('returns the days in the month', function() {
            const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (const i in monthDays) {
                assert.equal(
                    new DateTime([2018, i, 1], 'UTC')
                        .daysInMonth(),
                    monthDays[i]
                );
            }
        });

        it('works with leap years', function() {
            assert.equal(
                new DateTime([2020, 1, 1], 'UTC')
                    .daysInMonth(),
                29
            );
        });
    });

    describe('#isDST', function() {
        it('returns false if the date is not DST', function() {
            assert.equal(
                new DateTime([2018, 0, 1], 'UTC')
                    .isDST(),
                false
            );
        });

        it('returns true if the date is DST', function() {
            assert.equal(
                new DateTime([2018, 5, 1], 'America/New_York')
                    .isDST(),
                true
            );
        });
    });

    describe('#isLeapYear', function() {
        it('returns false if the year is not a leap year', function() {
            assert.equal(
                new DateTime([2019], 'UTC')
                    .isLeapYear(),
                false
            );
        });

        it('returns true if the year is a leap year', function() {
            assert.equal(
                new DateTime([2016], 'UTC')
                    .isLeapYear(),
                true
            );
        });
    });

    describe('#monthName', function() {
        it('returns the month name', function() {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            for (const i in monthNames) {
                assert.equal(
                    new DateTime([2019, i, 1], 'UTC')
                        .monthName(),
                    monthNames[i]
                );
            }
        });

        it('works with short names', function() {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (const i in monthNames) {
                assert.equal(
                    new DateTime([2019, i, 1], 'UTC')
                        .monthName('short'),
                    monthNames[i]
                );
            }
        });
    });

});