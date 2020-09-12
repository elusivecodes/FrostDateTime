const assert = require('assert').strict;
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Creation', function() {

    describe('#constructor', function() {
        it('works with no argument', function() {
            const start = Date.now();
            const now = new DateTimeImmutable().getTime();
            const end = Date.now();
            assert.ok(start <= now && end >= now);
        });

        it('works with date string', function() {
            assert.equal(
                new DateTimeImmutable('January 1, 2019 00:00:00', 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('works with ISO string', function() {
            assert.equal(
                new DateTimeImmutable('2019-01-01T00:00:00', 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('works with partial string', function() {
            assert.equal(
                new DateTimeImmutable('January 1, 2019', 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('uses the provided time zone', function() {
            assert.equal(
                new DateTimeImmutable('January 1, 2019 00:00:00', 'Australia/Brisbane')
                    .toISOString(),
                '2019-01-01T00:00:00.0+10:00'
            );
        });

        it('works with abbreviation', function() {
            assert.equal(
                new DateTimeImmutable('January 1, 2019 00:00:00', 'AEST')
                    .toISOString(),
                '2019-01-01T00:00:00.0+10:00'
            );
        });

        it('works with offsets with colon', function() {
            assert.equal(
                new DateTimeImmutable('January 1, 2019 00:00:00', '+10:00')
                    .toISOString(),
                '2019-01-01T00:00:00.0+10:00'
            );
        });

        it('works with offsets without colon', function() {
            assert.equal(
                new DateTimeImmutable('January 1, 2019 00:00:00', '+1000')
                    .toISOString(),
                '2019-01-01T00:00:00.0+10:00'
            );
        });

        it('throws error with invalid date string', function() {
            assert.throws(_ => {
                new DateTimeImmutable('INVALID');
            });
        });

        it('throws error with invalid date', function() {
            assert.throws(_ => {
                new DateTimeImmutable({ a: 1 });
            });
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                new DateTimeImmutable(Date.now(), 'INVALID');
            });
        });
    });

    describe('#fromArray', function() {
        it('works with year', function() {
            assert.equal(
                DateTimeImmutable.fromArray([2019], 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month', function() {
            assert.equal(
                DateTimeImmutable.fromArray([2019, 2], 'UTC')
                    .toISOString(),
                '2019-02-01T00:00:00.0+00:00'
            );
        });

        it('works with date', function() {
            assert.equal(
                DateTimeImmutable.fromArray([2019, 1, 2], 'UTC')
                    .toISOString(),
                '2019-01-02T00:00:00.0+00:00'
            );
        });

        it('works with hour', function() {
            assert.equal(
                DateTimeImmutable.fromArray([2019, 1, 1, 1], 'UTC')
                    .toISOString(),
                '2019-01-01T01:00:00.0+00:00'
            );
        });

        it('works with minute', function() {
            assert.equal(
                DateTimeImmutable.fromArray([2019, 1, 1, 0, 1], 'UTC')
                    .toISOString(),
                '2019-01-01T00:01:00.0+00:00'
            );
        });

        it('works with second', function() {
            assert.equal(
                DateTimeImmutable.fromArray([2019, 1, 1, 0, 0, 1], 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:01.0+00:00'
            );
        });

        it('works with millisecond', function() {
            assert.equal(
                DateTimeImmutable.fromArray([2019, 1, 1, 0, 0, 0, 1], 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.1+00:00'
            );
        });
    });

    describe('#fromDate', function() {
        it('works with date', function() {
            const date = new Date(1546300800000);
            assert.equal(
                DateTimeImmutable.fromDate(date, 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });
    });

    describe('#fromObject', function() {
        it('uses the year', function() {
            const date = DateTimeImmutable.fromObject({
                year: 2018
            });
            assert.equal(
                date.getYear(),
                2018
            );
        });

        it('uses the month', function() {
            const date = DateTimeImmutable.fromObject({
                month: 1
            });
            assert.equal(
                date.getMonth(),
                1
            );
        });

        it('uses the date', function() {
            const date = DateTimeImmutable.fromObject({
                date: 1
            });
            assert.equal(
                date.getDate(),
                1
            );
        });

        it('uses the hours', function() {
            const date = DateTimeImmutable.fromObject({
                hours: 0
            });
            assert.equal(
                date.getHours(),
                0
            );
        });

        it('uses the minutes', function() {
            const date = DateTimeImmutable.fromObject({
                minutes: 0
            });
            assert.equal(
                date.getMinutes(),
                0
            );
        });

        it('uses the seconds', function() {
            const date = DateTimeImmutable.fromObject({
                seconds: 0
            });
            assert.equal(
                date.getSeconds(),
                0
            );
        });

        it('uses the milliseconds', function() {
            const date = DateTimeImmutable.fromObject({
                milliseconds: 0
            });
            assert.equal(
                date.getMilliseconds(),
                0
            );
        });

        it('uses the timezone', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: 'Australia/Brisbane'
            });
            assert.equal(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with abbreviation', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: 'AEST'
            });
            assert.equal(
                date.getTimeZone(),
                'AEST'
            );
        });

        it('works with offset with colon', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: '+10:00'
            });
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offset without colon', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: '+1000'
            });
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with timezone argument', function() {
            const date = DateTimeImmutable.fromObject({}, 'Australia/Brisbane');
            assert.equal(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with offset with colon', function() {
            const date = DateTimeImmutable.fromObject({}, '+10:00');
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offset without colon', function() {
            const date = DateTimeImmutable.fromObject({}, '+1000');
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('does not overwrite timezone when specified in object', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: 'UTC'
            }, 'Australia/Brisbane');
            assert.equal(
                date.getTimeZone(),
                'UTC'
            );
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                DateTimeImmutable.fromObject({
                    timeZone: 'INVALID'
                });
            });
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                DateTimeImmutable.fromObject({}, 'INVALID');
            });
        });
    });

    describe('#fromTimestamp', function() {
        it('uses the provided timestamp', function() {
            assert.equal(
                DateTimeImmutable.fromTimestamp(1546300800, 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });
    });

    describe('#now', function() {
        it('creates a DateTime with the current timestamp', function() {
            const start = Date.now();
            const now = DateTimeImmutable.now();
            const end = Date.now();
            assert.ok(start <= now && end >= now);
        });

        it('uses the provided time zone', function() {
            assert.equal(
                DateTimeImmutable.now('Australia/Brisbane')
                    .getTimeZone(),
                'Australia/Brisbane'
            );
        });
    });

});
