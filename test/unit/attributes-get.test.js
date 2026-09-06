import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Attributes Get', function() {
    describe('Calendar fields', function() {
        it.each([
            ['getDate: returns the date of the month', [2019, 1, 31], 'getDate', 31],
            ['getDay: returns the day of the week', [2019, 1, 1], 'getDay', 2],
            ['getDay: returns 1 for Monday', [2018, 12, 31], 'getDay', 1],
            ['getDay: returns 0 for Sunday', [2018, 12, 30], 'getDay', 0],
            ['getDayOfYear: returns the day of the year', [2019, 6, 1], 'getDayOfYear', 152],
            ['getMonth: returns the month of the year', [2019, 6, 1], 'getMonth', 6],
            ['getQuarter: returns the quarter of the year', [2019, 8, 1], 'getQuarter', 3],
            ['getWeek: returns the week of the year', [2019, 6, 1], 'getWeek', 22],
            ['getWeek: uses the week year', [2019, 12, 30], 'getWeek', 1],
            ['getWeek: works before a spring DST transition', [2024, 3, 3], 'getWeek', 10, { timeZone: 'America/New_York' }],
            ['getWeek: works during a spring DST transition', [2024, 3, 10], 'getWeek', 11, { timeZone: 'America/New_York' }],
            ['getWeek: works after a spring DST transition', [2024, 3, 17], 'getWeek', 12, { timeZone: 'America/New_York' }],
            ['getWeek: works before an autumn DST transition', [2024, 10, 27], 'getWeek', 44, { timeZone: 'America/New_York' }],
            ['getWeek: works during an autumn DST transition', [2024, 11, 3], 'getWeek', 45, { timeZone: 'America/New_York' }],
            ['getWeek: works after an autumn DST transition', [2024, 11, 10], 'getWeek', 46, { timeZone: 'America/New_York' }],
            ['getWeekDay: returns the day of the week', [2019, 1, 1], 'getWeekDay', 3],
            ['getWeekDay: returns 2 for Monday', [2018, 12, 31], 'getWeekDay', 2],
            ['getWeekDay: returns 1 for Sunday', [2018, 12, 30], 'getWeekDay', 1],
            ['getWeekDayInMonth: returns the week day in month', [2019, 6, 1], 'getWeekDayInMonth', 1],
            ['getWeekDayInMonth: uses the local week', [2019, 6, 7], 'getWeekDayInMonth', 1],
            ['getWeekOfMonth: returns the week of the month', [2019, 6, 1], 'getWeekOfMonth', 1],
            ['getWeekOfMonth: uses the local week', [2019, 6, 3], 'getWeekOfMonth', 2],
            ['getWeekYear: returns the week year', [2019, 1, 1], 'getWeekYear', 2019],
            ['getWeekYear: uses the year of the current week', [2019, 12, 30], 'getWeekYear', 2020],
            ['getYear: returns the year', [2018], 'getYear', 2018],
        ])('%s', function(_, input, method, expected, options = {}) {
            const date = DateTime.fromArray(input, options);

            assert.strictEqual(date[method](), expected);
        });

        it.each([
            ['getWeek: preserves the region in language-script-region locales', [2021, 1, 1], 'en-Latn-GB', [53, 2020]],
            ['getWeek: uses regional overrides of the language minimum days', [2022, 1, 1], 'da-GL', [1, 2022]],
            ['getWeek: uses a US Unicode region override', [2021, 1, 1], 'en-GB-u-rg-uszzzz', [1, 2021]],
            ['getWeek: uses a UK Unicode region override', [2021, 1, 1], 'en-US-u-rg-gbzzzz', [53, 2020]],
            ['getWeek: ignores region overrides in private-use subtags', [2021, 1, 1], 'en-US-x-u-rg-gbzzzz', [1, 2021]],
        ])('%s', function(_, input, locale, expected) {
            const date = DateTime.fromArray(input, { locale });

            assert.deepStrictEqual([date.getWeek(), date.getWeekYear()], expected);
        });
    });

    describe('Time fields', function() {
        it.each([
            ['getHours: returns the hours of the day', [2019, 1, 1, 6], 'getHours', 6],
            ['getHours: uses 24 hour time', [2019, 1, 1, 23], 'getHours', 23],
            ['getMilliseconds: returns the milliseconds of the second', [2019, 1, 1, 0, 0, 0, 550], 'getMilliseconds', 550],
            ['getMinutes: returns the minutes of the hour', [2019, 1, 1, 0, 32], 'getMinutes', 32],
            ['getSeconds: returns the seconds of the minute', [2019, 1, 1, 0, 0, 25], 'getSeconds', 25],
        ])('%s', function(_, input, method, expected) {
            const date = DateTime.fromArray(input);

            assert.strictEqual(date[method](), expected);
        });

        it('getTime: returns the time', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800)
                    .getTime(),
                1546300800000,
            );
        });

        it('getTimestamp: returns the timestamp', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800)
                    .getTimestamp(),
                1546300800,
            );
        });
    });

    describe('Locale and time zone', function() {
        it('getLocale: returns the locale', function() {
            assert.strictEqual(
                DateTime.fromArray([2019])
                    .getLocale(),
                'en',
            );
        });

        it('getTimeZone: returns the timezone', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .getTimeZone(),
                'Australia/Brisbane',
            );
        });

        it('getTimeZone: works with IANA zones containing GMT offsets', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Etc/GMT+10' })
                    .getTimeZone(),
                'Etc/GMT+10',
            );
        });

        it('getTimeZone: works with offsets with colon', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: '+10:00' })
                    .getTimeZone(),
                '+10:00',
            );
        });

        it('getTimeZone: works with offsets without colon', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: '+1000' })
                    .getTimeZone(),
                '+10:00',
            );
        });

        it('getTimeZoneOffset: returns the timezone', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .getTimeZoneOffset(),
                -600,
            );
        });

        it('getTimeZoneOffset: works with IANA zones containing GMT offsets', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Etc/GMT+10' })
                    .getTimeZoneOffset(),
                600,
            );
        });
    });
});
