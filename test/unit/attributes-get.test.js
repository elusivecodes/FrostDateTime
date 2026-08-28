import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Attributes Get', function() {
    describe('#getDate', function() {
        it('returns the date of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 31])
                    .getDate(),
                31,
            );
        });
    });

    describe('#getDay', function() {
        it('returns the day of the week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .getDay(),
                2,
            );
        });

        it('returns 1 for Monday', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 12, 31])
                    .getDay(),
                1,
            );
        });

        it('returns 0 for Sunday', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 12, 30])
                    .getDay(),
                0,
            );
        });
    });

    describe('#getDayOfYear', function() {
        it('returns the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .getDayOfYear(),
                152,
            );
        });
    });

    describe('#getHours', function() {
        it('returns the hours of the day', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 6])
                    .getHours(),
                6,
            );
        });

        it('uses 24 hour time', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23])
                    .getHours(),
                23,
            );
        });
    });

    describe('#getLocale', function() {
        it('returns the locale', function() {
            assert.strictEqual(
                DateTime.fromArray([2019])
                    .getLocale(),
                'en',
            );
        });
    });

    describe('#getMilliseconds', function() {
        it('returns the milliseconds of the second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 550])
                    .getMilliseconds(),
                550,
            );
        });
    });

    describe('#getMinutes', function() {
        it('returns the minutes of the hour', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 32])
                    .getMinutes(),
                32,
            );
        });
    });

    describe('#getMonth', function() {
        it('returns the month of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .getMonth(),
                6,
            );
        });
    });

    describe('#getQuarter', function() {
        it('returns the quarter of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 8, 1])
                    .getQuarter(),
                3,
            );
        });
    });

    describe('#getSeconds', function() {
        it('returns the seconds of the minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 25])
                    .getSeconds(),
                25,
            );
        });
    });

    describe('#getTime', function() {
        it('returns the time', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800)
                    .getTime(),
                1546300800000,
            );
        });
    });

    describe('#getTimestamp', function() {
        it('returns the timestamp', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800)
                    .getTimestamp(),
                1546300800,
            );
        });
    });

    describe('#getTimeZone', function() {
        it('returns the timezone', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .getTimeZone(),
                'Australia/Brisbane',
            );
        });

        it('works with IANA zones containing GMT offsets', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Etc/GMT+10' })
                    .getTimeZone(),
                'Etc/GMT+10',
            );
        });

        it('works with offsets with colon', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: '+10:00' })
                    .getTimeZone(),
                '+10:00',
            );
        });

        it('works with offsets without colon', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: '+1000' })
                    .getTimeZone(),
                '+10:00',
            );
        });
    });

    describe('#getTimeZoneOffset', function() {
        it('returns the timezone', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .getTimeZoneOffset(),
                -600,
            );
        });

        it('works with IANA zones containing GMT offsets', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Etc/GMT+10' })
                    .getTimeZoneOffset(),
                600,
            );
        });
    });

    describe('#getWeek', function() {
        it('returns the week of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .getWeek(),
                22,
            );
        });

        it('uses the week year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30])
                    .getWeek(),
                1,
            );
        });

        it('works before a spring DST transition', function() {
            assert.strictEqual(
                DateTime.fromArray([2024, 3, 3], { timeZone: 'America/New_York' })
                    .getWeek(),
                10,
            );
        });

        it('works during a spring DST transition', function() {
            assert.strictEqual(
                DateTime.fromArray([2024, 3, 10], { timeZone: 'America/New_York' })
                    .getWeek(),
                11,
            );
        });

        it('works after a spring DST transition', function() {
            assert.strictEqual(
                DateTime.fromArray([2024, 3, 17], { timeZone: 'America/New_York' })
                    .getWeek(),
                12,
            );
        });

        it('works before an autumn DST transition', function() {
            assert.strictEqual(
                DateTime.fromArray([2024, 10, 27], { timeZone: 'America/New_York' })
                    .getWeek(),
                44,
            );
        });

        it('works during an autumn DST transition', function() {
            assert.strictEqual(
                DateTime.fromArray([2024, 11, 3], { timeZone: 'America/New_York' })
                    .getWeek(),
                45,
            );
        });

        it('works after an autumn DST transition', function() {
            assert.strictEqual(
                DateTime.fromArray([2024, 11, 10], { timeZone: 'America/New_York' })
                    .getWeek(),
                46,
            );
        });

        it('preserves the region in language-script-region locales', function() {
            const date = DateTime.fromArray([2021, 1, 1], { locale: 'en-Latn-GB' });

            assert.deepStrictEqual(
                [date.getWeek(), date.getWeekYear()],
                [53, 2020],
            );
        });

        it('uses regional overrides of the language minimum days', function() {
            const date = DateTime.fromArray([2022, 1, 1], { locale: 'da-GL' });

            assert.deepStrictEqual(
                [date.getWeek(), date.getWeekYear()],
                [1, 2022],
            );
        });

        it('uses a US Unicode region override', function() {
            const date = DateTime.fromArray([2021, 1, 1], {
                locale: 'en-GB-u-rg-uszzzz',
            });

            assert.deepStrictEqual(
                [date.getWeek(), date.getWeekYear()],
                [1, 2021],
            );
        });

        it('uses a UK Unicode region override', function() {
            const date = DateTime.fromArray([2021, 1, 1], {
                locale: 'en-US-u-rg-gbzzzz',
            });

            assert.deepStrictEqual(
                [date.getWeek(), date.getWeekYear()],
                [53, 2020],
            );
        });

        it('ignores region overrides in private-use subtags', function() {
            const date = DateTime.fromArray([2021, 1, 1], {
                locale: 'en-US-x-u-rg-gbzzzz',
            });

            assert.deepStrictEqual(
                [date.getWeek(), date.getWeekYear()],
                [1, 2021],
            );
        });
    });

    describe('#getWeekDay', function() {
        it('returns the day of the week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .getWeekDay(),
                3,
            );
        });

        it('returns 2 for Monday', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 12, 31])
                    .getWeekDay(),
                2,
            );
        });

        it('returns 1 for Sunday', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 12, 30])
                    .getWeekDay(),
                1,
            );
        });
    });

    describe('#getWeekDayInMonth', function() {
        it('returns the week day in month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .getWeekDayInMonth(),
                1,
            );
        });

        it('uses the local week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 7])
                    .getWeekDayInMonth(),
                1,
            );
        });
    });

    describe('#getWeekOfMonth', function() {
        it('returns the week of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .getWeekOfMonth(),
                1,
            );
        });

        it('uses the local week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 3])
                    .getWeekOfMonth(),
                2,
            );
        });
    });

    describe('#getWeekYear', function() {
        it('returns the week year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .getWeekYear(),
                2019,
            );
        });

        it('uses the year of Thursday of the current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30])
                    .getWeekYear(),
                2020,
            );
        });
    });

    describe('#getYear', function() {
        it('returns the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .getYear(),
                2018,
            );
        });
    });
});
