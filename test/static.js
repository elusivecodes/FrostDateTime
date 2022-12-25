import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime Static', function() {
    describe('#dayOfYear', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.dayOfYear(2019, 6, 1),
                152,
            );
        });
    });

    describe('#daysInMonth', function() {
        it('returns the days in the month', function() {
            const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (const i of [...new Array(12).keys()]) {
                assert.strictEqual(
                    DateTime.daysInMonth(2018, i + 1),
                    monthDays[i],
                );
            }
        });

        it('works with leap years', function() {
            assert.strictEqual(
                DateTime.daysInMonth(2020, 2),
                29,
            );
        });
    });

    describe('#daysInYear', function() {
        it('returns the days in the year', function() {
            assert.strictEqual(
                DateTime.daysInYear(2018),
                365,
            );
        });

        it('works with leap years', function() {
            assert.strictEqual(
                DateTime.daysInYear(2020),
                366,
            );
        });
    });

    describe('#getDefaultLocale', function() {
        it('returns the default locale', function() {
            assert.strictEqual(
                DateTime.getDefaultLocale(),
                'en',
            );
        });
    });

    describe('#getDefaultTimeZone', function() {
        it('returns the default timeZone', function() {
            assert.strictEqual(
                DateTime.getDefaultTimeZone(),
                'UTC',
            );
        });
    });

    describe('#isLeapYear', function() {
        it('returns false if the year is not a leap year', function() {
            assert.strictEqual(
                DateTime.isLeapYear(2019),
                false,
            );
        });

        it('returns true if the year is a leap year', function() {
            assert.strictEqual(
                DateTime.isLeapYear(2016),
                true,
            );
        });
    });
});
