const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Attributes Set', function() {

    describe('#setBeat', function() {
        it('sets the beat', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setBeat(230);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T04:31:12.0+00:00'
            );
        });

        it('wraps around to next day', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setBeat(1500);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-02T11:00:00.0+00:00'
            );
        });
    });

    describe('#setDate', function() {
        it('sets the date of the month', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setDate(15);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-15T00:00:00.0+00:00'
            );
        });

        it('wraps around to next month', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 6, 1], 'UTC');
            const date2 = date1.setDate(31);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-07-01T00:00:00.0+00:00'
            );
        });
    });

    describe('#setDay', function() {
        it('sets the day of the week', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setDay(5);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-04T00:00:00.0+00:00'
            );
        });

        it('sets to Monday for 1', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setDay(1);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-12-31T00:00:00.0+00:00'
            );
        });

        it('sets to Sunday for 0', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setDay(0);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-12-30T00:00:00.0+00:00'
            );
        });

        it('wraps around to next week', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setDay(12);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-11T00:00:00.0+00:00'
            );
        });
    });

    describe('#setDayOfYear', function() {
        it('sets the day of the year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setDayOfYear(235);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-08-23T00:00:00.0+00:00'
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setDayOfYear(500);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-05-14T00:00:00.0+00:00'
            );
        });
    });

    describe('#setHours', function() {
        it('sets the hours of the day', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setHours(9);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T09:00:00.0+00:00'
            );
        });

        it('uses 24 hour time', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setHours(13);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T13:00:00.0+00:00'
            );
        });

        it('works with minutes argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setHours(0, 33);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:33:00.0+00:00'
            );
        });

        it('works with seconds argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setHours(0, 0, 23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:23.0+00:00'
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setHours(0, 0, 0, 303);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.303+00:00'
            );
        });

        it('wraps around to next day', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setHours(30);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-02T06:00:00.0+00:00'
            );
        });
    });

    describe('#setISODay', function() {
        it('sets the ISO day of the week', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISODay(5);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-04T00:00:00.0+00:00'
            );
        });

        it('sets to Monday for 1', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISODay(1);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-12-31T00:00:00.0+00:00'
            );
        });

        it('sets to Sunday for 7', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISODay(7);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-06T00:00:00.0+00:00'
            );
        });

        it('wraps around to next week', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISODay(13);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-12T00:00:00.0+00:00'
            );
        });
    });

    describe('#setISOWeek', function() {
        it('sets the ISO week of the year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISOWeek(23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-06-04T00:00:00.0+00:00'
            );
        });

        it('uses the ISO year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 12, 30], 'UTC');
            const date2 = date1.setISOWeek(23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-12-30T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-06-01T00:00:00.0+00:00'
            );
        });

        it('works with day argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISOWeek(1, 5);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-04T00:00:00.0+00:00'
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISOWeek(77);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-06-16T00:00:00.0+00:00'
            );
        });
    });

    describe('#setISOYear', function() {
        it('sets the ISO year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISOYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-02T00:00:00.0+00:00'
            );
        });

        it('keeps the ISO week', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 6, 1], 'UTC');
            const date2 = date1.setISOYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2019-06-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-02T00:00:00.0+00:00'
            );
        });

        it('works with week argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISOYear(2018, 14);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-04-03T00:00:00.0+00:00'
            );
        });

        it('works with day argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setISOYear(2018, 1, 5);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-05T00:00:00.0+00:00'
            );
        });
    });

    describe('#setMilliseconds', function() {
        it('sets the milliseconds of the second', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMilliseconds(220);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.220+00:00'
            );
        });

        it('wraps around to next second', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMilliseconds(1220);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:01.220+00:00'
            );
        });
    });

    describe('#setMinutes', function() {
        it('sets the minutes of the hour', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMinutes(15);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:15:00.0+00:00'
            );
        });

        it('works with seconds argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMinutes(0, 32);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:32.0+00:00'
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMinutes(0, 0, 320);
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.320+00:00'
            );
        });

        it('wraps around to next hour', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMinutes(75);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T01:15:00.0+00:00'
            );
        });
    });

    describe('#setMonth', function() {
        it('sets the month of the year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMonth(9);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-09-01T00:00:00.0+00:00'
            );
        });

        it('clamps current date', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 31], 'UTC');
            const date2 = date1.setMonth(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-31T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-02-28T00:00:00.0+00:00'
            );
        });

        it('works with date argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMonth(1, 23);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-23T00:00:00.0+00:00'
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setMonth(15);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-03-01T00:00:00.0+00:00'
            );
        });

        it('works with clampDates false', function() {
            DateTimeImmutable.clampDates = false;
            const date1 = DateTimeImmutable.fromArray([2019, 1, 31], 'UTC');
            const date2 = date1.setMonth(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-31T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-03-03T00:00:00.0+00:00'
            );
            DateTimeImmutable.clampDates = true;
        });
    });

    describe('#setQuarter', function() {
        it('sets the quarter of the year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setQuarter(2);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-04-01T00:00:00.0+00:00'
            );
        });

        it('wraps around to next year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setQuarter(6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-04-01T00:00:00.0+00:00'
            );
        });
    });

    describe('#setSeconds', function() {
        it('sets the seconds of the minute', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setSeconds(42);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:42.0+00:00'
            );
        });

        it('works with milliseconds argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setSeconds(0, 550);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.550+00:00'
            );
        });

        it('wraps around to next minute', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setSeconds(105);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:01:45.0+00:00'
            );
        });
    });

    describe('#setTime', function() {
        it('sets the time', function() {
            const date1 = DateTimeImmutable.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.setTime(1546300800000);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });
    });

    describe('#setTimestamp', function() {
        it('sets the timestamp', function() {
            const date1 = DateTimeImmutable.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.setTimestamp(1546300800);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });
    });

    describe('#setTimeZone', function() {
        it('sets the timezone', function() {
            const date1 = DateTimeImmutable.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.setTimeZone('Australia/Brisbane');
            assert.strictEqual(
                date1.getTimeZone(),
                'UTC'
            );
            assert.strictEqual(
                date2.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with offsets with colon', function() {
            const date1 = DateTimeImmutable.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.setTimeZone('+10:00');
            assert.strictEqual(
                date1.getTimeZone(),
                'UTC'
            );
            assert.strictEqual(
                date2.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offsets without colon', function() {
            const date1 = DateTimeImmutable.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.setTimeZone('+1000');
            assert.strictEqual(
                date1.getTimeZone(),
                'UTC'
            );
            assert.strictEqual(
                date2.getTimeZoneOffset(),
                -600
            );
        });

        it('throws error with invalid timezone', function() {
            const date = new DateTimeImmutable();
            assert.throws(_ => {
                date.setTimeZone('INVALID');
            });
        });
    });

    describe('#setTimeZoneOffset', function() {
        it('sets the offset', function() {
            const date1 = DateTimeImmutable.fromArray([2018, 1, 1], 'UTC');
            const date2 = date1.setTimeZoneOffset(600);
            assert.strictEqual(
                date1.getTimeZoneOffset(),
                0
            );
            assert.strictEqual(
                date2.getTimeZoneOffset(),
                600
            );
        });
    });

    describe('#setYear', function() {
        it('sets the year', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setYear(2018);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });

        it('works with months argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setYear(2018, 6);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-01T00:00:00.0+00:00'
            );
        });

        it('works with date argument', function() {
            const date1 = DateTimeImmutable.fromArray([2019, 1, 1], 'UTC');
            const date2 = date1.setYear(2018, 1, 16);
            assert.strictEqual(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-16T00:00:00.0+00:00'
            );
        });
    });

});
