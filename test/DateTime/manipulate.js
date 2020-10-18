const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Manipulation', function() {

    describe('#add', function() {
        it('works with year', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(1, 'year');
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with years', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(2, 'years');
            assert.strictEqual(
                date1.toISOString(),
                '2020-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with month', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(1, 'month');
            assert.strictEqual(
                date1.toISOString(),
                '2018-02-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with months', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(2, 'months');
            assert.strictEqual(
                date1.toISOString(),
                '2018-03-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with week', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(1, 'week');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-08T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with weeks', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(2, 'weeks');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-15T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with day', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(1, 'day');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-02T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with days', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(2, 'days');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-03T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with hour', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(1, 'hour');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T01:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with hours', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(2, 'hours');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T02:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(1, 'minute');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:01:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with minutes', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(2, 'minutes');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:02:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with second', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(1, 'second');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:01.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with seconds', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.add(2, 'seconds');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:02.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#sub', function() {
        it('works with year', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(1, 'year');
            assert.strictEqual(
                date1.toISOString(),
                '2017-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with years', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(2, 'years');
            assert.strictEqual(
                date1.toISOString(),
                '2016-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with month', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(1, 'month');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with months', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(2, 'months');
            assert.strictEqual(
                date1.toISOString(),
                '2017-11-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with week', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(1, 'week');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-25T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with weeks', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(2, 'weeks');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-18T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with day', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(1, 'day');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-31T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with days', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(2, 'days');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-30T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with hour', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(1, 'hour');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-31T23:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with hours', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(2, 'hours');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-31T22:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(1, 'minute');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-31T23:59:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(2, 'minutes');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-31T23:58:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with second', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(1, 'second');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-31T23:59:59.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with seconds', function() {
            const date1 = DateTime.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.sub(2, 'seconds');
            assert.strictEqual(
                date1.toISOString(),
                '2017-12-31T23:59:58.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#startOf', function() {
        it('works with year', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('year');
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with quarter', function() {
            const date1 = DateTime.fromArray([2018, 8, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('quarter');
            assert.strictEqual(
                date1.toISOString(),
                '2018-07-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with month', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('month');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with ISO week', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('isoWeek');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-11T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with week', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('week');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-10T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with day', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('day');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with hour', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('hour');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:00:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('minute');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:00.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with second', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('second');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.0+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#endOf', function() {
        it('works with year', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('year');
            assert.strictEqual(
                date1.toISOString(),
                '2018-12-31T23:59:59.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with quarter', function() {
            const date1 = DateTime.fromArray([2018, 8, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('quarter');
            assert.strictEqual(
                date1.toISOString(),
                '2018-09-30T23:59:59.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with month', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('month');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-30T23:59:59.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with ISO week', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('isoWeek');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-17T23:59:59.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with week', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('week');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-16T23:59:59.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with day', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('day');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T23:59:59.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with hour', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('hour');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:59:59.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('minute');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:59.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with second', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('second');
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.999+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

});
