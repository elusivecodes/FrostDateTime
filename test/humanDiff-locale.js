import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime Human Difference (Locale)', function() {
    describe('#humanDiff', function() {
        it('returns the difference in human readable form (years)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ru' })
                    .humanDiff(
                        DateTime.fromArray([2016]),
                    ),
                'через 2 года',
            );
        });

        it('returns the difference in human readable form (months)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1], { locale: 'ru' })
                    .humanDiff(
                        DateTime.fromArray([2018, 4]),
                    ),
                '3 месяца назад',
            );
        });

        it('returns the difference in human readable form (weeks)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1], { locale: 'ru' })
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 23]),
                    ),
                '3 недели назад',
            );
        });

        it('returns the difference in human readable form (days)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1], { locale: 'ru' })
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 4]),
                    ),
                '3 дня назад',
            );
        });

        it('returns the difference in human readable form (hours)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0], { locale: 'ru' })
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 1, 11]),
                    ),
                '11 часов назад',
            );
        });

        it('returns the difference in human readable form (minutes)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 0], { locale: 'ru' })
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 1, 0, 9]),
                    ),
                '9 минут назад',
            );
        });

        it('returns the difference in human readable form (seconds)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 0, 15], { locale: 'ru' })
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 1, 0, 0, 0]),
                    ),
                'через 15 секунд',
            );
        });

        it('returns the difference in human readable form (now)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0, 0, 0], { locale: 'ru' })
                    .humanDiff(
                        DateTime.fromArray([2018, 1, 1, 0, 0, 0]),
                    ),
                'сейчас',
            );
        });
    });

    describe('#humanDiffInDays', function() {
        it('works with day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23], { locale: 'ru' })
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 22]),
                    ),
                'завтра',
            );
        });

        it('works with days', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23], { locale: 'ru' })
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                'через 8 дней',
            );
        });

        it('works with day (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 22], { locale: 'ru' })
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                'вчера',
            );
        });

        it('works with days (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15], { locale: 'ru' })
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                '8 дней назад',
            );
        });

        it('works with days (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23, 0], { locale: 'ru' })
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 15, 1]),
                    ),
                'через 8 дней',
            );
        });

        it('works with days and months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8, 23], { locale: 'ru' })
                    .humanDiffInDays(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                'через 69 дней',
            );
        });
    });

    describe('#humanDiffInHours', function() {
        it('works with hour', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 23], { locale: 'ru' })
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 22]),
                    ),
                'через 1 час',
            );
        });

        it('works with hours', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 23], { locale: 'ru' })
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 12]),
                    ),
                'через 11 часов',
            );
        });

        it('works with hour (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 22], { locale: 'ru' })
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 23]),
                    ),
                '1 час назад',
            );
        });

        it('works with hours (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12], { locale: 'ru' })
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 23]),
                    ),
                '11 часов назад',
            );
        });

        it('works with hours (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 23, 0], { locale: 'ru' })
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 12, 1]),
                    ),
                'через 11 часов',
            );
        });

        it('works with hours and days', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 18, 23], { locale: 'ru' })
                    .humanDiffInHours(
                        DateTime.fromArray([2018, 6, 15, 12]),
                    ),
                'через 83 часа',
            );
        });
    });

    describe('#humanDiffInMinutes', function() {
        it('works with minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30], { locale: 'ru' })
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 29]),
                    ),
                'через 1 минуту',
            );
        });

        it('works with minutes', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30], { locale: 'ru' })
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 15]),
                    ),
                'через 15 минут',
            );
        });

        it('works with minute (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 29], { locale: 'ru' })
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 30]),
                    ),
                '1 минуту назад',
            );
        });

        it('works with minutes (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 15], { locale: 'ru' })
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 30]),
                    ),
                '15 минут назад',
            );
        });

        it('works with minutes (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 0], { locale: 'ru' })
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 15, 1]),
                    ),
                'через 15 минут',
            );
        });

        it('works with minutes and hours', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 16, 30], { locale: 'ru' })
                    .humanDiffInMinutes(
                        DateTime.fromArray([2018, 6, 15, 12, 15]),
                    ),
                'через 255 минут',
            );
        });
    });

    describe('#humanDiffInMonths', function() {
        it('works with month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 7], { locale: 'ru' })
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 6]),
                    ),
                'в следующем месяце',
            );
        });

        it('works with months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9], { locale: 'ru' })
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 6]),
                    ),
                'через 3 месяца',
            );
        });

        it('works with month (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6], { locale: 'ru' })
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 7]),
                    ),
                'в прошлом месяце',
            );
        });

        it('works with months (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6], { locale: 'ru' })
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 9]),
                    ),
                '3 месяца назад',
            );
        });

        it('works with months (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9, 1], { locale: 'ru' })
                    .humanDiffInMonths(
                        DateTime.fromArray([2018, 6, 2]),
                    ),
                'через 3 месяца',
            );
        });

        it('works with months and years', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 9], { locale: 'ru' })
                    .humanDiffInMonths(
                        DateTime.fromArray([2016, 6]),
                    ),
                'через 27 месяцев',
            );
        });
    });

    describe('#humanDiffInSeconds', function() {
        it('works with second', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30], { locale: 'ru' })
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 29]),
                    ),
                'через 1 секунду',
            );
        });

        it('works with seconds', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30], { locale: 'ru' })
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    ),
                'через 15 секунд',
            );
        });

        it('works with second (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 29], { locale: 'ru' })
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 30]),
                    ),
                '1 секунду назад',
            );
        });

        it('works with seconds (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 15], { locale: 'ru' })
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 30]),
                    ),
                '15 секунд назад',
            );
        });

        it('works with seconds (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 30, 30, 0], { locale: 'ru' })
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 15, 1]),
                    ),
                'через 15 секунд',
            );
        });

        it('works with seconds and minutes', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 15, 12, 50, 30], { locale: 'ru' })
                    .humanDiffInSeconds(
                        DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    ),
                'через 1 215 секунд',
            );
        });
    });

    describe('#humanDiffInWeeks', function() {
        it('works with week', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23], { locale: 'ru' })
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 6, 16]),
                    ),
                'на следующей неделе',
            );
        });

        it('works with weeks', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 23], { locale: 'ru' })
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 5, 15]),
                    ),
                'через 5 недель',
            );
        });

        it('works with week (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 16], { locale: 'ru' })
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                'на прошлой неделе',
            );
        });

        it('works with weeks (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 5, 15], { locale: 'ru' })
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 6, 23]),
                    ),
                '5 недель назад',
            );
        });

        it('works with weeks (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 8], { locale: 'ru' })
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 1, 1]),
                    ),
                'на следующей неделе',
            );
        });

        it('works with weeks and months', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8, 23], { locale: 'ru' })
                    .humanDiffInWeeks(
                        DateTime.fromArray([2018, 6, 15]),
                    ),
                'через 10 недель',
            );
        });
    });

    describe('#humanDiffInYears', function() {
        it('works with year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ru' })
                    .humanDiffInYears(
                        DateTime.fromArray([2017]),
                    ),
                'в следующем году',
            );
        });

        it('works with years', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ru' })
                    .humanDiffInYears(
                        DateTime.fromArray([2016]),
                    ),
                'через 2 года',
            );
        });

        it('works with year (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2017], { locale: 'ru' })
                    .humanDiffInYears(
                        DateTime.fromArray([2018]),
                    ),
                'в прошлом году',
            );
        });

        it('works with years (negative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2016], { locale: 'ru' })
                    .humanDiffInYears(
                        DateTime.fromArray([2018]),
                    ),
                '2 года назад',
            );
        });

        it('works with years (relative)', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1], { locale: 'ru' })
                    .humanDiffInYears(
                        DateTime.fromArray([2016, 2]),
                    ),
                'через 2 года',
            );
        });
    });
});
