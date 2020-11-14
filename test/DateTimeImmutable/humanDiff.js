const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable #humanDiff', function() {

    it('returns the difference in human readable form (years)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2016, 9, 23, 23, 40, 15])
                ),
            'in 2 years'
        )
    });

    it('returns the difference in human readable form (months)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 9, 23, 23, 40, 15])
                ),
            '3 months ago'
        )
    });

    it('returns the difference in human readable form (days)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 23, 23, 40, 15])
                ),
            '8 days ago'
        )
    });

    it('returns the difference in human readable form (hours)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 23, 40, 15])
                ),
            '11 hours ago'
        )
    });

    it('returns the difference in human readable form (minutes)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 40, 15])
                ),
            '9 minutes ago'
        )
    });

    it('returns the difference in human readable form (seconds)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 15])
                ),
            'in 15 seconds'
        )
    });

    it('returns the difference in human readable form (now)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                ),
            'now'
        )
    });

    it('works with year', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018])
                .humanDiff(
                    DateTimeImmutable.fromArray([2017]),
                    'year'
                ),
            'next year'
        )
    });

    it('works with years', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018])
                .humanDiff(
                    DateTimeImmutable.fromArray([2016]),
                    'years'
                ),
            'in 2 years'
        )
    });

    it('works with year (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2017])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018]),
                    'year'
                ),
            'last year'
        )
    });

    it('works with years (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2016])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018]),
                    'years'
                ),
            '2 years ago'
        )
    });

    it('works with month', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 7])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6]),
                    'month'
                ),
            'next month'
        )
    });

    it('works with months', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 9])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6]),
                    'months'
                ),
            'in 3 months'
        )
    });

    it('works with month (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 7]),
                    'month'
                ),
            'last month'
        )
    });

    it('works with months (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 9]),
                    'months'
                ),
            '3 months ago'
        )
    });

    it('works with months and years', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 9])
                .humanDiff(
                    DateTimeImmutable.fromArray([2016, 6]),
                    'months'
                ),
            'in 27 months'
        )
    });

    it('works with day', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 23])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 22]),
                    'day'
                ),
            'tomorrow'
        )
    });

    it('works with days', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 23])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15]),
                    'days'
                ),
            'in 8 days'
        )
    });

    it('works with day (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 22])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 23]),
                    'day'
                ),
            'yesterday'
        )
    });

    it('works with days (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 23]),
                    'days'
                ),
            '8 days ago'
        )
    });

    it('works with days and months', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 8, 23])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15]),
                    'days'
                ),
            'in 69 days'
        )
    });

    it('works with hour', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 23])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 22]),
                    'hour'
                ),
            'in 1 hour'
        )
    });

    it('works with hours', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 23])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12]),
                    'hours'
                ),
            'in 11 hours'
        )
    });

    it('works with hour (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 22])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 23]),
                    'hour'
                ),
            '1 hour ago'
        )
    });

    it('works with hours (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 23]),
                    'hours'
                ),
            '11 hours ago'
        )
    });

    it('works with hours and days', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 18, 23])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12]),
                    'hours'
                ),
            'in 83 hours'
        )
    });

    it('works with minute', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 29]),
                    'minute'
                ),
            'in 1 minute'
        )
    });

    it('works with minutes', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 15]),
                    'minutes'
                ),
            'in 15 minutes'
        )
    });

    it('works with minute (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 29])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30]),
                    'minute'
                ),
            '1 minute ago'
        )
    });

    it('works with minutes (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 15])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30]),
                    'minutes'
                ),
            '15 minutes ago'
        )
    });

    it('works with minutes and hours', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 16, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 15]),
                    'minutes'
                ),
            'in 255 minutes'
        )
    });

    it('works with second', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 29]),
                    'second'
                ),
            'in 1 second'
        )
    });

    it('works with seconds', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 15]),
                    'seconds'
                ),
            'in 15 seconds'
        )
    });

    it('works with second (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 29])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30]),
                    'second'
                ),
            '1 second ago'
        )
    });

    it('works with seconds (negative)', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 15])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30]),
                    'seconds'
                ),
            '15 seconds ago'
        )
    });

    it('works with seconds and minutes', function() {
        assert.strictEqual(
            DateTimeImmutable.fromArray([2018, 6, 15, 12, 50, 30])
                .humanDiff(
                    DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 15]),
                    'seconds'
                ),
            'in 1,215 seconds'
        )
    });

});