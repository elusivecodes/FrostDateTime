import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime era years', function() {
    describe.each(['UTC', 'Australia/Brisbane', '+05:30'])('in %s', function(timeZone) {
        const options = { locale: 'en', timeZone };

        it.each([
            [1, '0001', 'AD'],
            [0, '0001', 'BC'],
            [-1, '0002', 'BC'],
            [-4, '0005', 'BC'],
            [-99, '0100', 'BC'],
            [-100, '0101', 'BC'],
            [-1999, '2000', 'BC'],
            [-2000, '2001', 'BC'],
        ])('formats and parses astronomical year %i', function(year, yearOfEra, era) {
            const pattern = 'yyyy-MM-dd HH:mm:ss.SSS G';
            const input = `${yearOfEra}-06-01 12:34:56.789 ${era}`;
            const expected = DateTime.fromArray([year, 6, 1, 12, 34, 56, 789], options);
            const date = DateTime.fromFormat(pattern, input, options);

            assert.strictEqual(expected.format(pattern), input);
            assert.strictEqual(expected.format('yy'), yearOfEra.slice(-2));
            assert.strictEqual(date.getYear(), year);
            assert.strictEqual(date.getTime(), expected.getTime());
            assert.strictEqual(date.isValid, true);
        });
    });

    it.each(['en', 'fr', 'ar-EG'])('round-trips localized BC years in %s', function(locale) {
        const options = { locale, timeZone: 'UTC' };
        const expected = DateTime.fromArray([0, 6, 1], options);
        const pattern = 'yyyy MMMM dd GGGG';
        const date = DateTime.fromFormat(pattern, expected.format(pattern), options);

        assert.strictEqual(date.getTime(), expected.getTime());
        assert.strictEqual(date.isValid, true);
    });

    it.each([
        ['0001-02-29 BC', 0, true],
        ['0002-02-29 BC', -1, false],
        ['0005-02-29 BC', -4, true],
        ['0101-02-29 BC', -100, false],
        ['0401-02-29 BC', -400, true],
    ])('validates leap days using the astronomical year: %s', function(input, year, isValid) {
        const date = DateTime.fromFormat('yyyy-MM-dd G', input);

        assert.strictEqual(date.getYear(), year);
        assert.strictEqual(date.isValid, isValid);
    });

    it.each([
        ['0001 BC BC', 0, true],
        ['0001 AD AD', 1, true],
        ['0001 BC AD', 1, false],
        ['0001 AD BC', 0, false],
    ])('validates repeated era fields: %s', function(input, year, isValid) {
        const date = DateTime.fromFormat('yyyy G G', input);

        assert.strictEqual(date.getYear(), year);
        assert.strictEqual(date.isValid, isValid);
    });

    it('rejects year zero as a year of era when no era is supplied', function() {
        assert.strictEqual(DateTime.fromFormat('yyyy-MM-dd', '0000-01-01').isValid, false);
    });

    describe('ISO astronomical years', function() {
        it.each([
            '0000-02-29T12:34:56.789+00:00',
            '-000001-06-01T12:34:56.789+00:00',
            '-000004-02-29T12:34:56.789+00:00',
            '0001-06-01T12:34:56.789+00:00',
            '+010000-06-01T12:34:56.789+00:00',
        ])('round-trips %s independently of locale and display zone', function(input) {
            const time = Date.parse(input);
            const options = { locale: 'ar-EG', timeZone: 'Australia/Brisbane' };
            const date = DateTime.fromISOString(input, options);

            assert.strictEqual(new DateTime(time, options).toIsoString(), input);
            assert.strictEqual(date.getTime(), time);
            assert.strictEqual(date.toIsoString(), input);
            assert.strictEqual(date.toJSON(), input);
            assert.strictEqual(date.isValid, true);
            assert.strictEqual(date.getLocale(), options.locale);
            assert.strictEqual(date.getTimeZone(), options.timeZone);
        });

        it('honors an ISO offset that crosses into the previous BC year', function() {
            const date = DateTime.fromISOString('0000-01-01T00:30:00.123+01:00');

            assert.strictEqual(date.toIsoString(), '-000001-12-31T23:30:00.123+00:00');
            assert.strictEqual(date.isValid, true);
        });

        it.each(['0000-02-31', '-000001-02-29'])('keeps impossible ISO dates invalid: %s', function(input) {
            const date = DateTime.fromISOString(`${input}T00:00:00.000+00:00`, {
                locale: 'fr', timeZone: 'Australia/Brisbane',
            });

            assert.strictEqual(date.isValid, false);
            assert.strictEqual(date.toJSON(), null);
        });

        it.each(['-000000', '-0001', '+10000', '10000'])('rejects invalid ISO year syntax: %s', function(year) {
            assert.throws(() => DateTime.fromISOString(`${year}-01-01T00:00:00.000+00:00`), /Invalid ISO year/);
        });
    });
});
