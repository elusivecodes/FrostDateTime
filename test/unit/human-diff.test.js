import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Human Difference', function() {
    describe('#humanDiff', function() {
        it.each([
            ['returns the difference in human readable form (years)', [2018], [2016], 'in 2 years'],
            ['returns the difference in human readable form (months)', [2018, 1], [2018, 4], '3 months ago'],
            ['returns the difference in human readable form (weeks)', [2018, 1, 1], [2018, 1, 23], '3 weeks ago'],
            ['returns the difference in human readable form (days)', [2018, 1, 1], [2018, 1, 4], '3 days ago'],
            ['returns the difference in human readable form (hours)', [2018, 1, 1, 0], [2018, 1, 1, 11], '11 hours ago'],
            ['returns the difference in human readable form (minutes)', [2018, 1, 1, 0, 0], [2018, 1, 1, 0, 9], '9 minutes ago'],
            ['returns the difference in human readable form (seconds)', [2018, 1, 1, 0, 0, 15], [2018, 1, 1, 0, 0, 0], 'in 15 seconds'],
            ['returns the difference in human readable form (now)', [2018, 1, 1, 0, 0, 0], [2018, 1, 1, 0, 0, 0], 'now'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiff(other), expected);
        });
    });

    describe('#humanDiffInDays', function() {
        it.each([
            ['works with day', [2018, 6, 23], [2018, 6, 22], 'tomorrow'],
            ['works with days', [2018, 6, 23], [2018, 6, 15], 'in 8 days'],
            ['works with day (negative)', [2018, 6, 22], [2018, 6, 23], 'yesterday'],
            ['works with days (negative)', [2018, 6, 15], [2018, 6, 23], '8 days ago'],
            ['works with days (relative)', [2018, 6, 23, 0], [2018, 6, 15, 1], 'in 8 days'],
            ['works with days and months', [2018, 8, 23], [2018, 6, 15], 'in 69 days'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInDays(other), expected);
        });
    });

    describe('#humanDiffInHours', function() {
        it.each([
            ['works with hour', [2018, 6, 15, 23], [2018, 6, 15, 22], 'in 1 hour'],
            ['works with hours', [2018, 6, 15, 23], [2018, 6, 15, 12], 'in 11 hours'],
            ['works with hour (negative)', [2018, 6, 15, 22], [2018, 6, 15, 23], '1 hour ago'],
            ['works with hours (negative)', [2018, 6, 15, 12], [2018, 6, 15, 23], '11 hours ago'],
            ['works with hours (relative)', [2018, 6, 15, 23, 0], [2018, 6, 15, 12, 1], 'in 11 hours'],
            ['works with hours and days', [2018, 6, 18, 23], [2018, 6, 15, 12], 'in 83 hours'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInHours(other), expected);
        });
    });

    describe('#humanDiffInMinutes', function() {
        it.each([
            ['works with minute', [2018, 6, 15, 12, 30], [2018, 6, 15, 12, 29], 'in 1 minute'],
            ['works with minutes', [2018, 6, 15, 12, 30], [2018, 6, 15, 12, 15], 'in 15 minutes'],
            ['works with minute (negative)', [2018, 6, 15, 12, 29], [2018, 6, 15, 12, 30], '1 minute ago'],
            ['works with minutes (negative)', [2018, 6, 15, 12, 15], [2018, 6, 15, 12, 30], '15 minutes ago'],
            ['works with minutes (relative)', [2018, 6, 15, 12, 30, 1], [2018, 6, 15, 12, 15, 0], 'in 15 minutes'],
            ['works with minutes and hours', [2018, 6, 15, 16, 30], [2018, 6, 15, 12, 15], 'in 255 minutes'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInMinutes(other), expected);
        });
    });

    describe('#humanDiffInMonths', function() {
        it.each([
            ['works with month', [2018, 7], [2018, 6], 'next month'],
            ['works with months', [2018, 9], [2018, 6], 'in 3 months'],
            ['works with month (negative)', [2018, 6], [2018, 7], 'last month'],
            ['works with months (negative)', [2018, 6], [2018, 9], '3 months ago'],
            ['works with months (relative)', [2018, 9, 1], [2018, 6, 2], 'in 3 months'],
            ['works with months and years', [2018, 9], [2016, 6], 'in 27 months'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInMonths(other), expected);
        });
    });

    describe('#humanDiffInSeconds', function() {
        it.each([
            ['works with second', [2018, 6, 15, 12, 30, 30], [2018, 6, 15, 12, 30, 29], 'in 1 second'],
            ['works with seconds', [2018, 6, 15, 12, 30, 30], [2018, 6, 15, 12, 30, 15], 'in 15 seconds'],
            ['works with second (negative)', [2018, 6, 15, 12, 30, 29], [2018, 6, 15, 12, 30, 30], '1 second ago'],
            ['works with seconds (negative)', [2018, 6, 15, 12, 30, 15], [2018, 6, 15, 12, 30, 30], '15 seconds ago'],
            ['works with seconds (relative)', [2018, 6, 15, 12, 30, 30, 1], [2018, 6, 15, 12, 30, 15, 0], 'in 15 seconds'],
            ['works with seconds and minutes', [2018, 6, 15, 12, 50, 30], [2018, 6, 15, 12, 30, 15], 'in 1,215 seconds'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInSeconds(other), expected);
        });
    });

    describe('#humanDiffInWeeks', function() {
        it.each([
            ['works with week', [2018, 6, 23], [2018, 6, 16], 'next week'],
            ['works with weeks', [2018, 6, 23], [2018, 5, 15], 'in 5 weeks'],
            ['works with week (negative)', [2018, 6, 16], [2018, 6, 23], 'last week'],
            ['works with weeks (negative)', [2018, 5, 15], [2018, 6, 23], '5 weeks ago'],
            ['works with weeks (relative)', [2018, 1, 8], [2018, 1, 1], 'next week'],
            ['works with weeks and months', [2018, 8, 23], [2018, 6, 15], 'in 10 weeks'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInWeeks(other), expected);
        });
    });

    describe('#humanDiffInYears', function() {
        it.each([
            ['works with year', [2018], [2017], 'next year'],
            ['works with years', [2018], [2016], 'in 2 years'],
            ['works with year (negative)', [2017], [2018], 'last year'],
            ['works with years (negative)', [2016], [2018], '2 years ago'],
            ['works with years (relative)', [2018, 1], [2016, 2], 'in 2 years'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInYears(other), expected);
        });
    });
});
