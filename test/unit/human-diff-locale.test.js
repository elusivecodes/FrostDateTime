import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Human Difference (Locale)', function() {
    describe('#humanDiff', function() {
        it.each([
            ['returns the difference in human readable form (years)', [2018], [2016], 'через 2 года'],
            ['returns the difference in human readable form (months)', [2018, 1], [2018, 4], '3 месяца назад'],
            ['returns the difference in human readable form (weeks)', [2018, 1, 1], [2018, 1, 23], '3 недели назад'],
            ['returns the difference in human readable form (days)', [2018, 1, 1], [2018, 1, 4], '3 дня назад'],
            ['returns the difference in human readable form (hours)', [2018, 1, 1, 0], [2018, 1, 1, 11], '11 часов назад'],
            ['returns the difference in human readable form (minutes)', [2018, 1, 1, 0, 0], [2018, 1, 1, 0, 9], '9 минут назад'],
            ['returns the difference in human readable form (seconds)', [2018, 1, 1, 0, 0, 15], [2018, 1, 1, 0, 0, 0], 'через 15 секунд'],
            ['returns the difference in human readable form (now)', [2018, 1, 1, 0, 0, 0], [2018, 1, 1, 0, 0, 0], 'сейчас'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input, { locale: 'ru' });
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiff(other), expected);
        });
    });

    describe('#humanDiffInDays', function() {
        it.each([
            ['works with day', [2018, 6, 23], [2018, 6, 22], 'завтра'],
            ['works with days', [2018, 6, 23], [2018, 6, 15], 'через 8 дней'],
            ['works with day (negative)', [2018, 6, 22], [2018, 6, 23], 'вчера'],
            ['works with days (negative)', [2018, 6, 15], [2018, 6, 23], '8 дней назад'],
            ['works with days (relative)', [2018, 6, 23, 0], [2018, 6, 15, 1], 'через 8 дней'],
            ['works with days and months', [2018, 8, 23], [2018, 6, 15], 'через 69 дней'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input, { locale: 'ru' });
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInDays(other), expected);
        });
    });

    describe('#humanDiffInHours', function() {
        it.each([
            ['works with hour', [2018, 6, 15, 23], [2018, 6, 15, 22], 'через 1 час'],
            ['works with hours', [2018, 6, 15, 23], [2018, 6, 15, 12], 'через 11 часов'],
            ['works with hour (negative)', [2018, 6, 15, 22], [2018, 6, 15, 23], '1 час назад'],
            ['works with hours (negative)', [2018, 6, 15, 12], [2018, 6, 15, 23], '11 часов назад'],
            ['works with hours (relative)', [2018, 6, 15, 23, 0], [2018, 6, 15, 12, 1], 'через 11 часов'],
            ['works with hours and days', [2018, 6, 18, 23], [2018, 6, 15, 12], 'через 83 часа'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input, { locale: 'ru' });
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInHours(other), expected);
        });
    });

    describe('#humanDiffInMinutes', function() {
        it.each([
            ['works with minute', [2018, 6, 15, 12, 30], [2018, 6, 15, 12, 29], 'через 1 минуту'],
            ['works with minutes', [2018, 6, 15, 12, 30], [2018, 6, 15, 12, 15], 'через 15 минут'],
            ['works with minute (negative)', [2018, 6, 15, 12, 29], [2018, 6, 15, 12, 30], '1 минуту назад'],
            ['works with minutes (negative)', [2018, 6, 15, 12, 15], [2018, 6, 15, 12, 30], '15 минут назад'],
            ['works with minutes (relative)', [2018, 6, 15, 12, 30, 0], [2018, 6, 15, 12, 15, 1], 'через 15 минут'],
            ['works with minutes and hours', [2018, 6, 15, 16, 30], [2018, 6, 15, 12, 15], 'через 255 минут'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input, { locale: 'ru' });
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInMinutes(other), expected);
        });
    });

    describe('#humanDiffInMonths', function() {
        it.each([
            ['works with month', [2018, 7], [2018, 6], 'в следующем месяце'],
            ['works with months', [2018, 9], [2018, 6], 'через 3 месяца'],
            ['works with month (negative)', [2018, 6], [2018, 7], 'в прошлом месяце'],
            ['works with months (negative)', [2018, 6], [2018, 9], '3 месяца назад'],
            ['works with months (relative)', [2018, 9, 1], [2018, 6, 2], 'через 3 месяца'],
            ['works with months and years', [2018, 9], [2016, 6], 'через 27 месяцев'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input, { locale: 'ru' });
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInMonths(other), expected);
        });
    });

    describe('#humanDiffInSeconds', function() {
        it.each([
            ['works with second', [2018, 6, 15, 12, 30, 30], [2018, 6, 15, 12, 30, 29], 'через 1 секунду'],
            ['works with seconds', [2018, 6, 15, 12, 30, 30], [2018, 6, 15, 12, 30, 15], 'через 15 секунд'],
            ['works with second (negative)', [2018, 6, 15, 12, 30, 29], [2018, 6, 15, 12, 30, 30], '1 секунду назад'],
            ['works with seconds (negative)', [2018, 6, 15, 12, 30, 15], [2018, 6, 15, 12, 30, 30], '15 секунд назад'],
            ['works with seconds (relative)', [2018, 6, 15, 12, 30, 30, 0], [2018, 6, 15, 12, 30, 15, 1], 'через 15 секунд'],
            ['works with seconds and minutes', [2018, 6, 15, 12, 50, 30], [2018, 6, 15, 12, 30, 15], 'через 1 215 секунд'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input, { locale: 'ru' });
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInSeconds(other), expected);
        });
    });

    describe('#humanDiffInWeeks', function() {
        it.each([
            ['works with week', [2018, 6, 23], [2018, 6, 16], 'на следующей неделе'],
            ['works with weeks', [2018, 6, 23], [2018, 5, 15], 'через 5 недель'],
            ['works with week (negative)', [2018, 6, 16], [2018, 6, 23], 'на прошлой неделе'],
            ['works with weeks (negative)', [2018, 5, 15], [2018, 6, 23], '5 недель назад'],
            ['works with weeks (relative)', [2018, 1, 8], [2018, 1, 1], 'на следующей неделе'],
            ['works with weeks and months', [2018, 8, 23], [2018, 6, 15], 'через 10 недель'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input, { locale: 'ru' });
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInWeeks(other), expected);
        });
    });

    describe('#humanDiffInYears', function() {
        it.each([
            ['works with year', [2018], [2017], 'в следующем году'],
            ['works with years', [2018], [2016], 'через 2 года'],
            ['works with year (negative)', [2017], [2018], 'в прошлом году'],
            ['works with years (negative)', [2016], [2018], '2 года назад'],
            ['works with years (relative)', [2018, 1], [2016, 2], 'через 2 года'],
        ])('%s', function(_, input, otherInput, expected) {
            const date = DateTime.fromArray(input, { locale: 'ru' });
            const other = DateTime.fromArray(otherInput);

            assert.strictEqual(date.humanDiffInYears(other), expected);
        });
    });
});
