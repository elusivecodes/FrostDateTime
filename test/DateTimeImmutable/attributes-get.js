const assert = require('assert').strict;
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Attributes Get Tests', function() {

    describe('#getBeat', function() {
        it('returns the beat', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1, 15, 35, 0, 0], 'UTC')
                    .getBeat(),
                690
            );
        });
    });

    describe('#getDate', function() {
        it('returns the date of the month', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 31], 'UTC')
                    .getDate(),
                31
            );
        });
    });

    describe('#getDay', function() {
        it('returns the day of the week', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1], 'UTC')
                    .getDay(),
                2
            );
        });

        it('returns 1 for Monday', function() {
            assert.equal(
                new DateTimeImmutable([2018, 11, 31], 'UTC')
                    .getDay(),
                1
            );
        });

        it('returns 0 for Sunday', function() {
            assert.equal(
                new DateTimeImmutable([2018, 11, 30], 'UTC')
                    .getDay(),
                0
            );
        });
    });

    describe('#getDayOfYear', function() {
        it('returns the day of the year', function() {
            assert.equal(
                new DateTimeImmutable([2019, 5, 1], 'UTC')
                    .getDayOfYear(),
                152
            );
        });
    });

    describe('#getHours', function() {
        it('returns the hours of the day', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1, 6], 'UTC')
                    .getHours(),
                6
            );
        });

        it('uses 24 hour time', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1, 23], 'UTC')
                    .getHours(),
                23
            );
        });
    });

    describe('#getISODay', function() {
        it('returns the ISO day of the week', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1], 'UTC')
                    .getISODay(),
                2
            );
        });

        it('returns 1 for Monday', function() {
            assert.equal(
                new DateTimeImmutable([2018, 11, 31], 'UTC')
                    .getISODay(),
                1
            );
        });

        it('returns 7 for Sunday', function() {
            assert.equal(
                new DateTimeImmutable([2018, 11, 30], 'UTC')
                    .getISODay(),
                7
            );
        });
    });

    describe('#getISOWeek', function() {
        it('returns the ISO week of the year', function() {
            assert.equal(
                new DateTimeImmutable([2019, 5, 1], 'UTC')
                    .getISOWeek(),
                22
            );
        });

        it('uses the ISO year', function() {
            assert.equal(
                new DateTimeImmutable([2019, 11, 30], 'UTC')
                    .getISOWeek(),
                1
            );
        });
    });

    describe('#getISOYear', function() {
        it('returns the ISO year', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1], 'UTC')
                    .getISOYear(),
                2019
            );
        });

        it('uses the year of Thursday of the current week', function() {
            assert.equal(
                new DateTimeImmutable([2019, 11, 30], 'UTC')
                    .getISOYear(),
                2020
            );
        });
    });

    describe('#getMilliseconds', function() {
        it('returns the milliseconds of the second', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1, 0, 0, 0, 550], 'UTC')
                    .getMilliseconds(),
                550
            );
        });
    });

    describe('#getMinutes', function() {
        it('returns the minutes of the hour', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1, 0, 32], 'UTC')
                    .getMinutes(),
                32
            );
        });
    });

    describe('#getMonth', function() {
        it('returns the month of the year', function() {
            assert.equal(
                new DateTimeImmutable([2019, 5, 1], 'UTC')
                    .getMonth(),
                5
            );
        });
    });

    describe('#getQuarter', function() {
        it('returns the quarter of the year', function() {
            assert.equal(
                new DateTimeImmutable([2019, 7, 0], 'UTC')
                    .getQuarter(),
                3
            );
        });
    });

    describe('#getSeconds', function() {
        it('returns the seconds of the minute', function() {
            assert.equal(
                new DateTimeImmutable([2019, 0, 1, 0, 0, 25], 'UTC')
                    .getSeconds(),
                25
            );
        });
    });

    describe('#getTime', function() {
        it('returns the time', function() {
            assert.equal(
                new DateTimeImmutable(1546300800000, 'UTC')
                    .getTime(),
                1546300800000
            );
        });
    });

    describe('#getTimestamp', function() {
        it('returns the timestamp', function() {
            assert.equal(
                new DateTimeImmutable(1546300800000, 'UTC')
                    .getTimestamp(),
                1546300800
            );
        });
    });

    describe('#getTimeZone', function() {
        it('returns the timezone', function() {
            assert.equal(
                new DateTimeImmutable(Date.now(), 'Australia/Brisbane')
                    .getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with abbreviation', function() {
            new DateTimeImmutable(Date.now(), 'AEST')
                .getTimeZone(),
                'AEST'
        });

        it('works with offsets with colon', function() {
            new DateTimeImmutable(Date.now(), '+10:00')
                .getTimeZone(),
                '+10:00'
        });

        it('works with offsets without colon', function() {
            new DateTimeImmutable(Date.now(), '+1000')
                .getTimeZone(),
                '+10000'
        });
    });

    describe('#getTimeZoneOffset', function() {
        it('returns the timezone', function() {
            assert.equal(
                new DateTimeImmutable(Date.now(), 'Australia/Brisbane')
                    .getTimeZoneOffset(),
                -600
            );
        });
    });

    describe('#getYear', function() {
        it('returns the year', function() {
            assert.equal(
                new DateTimeImmutable([2018], 'UTC')
                    .getYear(),
                2018
            );
        });
    });

});
