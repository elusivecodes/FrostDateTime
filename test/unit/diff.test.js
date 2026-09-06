import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Differences', function() {
    it.each([
        ['spring DST', 'America/New_York', '2024-03-03T17:00:00Z', '2024-03-10T16:30:15.500Z', [0, 6, 167, 10050, 603015]],
        ['fall DST', 'America/New_York', '2024-11-02T05:30:00Z', '2024-11-10T06:30:00Z', [1, 8, 193, 11580, 694800]],
        ['a deleted date', 'Pacific/Apia', '2011-12-29T22:00:00Z', '2011-12-30T22:00:00Z', [0, 1, 24, 1440, 86400]],
        ['a fraction of a second', 'Australia/Brisbane', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00.999Z', [0, 0, 0, 0, 0]],
    ])('counts complete elapsed units across %s in both directions', function(_, timeZone, before, after, expected) {
        const start = new DateTime(before, { timeZone: 'UTC' });
        const end = new DateTime(after, { timeZone });
        const methods = ['diffInWeeks', 'diffInDays', 'diffInHours', 'diffInMinutes', 'diffInSeconds'];

        for (const [index, method] of methods.entries()) {
            assert.strictEqual(end[method](start, { relative: false }), expected[index], method);
            assert.strictEqual(start[method](end, { relative: false }), -expected[index], method);
            assert.strictEqual(end[method](end, { relative: false }), 0, method);
        }
    });

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

        it('uses calendar days across DST transitions', function() {
            const before = DateTime.fromArray([2024, 3, 3, 12], { timeZone: 'America/New_York' });
            const after = DateTime.fromArray([2024, 3, 10, 12], { timeZone: 'America/New_York' });

            assert.strictEqual(
                after.diffInDays(before),
                7,
            );
        });

        it('uses elapsed days across DST transitions when exact', function() {
            const before = DateTime.fromArray([2024, 3, 3, 12], { timeZone: 'America/New_York' });
            const after = DateTime.fromArray([2024, 3, 10, 12], { timeZone: 'America/New_York' });

            assert.strictEqual(
                after.diffInDays(before, { relative: false }),
                6,
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

        it('uses calendar weeks across DST transitions', function() {
            const before = DateTime.fromArray([2024, 3, 3, 12], { timeZone: 'America/New_York' });
            const after = DateTime.fromArray([2024, 3, 10, 12], { timeZone: 'America/New_York' });

            assert.strictEqual(
                after.diffInWeeks(before),
                1,
            );
        });

        it('uses elapsed weeks across DST transitions when exact', function() {
            const before = DateTime.fromArray([2024, 3, 3, 12], { timeZone: 'America/New_York' });
            const after = DateTime.fromArray([2024, 3, 10, 12], { timeZone: 'America/New_York' });

            assert.strictEqual(
                after.diffInWeeks(before, { relative: false }),
                0,
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
