import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Utility', function() {
    describe.each([
        ['default', [], ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']],
        ['short', ['short'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']],
        ['narrow', ['narrow'], ['S', 'M', 'T', 'W', 'T', 'F', 'S']],
    ])('#dayName (%s)', function(_, args, names) {
        it.each(names.map((expected, day) => [day, expected]))('returns %s as %s', function(day, expected) {
            const date = DateTime.fromArray([2019, 1, 1]).withDay(day);

            assert.strictEqual(date.dayName(...args), expected);
        });
    });

    describe('#dayPeriod', function() {
        it.each([
            ['returns the day period', [2018, 1, 1, 0], [], 'AM'],
            ['works with pm day period', [2018, 1, 1, 12], [], 'PM'],
            ['works with short am periods', [2018, 1, 1, 0], ['short'], 'AM'],
            ['works with short pm periods', [2018, 1, 1, 12], ['short'], 'PM'],
        ])('%s', function(_, input, args, expected) {
            const date = DateTime.fromArray(input);

            assert.strictEqual(date.dayPeriod(...args), expected);
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
            assert.strictEqual(DateTime.fromArray([2018, month, 1]).daysInMonth(), expected);
        });

        it.each([
            ['works with leap years', [2020, 2, 1]],
            ['matches php for year zero', [0, 2, 1]],
        ])('%s', function(_, input) {
            const date = DateTime.fromArray(input);

            assert.strictEqual(date.daysInMonth(), 29);
        });
    });

    describe('#daysInYear', function() {
        it.each([
            ['returns the days in the year', [2018, 1, 1], 365],
            ['works with leap years', [2020, 1, 1], 366],
            ['matches php for year zero', [0, 1, 1], 366],
        ])('%s', function(_, input, expected) {
            const date = DateTime.fromArray(input);

            assert.strictEqual(date.daysInYear(), expected);
        });
    });

    describe('#era', function() {
        it.each([
            ['returns the era', [2018], [], 'Anno Domini'],
            ['works with bc era', [-5], [], 'Before Christ'],
            ['treats astronomical year zero as bc', [0], [], 'Before Christ'],
            ['works with short AD eras', [2018], ['short'], 'AD'],
            ['works with short BC eras', [-5], ['short'], 'BC'],
            ['works with narrow AD eras', [2018], ['narrow'], 'A'],
            ['works with narrow BC eras', [-5], ['narrow'], 'B'],
        ])('%s', function(_, input, args, expected) {
            const date = DateTime.fromArray(input);

            assert.strictEqual(date.era(...args), expected);
        });
    });

    describe('#isDst', function() {
        it.each([
            ['returns false if the date is not DST', [2018, 1, 1], false],
            ['returns true if the date is DST', [2018, 6, 1], true, { timeZone: 'America/New_York' }],
        ])('%s', function(_, input, expected, options = {}) {
            const date = DateTime.fromArray(input, options);

            assert.strictEqual(date.isDst(), expected);
        });
    });

    describe('#isLeapYear', function() {
        it.each([
            ['returns false if the year is not a leap year', [2019], false],
            ['returns true if the year is a leap year', [2016], true],
            ['matches php for year zero', [0, 2, 29], true],
        ])('%s', function(_, input, expected) {
            const date = DateTime.fromArray(input);

            assert.strictEqual(date.isLeapYear(), expected);
        });
    });

    describe.each([
        ['default', [], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']],
        ['short', ['short'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']],
        ['narrow', ['narrow'], ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']],
    ])('#monthName (%s)', function(_, args, names) {
        it.each(names.map((expected, index) => [index + 1, expected]))('returns %s as %s', function(month, expected) {
            const date = DateTime.fromArray([2019, month, 1]);

            assert.strictEqual(date.monthName(...args), expected);
        });
    });

    describe('#timeZoneName', function() {
        it.each([
            ['returns the time zone name', [], 'Australian Eastern Standard Time', { timeZone: 'Australia/Brisbane' }],
            ['works with time zone offsets', [], 'GMT+10:00', { timeZone: '+10:00' }],
            ['works with short time zone names', ['short'], 'GMT+10', { timeZone: 'Australia/Brisbane' }],
            ['works with short time zone offsets', ['short'], 'GMT+10', { timeZone: '+10:00' }],
        ])('%s', function(_, args, expected, options = {}) {
            const date = DateTime.fromArray([2018], options);

            assert.strictEqual(date.timeZoneName(...args), expected);
        });
    });

    describe('#weeksInYear', function() {
        it.each([
            ['returns the weeks in the year', [2018, 1, 1], 52],
            ['uses local weeks', [2016, 1, 1], 53],
        ])('%s', function(_, input, expected) {
            const date = DateTime.fromArray(input);

            assert.strictEqual(date.weeksInYear(), expected);
        });
    });
});
