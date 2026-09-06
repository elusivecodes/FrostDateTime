import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime Attributes With', function() {
    describe('#withDate', function() {
        it.each([
            ['sets the date of the month', [2019, 1, 1], [15], '2019-01-15T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['wraps around to next month', [2019, 6, 1], [31], '2019-07-01T00:00:00.000+00:00', '2019-06-01T00:00:00.000+00:00'],
        ])('%s', function(_, input, args, expected, original) {
            const date = DateTime.fromArray(input);
            const copy = date.withDate(...args);

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withDay', function() {
        it.each([
            ['sets the day of the week', [5], '2019-01-04T00:00:00.000+00:00'],
            ['sets to Monday for 1', [1], '2018-12-31T00:00:00.000+00:00'],
            ['sets to Sunday for 0', [0], '2018-12-30T00:00:00.000+00:00'],
            ['wraps around to next week', [12], '2019-01-11T00:00:00.000+00:00'],
        ])('%s', function(_, args, expected) {
            const date = DateTime.fromArray([2019, 1, 1]);
            const copy = date.withDay(...args);

            assert.strictEqual(date.toIsoString(), '2019-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withDayOfYear', function() {
        it.each([
            ['sets the day of the year', [235], '2019-08-23T00:00:00.000+00:00'],
            ['wraps around to next year', [500], '2020-05-14T00:00:00.000+00:00'],
        ])('%s', function(_, args, expected) {
            const date = DateTime.fromArray([2019, 1, 1]);
            const copy = date.withDayOfYear(...args);

            assert.strictEqual(date.toIsoString(), '2019-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withHours', function() {
        it.each([
            ['sets the hours of the day', [9], '2019-01-01T09:00:00.000+00:00'],
            ['uses 24 hour time', [13], '2019-01-01T13:00:00.000+00:00'],
            ['works with minutes argument', [0, 33], '2019-01-01T00:33:00.000+00:00'],
            ['works with seconds argument', [0, 0, 23], '2019-01-01T00:00:23.000+00:00'],
            ['works with milliseconds argument', [0, 0, 0, 303], '2019-01-01T00:00:00.303+00:00'],
            ['wraps around to next day', [30], '2019-01-02T06:00:00.000+00:00'],
        ])('%s', function(_, args, expected) {
            const date = DateTime.fromArray([2019, 1, 1]);
            const copy = date.withHours(...args);

            assert.strictEqual(date.toIsoString(), '2019-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withMilliseconds', function() {
        it.each([
            ['sets the milliseconds of the second', [220], '2019-01-01T00:00:00.220+00:00'],
            ['wraps around to next second', [1220], '2019-01-01T00:00:01.220+00:00'],
        ])('%s', function(_, args, expected) {
            const date = DateTime.fromArray([2019, 1, 1]);
            const copy = date.withMilliseconds(...args);

            assert.strictEqual(date.toIsoString(), '2019-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withMinutes', function() {
        it.each([
            ['sets the minutes of the hour', [15], '2019-01-01T00:15:00.000+00:00'],
            ['works with seconds argument', [0, 32], '2019-01-01T00:00:32.000+00:00'],
            ['works with milliseconds argument', [0, 0, 320], '2019-01-01T00:00:00.320+00:00'],
            ['wraps around to next hour', [75], '2019-01-01T01:15:00.000+00:00'],
        ])('%s', function(_, args, expected) {
            const date = DateTime.fromArray([2019, 1, 1]);
            const copy = date.withMinutes(...args);

            assert.strictEqual(date.toIsoString(), '2019-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withMonth', function() {
        it.each([
            ['sets the month of the year', [2019, 1, 1], [9], '2019-09-01T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['clamps current date', [2019, 1, 31], [2], '2019-02-28T00:00:00.000+00:00', '2019-01-31T00:00:00.000+00:00'],
            ['works with date argument', [2019, 1, 1], [1, 23], '2019-01-23T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['wraps around to next year', [2019, 1, 1], [15], '2020-03-01T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
        ])('%s', function(_, input, args, expected, original) {
            const date = DateTime.fromArray(input);
            const copy = date.withMonth(...args);

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });

        it('works with clampDates false', function() {
            DateTime.setDateClamping(false);
            const date1 = DateTime.fromArray([2019, 1, 31]);
            const date2 = date1.withMonth(2);
            assert.strictEqual(
                date1.toIsoString(),
                '2019-01-31T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toIsoString(),
                '2019-03-03T00:00:00.000+00:00',
            );
            DateTime.setDateClamping(true);
        });
    });

    describe('#withQuarter', function() {
        it.each([
            ['sets the quarter of the year', [2], '2019-04-01T00:00:00.000+00:00'],
            ['wraps around to next year', [6], '2020-04-01T00:00:00.000+00:00'],
        ])('%s', function(_, args, expected) {
            const date = DateTime.fromArray([2019, 1, 1]);
            const copy = date.withQuarter(...args);

            assert.strictEqual(date.toIsoString(), '2019-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withSeconds', function() {
        it.each([
            ['sets the seconds of the minute', [42], '2019-01-01T00:00:42.000+00:00'],
            ['works with milliseconds argument', [0, 550], '2019-01-01T00:00:00.550+00:00'],
            ['wraps around to next minute', [105], '2019-01-01T00:01:45.000+00:00'],
        ])('%s', function(_, args, expected) {
            const date = DateTime.fromArray([2019, 1, 1]);
            const copy = date.withSeconds(...args);

            assert.strictEqual(date.toIsoString(), '2019-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withTime', function() {
        it('sets the time', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.withTime(1546300800000);
            assert.strictEqual(
                date1.toIsoString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#withTimestamp', function() {
        it('sets the timestamp', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.withTimestamp(1546300800);
            assert.strictEqual(
                date1.toIsoString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#withTimeZone', function() {
        it('sets the timezone', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.withTimeZone('Australia/Brisbane');
            assert.strictEqual(
                date1.getTimeZone(),
                'UTC',
            );
            assert.strictEqual(
                date2.getTimeZone(),
                'Australia/Brisbane',
            );
        });

        it('works with offsets with colon', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.withTimeZone('+10:00');
            assert.strictEqual(
                date1.getTimeZoneOffset(),
                0,
            );
            assert.strictEqual(
                date2.getTimeZoneOffset(),
                -600,
            );
        });

        it('works with offsets without colon', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.withTimeZone('+1000');
            assert.strictEqual(
                date1.getTimeZoneOffset(),
                0,
            );
            assert.strictEqual(
                date2.getTimeZoneOffset(),
                -600,
            );
        });

        it('throws error with invalid timezone', function() {
            const date = new DateTime();
            assert.throws((_) => {
                date.withTimeZone('INVALID');
            });
        });
    });

    describe('#withTimeZoneOffset', function() {
        it('sets the offset', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.withTimeZoneOffset(600);
            assert.strictEqual(
                date1.getTimeZoneOffset(),
                0,
            );
            assert.strictEqual(
                date2.getTimeZoneOffset(),
                600,
            );
        });

        it('works with historical second-precision offsets', function() {
            const date1 = DateTime.fromArray([1800, 1, 1], { timeZone: 'Europe/Paris' });
            const date2 = date1.withTimeZoneOffset(date1.getTimeZoneOffset());
            assert.strictEqual(
                date2.getTimeZone(),
                '+00:09:21',
            );
        });

        it('allows whole-second offsets with floating-point rounding', function() {
            const date = DateTime.now().withTimeZoneOffset(31 / 60);
            assert.strictEqual(
                date.getTimeZone(),
                '-00:00:31',
            );
        });

        it('throws error with subsecond offsets', function() {
            assert.throws((_) => {
                DateTime.now().withTimeZoneOffset(0.001);
            }, /Invalid time zone offset supplied/);
        });
    });

    describe('#withWeek', function() {
        it.each([
            ['sets the week of the year', [2019, 1, 1], [23], '2019-06-04T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['uses the week year', [2019, 12, 30], [23], '2020-06-01T00:00:00.000+00:00', '2019-12-30T00:00:00.000+00:00'],
            ['works with day argument', [2019, 1, 1], [1, 6], '2019-01-04T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['wraps around to next year', [2019, 1, 1], [77], '2020-06-16T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
        ])('%s', function(_, input, args, expected, original) {
            const date = DateTime.fromArray(input);
            const copy = date.withWeek(...args);

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withWeekDay', function() {
        it.each([
            ['sets the day of the week', [6], '2019-01-04T00:00:00.000+00:00'],
            ['sets to Monday for 2', [2], '2018-12-31T00:00:00.000+00:00'],
            ['sets to Sunday for 1', [1], '2018-12-30T00:00:00.000+00:00'],
            ['wraps around to next week', [14], '2019-01-12T00:00:00.000+00:00'],
        ])('%s', function(_, args, expected) {
            const date = DateTime.fromArray([2019, 1, 1]);
            const copy = date.withWeekDay(...args);

            assert.strictEqual(date.toIsoString(), '2019-01-01T00:00:00.000+00:00');
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withWeekDayInMonth', function() {
        it.each([
            ['sets the week day in month', [2019, 6, 1], [4], '2019-06-22T00:00:00.000+00:00', '2019-06-01T00:00:00.000+00:00'],
            ['uses the local week', [2019, 6, 28], [1], '2019-06-07T00:00:00.000+00:00', '2019-06-28T00:00:00.000+00:00'],
        ])('%s', function(_, input, args, expected, original) {
            const date = DateTime.fromArray(input);
            const copy = date.withWeekDayInMonth(...args);

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withWeekOfMonth', function() {
        it.each([
            ['sets the week of the month', [2019, 6, 1], [4], '2019-06-22T00:00:00.000+00:00', '2019-06-01T00:00:00.000+00:00'],
            ['uses the local week', [2019, 6, 28], [1], '2019-05-31T00:00:00.000+00:00', '2019-06-28T00:00:00.000+00:00'],
        ])('%s', function(_, input, args, expected, original) {
            const date = DateTime.fromArray(input);
            const copy = date.withWeekOfMonth(...args);

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withWeekYear', function() {
        it.each([
            ['sets the week year', {
                input: [2019, 1, 1],
                args: [2018],
                expected: '2018-01-02T00:00:00.000+00:00',
                original: '2019-01-01T00:00:00.000+00:00',
            }],
            ['keeps the week', {
                input: [2019, 6, 1],
                args: [2018],
                expected: '2018-06-02T00:00:00.000+00:00',
                original: '2019-06-01T00:00:00.000+00:00',
            }],
            ['works with week argument', {
                input: [2019, 1, 1],
                args: [2018, 14],
                expected: '2018-04-03T00:00:00.000+00:00',
                original: '2019-01-01T00:00:00.000+00:00',
            }],
            ['works with day argument', {
                input: [2019, 1, 1],
                args: [2018, 1, 6],
                expected: '2018-01-05T00:00:00.000+00:00',
                original: '2019-01-01T00:00:00.000+00:00',
            }],
            ['uses the instance locale when clamping week counts', {
                input: [2015, 12, 31],
                args: [2020],
                expected: '2020-12-31T00:00:00.000+00:00',
                original: '2015-12-31T00:00:00.000+00:00',
                options: { locale: 'en-GB' },
            }],
        ])('%s', function(_, { input, args, expected, original, options = {} }) {
            const date = DateTime.fromArray(input, options);
            const copy = date.withWeekYear(...args);

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });

    describe('#withYear', function() {
        it.each([
            ['sets the year', [2019, 1, 1], [2018], '2018-01-01T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['works with months argument', [2019, 1, 1], [2018, 6], '2018-06-01T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['works with date argument', [2019, 1, 1], [2018, 1, 16], '2018-01-16T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['clamps leap day against the destination year', [2020, 2, 29], [2021], '2021-02-28T00:00:00.000+00:00', '2020-02-29T00:00:00.000+00:00'],
        ])('%s', function(_, input, args, expected, original) {
            const date = DateTime.fromArray(input);
            const copy = date.withYear(...args);

            assert.strictEqual(date.toIsoString(), original);
            assert.strictEqual(copy.toIsoString(), expected);
        });
    });
});
