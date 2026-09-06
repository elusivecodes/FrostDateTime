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

        it.each([
            ['works with date string', 'January 1, 2019 00:00:00', '2019-01-01T00:00:00.000+00:00'],
            ['works with ISO string', '2019-01-01T00:00:00', '2019-01-01T00:00:00.000+00:00'],
            ['works with ISO string with Z', '2019-01-01T00:00:00Z', '2019-01-01T00:00:00.000+00:00'],
            ['works with ISO string with offset', '2019-01-01T00:00:00+10:00', '2018-12-31T14:00:00.000+00:00'],
            ['works with ISO string with negative offset', '2019-01-01T00:00:00-05:30', '2019-01-01T05:30:00.000+00:00'],
            ['does not reinterpret explicit offsets in the requested time zone', '2019-01-01T00:00:00+00:00', '2019-01-01T00:00:00.000+00:00', { timeZone: 'America/New_York' }],
            ['works with partial string', 'January 1, 2019', '2019-01-01T00:00:00.000+00:00'],
            ['works with time zone', 'January 1, 2019 00:00:00', '2018-12-31T14:00:00.000+00:00', { timeZone: 'Australia/Brisbane' }],
            ['works with offsets with colon', 'January 1, 2019 00:00:00', '2018-12-31T14:00:00.000+00:00', { timeZone: '+10:00' }],
            ['works with offsets without colon', 'January 1, 2019 00:00:00', '2018-12-31T14:00:00.000+00:00', { timeZone: '+1000' }],
            ['works with second-precision offsets with colons', 'January 1, 2019 00:00:00', '2018-12-31T23:50:39.000+00:00', { timeZone: '+00:09:21' }],
            ['works with compact second-precision offsets', 'January 1, 2019 00:00:00', '2018-12-31T23:50:39.000+00:00', { timeZone: '+000921' }],
            ['works with minute-offset time zones', 'January 1, 2019 00:00:00', '2018-12-31T18:15:00.000+00:00', { timeZone: 'Asia/Kathmandu' }],
        ])('%s', function(_, input, expected, options = {}) {
            const date = new DateTime(input, options);

            assert.strictEqual(date.toIsoString(), expected);
        });

        it.each([
            ['works with early ISO dates', '0099-01-01', '0099-01-01 00:00:00.000'],
            ['works with ISO year string', '2019', '2019-01-01 00:00:00.000'],
            ['works with ISO year and month string', '2019-02', '2019-02-01 00:00:00.000'],
            ['works with ISO date string in a time zone', '2019-02-03', '2019-02-03 00:00:00.000'],
            ['works with space-separated ISO string without seconds', '2019-02-03 04:05', '2019-02-03 04:05:00.000'],
            ['works with space-separated ISO string with fractional seconds', '2019-02-03 04:05:06.7891', '2019-02-03 04:05:06.789'],
            ['works with ISO string without seconds', '2019-02-03T04:05', '2019-02-03 04:05:00.000'],
            ['works with ISO string with fractional seconds', '2019-02-03T04:05:06.7891', '2019-02-03 04:05:06.789'],
        ])('%s', function(_, input, expected) {
            const date = new DateTime(input, { timeZone: 'Australia/Brisbane' });

            assert.strictEqual(date.format('yyyy-MM-dd HH:mm:ss.SSS'), expected);
        });

        it.each([
            ['moves forward through a deleted calendar day', '2011-12-30T12:00', 'Sat Dec 31 2011 12:00:00 +1400 (Pacific/Apia)', { timeZone: 'Pacific/Apia' }],
            ['works with locale', 'January 1, 2019 00:00:00', 'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)', { locale: 'ar-eg' }],
        ])('%s', function(_, input, expected, options = {}) {
            const date = new DateTime(input, options);

            assert.strictEqual(date.toString(), expected);
        });

        describe.each(['UTC', 'Australia/Brisbane'])('zoned strings displayed in %s', function(timeZone) {
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
                assert.strictEqual(
                    new DateTime(dateString, { timeZone }).getTime(),
                    Date.parse(dateString),
                );
            });
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
        it.each([
            ['works with year', [2019], '2019-01-01T00:00:00.000+00:00'],
            ['works with month', [2019, 2], '2019-02-01T00:00:00.000+00:00'],
            ['works with date', [2019, 1, 2], '2019-01-02T00:00:00.000+00:00'],
            ['works with hour', [2019, 1, 1, 1], '2019-01-01T01:00:00.000+00:00'],
            ['works with minute', [2019, 1, 1, 0, 1], '2019-01-01T00:01:00.000+00:00'],
            ['works with second', [2019, 1, 1, 0, 0, 1], '2019-01-01T00:00:01.000+00:00'],
            ['works with millisecond', [2019, 1, 1, 0, 0, 0, 1], '2019-01-01T00:00:00.001+00:00'],
        ])('%s', function(_, input, expected) {
            const date = DateTime.fromArray(input);

            assert.strictEqual(date.toIsoString(), expected);
        });

        it.each([
            ['works with time zone', 'Tue Jan 01 2019 00:00:00 +1000 (Australia/Brisbane)', { timeZone: 'Australia/Brisbane' }],
            ['works with locale', 'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)', { locale: 'ar-eg' }],
        ])('%s', function(_, expected, options = {}) {
            const date = DateTime.fromArray([2019, 1, 1, 0, 0, 0], options);

            assert.strictEqual(date.toString(), expected);
        });

        it.each([
            ['works with year 1 in an IANA time zone', [1, 6, 1, 12], '0001-06-01 12:00 AD', { timeZone: 'Australia/Brisbane' }],
            ['works with year zero in an IANA time zone', [0, 6, 1, 12], '0001-06-01 12:00 BC', { timeZone: 'Australia/Brisbane' }],
            ['works with year 99 in an IANA time zone', [99, 6, 1, 12], '0099-06-01 12:00 AD', { timeZone: 'Australia/Brisbane' }],
            ['works with year 100 in an IANA time zone', [100, 6, 1, 12], '0100-06-01 12:00 AD', { timeZone: 'Australia/Brisbane' }],
            ['works with BC years in an IANA time zone', [-1, 6, 1, 12], '0002-06-01 12:00 BC', { timeZone: 'Australia/Brisbane' }],
            ['works with early years in UTC', [1, 6, 1, 12], '0001-06-01 12:00 AD', { timeZone: 'UTC' }],
            ['works with early years in fixed offset time zones', [1, 6, 1, 12], '0001-06-01 12:00 AD', { timeZone: '+10:00' }],
        ])('%s', function(_, input, expected, options = {}) {
            const date = DateTime.fromArray(input, options);

            assert.strictEqual(date.format('yyyy-MM-dd HH:mm G'), expected);
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

        it.each([
            ['works with time zone', 'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)', { timeZone: 'Australia/Brisbane' }],
            ['works with locale', 'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)', { locale: 'ar-eg' }],
        ])('%s', function(_, expected, options = {}) {
            const date = DateTime.fromDate(new Date(1546300800000), options);

            assert.strictEqual(date.toString(), expected);
        });

        it('returns a new DateTime', function() {
            const date = new Date();
            assert.ok(
                DateTime.fromDate(date).constructor === DateTime,
            );
        });
    });

    describe('#fromISOString', function() {
        it.each([
            ['works with date', '2019-01-01T00:00:00.000+00:00', '2019-01-01T00:00:00.000+00:00'],
            ['works with milliseconds', '2019-01-01T00:00:00.123+00:00', '2019-01-01T00:00:00.123+00:00'],
        ])('%s', function(_, input, expected) {
            const date = DateTime.fromISOString(input);

            assert.strictEqual(date.toIsoString(), expected);
        });

        it.each([
            ['works with time zone', 'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)', { timeZone: 'Australia/Brisbane' }],
            ['works with locale', 'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)', { locale: 'ar-eg' }],
        ])('%s', function(_, expected, options = {}) {
            const date = DateTime.fromISOString('2019-01-01T00:00:00.000+00:00', options);

            assert.strictEqual(date.toString(), expected);
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

        it.each([
            ['works with time zone', 'Tue Jan 01 2019 10:00:00 +1000 (Australia/Brisbane)', { timeZone: 'Australia/Brisbane' }],
            ['works with locale', 'الثلاثاء يناير ٠١ ٢٠١٩ ٠٠:٠٠:٠٠ +0000 (UTC)', { locale: 'ar-eg' }],
        ])('%s', function(_, expected, options = {}) {
            const date = DateTime.fromTimestamp(1546300800, options);

            assert.strictEqual(date.toString(), expected);
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
