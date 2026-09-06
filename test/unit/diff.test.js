import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Differences', function() {
    describe.each([
        ['spring DST', 'America/New_York', '2024-03-03T17:00:00Z', '2024-03-10T16:30:15.500Z', [0, 6, 167, 10050, 603015]],
        ['fall DST', 'America/New_York', '2024-11-02T05:30:00Z', '2024-11-10T06:30:00Z', [1, 8, 193, 11580, 694800]],
        ['a deleted date', 'Pacific/Apia', '2011-12-29T22:00:00Z', '2011-12-30T22:00:00Z', [0, 1, 24, 1440, 86400]],
        ['a fraction of a second', 'Australia/Brisbane', '2024-01-01T00:00:00Z', '2024-01-01T00:00:00.999Z', [0, 0, 0, 0, 0]],
    ])('complete elapsed units across %s', function(_, timeZone, before, after, expected) {
        it.each([
            ['diffInWeeks', expected[0]],
            ['diffInDays', expected[1]],
            ['diffInHours', expected[2]],
            ['diffInMinutes', expected[3]],
            ['diffInSeconds', expected[4]],
        ])('%s counts complete units in both directions', function(method, amount) {
            const start = new DateTime(before, { timeZone: 'UTC' });
            const end = new DateTime(after, { timeZone });

            assert.strictEqual(end[method](start, { relative: false }), amount, method);
            assert.strictEqual(start[method](end, { relative: false }), -amount, method);
            assert.strictEqual(end[method](end, { relative: false }), 0, method);
        });
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
        it.each([
            ['works with day', [2018, 6, 23], [2018, 6, 22], 1, []],
            ['works with days', [2018, 6, 23], [2018, 6, 15], 8, []],
            ['works with days (negative)', [2018, 6, 15], [2018, 6, 23], -8, []],
            ['works with days (relative)', [2018, 1, 2, 0], [2018, 1, 1, 1], 1, []],
            ['works with days (exact)', [2018, 1, 2, 0], [2018, 1, 1, 1], 0, [{ relative: false }]],
            ['works with days and months', [2018, 8, 23], [2018, 6, 15], 69, []],
        ])('%s', function(_, input, otherInput, expected, args) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.diffInDays(other, ...args), expected);
        });

        it.each([
            ['uses calendar days across DST transitions', [], 7],
            ['uses elapsed days across DST transitions when exact', [{ relative: false }], 6],
        ])('%s', function(_, args, expected) {
            const before = DateTime.fromArray([2024, 3, 3, 12], { timeZone: 'America/New_York' });
            const after = DateTime.fromArray([2024, 3, 10, 12], { timeZone: 'America/New_York' });

            assert.strictEqual(after.diffInDays(before, ...args), expected);
        });
    });

    describe('#diffInHours', function() {
        it.each([
            ['works with hour', [2018, 6, 15, 23], [2018, 6, 15, 22], 1, []],
            ['works with hours', [2018, 6, 15, 23], [2018, 6, 15, 12], 11, []],
            ['works with hours (negative)', [2018, 6, 15, 12], [2018, 6, 15, 23], -11, []],
            ['works with hours (relative)', [2018, 1, 1, 1, 0], [2018, 1, 1, 0, 1], 1, []],
            ['works with hours (exact)', [2018, 1, 1, 1, 0], [2018, 1, 1, 0, 1], 0, [{ relative: false }]],
            ['works with hours and days', [2018, 6, 18, 23], [2018, 6, 15, 12], 83, []],
        ])('%s', function(_, input, otherInput, expected, args) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.diffInHours(other, ...args), expected);
        });
    });

    describe('#diffInMinutes', function() {
        it.each([
            ['works with minute', [2018, 6, 15, 12, 30], [2018, 6, 15, 12, 29], 1, []],
            ['works with minutes', [2018, 6, 15, 12, 30], [2018, 6, 15, 12, 15], 15, []],
            ['works with minutes (negative)', [2018, 6, 15, 12, 15], [2018, 6, 15, 12, 30], -15, []],
            ['works with minutes (relative)', [2018, 1, 1, 0, 1, 0], [2018, 1, 1, 0, 0, 1], 1, []],
            ['works with minutes (exact)', [2018, 1, 1, 0, 1, 0], [2018, 1, 1, 0, 0, 1], 0, [{ relative: false }]],
            ['works with minutes and hours', [2018, 6, 15, 16, 30], [2018, 6, 15, 12, 15], 255, []],
        ])('%s', function(_, input, otherInput, expected, args) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.diffInMinutes(other, ...args), expected);
        });
    });

    describe('#diffInMonths', function() {
        it.each([
            ['works with month', [2018, 9], [2018, 8], 1, []],
            ['works with months', [2018, 9], [2018, 6], 3, []],
            ['works with months (negative)', [2018, 6], [2018, 9], -3, []],
            ['works with months (relative)', [2018, 2, 1], [2018, 1, 2], 1, []],
            ['works with months (exact)', [2018, 2, 1], [2018, 1, 2], 0, [{ relative: false }]],
            ['works with months and years', [2018, 9], [2016, 6], 27, []],
        ])('%s', function(_, input, otherInput, expected, args) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.diffInMonths(other, ...args), expected);
        });
    });

    describe('#diffInSeconds', function() {
        it.each([
            ['works with second', [2018, 6, 15, 12, 30, 30], [2018, 6, 15, 12, 30, 29], 1, []],
            ['works with seconds', [2018, 6, 15, 12, 30, 30], [2018, 6, 15, 12, 30, 15], 15, []],
            ['works with seconds (negative)', [2018, 6, 15, 12, 30, 15], [2018, 6, 15, 12, 30, 30], -15, []],
            ['works with seconds (relative)', [2018, 1, 1, 0, 0, 1, 0], [2018, 1, 1, 0, 0, 0, 1], 1, []],
            ['works with seconds (exact)', [2018, 1, 1, 0, 0, 1, 0], [2018, 1, 1, 0, 0, 0, 1], 0, [{ relative: false }]],
            ['works with seconds and minutes', [2018, 6, 15, 12, 50, 30], [2018, 6, 15, 12, 30, 15], 1215, []],
        ])('%s', function(_, input, otherInput, expected, args) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.diffInSeconds(other, ...args), expected);
        });
    });

    describe('#diffInWeeks', function() {
        it.each([
            ['works with week', {
                input: [2018, 6, 23],
                otherInput: [2018, 6, 16],
                expected: 1,
                args: [],
            }],
            ['works with weeks', {
                input: [2018, 6, 23],
                otherInput: [2018, 5, 15],
                expected: 5,
                args: [],
            }],
            ['works with weeks (negative)', {
                input: [2018, 5, 15],
                otherInput: [2018, 6, 23],
                expected: -5,
                args: [],
            }],
            ['works with weeks (relative)', {
                input: [2018, 1, 8],
                otherInput: [2018, 1, 1],
                expected: 1,
                args: [],
            }],
            ['works with weeks (exact)', {
                input: [2018, 1, 8],
                otherInput: [2018, 1, 2],
                expected: 0,
                args: [{ relative: false }],
            }],
            ['works with weeks and months', {
                input: [2018, 8, 23],
                otherInput: [2018, 6, 15],
                expected: 10,
                args: [],
            }],
            ['uses calendar weeks across DST transitions', {
                input: [2024, 3, 10, 12],
                otherInput: [2024, 3, 3, 12],
                expected: 1,
                args: [],
                options: { timeZone: 'America/New_York' },
                otherOptions: { timeZone: 'America/New_York' },
            }],
            ['uses elapsed weeks across DST transitions when exact', {
                input: [2024, 3, 10, 12],
                otherInput: [2024, 3, 3, 12],
                expected: 0,
                args: [{ relative: false }],
                options: { timeZone: 'America/New_York' },
                otherOptions: { timeZone: 'America/New_York' },
            }],
        ])('%s', function(_, { input, otherInput, expected, args, options = {}, otherOptions = {} }) {
            const date = DateTime.fromArray(input, options);
            const other = DateTime.fromArray(otherInput, otherOptions);

            assert.strictEqual(date.diffInWeeks(other, ...args), expected);
        });
    });

    describe('#diffInYears', function() {
        it.each([
            ['works with year', [2018], [2017], 1, []],
            ['works with years', [2018], [2016], 2, []],
            ['works with years (negative)', [2016], [2018], -2, []],
            ['works with years (relative)', [2018, 1], [2017, 2], 1, []],
            ['works with years (exact)', [2018, 1], [2017, 2], 0, [{ relative: false }]],
        ])('%s', function(_, input, otherInput, expected, args) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.diffInYears(other, ...args), expected);
        });
    });
});
