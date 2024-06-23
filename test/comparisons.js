import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime Comparisons', function() {
    describe('#isAfter', function() {
        it('returns false for dates after', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfter(date2),
                false,
            );
        });

        it('returns true for dates before', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfter(date2),
                true,
            );
        });
    });

    describe('#isAfterDay', function() {
        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfterDay(date2),
                false,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfterDay(date2),
                true,
            );
        });
    });

    describe('#isAfterHour', function() {
        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfterHour(date2),
                false,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfterHour(date2),
                true,
            );
        });
    });

    describe('#isAfterMinute', function() {
        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfterMinute(date2),
                false,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfterMinute(date2),
                true,
            );
        });
    });

    describe('#isAfterMonth', function() {
        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = DateTime.fromArray([2018, 2, 2]);
            assert.strictEqual(
                date1.isAfterMonth(date2),
                false,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isAfterMonth(date2),
                true,
            );
        });
    });

    describe('#isAfterSecond', function() {
        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfterSecond(date2),
                false,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfterSecond(date2),
                true,
            );
        });
    });

    describe('#isAfterYear', function() {
        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2018, 1]);
            const date2 = DateTime.fromArray([2019, 2]);
            assert.strictEqual(
                date1.isAfterYear(date2),
                false,
            );
        });

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isAfterYear(date2),
                true,
            );
        });
    });

    describe('#isBefore', function() {
        it('returns false for dates before', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isBefore(date2),
                false,
            );
        });

        it('returns true for dates after', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isBefore(date2),
                true,
            );
        });
    });

    describe('#isBeforeDay', function() {
        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isBeforeDay(date2),
                false,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 2, 2]);
            assert.strictEqual(
                date1.isBeforeDay(date2),
                true,
            );
        });
    });

    describe('#isBeforeHour', function() {
        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isBeforeHour(date2),
                false,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isBeforeHour(date2),
                true,
            );
        });
    });

    describe('#isBeforeMinute', function() {
        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isBeforeMinute(date2),
                false,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isBeforeMinute(date2),
                true,
            );
        });
    });

    describe('#isBeforeMonth', function() {
        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isBeforeMonth(date2),
                false,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = DateTime.fromArray([2018, 2, 2]);
            assert.strictEqual(
                date1.isBeforeMonth(date2),
                true,
            );
        });
    });

    describe('#isBeforeSecond', function() {
        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isBeforeSecond(date2),
                false,
            );
        });

        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isBeforeSecond(date2),
                true,
            );
        });
    });

    describe('#isBeforeYear', function() {
        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isBeforeYear(date2),
                false,
            );
        });

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2018, 1]);
            const date2 = DateTime.fromArray([2019, 2]);
            assert.strictEqual(
                date1.isBeforeYear(date2),
                true,
            );
        });
    });

    describe('#isBetween', function() {
        it('returns true if dates are before and after', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3),
                true,
            );
        });

        it('returns false if both dates are after', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3),
                false,
            );
        });

        it('returns false if both dates are before', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3),
                false,
            );
        });
    });

    describe('#isBetweenDay', function() {
        it('works with dates before and after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 4]);
            assert.strictEqual(
                date1.isBetweenDay(date2, date3),
                true,
            );
        });

        it('works with both dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 4]);
            assert.strictEqual(
                date1.isBetweenDay(date2, date3),
                false,
            );
        });

        it('works with both dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 4]);
            assert.strictEqual(
                date1.isBetweenDay(date2, date3),
                false,
            );
        });
    });

    describe('#isBetweenHour', function() {
        it('works with dates before and after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenHour(date2, date3),
                true,
            );
        });

        it('works with both dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenHour(date2, date3),
                false,
            );
        });

        it('works with both dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenHour(date2, date3),
                false,
            );
        });
    });

    describe('#isBetweenMinute', function() {
        it('works with dates before and after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenMinute(date2, date3),
                true,
            );
        });

        it('works with both dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenMinute(date2, date3),
                false,
            );
        });

        it('works with both dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenMinute(date2, date3),
                false,
            );
        });
    });

    describe('#isBetweenMonth', function() {
        it('works with dates before and after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 3]);
            const date2 = DateTime.fromArray([2018, 2]);
            const date3 = DateTime.fromArray([2018, 4]);
            assert.strictEqual(
                date1.isBetweenMonth(date2, date3),
                true,
            );
        });

        it('works with both dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1]);
            const date2 = DateTime.fromArray([2018, 2]);
            const date3 = DateTime.fromArray([2018, 4]);
            assert.strictEqual(
                date1.isBetweenMonth(date2, date3),
                false,
            );
        });

        it('works with both dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 5]);
            const date2 = DateTime.fromArray([2018, 2]);
            const date3 = DateTime.fromArray([2018, 4]);
            assert.strictEqual(
                date1.isBetweenMonth(date2, date3),
                false,
            );
        });
    });

    describe('#isBetweenSecond', function() {
        it('works with dates before and after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenSecond(date2, date3),
                true,
            );
        });

        it('works with both dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenSecond(date2, date3),
                false,
            );
        });

        it('works with both dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetweenSecond(date2, date3),
                false,
            );
        });
    });

    describe('#isBetweenYear', function() {
        it('works with dates before and after in year scope', function() {
            const date1 = DateTime.fromArray([2019]);
            const date2 = DateTime.fromArray([2018]);
            const date3 = DateTime.fromArray([2020]);
            assert.strictEqual(
                date1.isBetweenYear(date2, date3),
                true,
            );
        });

        it('works with both dates after in year scope', function() {
            const date1 = DateTime.fromArray([2017]);
            const date2 = DateTime.fromArray([2018]);
            const date3 = DateTime.fromArray([2020]);
            assert.strictEqual(
                date1.isBetweenYear(date2, date3),
                false,
            );
        });

        it('works with both dates before in year scope', function() {
            const date1 = DateTime.fromArray([2021]);
            const date2 = DateTime.fromArray([2018]);
            const date3 = DateTime.fromArray([2020]);
            assert.strictEqual(
                date1.isBetweenYear(date2, date3),
                false,
            );
        });
    });

    describe('#isSame', function() {
        it('returns true for same dates', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2),
                true,
            );
        });

        it('returns false for dates after', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSame(date2),
                false,
            );
        });

        it('returns false for dates before', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2),
                false,
            );
        });
    });

    describe('#isSameDay', function() {
        it('works with same dates in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameDay(date2),
                true,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameDay(date2),
                false,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameDay(date2),
                false,
            );
        });
    });

    describe('#isSameHour', function() {
        it('works with same dates in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameHour(date2),
                true,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameHour(date2),
                false,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameHour(date2),
                false,
            );
        });
    });

    describe('#isSameMinute', function() {
        it('works with same dates in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameMinute(date2),
                true,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameMinute(date2),
                false,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameMinute(date2),
                false,
            );
        });
    });

    describe('#isSameMonth', function() {
        it('works with same dates in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameMonth(date2),
                true,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 2, 1]);
            assert.strictEqual(
                date1.isSameMonth(date2),
                false,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameMonth(date2),
                false,
            );
        });
    });

    describe('#isSameSecond', function() {
        it('works with same dates in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameSecond(date2),
                true,
            );
        });

        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSameSecond(date2),
                false,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameSecond(date2),
                false,
            );
        });
    });

    describe('#isSameYear', function() {
        it('works with same dates in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameYear(date2),
                true,
            );
        });

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2019, 1]);
            assert.strictEqual(
                date1.isSameYear(date2),
                false,
            );
        });

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2017, 1]);
            assert.strictEqual(
                date1.isSameYear(date2),
                false,
            );
        });
    });

    describe('#isSameOrAfter', function() {
        it('returns true for same dates', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2),
                true,
            );
        });

        it('returns true for dates before', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2),
                true,
            );
        });

        it('returns false for dates after', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSameOrAfter(date2),
                false,
            );
        });
    });

    describe('#isSameOrAfterDay', function() {
        it('works with same dates in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterDay(date2),
                true,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterDay(date2),
                true,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrAfterDay(date2),
                false,
            );
        });
    });

    describe('#isSameOrAfterHour', function() {
        it('works with same dates in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterHour(date2),
                true,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterHour(date2),
                true,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrAfterHour(date2),
                false,
            );
        });
    });

    describe('#isSameOrAfterMinute', function() {
        it('works with same dates in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterMinute(date2),
                true,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterMinute(date2),
                true,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrAfterMinute(date2),
                false,
            );
        });
    });

    describe('#isSameOrAfterMonth', function() {
        it('works with same dates in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterMonth(date2),
                true,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterMonth(date2),
                true,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 2, 1]);
            assert.strictEqual(
                date1.isSameOrAfterMonth(date2),
                false,
            );
        });
    });

    describe('#isSameOrAfterSecond', function() {
        it('works with same dates in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterSecond(date2),
                true,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfterSecond(date2),
                true,
            );
        });

        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSameOrAfterSecond(date2),
                false,
            );
        });
    });

    describe('#isSameOrAfterYear', function() {
        it('works with same dates in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameOrAfterYear(date2),
                true,
            );
        });

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameOrAfterYear(date2),
                true,
            );
        });

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2020, 1]);
            assert.strictEqual(
                date1.isSameOrAfterYear(date2),
                false,
            );
        });
    });

    describe('#isSameOrBefore', function() {
        it('returns true for same dates', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2),
                true,
            );
        });

        it('returns true for dates after', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSameOrBefore(date2),
                true,
            );
        });

        it('returns false for dates before', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2),
                false,
            );
        });
    });

    describe('#isSameOrBeforeDay', function() {
        it('works with same dates in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeDay(date2),
                true,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeDay(date2),
                true,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeDay(date2),
                false,
            );
        });
    });

    describe('#isSameOrBeforeHour', function() {
        it('works with same dates in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeHour(date2),
                true,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeHour(date2),
                true,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeHour(date2),
                false,
            );
        });
    });

    describe('#isSameOrBeforeMinute', function() {
        it('works with same dates in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeMinute(date2),
                true,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeMinute(date2),
                true,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeMinute(date2),
                false,
            );
        });

        it('works with same dates in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeSecond(date2),
                true,
            );
        });
    });

    describe('#isSameOrBeforeMonth', function() {
        it('works with same dates in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeMonth(date2),
                true,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 2, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeMonth(date2),
                true,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeMonth(date2),
                false,
            );
        });
    });

    describe('#isSameOrBeforeSecond', function() {
        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSameOrBeforeSecond(date2),
                true,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeSecond(date2),
                false,
            );
        });
    });

    describe('#isSameOrBeforeYear', function() {
        it('works with same dates in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeYear(date2),
                true,
            );
        });

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2020, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeYear(date2),
                true,
            );
        });

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameOrBeforeYear(date2),
                false,
            );
        });
    });
});
