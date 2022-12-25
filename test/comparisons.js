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

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2018, 1]);
            const date2 = DateTime.fromArray([2019, 2]);
            assert.strictEqual(
                date1.isAfter(date2, 'year'),
                false,
            );
        });

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isAfter(date2, 'year'),
                true,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = DateTime.fromArray([2018, 2, 2]);
            assert.strictEqual(
                date1.isAfter(date2, 'month'),
                false,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isAfter(date2, 'month'),
                true,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfter(date2, 'day'),
                false,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfter(date2, 'day'),
                true,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfter(date2, 'hour'),
                false,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfter(date2, 'hour'),
                true,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfter(date2, 'minute'),
                false,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfter(date2, 'minute'),
                true,
            );
        });

        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isAfter(date2, 'second'),
                false,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isAfter(date2, 'second'),
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

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isBefore(date2, 'year'),
                false,
            );
        });

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2018, 1]);
            const date2 = DateTime.fromArray([2019, 2]);
            assert.strictEqual(
                date1.isBefore(date2, 'year'),
                true,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isBefore(date2, 'month'),
                false,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = DateTime.fromArray([2018, 2, 2]);
            assert.strictEqual(
                date1.isBefore(date2, 'month'),
                true,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isBefore(date2, 'day'),
                false,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 2, 2]);
            assert.strictEqual(
                date1.isBefore(date2, 'day'),
                true,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isBefore(date2, 'hour'),
                false,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isBefore(date2, 'hour'),
                true,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isBefore(date2, 'minute'),
                false,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isBefore(date2, 'minute'),
                true,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isBefore(date2, 'second'),
                false,
            );
        });

        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            assert.strictEqual(
                date1.isBefore(date2, 'second'),
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

        it('works with dates before and after in year scope', function() {
            const date1 = DateTime.fromArray([2019]);
            const date2 = DateTime.fromArray([2018]);
            const date3 = DateTime.fromArray([2020]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'year'),
                true,
            );
        });

        it('works with both dates after in year scope', function() {
            const date1 = DateTime.fromArray([2017]);
            const date2 = DateTime.fromArray([2018]);
            const date3 = DateTime.fromArray([2020]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'year'),
                false,
            );
        });

        it('works with both dates before in year scope', function() {
            const date1 = DateTime.fromArray([2021]);
            const date2 = DateTime.fromArray([2018]);
            const date3 = DateTime.fromArray([2020]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'year'),
                false,
            );
        });

        it('works with dates before and after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 3]);
            const date2 = DateTime.fromArray([2018, 2]);
            const date3 = DateTime.fromArray([2018, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'month'),
                true,
            );
        });

        it('works with both dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1]);
            const date2 = DateTime.fromArray([2018, 2]);
            const date3 = DateTime.fromArray([2018, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'month'),
                false,
            );
        });

        it('works with both dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 5]);
            const date2 = DateTime.fromArray([2018, 2]);
            const date3 = DateTime.fromArray([2018, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'month'),
                false,
            );
        });

        it('works with dates before and after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'day'),
                true,
            );
        });

        it('works with both dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'day'),
                false,
            );
        });

        it('works with both dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'day'),
                false,
            );
        });

        it('works with dates before and after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'hour'),
                true,
            );
        });

        it('works with both dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'hour'),
                false,
            );
        });

        it('works with both dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'hour'),
                false,
            );
        });

        it('works with dates before and after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'minute'),
                true,
            );
        });

        it('works with both dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'minute'),
                false,
            );
        });

        it('works with both dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'minute'),
                false,
            );
        });

        it('works with dates before and after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 3]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'second'),
                true,
            );
        });

        it('works with both dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'second'),
                false,
            );
        });

        it('works with both dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 5]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date3 = DateTime.fromArray([2018, 1, 1, 1, 1, 4]);
            assert.strictEqual(
                date1.isBetween(date2, date3, 'second'),
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

        it('works with same dates in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'year'),
                true,
            );
        });

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2019, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'year'),
                false,
            );
        });

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2017, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'year'),
                false,
            );
        });

        it('works with same dates in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'month'),
                true,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 2, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'month'),
                false,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'month'),
                false,
            );
        });

        it('works with same dates in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'day'),
                true,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 2, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'day'),
                false,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'day'),
                false,
            );
        });

        it('works with same dates in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'hour'),
                true,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'hour'),
                false,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'hour'),
                false,
            );
        });

        it('works with same dates in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'minute'),
                true,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'minute'),
                false,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'minute'),
                false,
            );
        });

        it('works with same dates in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'second'),
                true,
            );
        });

        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSame(date2, 'second'),
                false,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSame(date2, 'second'),
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

        it('works with same dates in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'year'),
                true,
            );
        });

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'year'),
                true,
            );
        });

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2020, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'year'),
                false,
            );
        });

        it('works with same dates in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'month'),
                true,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'month'),
                true,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 2, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'month'),
                false,
            );
        });

        it('works with same dates in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'day'),
                true,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'day'),
                true,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'day'),
                false,
            );
        });

        it('works with same dates in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'hour'),
                true,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'hour'),
                true,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'hour'),
                false,
            );
        });

        it('works with same dates in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'minute'),
                true,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'minute'),
                true,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'minute'),
                false,
            );
        });

        it('works with same dates in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'second'),
                true,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'second'),
                true,
            );
        });

        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSameOrAfter(date2, 'second'),
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

        it('works with same dates in year scope', function() {
            const date1 = DateTime.fromArray([2018, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'year'),
                true,
            );
        });

        it('works with dates after in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2020, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'year'),
                true,
            );
        });

        it('works with dates before in year scope', function() {
            const date1 = DateTime.fromArray([2019, 2]);
            const date2 = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'year'),
                false,
            );
        });

        it('works with same dates in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'month'),
                true,
            );
        });

        it('works with dates after in month scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2]);
            const date2 = DateTime.fromArray([2018, 2, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'month'),
                true,
            );
        });

        it('works with dates before in month scope', function() {
            const date1 = DateTime.fromArray([2018, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'month'),
                false,
            );
        });

        it('works with same dates in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'day'),
                true,
            );
        });

        it('works with dates after in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'day'),
                true,
            );
        });

        it('works with dates before in day scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'day'),
                false,
            );
        });

        it('works with same dates in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'hour'),
                true,
            );
        });

        it('works with dates after in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'hour'),
                true,
            );
        });

        it('works with dates before in hour scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'hour'),
                false,
            );
        });

        it('works with same dates in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'minute'),
                true,
            );
        });

        it('works with dates after in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 2, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'minute'),
                true,
            );
        });

        it('works with dates before in minute scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 2, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'minute'),
                false,
            );
        });

        it('works with same dates in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'second'),
                true,
            );
        });

        it('works with dates after in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'second'),
                true,
            );
        });

        it('works with dates before in second scope', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 1, 1, 2]);
            const date2 = DateTime.fromArray([2018, 1, 1, 1, 1, 1]);
            assert.strictEqual(
                date1.isSameOrBefore(date2, 'second'),
                false,
            );
        });
    });
});
