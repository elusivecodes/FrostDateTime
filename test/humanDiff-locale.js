import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime #humanDiff (Locale)', function() {
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

    it('works with year', function() {
        assert.strictEqual(
            DateTime.fromArray([2018], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2017]),
                    { timeUnit: 'year' },
                ),
            'в следующем году',
        );
    });

    it('works with years', function() {
        assert.strictEqual(
            DateTime.fromArray([2018], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2016]),
                    { timeUnit: 'years' },
                ),
            'через 2 года',
        );
    });

    it('works with year (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2017], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018]),
                    { timeUnit: 'year' },
                ),
            'в прошлом году',
        );
    });

    it('works with years (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2016], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018]),
                    { timeUnit: 'years' },
                ),
            '2 года назад',
        );
    });

    it('works with years (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2016, 2]),
                    { timeUnit: 'years' },
                ),
            'через 2 года',
        );
    });

    it('works with month', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 7], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6]),
                    { timeUnit: 'month' },
                ),
            'в следующем месяце',
        );
    });

    it('works with months', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 9], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6]),
                    { timeUnit: 'months' },
                ),
            'через 3 месяца',
        );
    });

    it('works with month (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 7]),
                    { timeUnit: 'month' },
                ),
            'в прошлом месяце',
        );
    });

    it('works with months (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 9]),
                    { timeUnit: 'months' },
                ),
            '3 месяца назад',
        );
    });

    it('works with months (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 9, 1], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 2]),
                    { timeUnit: 'month' },
                ),
            'через 3 месяца',
        );
    });

    it('works with months and years', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 9], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2016, 6]),
                    { timeUnit: 'month' },
                ),
            'через 27 месяцев',
        );
    });

    it('works with week', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 16]),
                    { timeUnit: 'week' },
                ),
            'на следующей неделе',
        );
    });

    it('works with weeks', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 5, 15]),
                    { timeUnit: 'weeks' },
                ),
            'через 5 недель',
        );
    });

    it('works with week (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 16], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 23]),
                    { timeUnit: 'week' },
                ),
            'на прошлой неделе',
        );
    });

    it('works with weeks (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 5, 15], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 23]),
                    { timeUnit: 'weeks' },
                ),
            '5 недель назад',
        );
    });

    it('works with weeks (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 8], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 1, 1]),
                    { timeUnit: 'weeks' },
                ),
            'на следующей неделе',
        );
    });

    it('works with weeks and months', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 8, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15]),
                    { timeUnit: 'weeks' },
                ),
            'через 10 недель',
        );
    });

    it('works with day', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 22]),
                    { timeUnit: 'day' },
                ),
            'завтра',
        );
    });

    it('works with days', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15]),
                    { timeUnit: 'days' },
                ),
            'через 8 дней',
        );
    });

    it('works with day (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 22], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 23]),
                    { timeUnit: 'day' },
                ),
            'вчера',
        );
    });

    it('works with days (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 23]),
                    { timeUnit: 'days' },
                ),
            '8 дней назад',
        );
    });

    it('works with days (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 23, 0], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 1]),
                    { timeUnit: 'days' },
                ),
            'через 8 дней',
        );
    });

    it('works with days and months', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 8, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15]),
                    { timeUnit: 'days' },
                ),
            'через 69 дней',
        );
    });

    it('works with hour', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 22]),
                    { timeUnit: 'hour' },
                ),
            'через 1 час',
        );
    });

    it('works with hours', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12]),
                    { timeUnit: 'hours' },
                ),
            'через 11 часов',
        );
    });

    it('works with hour (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 22], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 23]),
                    { timeUnit: 'hour' },
                ),
            '1 час назад',
        );
    });

    it('works with hours (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 23]),
                    { timeUnit: 'hours' },
                ),
            '11 часов назад',
        );
    });

    it('works with hours (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 23, 0], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 1]),
                    { timeUnit: 'hours' },
                ),
            'через 11 часов',
        );
    });

    it('works with hours and days', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 18, 23], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12]),
                    { timeUnit: 'hours' },
                ),
            'через 83 часа',
        );
    });

    it('works with minute', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 29]),
                    { timeUnit: 'minute' },
                ),
            'через 1 минуту',
        );
    });

    it('works with minutes', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 15]),
                    { timeUnit: 'minutes' },
                ),
            'через 15 минут',
        );
    });

    it('works with minute (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 29], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 30]),
                    { timeUnit: 'minute' },
                ),
            '1 минуту назад',
        );
    });

    it('works with minutes (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 15], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 30]),
                    { timeUnit: 'minutes' },
                ),
            '15 минут назад',
        );
    });

    it('works with minutes (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 0], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 15, 1]),
                    { timeUnit: 'minutes' },
                ),
            'через 15 минут',
        );
    });

    it('works with minutes and hours', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 16, 30], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 15]),
                    { timeUnit: 'minutes' },
                ),
            'через 255 минут',
        );
    });

    it('works with second', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 30], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 29]),
                    { timeUnit: 'second' },
                ),
            'через 1 секунду',
        );
    });

    it('works with seconds', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 30], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    { timeUnit: 'seconds' },
                ),
            'через 15 секунд',
        );
    });

    it('works with second (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 29], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 30]),
                    { timeUnit: 'second' },
                ),
            '1 секунду назад',
        );
    });

    it('works with seconds (negative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 15], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 30]),
                    { timeUnit: 'seconds' },
                ),
            '15 секунд назад',
        );
    });

    it('works with seconds (relative)', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 30, 30, 0], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 15, 1]),
                    { timeUnit: 'seconds' },
                ),
            'через 15 секунд',
        );
    });

    it('works with seconds and minutes', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 6, 15, 12, 50, 30], { locale: 'ru' })
                .humanDiff(
                    DateTime.fromArray([2018, 6, 15, 12, 30, 15]),
                    { timeUnit: 'seconds' },
                ),
            'через 1 215 секунд',
        );
    });
});
