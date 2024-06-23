import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime Human Difference', function() {
    describe('#humanDiff', function() {
        it('returns the difference in human readable form (years)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .humanDiff(
                        DateTime.fromArray([2016]),
                    ),
                'in 2 years',
            );
        });

        it('returns the difference in human readable form (months)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .humanDiff(
                        DateTime.fromArray([2018, 4]),
                    ),
                '3 months ago',
            );
        });

        it('returns the difference in human readable form (weeks)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1])
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 23]),
                    ),
                '3 weeks ago',
            );
        });

        it('returns the difference in human readable form (days)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1])
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 4]),
                    ),
                '3 days ago',
            );
        });

        it('returns the difference in human readable form (hours)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0])
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 1, 11]),
                    ),
                '11 hours ago',
            );
        });

        it('returns the difference in human readable form (minutes)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 0])
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 1, 0, 9]),
                    ),
                '9 minutes ago',
            );
        });

        it('returns the difference in human readable form (seconds)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 0, 15])
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 1, 0, 0, 0]),
                    ),
                'in 15 seconds',
            );
        });

        it('returns the difference in human readable form (now)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 0, 0])
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 1, 0, 0, 0]),
                    ),
                'now',
            );
        });
    });

    describe('#humanDiffInDays', function() {
        it('works with day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23])
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 22]),
                    ),
                'tomorrow',
            );
        });

        it('works with days', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23])
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                'in 8 days',
            );
        });

        it('works with day (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 22])
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                'yesterday',
            );
        });

        it('works with days (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15])
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                '8 days ago',
            );
        });

        it('works with days (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23, 0])
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 15, 1]),
                    ),
                'in 8 days',
            );
        });

        it('works with days and months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8, 23])
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                'in 69 days',
            );
        });
    });

    describe('#humanDiffInHours', function() {
        it('works with hour', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 23])
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 22]),
                    ),
                'in 1 hour',
            );
        });

        it('works with hours', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 23])
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 12]),
                    ),
                'in 11 hours',
            );
        });

        it('works with hour (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 22])
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 23]),
                    ),
                '1 hour ago',
            );
        });

        it('works with hours (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12])
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 23]),
                    ),
                '11 hours ago',
            );
        });

        it('works with hours (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 23, 0])
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 12, 1]),
                    ),
                'in 11 hours',
            );
        });

        it('works with hours and days', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 18, 23])
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 12]),
                    ),
                'in 83 hours',
            );
        });
    });

    describe('#humanDiffInMinutes', function() {
        it('works with minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30])
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 29]),
                    ),
                'in 1 minute',
            );
        });

        it('works with minutes', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30])
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 15]),
                    ),
                'in 15 minutes',
            );
        });

        it('works with minute (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 29])
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 30]),
                    ),
                '1 minute ago',
            );
        });

        it('works with minutes (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 15])
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 30]),
                    ),
                '15 minutes ago',
            );
        });

        it('works with minutes (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 1])
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 15, 0]),
                    ),
                'in 15 minutes',
            );
        });

        it('works with minutes and hours', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 16, 30])
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 15]),
                    ),
                'in 255 minutes',
            );
        });
    });

    describe('#humanDiffInMonths', function() {
        it('works with month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 7])
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 6]),
                    ),
                'next month',
            );
        });

        it('works with months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9])
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 6]),
                    ),
                'in 3 months',
            );
        });

        it('works with month (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6])
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 7]),
                    ),
                'last month',
            );
        });

        it('works with months (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6])
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 9]),
                    ),
                '3 months ago',
            );
        });

        it('works with months (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9, 1])
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 6, 2]),
                    ),
                'in 3 months',
            );
        });

        it('works with months and years', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9])
                    .humanDiffInMonths(
                        DateTime.fromArray([2016, 6]),
                    ),
                'in 27 months',
            );
        });
    });

    describe('#humanDiffInSeconds', function() {
        it('works with second', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30])
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 29]),
                    ),
                'in 1 second',
            );
        });

        it('works with seconds', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30])
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    ),
                'in 15 seconds',
            );
        });

        it('works with second (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 29])
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 30]),
                    ),
                '1 second ago',
            );
        });

        it('works with seconds (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 15])
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 30]),
                    ),
                '15 seconds ago',
            );
        });

        it('works with seconds (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30, 1])
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 15, 0]),
                    ),
                'in 15 seconds',
            );
        });

        it('works with seconds and minutes', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 50, 30])
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    ),
                'in 1,215 seconds',
            );
        });
    });

    describe('#humanDiffInWeeks', function() {
        it('works with week', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23])
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 6, 16]),
                    ),
                'next week',
            );
        });

        it('works with weeks', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23])
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 5, 15]),
                    ),
                'in 5 weeks',
            );
        });

        it('works with week (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 16])
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                'last week',
            );
        });

        it('works with weeks (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 5, 15])
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                '5 weeks ago',
            );
        });

        it('works with weeks (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 8])
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 1, 1]),
                    ),
                'next week',
            );
        });

        it('works with weeks and months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8, 23])
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                'in 10 weeks',
            );
        });
    });

    describe('#humanDiffInYears', function() {
        it('works with year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .humanDiffInYears(
                        DateTime.fromArray([2017]),
                    ),
                'next year',
            );
        });

        it('works with years', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .humanDiffInYears(
                        DateTime.fromArray([2016]),
                    ),
                'in 2 years',
            );
        });

        it('works with year (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2017])
                    .humanDiffInYears(
                        DateTime.fromArray([2018]),
                    ),
                'last year',
            );
        });

        it('works with years (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2016])
                    .humanDiffInYears(
                        DateTime.fromArray([2018]),
                    ),
                '2 years ago',
            );
        });

        it('works with years (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .humanDiffInYears(
                        DateTime.fromArray([2016, 2]),
                    ),
                'in 2 years',
            );
        });
    });
});
