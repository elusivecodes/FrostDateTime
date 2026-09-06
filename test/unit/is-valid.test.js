import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Is Valid', function() {
    describe.each([
        ['2019-02-28', true],
        ['2019-02-31', false],
    ])('Copies of %s', function(dateString, isValid) {
        it.each([
            ['withLocale', 'fr'],
            ['withTimeZone', 'America/New_York'],
            ['withTimeZoneOffset', -600],
            ['withTime', 1704067200000],
            ['withTimestamp', 1704067200],
            ['withYear', 2024],
            ['addDays', 1],
            ['addHours', 1],
        ])('preserves validity through %s', function(method, value) {
            const date = DateTime.fromFormat('yyyy-MM-dd', dateString);
            const time = date.getTime();
            const copy = date[method](value);

            assert.notStrictEqual(copy, date);
            assert.strictEqual(copy.isValid, isValid);
            assert.strictEqual(copy.toJSON(), isValid ? copy.toIsoString() : null);
            assert.strictEqual(date.isValid, isValid);
            assert.strictEqual(date.getTime(), time);
        });
    });

    describe('ISO Parsing', function() {
        it.each([
            {},
            { timeZone: 'UTC' },
            { locale: 'fr' },
            { timeZone: 'Australia/Brisbane', locale: 'fr' },
        ])('preserves invalidity with options %j', function(options) {
            const date = DateTime.fromISOString('2019-02-31T00:00:00.000+00:00', options);

            assert.strictEqual(date.isValid, false);
            assert.strictEqual(date.toJSON(), null);
        });
    });

    describe('Era', function() {
        it.each([
            ['validates AD era', 'yyyy GGG', '1970 AD', true],
            ['validates BC era', 'yyyy GGG', '1970 BC', true],
            ['invalidates year zero AD', 'yyyy GGG', '0000 AD', false],
            ['invalidates year zero BC', 'yyyy GGG', '0000 BC', false],
            ['invalid eras', 'yyyy GGG GGG', '1970 AD BC', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Year', function() {
        it.each([
            ['validates year', 'yyyy', '2018', true],
            ['invalid years', 'yyyy yyyy', '2012 2018', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Week Year', function() {
        it.each([
            ['validates week year', 'YYYY w e', '2018 1 1', true],
            ['invalid years', 'YYYY YYYY w e', '2012 2018 1 1', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Quarter', function() {
        it.each([
            ['validates quarter', 'q', '3', true],
            ['invalid quarter', 'q', '5', false],
            ['invalid quarters', 'q q', '2 3', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Month', function() {
        it.each([
            ['validates month', 'M', '10', true],
            ['invalid month', 'M', '13', false],
            ['invalid months', 'M M', '5 10', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Week Of Year', function() {
        it.each([
            ['validates week of year', 'w', '22', true],
            ['invalid week of year', 'w', '55', false],
            ['invalid week of years', 'w w', '1 22', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Week Of Month', function() {
        it.each([
            ['validates week of month', 'W', '3', true],
            ['invalid week of month', 'W', '6', false],
            ['invalid week of months', 'W W', '1 3', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Day Of Month', function() {
        it.each([
            ['validates day of month', 'd', '21', true],
            ['invalid day of month', 'd', '32', false],
            ['invalid day of months', 'd d', '6 21', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Day Of Year', function() {
        it.each([
            ['validates day of year', 'D', '152', true],
            ['invalid day of year', 'D', '367', false],
            ['invalid day of years', 'D D', '50 152', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Day Of Week In Month', function() {
        it.each([
            ['validates day of week in month', 'F', '3', true],
            ['invalid day of week in month', 'F', '6', false],
            ['invalid day of week in months', 'F F', '1 3', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Week Day', function() {
        it.each([
            ['validates week day', 'e', '6', true],
            ['invalid week day', 'e', '8', false],
            ['invalid week days', 'e e', '2 6', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Day Period', function() {
        it.each([
            ['validates AM day period', 'aaa', 'AM', true],
            ['validates PM day period', 'aaa', 'PM', true],
            ['invalid day periods', 'aaa aaa', 'AM PM', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Hour', function() {
        it.each([
            ['validates hour', 'h', '12', true],
            ['invalid hour', 'h', '13', false],
            ['invalid hours', 'h h', '6 12', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Minute', function() {
        it.each([
            ['validates minute', 'm', '25', true],
            ['invalid minute', 'm', '61', false],
            ['invalid minutes', 'm m', '5 25', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Second', function() {
        it.each([
            ['validates second', 's', '25', true],
            ['invalid second', 's', '61', false],
            ['invalid seconds', 's s', '5 25', false],
        ])('%s', function(_, pattern, input, expected) {
            assert.strictEqual(DateTime.fromFormat(pattern, input).isValid, expected);
        });
    });

    describe('Fractional', function() {
        it('validates fractional', function() {
            assert.strictEqual(
                DateTime.fromFormat('SSS', '123').isValid,
                true,
            );
        });
    });
});
