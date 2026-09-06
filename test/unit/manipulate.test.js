import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Manipulation', function() {
    describe('Addition', function() {
        it.each([
            ['addDay: works with day', 'addDay', [], '2018-01-02T00:00:00.000+00:00'],
            ['addDays: works with days', 'addDays', [2], '2018-01-03T00:00:00.000+00:00'],
            ['addHour: works with hour', 'addHour', [], '2018-01-01T01:00:00.000+00:00'],
            ['addHours: works with hours', 'addHours', [2], '2018-01-01T02:00:00.000+00:00'],
            ['addMinute: works with minute', 'addMinute', [], '2018-01-01T00:01:00.000+00:00'],
            ['addMinutes: works with minutes', 'addMinutes', [2], '2018-01-01T00:02:00.000+00:00'],
            ['addMonth: works with month', 'addMonth', [], '2018-02-01T00:00:00.000+00:00'],
            ['addMonths: works with months', 'addMonths', [2], '2018-03-01T00:00:00.000+00:00'],
            ['addSecond: works with second', 'addSecond', [], '2018-01-01T00:00:01.000+00:00'],
            ['addSeconds: works with seconds', 'addSeconds', [2], '2018-01-01T00:00:02.000+00:00'],
            ['addWeek: works with week', 'addWeek', [], '2018-01-08T00:00:00.000+00:00'],
            ['addWeeks: works with weeks', 'addWeeks', [2], '2018-01-15T00:00:00.000+00:00'],
            ['addYear: works with year', 'addYear', [], '2019-01-01T00:00:00.000+00:00'],
            ['addYears: works with years', 'addYears', [2], '2020-01-01T00:00:00.000+00:00'],
        ])('%s', function(_, method, args, expected) {
            const date = DateTime.fromArray([2018]);
            const copy = date[method](...args);

            assert.strictEqual(date.toIsoString(), '2018-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });

        it('addYear: clamps leap day in non-leap years', function() {
            const date = DateTime.fromArray([2020, 2, 29]);
            const copy = date.addYear();

            assert.strictEqual(date.toIsoString(), '2020-02-29T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), '2021-02-28T00:00:00.000+00:00');
        });
    });

    describe('Subtraction', function() {
        it.each([
            ['subDay: works with day', 'subDay', [], '2017-12-31T00:00:00.000+00:00'],
            ['subDays: works with days', 'subDays', [2], '2017-12-30T00:00:00.000+00:00'],
            ['subHour: works with hour', 'subHour', [], '2017-12-31T23:00:00.000+00:00'],
            ['subHours: works with hours', 'subHours', [2], '2017-12-31T22:00:00.000+00:00'],
            ['subMinute: works with minute', 'subMinute', [], '2017-12-31T23:59:00.000+00:00'],
            ['subMinutes: works with minute', 'subMinutes', [2], '2017-12-31T23:58:00.000+00:00'],
            ['subMonth: works with month', 'subMonth', [], '2017-12-01T00:00:00.000+00:00'],
            ['subMonths: works with months', 'subMonths', [2], '2017-11-01T00:00:00.000+00:00'],
            ['subSecond: works with second', 'subSecond', [], '2017-12-31T23:59:59.000+00:00'],
            ['subSeconds: works with seconds', 'subSeconds', [2], '2017-12-31T23:59:58.000+00:00'],
            ['subWeek: works with week', 'subWeek', [], '2017-12-25T00:00:00.000+00:00'],
            ['subWeeks: works with weeks', 'subWeeks', [2], '2017-12-18T00:00:00.000+00:00'],
            ['subYear: works with year', 'subYear', [], '2017-01-01T00:00:00.000+00:00'],
            ['subYears: works with years', 'subYears', [2], '2016-01-01T00:00:00.000+00:00'],
        ])('%s', function(_, method, args, expected) {
            const date = DateTime.fromArray([2018]);
            const copy = date[method](...args);

            assert.strictEqual(date.toIsoString(), '2018-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('Start boundaries', function() {
        it.each([
            ['startOfDay: works with day', [2018, 6, 15, 11, 30, 30, 500], 'startOfDay', '2018-06-15T00:00:00.000+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['startOfHour: works with hour', [2018, 6, 15, 11, 30, 30, 500], 'startOfHour', '2018-06-15T11:00:00.000+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['startOfMinute: works with minute', [2018, 6, 15, 11, 30, 30, 500], 'startOfMinute', '2018-06-15T11:30:00.000+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['startOfMonth: works with month', [2018, 6, 15, 11, 30, 30, 500], 'startOfMonth', '2018-06-01T00:00:00.000+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['startOfQuarter: works with quarter', [2018, 8, 15, 11, 30, 30, 500], 'startOfQuarter', '2018-07-01T00:00:00.000+00:00', '2018-08-15T11:30:30.500+00:00'],
            ['startOfSecond: works with second', [2018, 6, 15, 11, 30, 30, 500], 'startOfSecond', '2018-06-15T11:30:30.000+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['startOfWeek: works with week', [2018, 6, 15, 11, 30, 30, 500], 'startOfWeek', '2018-06-10T00:00:00.000+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['startOfYear: works with year', [2018, 6, 15, 11, 30, 30, 500], 'startOfYear', '2018-01-01T00:00:00.000+00:00', '2018-06-15T11:30:30.500+00:00'],
        ])('%s', function(_, input, method, expected, original) {
            const date = DateTime.fromArray(input);
            const copy = date[method]();

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('End boundaries', function() {
        it.each([
            ['endOfDay: works with day', [2018, 6, 15, 11, 30, 30, 500], 'endOfDay', '2018-06-15T23:59:59.999+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['endOfHour: works with hour', [2018, 6, 15, 11, 30, 30, 500], 'endOfHour', '2018-06-15T11:59:59.999+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['endOfMinute: works with minute', [2018, 6, 15, 11, 30, 30, 500], 'endOfMinute', '2018-06-15T11:30:59.999+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['endOfMonth: works with month', [2018, 6, 15, 11, 30, 30, 500], 'endOfMonth', '2018-06-30T23:59:59.999+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['endOfQuarter: works with quarter', [2018, 8, 15, 11, 30, 30, 500], 'endOfQuarter', '2018-09-30T23:59:59.999+00:00', '2018-08-15T11:30:30.500+00:00'],
            ['endOfSecond: works with second', [2018, 6, 15, 11, 30, 30, 500], 'endOfSecond', '2018-06-15T11:30:30.999+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['endOfWeek: works with week', [2018, 6, 15, 11, 30, 30, 500], 'endOfWeek', '2018-06-16T23:59:59.999+00:00', '2018-06-15T11:30:30.500+00:00'],
            ['endOfYear: works with year', [2018, 6, 15, 11, 30, 30, 500], 'endOfYear', '2018-12-31T23:59:59.999+00:00', '2018-06-15T11:30:30.500+00:00'],
        ])('%s', function(_, input, method, expected, original) {
            const date = DateTime.fromArray(input);
            const copy = date[method]();

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });
});
