import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { getData } from '../../src/factory.js';
import DateTime from '../../src/index.js';

describe('DateTime Static', function() {
    describe('#clearDataCache', function() {
        it('clears cached factory values', function() {
            let calls = 0;

            DateTime.clearDataCache();

            const first = getData('test.clearDataCache', () => ({ value: ++calls }));
            const second = getData('test.clearDataCache', () => ({ value: ++calls }));

            DateTime.clearDataCache();

            const third = getData('test.clearDataCache', () => ({ value: ++calls }));

            assert.strictEqual(first, second);
            assert.notStrictEqual(first, third);
            assert.strictEqual(calls, 2);
        });
    });

    describe('#dayOfYear', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.dayOfYear(2019, 6, 1),
                152,
            );
        });
    });

    describe('#daysInMonth', function() {
        it.each([
            [1, 31],
            [2, 28],
            [3, 31],
            [4, 30],
            [5, 31],
            [6, 30],
            [7, 31],
            [8, 31],
            [9, 30],
            [10, 31],
            [11, 30],
            [12, 31],
        ])('returns the length of month %i as %i', function(month, expected) {
            assert.strictEqual(DateTime.daysInMonth(2018, month), expected);
        });

        it.each([
            ['works with leap years', [2020, 2]],
            ['matches php for year zero', [0, 2]],
        ])('%s', function(_, args) {
            assert.strictEqual(DateTime.daysInMonth(...args), 29);
        });
    });

    describe('#daysInYear', function() {
        it.each([
            ['returns the days in the year', [2018], 365],
            ['works with leap years', [2020], 366],
            ['matches php for year zero', [0], 366],
        ])('%s', function(_, args, expected) {
            assert.strictEqual(DateTime.daysInYear(...args), expected);
        });
    });

    describe('#getDefaultLocale', function() {
        it('returns the default locale', function() {
            assert.strictEqual(
                DateTime.getDefaultLocale(),
                'en',
            );
        });
    });

    describe('#getDefaultTimeZone', function() {
        it('returns the default timeZone', function() {
            assert.strictEqual(
                DateTime.getDefaultTimeZone(),
                'UTC',
            );
        });
    });

    describe('#isLeapYear', function() {
        it.each([
            ['returns false if the year is not a leap year', [2019], false],
            ['returns true if the year is a leap year', [2016], true],
            ['matches php for year zero', [0], true],
        ])('%s', function(_, args, expected) {
            assert.strictEqual(DateTime.isLeapYear(...args), expected);
        });
    });
});
