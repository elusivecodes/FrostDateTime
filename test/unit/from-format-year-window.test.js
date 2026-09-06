import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime #fromFormat year window', function() {
    beforeEach(function() {
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date('2026-09-06T12:34:56.789Z'));
    });

    afterEach(function() {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    describe.each(['y', 'yy'])('%s calendar year', function(token) {
        it.each([
            ['00-01-01', '2000-01-01'],
            ['05-01-01', '2005-01-01'],
            ['41-01-01', '2041-01-01'],
            ['46-01-01', '2046-01-01'],
            ['46-12-31', '1946-12-31'],
            ['47-01-01', '1947-01-01'],
            ['99-01-01', '1999-01-01'],
            ['5-01-01', '0005-01-01'],
            ['005-01-01', '0005-01-01'],
            ['0088-01-01', '0088-01-01'],
        ])('parses %s as %s', function(input, expected) {
            const date = DateTime.fromFormat(`${token}-MM-dd`, input);

            assert.strictEqual(date.format('yyyy-MM-dd'), expected);
            assert.strictEqual(date.isValid, true);
        });
    });

    it.each([
        ['46-09-06 12:34:56.788', 2046],
        ['46-09-06 12:34:56.789', 1946],
        ['46-09-06 12:34:56.790', 1946],
    ])('uses the complete timestamp at the boundary: %s', function(input, year) {
        const date = DateTime.fromFormat('yy-MM-dd HH:mm:ss.SSS', input);

        assert.strictEqual(date.getYear(), year);
        assert.strictEqual(date.isValid, true);
    });

    it.each(['UTC', 'Australia/Brisbane', 'America/New_York'])('honors a parsed offset when displaying in %s', function(timeZone) {
        const pattern = 'yy-MM-dd HH:mm:ss.SSS xxx';
        const before = DateTime.fromFormat(pattern, '46-09-06 22:34:56.788 +10:00', { timeZone });
        const at = DateTime.fromFormat(pattern, '46-09-06 22:34:56.789 +10:00', { timeZone });

        assert.strictEqual(before.toIsoString(), '2046-09-06T12:34:56.788+00:00');
        assert.strictEqual(at.toIsoString(), '1946-09-06T12:34:56.789+00:00');
        assert.strictEqual(before.isValid, true);
        assert.strictEqual(at.isValid, true);
    });

    it('uses the requested zone for an unzoned wall time', function() {
        const date = DateTime.fromFormat('yy-MM-dd HH:mm:ss.SSS', '46-09-06 22:34:56.789', {
            timeZone: 'Australia/Brisbane',
        });

        assert.strictEqual(date.toIsoString(), '1946-09-06T12:34:56.789+00:00');
    });

    describe.each(['Y', 'YY'])('%s week year', function(token) {
        it.each(['en-US', 'en-GB'])('preserves week fields in %s', function(locale) {
            for (const [input, year, week] of [['05 1 1', 2005, 1], ['41 1 1', 2041, 1], ['46 1 1', 2046, 1], ['46 52 1', 1946, 52]]) {
                const date = DateTime.fromFormat(`${token} w e`, input, { locale });

                assert.strictEqual(date.getWeekYear(), year);
                assert.strictEqual(date.getWeek(), week);
                assert.strictEqual(date.getWeekDay(), 1);
                assert.strictEqual(date.isValid, true);
            }
        });
    });

    it('keeps longer year patterns literal', function() {
        for (const token of ['yyy', 'yyyy', 'YYY', 'YYYY']) {
            const weekYear = token[0] === 'Y';
            const date = DateTime.fromFormat(weekYear ? `${token} w e` : `${token}-MM-dd`, weekYear ? '05 1 1' : '05-01-01');

            assert.strictEqual(weekYear ? date.getWeekYear() : date.getYear(), 5);
            assert.strictEqual(date.isValid, true);
        }
    });

    it('moves the window as the reference date changes', function() {
        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '46-12-31').getYear(), 1946);

        vi.setSystemTime(new Date('2027-09-06T12:34:56.789Z'));

        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '46-12-31').getYear(), 2046);
    });

    it('works when the window crosses into the next century', function() {
        vi.setSystemTime(new Date('2090-06-15T12:00:00.000Z'));

        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '05-01-01').getYear(), 2105);
        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '10-01-01').getYear(), 2110);
        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '10-12-31').getYear(), 2010);
    });

    it('rebuilds ordinal dates after changing centuries', function() {
        const date = DateTime.fromFormat('yy D', '46 1');

        assert.strictEqual(date.format('yyyy-MM-dd'), '2046-01-01');
        assert.strictEqual(date.isValid, true);
    });

    it('revalidates leap days in the selected century', function() {
        vi.setSystemTime(new Date('2080-09-06T12:00:00.000Z'));

        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '00-02-29').isValid, false);
        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '04-02-29').isValid, true);
    });

    it('preserves invalidity for conflicting years and impossible dates', function() {
        assert.strictEqual(DateTime.fromFormat('yy yy-MM-dd', '05 06-01-01').isValid, false);
        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '46-02-31').isValid, false);
    });

    it.each([
        ['01-01-01 BC', -2000],
        ['46-01-01 BC', -2045],
        ['46-12-31 BC', -2045],
        ['99-01-01 BC', -1998],
    ])('expands two-digit years before converting the era: %s', function(input, year) {
        const date = DateTime.fromFormat('yy-MM-dd G', input);

        assert.strictEqual(date.getYear(), year);
        assert.strictEqual(date.isValid, true);
    });

    it('captures the reference time once for each parse', function() {
        vi.spyOn(Date, 'now')
            .mockReturnValueOnce(Date.parse('2026-09-06T12:34:56.789Z'))
            .mockReturnValue(Date.parse('2126-09-06T12:34:56.789Z'));

        assert.strictEqual(DateTime.fromFormat('yy-MM-dd', '05-01-01').getYear(), 2005);
    });
});
