const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Attributes Set', function() {

    describe('#setDate', function() {
        it('sets the date of the month', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setDate(15);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-15T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next month', function() {
            const date1 = DateTime.fromArray([2019, 6, 1]);
            const date2 = date1.setDate(31);
            assert.strictEqual(
                date1.toISOString(),
                '2019-07-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setDay', function() {
        it('sets the day of the week', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setDay(5);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-04T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('sets to Monday for 1', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setDay(1);
            assert.strictEqual(
                date1.toISOString(),
                '2018-12-31T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('sets to Sunday for 0', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setDay(0);
            assert.strictEqual(
                date1.toISOString(),
                '2018-12-30T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next week', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setDay(12);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-11T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setDayOfYear', function() {
        it('sets the day of the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setDayOfYear(235);
            assert.strictEqual(
                date1.toISOString(),
                '2019-08-23T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setDayOfYear(500);
            assert.strictEqual(
                date1.toISOString(),
                '2020-05-14T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setHours', function() {
        it('sets the hours of the day', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setHours(9);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T09:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('uses 24 hour time', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setHours(13);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T13:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with minutes argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setHours(0, 33);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:33:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with seconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setHours(0, 0, 23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:23.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setHours(0, 0, 0, 303);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.303+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next day', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setHours(30);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-02T06:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setMilliseconds', function() {
        it('sets the milliseconds of the second', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMilliseconds(220);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.220+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next second', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMilliseconds(1220);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:01.220+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setMinutes', function() {
        it('sets the minutes of the hour', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMinutes(15);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:15:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with seconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMinutes(0, 32);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:32.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMinutes(0, 0, 320);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.320+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next hour', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMinutes(75);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T01:15:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setMonth', function() {
        it('sets the month of the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMonth(9);
            assert.strictEqual(
                date1.toISOString(),
                '2019-09-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('clamps current date', function() {
            const date1 = DateTime.fromArray([2019, 1, 31]);
            const date2 = date1.setMonth(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-02-28T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with date argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMonth(1, 23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-23T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setMonth(15);
            assert.strictEqual(
                date1.toISOString(),
                '2020-03-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with clampDates false', function() {
            DateTime.setDateClamping(false);
            const date1 = DateTime.fromArray([2019, 1, 31]);
            const date2 = date1.setMonth(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-03-03T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
            DateTime.setDateClamping(true);
        });
    });

    describe('#setQuarter', function() {
        it('sets the quarter of the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setQuarter(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-04-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setQuarter(6);
            assert.strictEqual(
                date1.toISOString(),
                '2020-04-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setSeconds', function() {
        it('sets the seconds of the minute', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setSeconds(42);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:42.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setSeconds(0, 550);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.550+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next minute', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setSeconds(105);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:01:45.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setTime', function() {
        it('sets the time', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.setTime(1546300800000);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setTimestamp', function() {
        it('sets the timestamp', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.setTimestamp(1546300800);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setTimeZone', function() {
        it('sets the timezone', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.setTimeZone('Australia/Brisbane');
            assert.strictEqual(
                date1.getTimeZone(),
                'Australia/Brisbane'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with offsets with colon', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.setTimeZone('+10:00');
            assert.strictEqual(
                date1.getTimeZoneOffset(),
                -600
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with offsets without colon', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.setTimeZone('+1000');
            assert.strictEqual(
                date1.getTimeZoneOffset(),
                -600
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('throws error with invalid timezone', function() {
            const date = new DateTime();
            assert.throws(_ => {
                date.setTimeZone('INVALID');
            });
        });
    });

    describe('#setTimeZoneOffset', function() {
        it('sets the offset', function() {
            const date1 = DateTime.fromArray([2018, 1, 1]);
            const date2 = date1.setTimeZoneOffset(600);
            assert.strictEqual(
                date1.getTimeZoneOffset(),
                600
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setWeek', function() {
        it('sets the week of the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeek(23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-04T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('uses the week year', function() {
            const date1 = DateTime.fromArray([2019, 12, 30]);
            const date2 = date1.setWeek(23);
            assert.strictEqual(
                date1.toISOString(),
                '2020-06-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with day argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeek(1, 6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-04T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeek(77);
            assert.strictEqual(
                date1.toISOString(),
                '2020-06-16T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setWeekDay', function() {
        it('sets the day of the week', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeekDay(6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-04T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('sets to Monday for 2', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeekDay(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-12-31T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('sets to Sunday for 1', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeekDay(1);
            assert.strictEqual(
                date1.toISOString(),
                '2018-12-30T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('wraps around to next week', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeekDay(14);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-12T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setWeekDayInMonth', function() {
        it('sets the week day in month', function() {
            const date1 = DateTime.fromArray([2019, 6, 1]);
            const date2 = date1.setWeekDayInMonth(4);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-22T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('uses the local week', function() {
            const date1 = DateTime.fromArray([2019, 6, 28]);
            const date2 = date1.setWeekDayInMonth(1);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-07T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setWeekOfMonth', function() {
        it('sets the week of the month', function() {
            const date1 = DateTime.fromArray([2019, 6, 1]);
            const date2 = date1.setWeekOfMonth(4);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-22T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('uses the local week', function() {
            const date1 = DateTime.fromArray([2019, 6, 28]);
            const date2 = date1.setWeekOfMonth(1);
            assert.strictEqual(
                date1.toISOString(),
                '2019-05-31T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setWeekYear', function() {
        it('sets the week year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeekYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-02T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('keeps the week', function() {
            const date1 = DateTime.fromArray([2019, 6, 1]);
            const date2 = date1.setWeekYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-02T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with week argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeekYear(2018, 14);
            assert.strictEqual(
                date1.toISOString(),
                '2018-04-03T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with day argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setWeekYear(2018, 1, 6);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-05T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

    describe('#setYear', function() {
        it('sets the year', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with months argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setYear(2018, 6);
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-01T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });

        it('works with date argument', function() {
            const date1 = DateTime.fromArray([2019, 1, 1]);
            const date2 = date1.setYear(2018, 1, 16);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-16T00:00:00.000+00:00'
            );
            assert.strictEqual(
                date1,
                date2
            );
        });
    });

});
