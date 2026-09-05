import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

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
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with ISO string', function() {
            assert.strictEqual(
                new DateTime('2019-01-01T00:00:00')
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with early ISO dates', function() {
            assert.strictEqual(
                new DateTime('0099-01-01', { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm:ss.SSS'),
                '0099-01-01 00:00:00.000',
            );
        });

        it('works with ISO year string', function() {
            assert.strictEqual(
                new DateTime('2019', { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm:ss.SSS'),
                '2019-01-01 00:00:00.000',
            );
        });

        it('works with ISO year and month string', function() {
            assert.strictEqual(
                new DateTime('2019-02', { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm:ss.SSS'),
                '2019-02-01 00:00:00.000',
            );
        });

        it('works with ISO date string in a time zone', function() {
            assert.strictEqual(
                new DateTime('2019-02-03', { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm:ss.SSS'),
                '2019-02-03 00:00:00.000',
            );
        });

        it('works with space-separated ISO string without seconds', function() {
            assert.strictEqual(
                new DateTime('2019-02-03 04:05', { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm:ss.SSS'),
                '2019-02-03 04:05:00.000',
            );
        });

        it('works with space-separated ISO string with fractional seconds', function() {
            assert.strictEqual(
                new DateTime('2019-02-03 04:05:06.7891', { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm:ss.SSS'),
                '2019-02-03 04:05:06.789',
            );
        });

        it('works with ISO string without seconds', function() {
            assert.strictEqual(
                new DateTime('2019-02-03T04:05', { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm:ss.SSS'),
                '2019-02-03 04:05:00.000',
            );
        });

        it('works with ISO string with fractional seconds', function() {
            assert.strictEqual(
                new DateTime('2019-02-03T04:05:06.7891', { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm:ss.SSS'),
                '2019-02-03 04:05:06.789',
            );
        });

        it('moves forward through a deleted calendar day', function() {
            assert.strictEqual(
                new DateTime('2011-12-30T12:00', { timeZone: 'Pacific/Apia' })
                    .toString(),
                'Sat Dec 31 2011 12:00:00 +1400 (Pacific/Apia)',
            );
        });

        it('works with ISO string with Z', function() {
            assert.strictEqual(
                new DateTime('2019-01-01T00:00:00Z')
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with ISO string with offset', function() {
            assert.strictEqual(
                new DateTime('2019-01-01T00:00:00+10:00')
                    .toIsoString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });

        it('works with ISO string with negative offset', function() {
            assert.strictEqual(
                new DateTime('2019-01-01T00:00:00-05:30')
                    .toIsoString(),
                '2019-01-01T05:30:00.000+00:00',
            );
        });

        it('does not reinterpret explicit offsets in the requested time zone', function() {
            assert.strictEqual(
                new DateTime('2019-01-01T00:00:00+00:00', { timeZone: 'America/New_York' })
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it.each([
            '2024-01-01T12:00:00.1Z',
            '2024-01-01T12:00:00.12Z',
            '2024-01-01T12:00:00.123Z',
            '2024-01-01T12:00:00.123456Z',
            '2024-01-01T12:00:00.1+10:00',
            '2024-01-01T12:00:00.12-05:30',
            'Tue, 01 Jan 2019 00:00:00 +1000',
            'Tue, 01 Jan 2019 00:00:00 -0530',
        ])('preserves the instant for zoned string %s', function(dateString) {
            for (const timeZone of ['UTC', 'Australia/Brisbane']) {
                assert.strictEqual(
                    new DateTime(dateString, { timeZone }).getTime(),
                    Date.parse(dateString),
                );
            }
        });

        it('works with partial string', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019')
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zone', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: 'Australia/Brisbane' })
                    .toIsoString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });

        it('works with offsets with colon', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: '+10:00' })
                    .toIsoString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });

        it('works with offsets without colon', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: '+1000' })
                    .toIsoString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });

        it('works with second-precision offsets with colons', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: '+00:09:21' })
                    .toIsoString(),
                '2018-12-31T23:50:39.000+00:00',
            );
        });

        it('works with compact second-precision offsets', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: '+000921' })
                    .toIsoString(),
                '2018-12-31T23:50:39.000+00:00',
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)',
            );
        });

        it('works with minute-offset time zones', function() {
            assert.strictEqual(
                new DateTime('January 1, 2019 00:00:00', { timeZone: 'Asia/Kathmandu' })
                    .toIsoString(),
                '2018-12-31T18:15:00.000+00:00',
            );
        });

        it('does not mutate options', function() {
            const options = { timeZone: 'Australia/Brisbane' };

            new DateTime('January 1, 2019 00:00:00', options);

            assert.deepStrictEqual(
                options,
                { timeZone: 'Australia/Brisbane' },
            );
        });

        it('throws error with invalid date string', function() {
            assert.throws((_) => {
                new DateTime('INVALID');
            });
        });

        it('throws error with invalid date', function() {
            assert.throws((_) => {
                new DateTime({ a: 1 });
            });
        });

        it('throws error with invalid timezone', function() {
            assert.throws((_) => {
                new DateTime(Date.now(), { timeZone: 'INVALID' });
            });
        });

        it('throws error with offsets of 24 hours', function() {
            assert.throws((_) => {
                new DateTime(Date.now(), { timeZone: '+24:00' });
            }, /Invalid time zone specified: \+24:00/);
        });
    });

    describe('#fromArray', function() {
        it('works with year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019])
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 2])
                    .toIsoString(),
                '2019-02-01T00:00:00.000+00:00',
            );
        });

        it('works with date', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 2])
                    .toIsoString(),
                '2019-01-02T00:00:00.000+00:00',
            );
        });

        it('works with hour', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1])
                    .toIsoString(),
                '2019-01-01T01:00:00.000+00:00',
            );
        });

        it('works with minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 1])
                    .toIsoString(),
                '2019-01-01T00:01:00.000+00:00',
            );
        });

        it('works with second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 1])
                    .toIsoString(),
                '2019-01-01T00:00:01.000+00:00',
            );
        });

        it('works with millisecond', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 1])
                    .toIsoString(),
                '2019-01-01T00:00:00.001+00:00',
            );
        });

        it('works with time zone', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0], { timeZone: 'Australia/Brisbane' })
                    .toString(),
                'Tue Jan 01 2019 00:00:00 +1000 (Australia/Brisbane)',
            );
        });

        it('works with year 1 in an IANA time zone', function() {
            assert.strictEqual(
                DateTime.fromArray([1, 6, 1, 12], { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm G'),
                '0001-06-01 12:00 AD',
            );
        });

        it('works with year zero in an IANA time zone', function() {
            assert.strictEqual(
                DateTime.fromArray([0, 6, 1, 12], { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm G'),
                '0000-06-01 12:00 AD',
            );
        });

        it('works with year 99 in an IANA time zone', function() {
            assert.strictEqual(
                DateTime.fromArray([99, 6, 1, 12], { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm G'),
                '0099-06-01 12:00 AD',
            );
        });

        it('works with year 100 in an IANA time zone', function() {
            assert.strictEqual(
                DateTime.fromArray([100, 6, 1, 12], { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm G'),
                '0100-06-01 12:00 AD',
            );
        });

        it('works with BC years in an IANA time zone', function() {
            assert.strictEqual(
                DateTime.fromArray([-1, 6, 1, 12], { timeZone: 'Australia/Brisbane' })
                    .format('yyyy-MM-dd HH:mm G'),
                '0001-06-01 12:00 BC',
            );
        });

        it('works with early years in UTC', function() {
            assert.strictEqual(
                DateTime.fromArray([1, 6, 1, 12], { timeZone: 'UTC' })
                    .format('yyyy-MM-dd HH:mm G'),
                '0001-06-01 12:00 AD',
            );
        });

        it('works with early years in fixed offset time zones', function() {
            assert.strictEqual(
                DateTime.fromArray([1, 6, 1, 12], { timeZone: '+10:00' })
                    .format('yyyy-MM-dd HH:mm G'),
                '0001-06-01 12:00 AD',
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0], { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)',
            );
        });

        it('returns a new DateTime', function() {
            assert.ok(
                DateTime.fromArray([2018]).constructor === DateTime,
            );
        });
    });

    describe('#fromDate', function() {
        it('works with date', function() {
            const date = new Date(1546300800000);
            assert.strictEqual(
                DateTime.fromDate(date)
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zone', function() {
            const date = new Date(1546300800000);
            assert.strictEqual(
                DateTime.fromDate(date, { timeZone: 'Australia/Brisbane' })
                    .toString(),
                'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)',
            );
        });

        it('works with locale', function() {
            const date = new Date(1546300800000);
            assert.strictEqual(
                DateTime.fromDate(date, { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)',
            );
        });

        it('returns a new DateTime', function() {
            const date = new Date();
            assert.ok(
                DateTime.fromDate(date).constructor === DateTime,
            );
        });
    });

    describe('#fromISOString', function() {
        it('works with date', function() {
            assert.strictEqual(
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00')
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with milliseconds', function() {
            assert.strictEqual(
                DateTime.fromISOString('2019-01-01T00:00:00.123+00:00')
                    .toIsoString(),
                '2019-01-01T00:00:00.123+00:00',
            );
        });

        it('works with time zone', function() {
            assert.strictEqual(
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00', { timeZone: 'Australia/Brisbane' })
                    .toString(),
                'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)',
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00', { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)',
            );
        });

        it('returns a new DateTime', function() {
            assert.ok(
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00').constructor === DateTime,
            );
        });

        it('throws on trailing characters', function() {
            assert.throws((_) => {
                DateTime.fromISOString('2019-01-01T00:00:00.000+00:00abc');
            });
        });
    });

    describe('#fromTimestamp', function() {
        it('works with timestamp', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800)
                    .toIsoString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zone', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800, { timeZone: 'Australia/Brisbane' })
                    .toString(),
                'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)',
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                DateTime.fromTimestamp(1546300800, { locale: 'ar-eg' })
                    .toString(),
                'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)',
            );
        });

        it('returns a new DateTime', function() {
            assert.ok(
                DateTime.fromTimestamp(1546300800).constructor === DateTime,
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
                'Australia/Brisbane',
            );
        });

        it('works with locale', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ar-eg' })
                    .getLocale(),
                'ar-eg',
            );
        });

        it('returns a new DateTime', function() {
            assert.ok(
                DateTime.now().constructor === DateTime,
            );
        });
    });
});
