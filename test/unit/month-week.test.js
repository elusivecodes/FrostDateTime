import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe.each(['en-US', 'en-GB'])('DateTime month weeks in %s', function(locale) {
    const options = { locale, timeZone: 'UTC' };

    it.each([
        ['2018-12-31', 6, 5, 5],
        ['2019-12-01', 1, 0, 1],
        ['2019-12-29', 5, 4, 5],
        ['2019-12-31', 5, 5, 5],
        ['2020-02-29', 5, 4, 5],
        ['2021-01-01', 1, 0, 1],
        ['2021-01-03', 2, 0, 1],
        ['2021-01-04', 2, 1, 1],
        ['2021-01-08', 2, 1, 2],
    ])('gets and formats month weeks for %s', function(input, usWeek, gbWeek, occurrence) {
        const date = new DateTime(input, options);
        const week = locale === 'en-US' ? usWeek : gbWeek;

        assert.strictEqual(date.getWeekOfMonth(), week);
        assert.strictEqual(date.getWeekDayInMonth(), occurrence);
        assert.strictEqual(date.format('W F'), `${week} ${occurrence}`);
    });

    it.each(['withWeekOfMonth', 'withWeekDayInMonth'])('sets the first and fifth Tuesdays in December using %s', function(method) {
        const date = new DateTime('2019-12-31T13:14:15.123', options);
        const first = date[method](1);

        assert.strictEqual(first.toIsoString(), '2019-12-03T13:14:15.123+00:00');
        assert.strictEqual(first[method](5).toIsoString(), '2019-12-31T13:14:15.123+00:00');
        assert.strictEqual(date.toIsoString(), '2019-12-31T13:14:15.123+00:00');
    });

    it('sets the first week of January using the locale minimum day count', function() {
        const date = new DateTime('2021-01-01', options);
        const firstWeek = date.withWeekOfMonth(1);
        const expected = locale === 'en-US' ? '2021-01-01' : '2021-01-08';

        assert.strictEqual(firstWeek.format('yyyy-MM-dd'), expected);
        assert.strictEqual(firstWeek.withWeekOfMonth(date.getWeekOfMonth()).getTime(), date.getTime());
    });

    it.each([
        ['2019-12-31', 5, 5, 3, 2],
        ['2021-01-01', 1, 0, 6, 5],
    ])('parses a month week and weekday as %s', function(input, usWeek, gbWeek, usDay, gbDay) {
        const week = locale === 'en-US' ? usWeek : gbWeek;
        const day = locale === 'en-US' ? usDay : gbDay;
        const date = DateTime.fromFormat('yyyy-MM W e', `${input.slice(0, 7)} ${week} ${day}`, options);

        assert.strictEqual(date.format('yyyy-MM-dd'), input);
        assert.strictEqual(date.isValid, true);
    });

    it('parses the fifth weekday occurrence at the end of December', function() {
        const date = DateTime.fromFormat('yyyy-MM-dd F', '2019-12-31 5', options);

        assert.strictEqual(date.format('yyyy-MM-dd'), '2019-12-31');
        assert.strictEqual(date.isValid, true);
    });

    it('uses the local month and date near a UTC year boundary', function() {
        const date = new DateTime('2020-01-01T01:00:00Z', { locale, timeZone: 'America/New_York' });

        assert.strictEqual(date.getWeekOfMonth(), 5);
        assert.strictEqual(date.getWeekDayInMonth(), 5);
        assert.strictEqual(date.withWeekOfMonth(1).toIsoString(), '2019-12-04T01:00:00.000+00:00');
        assert.strictEqual(date.withWeekDayInMonth(1).toIsoString(), '2019-12-04T01:00:00.000+00:00');
    });
});
