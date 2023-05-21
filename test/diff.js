import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime #diff', function() {
    it('returns the difference in milliseconds', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 30, 500])
                .diff(
                    DateTime.fromArray([2016, 9, 23, 23, 40, 15, 350]),
                ),
            54391815150,
        );
    });

    it('works with year', function() {
        assert.strictEqual(
            DateTime.fromArray([2018])
                .diff(
                    DateTime.fromArray([2017]),
                    { timeUnit: 'year' },
                ),
            1,
        );
    });

    it('works with years', function() {
        assert.strictEqual(
            DateTime.fromArray([2018])
                .diff(
                    DateTime.fromArray([2016]),
                    { timeUnit: 'years' },
                ),
            2,
        );
    });

    it('works with years (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2016])
                .diff(
                    DateTime.fromArray([2018]),
                    { timeUnit: 'years' },
                ),
            -2,
        );
    });

    it('works with years (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1])
                .diff(
                    DateTime.fromArray([2017, 2]),
                    { timeUnit: 'years' },
                ),
            1,
        );
    });

    it('works with years (exact)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1])
                .diff(
                    DateTime.fromArray([2017, 2]),
                    { timeUnit: 'years', relative: false },
                ),
            0,
        );
    });

    it('works with month', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 9])
                .diff(
                    DateTime.fromArray([2018, 8]),
                    { timeUnit: 'month' },
                ),
            1,
        );
    });

    it('works with months', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 9])
                .diff(
                    DateTime.fromArray([2018, 6]),
                    { timeUnit: 'months' },
                ),
            3,
        );
    });

    it('works with months (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6])
                .diff(
                    DateTime.fromArray([2018, 9]),
                    { timeUnit: 'months' },
                ),
            -3,
        );
    });

    it('works with months (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 2, 1])
                .diff(
                    DateTime.fromArray([2018, 1, 2]),
                    { timeUnit: 'months' },
                ),
            1,
        );
    });

    it('works with months (exact)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 2, 1])
                .diff(
                    DateTime.fromArray([2018, 1, 2]),
                    { timeUnit: 'months', relative: false },
                ),
            0,
        );
    });

    it('works with months and years', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 9])
                .diff(
                    DateTime.fromArray([2016, 6]),
                    { timeUnit: 'months' },
                ),
            27,
        );
    });

    it('works with week', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23])
                .diff(
                    DateTime.fromArray([2018, 6, 16]),
                    { timeUnit: 'week' },
                ),
            1,
        );
    });

    it('works with weeks', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23])
                .diff(
                    DateTime.fromArray([2018, 5, 15]),
                    { timeUnit: 'weeks' },
                ),
            5,
        );
    });

    it('works with weeks (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 5, 15])
                .diff(
                    DateTime.fromArray([2018, 6, 23]),
                    { timeUnit: 'weeks' },
                ),
            -5,
        );
    });

    it('works with weeks (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 8])
                .diff(
                    DateTime.fromArray([2018, 1, 1]),
                    { timeUnit: 'weeks' },
                ),
            1,
        );
    });

    it('works with weeks (exact)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 8])
                .diff(
                    DateTime.fromArray([2018, 1, 2]),
                    { timeUnit: 'weeks', relative: false },
                ),
            0,
        );
    });

    it('works with weeks and months', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 8, 23])
                .diff(
                    DateTime.fromArray([2018, 6, 15]),
                    { timeUnit: 'weeks' },
                ),
            10,
        );
    });

    it('works with day', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23])
                .diff(
                    DateTime.fromArray([2018, 6, 22]),
                    { timeUnit: 'day' },
                ),
            1,
        );
    });

    it('works with days', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23])
                .diff(
                    DateTime.fromArray([2018, 6, 15]),
                    { timeUnit: 'days' },
                ),
            8,
        );
    });

    it('works with days (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15])
                .diff(
                    DateTime.fromArray([2018, 6, 23]),
                    { timeUnit: 'days' },
                ),
            -8,
        );
    });

    it('works with days (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 2, 0])
                .diff(
                    DateTime.fromArray([2018, 1, 1, 1]),
                    { timeUnit: 'days' },
                ),
            1,
        );
    });

    it('works with days (exact)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 2, 0])
                .diff(
                    DateTime.fromArray([2018, 1, 1, 1]),
                    { timeUnit: 'days', relative: false },
                ),
            0,
        );
    });

    it('works with days and months', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 8, 23])
                .diff(
                    DateTime.fromArray([2018, 6, 15]),
                    { timeUnit: 'days' },
                ),
            69,
        );
    });

    it('works with hour', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 23])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 22]),
                    { timeUnit: 'hour' },
                ),
            1,
        );
    });

    it('works with hours', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 23])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12]),
                    { timeUnit: 'hours' },
                ),
            11,
        );
    });

    it('works with hours (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 23]),
                    { timeUnit: 'hours' },
                ),
            -11,
        );
    });

    it('works with hours (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 1, 0])
                .diff(
                    DateTime.fromArray([2018, 1, 1, 0, 1]),
                    { timeUnit: 'hours' },
                ),
            1,
        );
    });

    it('works with hours (exact)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 1, 0])
                .diff(
                    DateTime.fromArray([2018, 1, 1, 0, 1]),
                    { timeUnit: 'hours', relative: false },
                ),
            0,
        );
    });

    it('works with hours and days', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 18, 23])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12]),
                    { timeUnit: 'hours' },
                ),
            83,
        );
    });

    it('works with minute', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12, 29]),
                    { timeUnit: 'minute' },
                ),
            1,
        );
    });

    it('works with minutes', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12, 15]),
                    { timeUnit: 'minutes' },
                ),
            15,
        );
    });

    it('works with minutes (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 15])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12, 30]),
                    { timeUnit: 'minutes' },
                ),
            -15,
        );
    });

    it('works with minutes (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 0, 1, 0])
                .diff(
                    DateTime.fromArray([2018, 1, 1, 0, 0, 1]),
                    { timeUnit: 'minutes' },
                ),
            1,
        );
    });

    it('works with minutes (exact)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 0, 1, 0])
                .diff(
                    DateTime.fromArray([2018, 1, 1, 0, 0, 1]),
                    { timeUnit: 'minutes', relative: false },
                ),
            0,
        );
    });

    it('works with minutes and hours', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 16, 30])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12, 15]),
                    { timeUnit: 'minutes' },
                ),
            255,
        );
    });

    it('works with second', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 30])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 29]),
                    { timeUnit: 'second' },
                ),
            1,
        );
    });

    it('works with seconds', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 30])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    { timeUnit: 'seconds' },
                ),
            15,
        );
    });

    it('works with seconds (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 15])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 30]),
                    { timeUnit: 'seconds' },
                ),
            -15,
        );
    });

    it('works with seconds (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 0, 0, 1, 0])
                .diff(
                    DateTime.fromArray([2018, 1, 1, 0, 0, 0, 1]),
                    { timeUnit: 'seconds' },
                ),
            1,
        );
    });

    it('works with seconds (exact)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 0, 0, 1, 0])
                .diff(
                    DateTime.fromArray([2018, 1, 1, 0, 0, 0, 1]),
                    { timeUnit: 'seconds', relative: false },
                ),
            0,
        );
    });

    it('works with seconds and minutes', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 50, 30])
                .diff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    { timeUnit: 'seconds' },
                ),
            1215,
        );
    });
});
