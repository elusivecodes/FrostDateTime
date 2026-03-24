import assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import DateTime from '../../src/index.js';

describe('DateTime Attributes With', function() {
    describe('#withDate', function() {
        it('sets the date of the month', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withDate(15);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-15T00:00:00.000+00:00',
            );
        });

        it('wraps around to next month', function() {
            const date1 = DateTime.fromArray([2019, 6, 1]);
            const date2 = date1.withDate(31);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-07-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#withDay', function() {
        it('sets the day of the week', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withDay(5);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-04T00:00:00.000+00:00',
            );
        });

        it('sets to Monday for 1', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withDay(1);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-12-31T00:00:00.000+00:00',
            );
        });

        it('sets to Sunday for 0', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withDay(0);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-12-30T00:00:00.000+00:00',
            );
        });

        it('wraps around to next week', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withDay(12);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-11T00:00:00.000+00:00',
            );
        });
    });

    describe('#withDayOfYear', function() {
        it('sets the day of the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withDayOfYear(235);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-08-23T00:00:00.000+00:00',
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withDayOfYear(500);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-05-14T00:00:00.000+00:00',
            );
        });
    });

    describe('#withHours', function() {
        it('sets the hours of the day', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withHours(9);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T09:00:00.000+00:00',
            );
        });

        it('uses 24 hour time', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withHours(13);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T13:00:00.000+00:00',
            );
        });

        it('works with minutes argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withHours(0, 33);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:33:00.000+00:00',
            );
        });

        it('works with seconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withHours(0, 0, 23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:23.000+00:00',
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withHours(0, 0, 0, 303);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.303+00:00',
            );
        });

        it('wraps around to next day', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withHours(30);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-02T06:00:00.000+00:00',
            );
        });
    });

    describe('#withMilliseconds', function() {
        it('sets the milliseconds of the second', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMilliseconds(220);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.220+00:00',
            );
        });

        it('wraps around to next second', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMilliseconds(1220);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:01.220+00:00',
            );
        });
    });

    describe('#withMinutes', function() {
        it('sets the minutes of the hour', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMinutes(15);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:15:00.000+00:00',
            );
        });

        it('works with seconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMinutes(0, 32);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:32.000+00:00',
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMinutes(0, 0, 320);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.320+00:00',
            );
        });

        it('wraps around to next hour', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMinutes(75);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T01:15:00.000+00:00',
            );
        });
    });

    describe('#withMonth', function() {
        it('sets the month of the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMonth(9);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-09-01T00:00:00.000+00:00',
            );
        });

        it('clamps current date', function() {
            const date1 = DateTime.fromArray([2019, 1, 31]);
            const date2 = date1.withMonth(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-31T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-02-28T00:00:00.000+00:00',
            );
        });

        it('works with date argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMonth(1, 23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-23T00:00:00.000+00:00',
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withMonth(15);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-03-01T00:00:00.000+00:00',
            );
        });

        it('works with clampDates false', function() {
            DateTime.setDateClamping(false);
            const date1 = DateTime.fromArray([2019, 1, 31]);
            const date2 = date1.withMonth(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-31T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-03-03T00:00:00.000+00:00',
            );
            DateTime.setDateClamping(true);
        });
    });

    describe('#withQuarter', function() {
        it('sets the quarter of the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withQuarter(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-04-01T00:00:00.000+00:00',
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withQuarter(6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-04-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#withSeconds', function() {
        it('sets the seconds of the minute', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withSeconds(42);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:42.000+00:00',
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withSeconds(0, 550);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.550+00:00',
            );
        });

        it('wraps around to next minute', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withSeconds(105);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:01:45.000+00:00',
            );
        });
    });

    describe('#withTime', function() {
        it('sets the time', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.withTime(1546300800000);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#withTimestamp', function() {
        it('sets the timestamp', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.withTimestamp(1546300800);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
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
    });

    describe('#withWeek', function() {
        it('sets the week of the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeek(23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-06-04T00:00:00.000+00:00',
            );
        });

        it('uses the week year', function() {
            const date1 = DateTime.fromArray([2019, 12, 30]);
            const date2 = date1.withWeek(23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-12-30T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-06-01T00:00:00.000+00:00',
            );
        });

        it('works with day argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeek(1, 6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-04T00:00:00.000+00:00',
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeek(77);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-06-16T00:00:00.000+00:00',
            );
        });
    });

    describe('#withWeekDay', function() {
        it('sets the day of the week', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeekDay(6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-04T00:00:00.000+00:00',
            );
        });

        it('sets to Monday for 2', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeekDay(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-12-31T00:00:00.000+00:00',
            );
        });

        it('sets to Sunday for 1', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeekDay(1);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-12-30T00:00:00.000+00:00',
            );
        });

        it('wraps around to next week', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeekDay(14);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-12T00:00:00.000+00:00',
            );
        });
    });

    describe('#withWeekDayInMonth', function() {
        it('sets the week day in month', function() {
            const date1 = DateTime.fromArray([2019, 6, 1]);
            const date2 = date1.withWeekDayInMonth(4);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-06-22T00:00:00.000+00:00',
            );
        });

        it('uses the local week', function() {
            const date1 = DateTime.fromArray([2019, 6, 28]);
            const date2 = date1.withWeekDayInMonth(1);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-28T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-06-07T00:00:00.000+00:00',
            );
        });
    });

    describe('#withWeekOfMonth', function() {
        it('sets the week of the month', function() {
            const date1 = DateTime.fromArray([2019, 6, 1]);
            const date2 = date1.withWeekOfMonth(4);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-06-22T00:00:00.000+00:00',
            );
        });

        it('uses the local week', function() {
            const date1 = DateTime.fromArray([2019, 6, 28]);
            const date2 = date1.withWeekOfMonth(1);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-28T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-05-31T00:00:00.000+00:00',
            );
        });
    });

    describe('#withWeekYear', function() {
        it('sets the week year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeekYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-02T00:00:00.000+00:00',
            );
        });

        it('keeps the week', function() {
            const date1 = DateTime.fromArray([2019, 6, 1]);
            const date2 = date1.withWeekYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-02T00:00:00.000+00:00',
            );
        });

        it('works with week argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeekYear(2018, 14);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-04-03T00:00:00.000+00:00',
            );
        });

        it('works with day argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withWeekYear(2018, 1, 6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-05T00:00:00.000+00:00',
            );
        });

        it('uses the instance locale when clamping week counts', function() {
            const date1 = DateTime.fromArray([2015, 1, 1], { locale: 'en-GB' });
            const date2 = date1.withWeekYear(2014);
            assert.strictEqual(
                date1.toISOString(),
                '2015-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2015-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#withYear', function() {
        it('sets the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
        });

        it('works with months argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withYear(2018, 6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-01T00:00:00.000+00:00',
            );
        });

        it('works with date argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.withYear(2018, 1, 16);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-16T00:00:00.000+00:00',
            );
        });

        it('clamps leap day against the destination year', function() {
            const date1 = DateTime.fromArray([2020, 2, 29]);
            const date2 = date1.withYear(2021);
            assert.strictEqual(
                date1.toISOString(),
                '2020-02-29T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2021-02-28T00:00:00.000+00:00',
            );
        });
    });
});
