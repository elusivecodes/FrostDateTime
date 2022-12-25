import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime Utility', function() {
    describe('#dayName', function() {
        it('returns the day name', function() {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            for (const [i, day] of dayNames.entries()) {
                assert.strictEqual(
                    DateTime.fromArray([2019, 1, 1])
                        .setDay(i)
                        .dayName(),
                    day,
                );
            }
        });

        it('works with short names', function() {
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (const [i, day] of dayNames.entries()) {
                assert.strictEqual(
                    DateTime.fromArray([2019, 1, 1])
                        .setDay(i)
                        .dayName('short'),
                    day,
                );
            }
        });

        it('works with narrow names', function() {
            const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            for (const [i, day] of dayNames.entries()) {
                assert.strictEqual(
                    DateTime.fromArray([2019, 1, 1])
                        .setDay(i)
                        .dayName('narrow'),
                    day,
                );
            }
        });
    });

    describe('#dayPeriod', function() {
        it('returns the day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0])
                    .dayPeriod(),
                'AM',
            );
        });

        it('works with pm day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 12])
                    .dayPeriod(),
                'PM',
            );
        });

        it('works with short am periods', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0])
                    .dayPeriod('short'),
                'AM',
            );
        });

        it('works with short pm periods', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 12])
                    .dayPeriod('short'),
                'PM',
            );
        });
    });

    describe('#daysInMonth', function() {
        it('returns the days in the month', function() {
            const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTime.fromArray([2018, i + 1, 1])
                        .daysInMonth(),
                    monthDays[i],
                );
            }
        });

        it('works with leap years', function() {
            assert.strictEqual(
                DateTime.fromArray([2020, 2, 1])
                    .daysInMonth(),
                29,
            );
        });
    });

    describe('#daysInYear', function() {
        it('returns the days in the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1])
                    .daysInYear(),
                365,
            );
        });

        it('works with leap years', function() {
            assert.strictEqual(
                DateTime.fromArray([2020, 1, 1])
                    .daysInYear(),
                366,
            );
        });
    });

    describe('#era', function() {
        it('returns the era', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .era(),
                'Anno Domini',
            );
        });

        it('works with bc era', function() {
            assert.strictEqual(
                DateTime.fromArray([-5])
                    .era(),
                'Before Christ',
            );
        });

        it('works with short bc eras', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .era('short'),
                'AD',
            );
        });

        it('works with short ad eras', function() {
            assert.strictEqual(
                DateTime.fromArray([-5])
                    .era('short'),
                'BC',
            );
        });

        it('works with narrow bc eras', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .era('narrow'),
                'A',
            );
        });

        it('works with narrow ad eras', function() {
            assert.strictEqual(
                DateTime.fromArray([-5])
                    .era('narrow'),
                'B',
            );
        });
    });

    describe('#isDST', function() {
        it('returns false if the date is not DST', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1])
                    .isDST(),
                false,
            );
        });

        it('returns true if the date is DST', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { timeZone: 'America/New_York' })
                    .isDST(),
                true,
            );
        });
    });

    describe('#isLeapYear', function() {
        it('returns false if the year is not a leap year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019])
                    .isLeapYear(),
                false,
            );
        });

        it('returns true if the year is a leap year', function() {
            assert.strictEqual(
                DateTime.fromArray([2016])
                    .isLeapYear(),
                true,
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
                    monthNames[i],
                );
            }
        });

        it('works with short names', function() {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTime.fromArray([2019, parseInt(i) + 1, 1])
                        .monthName('short'),
                    monthNames[i],
                );
            }
        });

        it('works with narrow names', function() {
            const monthNames = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTime.fromArray([2019, parseInt(i) + 1, 1])
                        .monthName('narrow'),
                    monthNames[i],
                );
            }
        });
    });

    describe('#timeZoneName', function() {
        it('returns the time zone name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { timeZone: 'Australia/Brisbane' })
                    .timeZoneName(),
                'Australian Eastern Standard Time',
            );
        });

        it('works with time zone offsets', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { timeZone: '+10:00' })
                    .timeZoneName(),
                'GMT+10:00',
            );
        });

        it('works with short time zone names', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { timeZone: 'Australia/Brisbane' })
                    .timeZoneName('short'),
                'GMT+10',
            );
        });

        it('works with short time zone offsets', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { timeZone: '+10:00' })
                    .timeZoneName('short'),
                'GMT+10',
            );
        });
    });

    describe('#weeksInYear', function() {
        it('returns the weeks in the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1])
                    .weeksInYear(),
                52,
            );
        });

        it('uses local weeks', function() {
            assert.strictEqual(
                DateTime.fromArray([2016, 1, 1])
                    .weeksInYear(),
                53,
            );
        });
    });
});
