const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Utility', function() {

    describe('#clone', function() {
        it('creates a clone object', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.clone();
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('does not create a reference object', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.clone();
            date2.setYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T00:00:00.000+00:00'
            );
        });
    });

    describe('#dayName', function() {
        it('returns the day name', function() {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            for (const i in dayNames) {
                assert.strictEqual(
                    DateTime.fromArray([2019, 1, 1])
                        .setDay(i)
                        .dayName(),
                    dayNames[i]
                );
            }
        });

        it('works with short names', function() {
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (const i in dayNames) {
                assert.strictEqual(
                    DateTime.fromArray([2019, 1, 1])
                        .setDay(i)
                        .dayName('short'),
                    dayNames[i]
                );
            }
        });

        it('works with minimal names', function() {
            const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            for (const i in dayNames) {
                assert.strictEqual(
                    DateTime.fromArray([2019, 1, 1])
                        .setDay(i)
                        .dayName('narrow'),
                    dayNames[i]
                );
            }
        });
    });

    describe('#daysInMonth', function() {
        it('returns the days in the month', function() {
            const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTime.fromArray([2018, i + 1, 1])
                        .daysInMonth(),
                    monthDays[i]
                );
            }
        });

        it('works with leap years', function() {
            assert.strictEqual(
                DateTime.fromArray([2020, 2, 1])
                    .daysInMonth(),
                29
            );
        });
    });

    describe('#isDST', function() {
        it('returns false if the date is not DST', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1])
                    .isDST(),
                false
            );
        });

        it('returns true if the date is DST', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { timeZone: 'America/New_York' })
                    .isDST(),
                true
            );
        });
    });

    describe('#isLeapYear', function() {
        it('returns false if the year is not a leap year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019])
                    .isLeapYear(),
                false
            );
        });

        it('returns true if the year is a leap year', function() {
            assert.strictEqual(
                DateTime.fromArray([2016])
                    .isLeapYear(),
                true
            );
        });
    });

    describe('#monthName', function() {
        it('returns the month name', function() {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTime.fromArray([2019, parseInt(i) + 1, 1])
                        .monthName(),
                    monthNames[i]
                );
            }
        });

        it('works with short names', function() {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTime.fromArray([2019, parseInt(i) + 1, 1])
                        .monthName('short'),
                    monthNames[i]
                );
            }
        });
    });

});
