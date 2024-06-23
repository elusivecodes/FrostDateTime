import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime Differences', function() {
    describe('#diff', function() {
        it('returns the difference in milliseconds', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30, 500])
                    .diff(
                        DateTime.fromArray([2016, 9, 23, 23, 40, 15, 350]),
                    ),
                54391815150,
            );
        });
    });

    describe('#diffInDays', function() {
        it('works with day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23])
                    .diffInDays(
                        DateTime.fromArray([2018, 6, 22]),
                    ),
                1,
            );
        });

        it('works with days', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23])
                    .diffInDays(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                8,
            );
        });

        it('works with days (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15])
                    .diffInDays(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                -8,
            );
        });

        it('works with days (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 2, 0])
                    .diffInDays(
                        DateTime.fromArray([2018, 1, 1, 1]),
                    ),
                1,
            );
        });

        it('works with days (exact)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 2, 0])
                    .diffInDays(
                        DateTime.fromArray([2018, 1, 1, 1]),
                        { relative: false },
                    ),
                0,
            );
        });

        it('works with days and months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8, 23])
                    .diffInDays(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                69,
            );
        });
    });

    describe('#diffInHours', function() {
        it('works with hour', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 23])
                    .diffInHours(
                        DateTime.fromArray([2018, 6, 15, 22]),
                    ),
                1,
            );
        });

        it('works with hours', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 23])
                    .diffInHours(
                        DateTime.fromArray([2018, 6, 15, 12]),
                    ),
                11,
            );
        });

        it('works with hours (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12])
                    .diffInHours(
                        DateTime.fromArray([2018, 6, 15, 23]),
                    ),
                -11,
            );
        });

        it('works with hours (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 1, 0])
                    .diffInHours(
                        DateTime.fromArray([2018, 1, 1, 0, 1]),
                    ),
                1,
            );
        });

        it('works with hours (exact)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 1, 0])
                    .diffInHours(
                        DateTime.fromArray([2018, 1, 1, 0, 1]),
                        { relative: false },
                    ),
                0,
            );
        });

        it('works with hours and days', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 18, 23])
                    .diffInHours(
                        DateTime.fromArray([2018, 6, 15, 12]),
                    ),
                83,
            );
        });
    });


    describe('#diffInMinutes', function() {
        it('works with minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30])
                    .diffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 29]),
                    ),
                1,
            );
        });

        it('works with minutes', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30])
                    .diffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 15]),
                    ),
                15,
            );
        });

        it('works with minutes (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 15])
                    .diffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 30]),
                    ),
                -15,
            );
        });

        it('works with minutes (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 1, 0])
                    .diffInMinutes(
                        DateTime.fromArray([2018, 1, 1, 0, 0, 1]),
                    ),
                1,
            );
        });

        it('works with minutes (exact)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 1, 0])
                    .diffInMinutes(
                        DateTime.fromArray([2018, 1, 1, 0, 0, 1]),
                        { relative: false },
                    ),
                0,
            );
        });

        it('works with minutes and hours', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 16, 30])
                    .diffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 15]),
                    ),
                255,
            );
        });
    });

    describe('#diffInMonths', function() {
        it('works with month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9])
                    .diffInMonths(
                        DateTime.fromArray([2018, 8]),
                    ),
                1,
            );
        });

        it('works with months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9])
                    .diffInMonths(
                        DateTime.fromArray([2018, 6]),
                    ),
                3,
            );
        });

        it('works with months (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6])
                    .diffInMonths(
                        DateTime.fromArray([2018, 9]),
                    ),
                -3,
            );
        });

        it('works with months (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 2, 1])
                    .diffInMonths(
                        DateTime.fromArray([2018, 1, 2]),
                    ),
                1,
            );
        });

        it('works with months (exact)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 2, 1])
                    .diffInMonths(
                        DateTime.fromArray([2018, 1, 2]),
                        { relative: false },
                    ),
                0,
            );
        });

        it('works with months and years', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9])
                    .diffInMonths(
                        DateTime.fromArray([2016, 6]),
                    ),
                27,
            );
        });
    });

    describe('#diffInSeconds', function() {
        it('works with second', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30])
                    .diffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 29]),
                    ),
                1,
            );
        });

        it('works with seconds', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30])
                    .diffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    ),
                15,
            );
        });

        it('works with seconds (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 15])
                    .diffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 30]),
                    ),
                -15,
            );
        });

        it('works with seconds (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 0, 1, 0])
                    .diffInSeconds(
                        DateTime.fromArray([2018, 1, 1, 0, 0, 0, 1]),
                    ),
                1,
            );
        });

        it('works with seconds (exact)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 0, 1, 0])
                    .diffInSeconds(
                        DateTime.fromArray([2018, 1, 1, 0, 0, 0, 1]),
                        { relative: false },
                    ),
                0,
            );
        });

        it('works with seconds and minutes', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 50, 30])
                    .diffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    ),
                1215,
            );
        });
    });

    describe('#diffInWeeks', function() {
        it('works with week', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23])
                    .diffInWeeks(
                        DateTime.fromArray([2018, 6, 16]),
                    ),
                1,
            );
        });

        it('works with weeks', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23])
                    .diffInWeeks(
                        DateTime.fromArray([2018, 5, 15]),
                    ),
                5,
            );
        });

        it('works with weeks (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 5, 15])
                    .diffInWeeks(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                -5,
            );
        });

        it('works with weeks (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 8])
                    .diffInWeeks(
                        DateTime.fromArray([2018, 1, 1]),
                    ),
                1,
            );
        });

        it('works with weeks (exact)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 8])
                    .diffInWeeks(
                        DateTime.fromArray([2018, 1, 2]),
                        { relative: false },
                    ),
                0,
            );
        });

        it('works with weeks and months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8, 23])
                    .diffInWeeks(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                10,
            );
        });
    });

    describe('#diffInYears', function() {
        it('works with year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .diffInYears(
                        DateTime.fromArray([2017]),
                    ),
                1,
            );
        });

        it('works with years', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .diffInYears(
                        DateTime.fromArray([2016]),
                    ),
                2,
            );
        });

        it('works with years (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2016])
                    .diffInYears(
                        DateTime.fromArray([2018]),
                    ),
                -2,
            );
        });

        it('works with years (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .diffInYears(
                        DateTime.fromArray([2017, 2]),
                    ),
                1,
            );
        });

        it('works with years (exact)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .diffInYears(
                        DateTime.fromArray([2017, 2]),
                        { relative: false },
                    ),
                0,
            );
        });
    });
});
