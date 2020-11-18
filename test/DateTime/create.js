const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Creation', function() {

    describe('#constructor', function() {
        it('works with no argument', function() {
            const start = Date.now();
            const now = new DateTime().getTime();
            const end = Date.now();
            assert.ok(start <= now && end >= now);
        });

        it('works with date string', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with ISO string', function() {
            assert.strictEqual(
                new DateTime('2019-01-01T00:00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with partial string', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zone', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: 'Australia/Brisbane' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });

        it('works with offsets with colon', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: '+10:00' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });

        it('works with offsets without colon', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: '+1000' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)'
            );
        });

        it('throws error with invalid date string', function() {
            assert.throws(_ => {
                new DateTime('INVALID');
            });
        });

        it('throws error with invalid date', function() {
            assert.throws(_ => {
                new DateTime({ a: 1 });
            });
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                new DateTime(Date.now(), { timeZone: 'INVALID' });
            });
        });
    });

    describe('#fromArray', function() {
        it('works with year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019])
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 2])
                    .toISOString(),
                '2019-02-01T00:00:00.000+00:00'
            );
        });

        it('works with date', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 2])
                    .toISOString(),
                '2019-01-02T00:00:00.000+00:00'
            );
        });

        it('works with hour', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1])
                    .toISOString(),
                '2019-01-01T01:00:00.000+00:00'
            );
        });

        it('works with minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 1])
                    .toISOString(),
                '2019-01-01T00:01:00.000+00:00'
            );
        });

        it('works with second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 1])
                    .toISOString(),
                '2019-01-01T00:00:01.000+00:00'
            );
        });

        it('works with millisecond', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 1])
                    .toISOString(),
                '2019-01-01T00:00:00.100+00:00'
            );
        });

        it('works with time zone', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0], { timeZone: 'Australia/Brisbane' })
                    .toString(),
                'Tue Jan 01 2019 00:00:00 +1000 (Australia/Brisbane)'
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0], { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)'
            );
        });

        it('returns a new DateTime', function() {
            assert.ok(
                DateTime.fromArray([2018]).constructor === DateTime
            );
        });
    });

    describe('#fromDate', function() {
        it('works with date', function() {
            const date = new Date(1546300800000);
            assert.strictEqual(
                DateTime.fromDate(date)
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zone', function() {
            const date = new Date(1546300800000);
            assert.strictEqual(
                DateTime.fromDate(date, { timeZone: 'Australia/Brisbane' })
                    .toString(),
                'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)'
            );
        });

        it('works with locale', function() {
            const date = new Date(1546300800000);
            assert.strictEqual(
                DateTime.fromDate(date, { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)'
            );
        });

        it('returns a new DateTime', function() {
            const date = new Date();
            assert.ok(
                DateTime.fromDate(date).constructor === DateTime
            );
        });
    });

    describe('#fromISOString', function() {
        it('works with date', function() {
            assert.strictEqual(
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zone', function() {
            assert.strictEqual(
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00', { timeZone: 'Australia/Brisbane' })
                    .toString(),
                'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)'
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00', { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)'
            );
        });

        it('returns a new DateTime', function() {
            assert.ok(
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00').constructor === DateTime
            );
        });
    });

    describe('#fromTimestamp', function() {
        it('works with timestamp', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800)
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zone', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800, { timeZone: 'Australia/Brisbane' })
                    .toString(),
                'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)'
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800, { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)'
            );
        });

        it('returns a new DateTime', function() {
            assert.ok(
                DateTime.fromTimestamp(1546300800).constructor === DateTime
            );
        });
    });

    describe('#now', function() {
        it('creates a DateTime with the current timestamp', function() {
            const start = Date.now();
            const now = DateTime.now();
            const end = Date.now();
            assert.ok(start <= now && end >= now);
        });

        it('works with time zone', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ar-eg' })
                    .getLocale(),
                'ar-eg'
            );
        });

        it('returns a new DateTime', function() {
            assert.ok(
                DateTime.now().constructor === DateTime
            );
        });
    });

});
