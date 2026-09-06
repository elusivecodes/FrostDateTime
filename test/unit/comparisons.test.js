import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Comparisons', function() {
    describe('#isAfter', function() {
        it.each([
            ['isAfter: returns false for dates after', [2018, 1, 1, 1, 1, 1], 'isAfter', [2018, 1, 1, 1, 2, 2], false],
            ['isAfter: returns true for dates before', [2018, 1, 1, 1, 2, 2], 'isAfter', [2018, 1, 1, 1, 1, 1], true],
            ['isAfterDay: works with dates after in day scope', [2018, 1, 1, 1], 'isAfterDay', [2018, 1, 2, 2], false],
            ['isAfterDay: works with dates before in day scope', [2018, 1, 2, 2], 'isAfterDay', [2018, 1, 1, 1], true],
            ['isAfterHour: works with dates after in hour scope', [2018, 1, 1, 1, 1], 'isAfterHour', [2018, 1, 1, 2, 2], false],
            ['isAfterHour: works with dates before in hour scope', [2018, 1, 1, 2, 2], 'isAfterHour', [2018, 1, 1, 1, 1], true],
            ['isAfterMinute: works with dates after in minute scope', [2018, 1, 1, 1, 1, 1], 'isAfterMinute', [2018, 1, 1, 1, 2, 2], false],
            ['isAfterMinute: works with dates before in minute scope', [2018, 1, 1, 1, 2, 2], 'isAfterMinute', [2018, 1, 1, 1, 1, 1], true],
            ['isAfterMonth: works with dates after in month scope', [2018, 1, 1], 'isAfterMonth', [2018, 2, 2], false],
            ['isAfterMonth: works with dates before in month scope', [2018, 2, 2], 'isAfterMonth', [2018, 1, 1], true],
            ['isAfterSecond: works with dates after in second scope', [2018, 1, 1, 1, 1, 1], 'isAfterSecond', [2018, 1, 1, 1, 2, 2], false],
            ['isAfterSecond: works with dates before in second scope', [2018, 1, 1, 1, 2, 2], 'isAfterSecond', [2018, 1, 1, 1, 1, 1], true],
            ['isAfterYear: works with dates after in year scope', [2018, 1], 'isAfterYear', [2019, 2], false],
            ['isAfterYear: works with dates before in year scope', [2019, 2], 'isAfterYear', [2018, 1], true],
        ])('%s', function(_, input, method, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date[method](other), expected);
        });
    });

    describe('#isBefore', function() {
        it.each([
            ['isBefore: returns false for dates before', [2018, 1, 1, 1, 2, 2], 'isBefore', [2018, 1, 1, 1, 1, 1], false],
            ['isBefore: returns true for dates after', [2018, 1, 1, 1, 1, 1], 'isBefore', [2018, 1, 1, 1, 2, 2], true],
            ['isBeforeDay: works with dates before in day scope', [2018, 1, 2, 2], 'isBeforeDay', [2018, 1, 1, 1], false],
            ['isBeforeDay: works with dates after in day scope', [2018, 1, 1, 1], 'isBeforeDay', [2018, 1, 2, 2], true],
            ['isBeforeHour: works with dates before in hour scope', [2018, 1, 1, 2, 2], 'isBeforeHour', [2018, 1, 1, 1, 1], false],
            ['isBeforeHour: works with dates after in hour scope', [2018, 1, 1, 1, 1], 'isBeforeHour', [2018, 1, 1, 2, 2], true],
            ['isBeforeMinute: works with dates before in minute scope', [2018, 1, 1, 1, 2, 2], 'isBeforeMinute', [2018, 1, 1, 1, 1, 1], false],
            ['isBeforeMinute: works with dates after in minute scope', [2018, 1, 1, 1, 1, 1], 'isBeforeMinute', [2018, 1, 1, 1, 2, 2], true],
            ['isBeforeMonth: works with dates before in month scope', [2018, 2, 2], 'isBeforeMonth', [2018, 1, 1], false],
            ['isBeforeMonth: works with dates after in month scope', [2018, 1, 1], 'isBeforeMonth', [2018, 2, 2], true],
            ['isBeforeSecond: works with dates before in second scope', [2018, 1, 1, 1, 2, 2], 'isBeforeSecond', [2018, 1, 1, 1, 1, 1], false],
            ['isBeforeSecond: works with dates after in second scope', [2018, 1, 1, 1, 1, 1], 'isBeforeSecond', [2018, 1, 1, 1, 2, 2], true],
            ['isBeforeYear: works with dates before in year scope', [2019, 2], 'isBeforeYear', [2018, 1], false],
            ['isBeforeYear: works with dates after in year scope', [2018, 1], 'isBeforeYear', [2019, 2], true],
        ])('%s', function(_, input, method, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date[method](other), expected);
        });
    });

    describe('#isBetween', function() {
        it.each([
            ['isBetween: returns true if dates are before and after', {
                input: [2018, 1, 1, 1, 1, 3],
                method: 'isBetween',
                otherInput: [2018, 1, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 1, 4],
                expected: true,
            }],
            ['isBetween: returns false if both dates are after', {
                input: [2018, 1, 1, 1, 1, 1],
                method: 'isBetween',
                otherInput: [2018, 1, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 1, 4],
                expected: false,
            }],
            ['isBetween: returns false if both dates are before', {
                input: [2018, 1, 1, 1, 1, 5],
                method: 'isBetween',
                otherInput: [2018, 1, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 1, 4],
                expected: false,
            }],
            ['isBetweenDay: works with dates before and after in day scope', {
                input: [2018, 1, 3],
                method: 'isBetweenDay',
                otherInput: [2018, 1, 2],
                endInput: [2018, 1, 4],
                expected: true,
            }],
            ['isBetweenDay: works with both dates after in day scope', {
                input: [2018, 1, 1],
                method: 'isBetweenDay',
                otherInput: [2018, 1, 2],
                endInput: [2018, 1, 4],
                expected: false,
            }],
            ['isBetweenDay: works with both dates before in day scope', {
                input: [2018, 1, 5],
                method: 'isBetweenDay',
                otherInput: [2018, 1, 2],
                endInput: [2018, 1, 4],
                expected: false,
            }],
            ['isBetweenHour: works with dates before and after in hour scope', {
                input: [2018, 1, 1, 3],
                method: 'isBetweenHour',
                otherInput: [2018, 1, 1, 2],
                endInput: [2018, 1, 1, 4],
                expected: true,
            }],
            ['isBetweenHour: works with both dates after in hour scope', {
                input: [2018, 1, 1, 1],
                method: 'isBetweenHour',
                otherInput: [2018, 1, 1, 2],
                endInput: [2018, 1, 1, 4],
                expected: false,
            }],
            ['isBetweenHour: works with both dates before in hour scope', {
                input: [2018, 1, 1, 5],
                method: 'isBetweenHour',
                otherInput: [2018, 1, 1, 2],
                endInput: [2018, 1, 1, 4],
                expected: false,
            }],
            ['isBetweenMinute: works with dates before and after in minute scope', {
                input: [2018, 1, 1, 1, 3],
                method: 'isBetweenMinute',
                otherInput: [2018, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 4],
                expected: true,
            }],
            ['isBetweenMinute: works with both dates after in minute scope', {
                input: [2018, 1, 1, 1, 1],
                method: 'isBetweenMinute',
                otherInput: [2018, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 4],
                expected: false,
            }],
            ['isBetweenMinute: works with both dates before in minute scope', {
                input: [2018, 1, 1, 1, 5],
                method: 'isBetweenMinute',
                otherInput: [2018, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 4],
                expected: false,
            }],
            ['isBetweenMonth: works with dates before and after in month scope', {
                input: [2018, 3],
                method: 'isBetweenMonth',
                otherInput: [2018, 2],
                endInput: [2018, 4],
                expected: true,
            }],
            ['isBetweenMonth: works with both dates after in month scope', {
                input: [2018, 1],
                method: 'isBetweenMonth',
                otherInput: [2018, 2],
                endInput: [2018, 4],
                expected: false,
            }],
            ['isBetweenMonth: works with both dates before in month scope', {
                input: [2018, 5],
                method: 'isBetweenMonth',
                otherInput: [2018, 2],
                endInput: [2018, 4],
                expected: false,
            }],
            ['isBetweenSecond: works with dates before and after in second scope', {
                input: [2018, 1, 1, 1, 1, 3],
                method: 'isBetweenSecond',
                otherInput: [2018, 1, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 1, 4],
                expected: true,
            }],
            ['isBetweenSecond: works with both dates after in second scope', {
                input: [2018, 1, 1, 1, 1, 1],
                method: 'isBetweenSecond',
                otherInput: [2018, 1, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 1, 4],
                expected: false,
            }],
            ['isBetweenSecond: works with both dates before in second scope', {
                input: [2018, 1, 1, 1, 1, 5],
                method: 'isBetweenSecond',
                otherInput: [2018, 1, 1, 1, 1, 2],
                endInput: [2018, 1, 1, 1, 1, 4],
                expected: false,
            }],
            ['isBetweenYear: works with dates before and after in year scope', {
                input: [2019],
                method: 'isBetweenYear',
                otherInput: [2018],
                endInput: [2020],
                expected: true,
            }],
            ['isBetweenYear: works with both dates after in year scope', {
                input: [2017],
                method: 'isBetweenYear',
                otherInput: [2018],
                endInput: [2020],
                expected: false,
            }],
            ['isBetweenYear: works with both dates before in year scope', {
                input: [2021],
                method: 'isBetweenYear',
                otherInput: [2018],
                endInput: [2020],
                expected: false,
            }],
        ])('%s', function(_, { input, method, otherInput, endInput, expected }) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);
            const end = DateTime.fromArray(endInput);

            assert.strictEqual(date[method](other, end), expected);
        });
    });

    describe('#isSame', function() {
        it.each([
            ['isSame: returns true for same dates', [2018, 1, 1, 1, 1, 1], 'isSame', [2018, 1, 1, 1, 1, 1], true],
            ['isSame: returns false for dates after', [2018, 1, 1, 1, 1, 1], 'isSame', [2018, 1, 1, 1, 1, 2], false],
            ['isSame: returns false for dates before', [2018, 1, 1, 1, 1, 2], 'isSame', [2018, 1, 1, 1, 1, 1], false],
            ['isSameDay: works with same dates in day scope', [2018, 1, 1, 2], 'isSameDay', [2018, 1, 1, 1], true],
            ['isSameDay: works with dates after in day scope', [2018, 1, 1, 2], 'isSameDay', [2018, 1, 2, 1], false],
            ['isSameDay: works with dates before in day scope', [2018, 1, 2, 2], 'isSameDay', [2018, 1, 1, 1], false],
            ['isSameHour: works with same dates in hour scope', [2018, 1, 1, 1, 2], 'isSameHour', [2018, 1, 1, 1, 1], true],
            ['isSameHour: works with dates after in hour scope', [2018, 1, 1, 1, 2], 'isSameHour', [2018, 1, 1, 2, 1], false],
            ['isSameHour: works with dates before in hour scope', [2018, 1, 1, 2, 2], 'isSameHour', [2018, 1, 1, 1, 1], false],
            ['isSameMinute: works with same dates in minute scope', [2018, 1, 1, 1, 1, 2], 'isSameMinute', [2018, 1, 1, 1, 1, 1], true],
            ['isSameMinute: works with dates after in minute scope', [2018, 1, 1, 1, 1, 2], 'isSameMinute', [2018, 1, 1, 1, 2, 1], false],
            ['isSameMinute: works with dates before in minute scope', [2018, 1, 1, 1, 2, 2], 'isSameMinute', [2018, 1, 1, 1, 1, 1], false],
            ['isSameMonth: works with same dates in month scope', [2018, 1, 2], 'isSameMonth', [2018, 1, 1], true],
            ['isSameMonth: works with dates after in month scope', [2018, 1, 2], 'isSameMonth', [2018, 2, 1], false],
            ['isSameMonth: works with dates before in month scope', [2018, 2, 2], 'isSameMonth', [2018, 1, 1], false],
            ['isSameSecond: works with same dates in second scope', [2018, 1, 1, 1, 1, 1], 'isSameSecond', [2018, 1, 1, 1, 1, 1], true],
            ['isSameSecond: works with dates after in second scope', [2018, 1, 1, 1, 1, 1], 'isSameSecond', [2018, 1, 1, 1, 1, 2], false],
            ['isSameSecond: works with dates before in second scope', [2018, 1, 1, 1, 1, 2], 'isSameSecond', [2018, 1, 1, 1, 1, 1], false],
            ['isSameYear: works with same dates in year scope', [2018, 2], 'isSameYear', [2018, 1], true],
            ['isSameYear: works with dates after in year scope', [2018, 2], 'isSameYear', [2019, 1], false],
            ['isSameYear: works with dates before in year scope', [2018, 2], 'isSameYear', [2017, 1], false],
        ])('%s', function(_, input, method, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date[method](other), expected);
        });
    });

    describe('#isSameOrAfter', function() {
        it.each([
            ['isSameOrAfter: returns true for same dates', [2018, 1, 1, 1, 1, 1], 'isSameOrAfter', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrAfter: returns true for dates before', [2018, 1, 1, 1, 1, 2], 'isSameOrAfter', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrAfter: returns false for dates after', [2018, 1, 1, 1, 1, 1], 'isSameOrAfter', [2018, 1, 1, 1, 1, 2], false],
            ['isSameOrAfterDay: works with same dates in day scope', [2018, 1, 1, 2], 'isSameOrAfterDay', [2018, 1, 1, 1], true],
            ['isSameOrAfterDay: works with dates before in day scope', [2018, 1, 2, 2], 'isSameOrAfterDay', [2018, 1, 1, 1], true],
            ['isSameOrAfterDay: works with dates after in day scope', [2018, 1, 1, 2], 'isSameOrAfterDay', [2018, 1, 2, 1], false],
            ['isSameOrAfterHour: works with same dates in hour scope', [2018, 1, 1, 1, 2], 'isSameOrAfterHour', [2018, 1, 1, 1, 1], true],
            ['isSameOrAfterHour: works with dates before in hour scope', [2018, 1, 1, 2, 2], 'isSameOrAfterHour', [2018, 1, 1, 1, 1], true],
            ['isSameOrAfterHour: works with dates after in hour scope', [2018, 1, 1, 1, 2], 'isSameOrAfterHour', [2018, 1, 1, 2, 1], false],
            ['isSameOrAfterMinute: works with same dates in minute scope', [2018, 1, 1, 1, 1, 2], 'isSameOrAfterMinute', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrAfterMinute: works with dates before in minute scope', [2018, 1, 1, 1, 2, 2], 'isSameOrAfterMinute', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrAfterMinute: works with dates after in minute scope', [2018, 1, 1, 1, 1, 2], 'isSameOrAfterMinute', [2018, 1, 1, 1, 2, 1], false],
            ['isSameOrAfterMonth: works with same dates in month scope', [2018, 1, 2], 'isSameOrAfterMonth', [2018, 1, 1], true],
            ['isSameOrAfterMonth: works with dates before in month scope', [2018, 2, 2], 'isSameOrAfterMonth', [2018, 1, 1], true],
            ['isSameOrAfterMonth: works with dates after in month scope', [2018, 1, 2], 'isSameOrAfterMonth', [2018, 2, 1], false],
            ['isSameOrAfterSecond: works with same dates in second scope', [2018, 1, 1, 1, 1, 1], 'isSameOrAfterSecond', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrAfterSecond: works with dates before in second scope', [2018, 1, 1, 1, 1, 2], 'isSameOrAfterSecond', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrAfterSecond: works with dates after in second scope', [2018, 1, 1, 1, 1, 1], 'isSameOrAfterSecond', [2018, 1, 1, 1, 1, 2], false],
            ['isSameOrAfterYear: works with same dates in year scope', [2018, 2], 'isSameOrAfterYear', [2018, 1], true],
            ['isSameOrAfterYear: works with dates before in year scope', [2019, 2], 'isSameOrAfterYear', [2018, 1], true],
            ['isSameOrAfterYear: works with dates after in year scope', [2019, 2], 'isSameOrAfterYear', [2020, 1], false],
        ])('%s', function(_, input, method, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date[method](other), expected);
        });
    });

    describe('#isSameOrBefore', function() {
        it.each([
            ['isSameOrBefore: returns true for same dates', [2018, 1, 1, 1, 1, 1], 'isSameOrBefore', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrBefore: returns true for dates after', [2018, 1, 1, 1, 1, 1], 'isSameOrBefore', [2018, 1, 1, 1, 1, 2], true],
            ['isSameOrBefore: returns false for dates before', [2018, 1, 1, 1, 1, 2], 'isSameOrBefore', [2018, 1, 1, 1, 1, 1], false],
            ['isSameOrBeforeDay: works with same dates in day scope', [2018, 1, 1, 2], 'isSameOrBeforeDay', [2018, 1, 1, 1], true],
            ['isSameOrBeforeDay: works with dates after in day scope', [2018, 1, 1, 2], 'isSameOrBeforeDay', [2018, 1, 2, 1], true],
            ['isSameOrBeforeDay: works with dates before in day scope', [2018, 1, 2, 2], 'isSameOrBeforeDay', [2018, 1, 1, 1], false],
            ['isSameOrBeforeHour: works with same dates in hour scope', [2018, 1, 1, 1, 2], 'isSameOrBeforeHour', [2018, 1, 1, 1, 1], true],
            ['isSameOrBeforeHour: works with dates after in hour scope', [2018, 1, 1, 1, 2], 'isSameOrBeforeHour', [2018, 1, 1, 2, 1], true],
            ['isSameOrBeforeHour: works with dates before in hour scope', [2018, 1, 1, 2, 2], 'isSameOrBeforeHour', [2018, 1, 1, 1, 1], false],
            ['isSameOrBeforeMinute: works with same dates in minute scope', [2018, 1, 1, 1, 1, 2], 'isSameOrBeforeMinute', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrBeforeMinute: works with dates after in minute scope', [2018, 1, 1, 1, 1, 2], 'isSameOrBeforeMinute', [2018, 1, 1, 1, 2, 1], true],
            ['isSameOrBeforeMinute: works with dates before in minute scope', [2018, 1, 1, 1, 2, 2], 'isSameOrBeforeMinute', [2018, 1, 1, 1, 1, 1], false],
            ['isSameOrBeforeMinute: works with same dates in second scope', [2018, 1, 1, 1, 1, 1], 'isSameOrBeforeSecond', [2018, 1, 1, 1, 1, 1], true],
            ['isSameOrBeforeMonth: works with same dates in month scope', [2018, 1, 2], 'isSameOrBeforeMonth', [2018, 1, 1], true],
            ['isSameOrBeforeMonth: works with dates after in month scope', [2018, 1, 2], 'isSameOrBeforeMonth', [2018, 2, 1], true],
            ['isSameOrBeforeMonth: works with dates before in month scope', [2018, 2, 2], 'isSameOrBeforeMonth', [2018, 1, 1], false],
            ['isSameOrBeforeSecond: works with dates after in second scope', [2018, 1, 1, 1, 1, 1], 'isSameOrBeforeSecond', [2018, 1, 1, 1, 1, 2], true],
            ['isSameOrBeforeSecond: works with dates before in second scope', [2018, 1, 1, 1, 1, 2], 'isSameOrBeforeSecond', [2018, 1, 1, 1, 1, 1], false],
            ['isSameOrBeforeYear: works with same dates in year scope', [2018, 2], 'isSameOrBeforeYear', [2018, 1], true],
            ['isSameOrBeforeYear: works with dates after in year scope', [2019, 2], 'isSameOrBeforeYear', [2020, 1], true],
            ['isSameOrBeforeYear: works with dates before in year scope', [2019, 2], 'isSameOrBeforeYear', [2018, 1], false],
        ])('%s', function(_, input, method, otherInput, expected) {
            const date = DateTime.fromArray(input);
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date[method](other), expected);
        });
    });
});
