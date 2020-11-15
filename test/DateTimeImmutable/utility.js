const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Utility', function() {

    describe('#clone', function() {
        it('creates a clone object', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1]);
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
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1]);
            const date2 = date1.clone();
            const date3 = date2.setYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date3.toISOString(),
                '2018-01-01T00:00:00.000+00:00'
            );
        });


        it('returns a new DateTimeImmutable', function() {
            assert.ok(
                DateTimeImmutable.fromArray([2019]).clone().constructor === DateTimeImmutable
            );
        });
    });

    describe('#dayName', function() {
        it('returns the day name', function() {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            for (const i in dayNames) {
                assert.strictEqual(
                    DateTimeImmutable.fromArray([2019, 1, 1])
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
                    DateTimeImmutable.fromArray([2019, 1, 1])
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
                    DateTimeImmutable.fromArray([2019, 1, 1])
                        .setDay(i)
                        .dayName('narrow'),
                    dayNames[i]
                );
            }
        });
    });

    describe('#dayPeriod', function() {
        it('returns the day period', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018, 1, 1, 0])
                    .dayPeriod(),
                'AM'
            );
        });

        it('works with pm day period', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018, 1, 1, 12])
                    .dayPeriod(),
                'PM'
            );
        });

        it('works with short am periods', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018, 1, 1, 0])
                    .dayPeriod('short'),
                'AM'
            );
        });

        it('works with short pm periods', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018, 1, 1, 12])
                    .dayPeriod('short'),
                'PM'
            );
        });
    });

    describe('#daysInMonth', function() {
        it('returns the days in the month', function() {
            const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTimeImmutable.fromArray([2018, i + 1, 1])
                        .daysInMonth(),
                    monthDays[i]
                );
            }
        });

        it('works with leap years', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2020, 2, 1])
                    .daysInMonth(),
                29
            );
        });
    });

    describe('#era', function() {
        it('returns the era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018])
                    .era(),
                'Anno Domini'
            );
        });

        it('works with bc era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([-5])
                    .era(),
                'Before Christ'
            );
        });

        it('works with short bc eras', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018])
                    .era('short'),
                'AD'
            );
        });

        it('works with short ad eras', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([-5])
                    .era('short'),
                'BC'
            );
        });

        it('works with narrow bc eras', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018])
                    .era('narrow'),
                'A'
            );
        });

        it('works with narrow ad eras', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([-5])
                    .era('narrow'),
                'B'
            );
        });
    });

    describe('#isDST', function() {
        it('returns false if the date is not DST', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018, 1, 1])
                    .isDST(),
                false
            );
        });

        it('returns true if the date is DST', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2018, 6, 1], { timeZone: 'America/New_York' })
                    .isDST(),
                true
            );
        });
    });

    describe('#isLeapYear', function() {
        it('returns false if the year is not a leap year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2019])
                    .isLeapYear(),
                false
            );
        });

        it('returns true if the year is a leap year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromArray([2016])
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
                    DateTimeImmutable.fromArray([2019, parseInt(i) + 1, 1])
                        .monthName(),
                    monthNames[i]
                );
            }
        });

        it('works with short names', function() {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTimeImmutable.fromArray([2019, parseInt(i) + 1, 1])
                        .monthName('short'),
                    monthNames[i]
                );
            }
        });
    });

});