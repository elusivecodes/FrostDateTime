const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable #diff', function() {

    it('returns the difference in milliseconds', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30, 500])
                .diff(
                    DateTimeImmutable.fromArray([2016, 9, 23, 23, 40, 15, 350])
                ),
            54391815150
        )
    });

    it('works with year', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018])
                .diff(
                    DateTimeImmutable.fromArray([2017]),
                    'year'
                ),
            1
        )
    });

    it('works with years', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018])
                .diff(
                    DateTimeImmutable.fromArray([2016]),
                    'years'
                ),
            2
        )
    });

    it('works with years (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2016])
                .diff(
                    DateTimeImmutable.fromArray([2018]),
                    'years'
                ),
            -2
        )
    });

    it('works with years (relative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1])
                .diff(
                    DateTimeImmutable.fromArray([2017, 2]),
                    'years'
                ),
            1
        )
    });

    it('works with years (exact)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1])
                .diff(
                    DateTimeImmutable.fromArray([2017, 2]),
                    'years',
                    false
                ),
            0
        )
    });

    it('works with month', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 9])
                .diff(
                    DateTimeImmutable.fromArray([2018, 8]),
                    'month'
                ),
            1
        )
    });

    it('works with months', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 9])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6]),
                    'months'
                ),
            3
        )
    });

    it('works with months (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6])
                .diff(
                    DateTimeImmutable.fromArray([2018, 9]),
                    'months'
                ),
            -3
        )
    });

    it('works with months (relative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 2, 1])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 2]),
                    'months'
                ),
            1
        )
    });

    it('works with months (exact)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 2, 1])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 2]),
                    'months',
                    false
                ),
            0
        )
    });

    it('works with months and years', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 9])
                .diff(
                    DateTimeImmutable.fromArray([2016, 6]),
                    'months'
                ),
            27
        )
    });

    it('works with week', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 16]),
                    'week'
                ),
            1
        )
    });

    it('works with weeks', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 5, 15]),
                    'weeks'
                ),
            5
        )
    });

    it('works with weeks (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 5, 15])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 23]),
                    'weeks'
                ),
            -5
        )
    });

    it('works with weeks (relative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 8])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1]),
                    'weeks'
                ),
            1
        )
    });

    it('works with weeks (exact)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 8])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 2]),
                    'weeks',
                    false
                ),
            0
        )
    });

    it('works with weeks and months', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 8, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15]),
                    'weeks'
                ),
            10
        )
    });

    it('works with day', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 22]),
                    'day'
                ),
            1
        )
    });

    it('works with days', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15]),
                    'days'
                ),
            8
        )
    });

    it('works with days (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 23]),
                    'days'
                ),
            -8
        )
    });

    it('works with days (relative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 2, 0])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1, 1]),
                    'days'
                ),
            1
        )
    });

    it('works with days (exact)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 2, 0])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1, 1]),
                    'days',
                    false
                ),
            0
        )
    });

    it('works with days and months', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 8, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15]),
                    'days'
                ),
            69
        )
    });

    it('works with hour', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 22]),
                    'hour'
                ),
            1
        )
    });

    it('works with hours', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12]),
                    'hours'
                ),
            11
        )
    });

    it('works with hours (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 23]),
                    'hours'
                ),
            -11
        )
    });

    it('works with hours (relative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 1, 1, 0])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1, 0, 1]),
                    'hours'
                ),
            1
        )
    });

    it('works with hours (exact)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 1, 1, 0])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1, 0, 1]),
                    'hours',
                    false
                ),
            0
        )
    });

    it('works with hours and days', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 18, 23])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12]),
                    'hours'
                ),
            83
        )
    });

    it('works with minute', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 29]),
                    'minute'
                ),
            1
        )
    });

    it('works with minutes', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 15]),
                    'minutes'
                ),
            15
        )
    });

    it('works with minutes (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 15])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30]),
                    'minutes'
                ),
            -15
        )
    });

    it('works with minutes (relative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 1, 0, 1, 0])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 1]),
                    'minutes'
                ),
            1
        )
    });

    it('works with minutes (exact)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 1, 0, 1, 0])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 1]),
                    'minutes',
                    false
                ),
            0
        )
    });

    it('works with minutes and hours', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 16, 30])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 15]),
                    'minutes'
                ),
            255
        )
    });

    it('works with second', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 29]),
                    'second'
                ),
            1
        )
    });

    it('works with seconds', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 15]),
                    'seconds'
                ),
            15
        )
    });

    it('works with seconds (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 15])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30]),
                    'seconds'
                ),
            -15
        )
    });

    it('works with seconds (relative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 1, 0])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 0, 1]),
                    'seconds'
                ),
            1
        )
    });

    it('works with seconds (exact)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 1, 0])
                .diff(
                    DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 0, 1]),
                    'seconds',
                    false
                ),
            0
        )
    });

    it('works with seconds and minutes', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 50, 30])
                .diff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 15]),
                    'seconds'
                ),
            1215
        )
    });

});