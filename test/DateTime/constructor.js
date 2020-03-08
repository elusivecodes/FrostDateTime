const assert = require('assert').strict;
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime #constructor Tests', function() {

    describe('No Argument', function() {
        it('uses the current timestamp', function() {
            const start = Date.now();
            const now = new DateTime().getTime();
            const end = Date.now();
            assert.ok(start <= now && end >= now);
        });
    });

    describe('Timestamp Argument', function() {
        it('uses the provided timestamp', function() {
            assert.equal(
                new DateTime(1546300800000, 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });
    });

    describe('Date Argument', function() {
        it('uses the Date timestamp', function() {
            const date = new Date(1546300800000);
            assert.equal(
                new DateTime(date, 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });
    });

    describe('DateTime Argument', function() {
        it('uses the DateTime timestamp', function() {
            const date1 = new DateTime(1546300800000, 'UTC');
            const date2 = new DateTime(date1, 'UTC');
            assert.equal(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('uses the DateTime time zone', function() {
            const date1 = new DateTime(1546300800000, 'Australia/Brisbane');
            const date2 = new DateTime(date1);
            assert.equal(
                date1.toISOString(),
                '2019-01-01T10:00:00.0+10:00'
            );
            assert.equal(
                date2.toISOString(),
                '2019-01-01T10:00:00.0+10:00'
            );
        });

        it('allows modifying the DateTime time zone', function() {
            const date1 = new DateTime(1546300800000, 'UTC');
            const date2 = new DateTime(date1, 'Australia/Brisbane');
            assert.equal(
                date1.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2019-01-01T10:00:00.0+10:00'
            );
        });
    });

    describe('Date String Argument', function() {
        it('works with date string', function() {
            assert.equal(
                new DateTime('January 1, 2019 00:00:00', 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('works with ISO string', function() {
            assert.equal(
                new DateTime('2019-01-01T00:00:00', 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('works with partial string', function() {
            assert.equal(
                new DateTime('January 1, 2019', 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('throws error with invalid date string', function() {
            assert.throws(_ => {
                new DateTime('INVALID');
            });
        });
    });

    describe('Date Array Argument', function() {
        it('works with year', function() {
            assert.equal(
                new DateTime([2019], 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month', function() {
            assert.equal(
                new DateTime([2019, 1], 'UTC')
                    .toISOString(),
                '2019-02-01T00:00:00.0+00:00'
            );
        });

        it('works with date', function() {
            assert.equal(
                new DateTime([2019, 0, 2], 'UTC')
                    .toISOString(),
                '2019-01-02T00:00:00.0+00:00'
            );
        });

        it('works with hour', function() {
            assert.equal(
                new DateTime([2019, 0, 1, 1], 'UTC')
                    .toISOString(),
                '2019-01-01T01:00:00.0+00:00'
            );
        });

        it('works with minute', function() {
            assert.equal(
                new DateTime([2019, 0, 1, 0, 1], 'UTC')
                    .toISOString(),
                '2019-01-01T00:01:00.0+00:00'
            );
        });

        it('works with second', function() {
            assert.equal(
                new DateTime([2019, 0, 1, 0, 0, 1], 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:01.0+00:00'
            );
        });

        it('works with millisecond', function() {
            assert.equal(
                new DateTime([2019, 0, 1, 0, 0, 0, 1], 'UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.1+00:00'
            );
        });
    });

    describe('Time Zone Argument', function() {
        it('uses the provided time zone', function() {
            assert.equal(
                new DateTime(1546300800000, 'Australia/Brisbane')
                    .toISOString(),
                '2019-01-01T10:00:00.0+10:00'
            );
        });

        it('works with abbreviation', function() {
            assert.equal(
                new DateTime(1546300800000, 'AEST')
                    .toISOString(),
                '2019-01-01T10:00:00.0+10:00'
            );
        });

        it('works with offsets with colon', function() {
            assert.equal(
                new DateTime(1546300800000, '+10:00')
                    .toISOString(),
                '2019-01-01T10:00:00.0+10:00'
            );
        });

        it('works with offsets without colon', function() {
            assert.equal(
                new DateTime(1546300800000, '+1000')
                    .toISOString(),
                '2019-01-01T10:00:00.0+10:00'
            );
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                new DateTime(Date.now(), 'INVALID');
            });
        });
    });

    describe('Invalid Arguments', function() {
        it('throws error with invalid date', function() {
            assert.throws(_ => {
                new DateTime({ a: 1 });
            });
        });
    });

});
