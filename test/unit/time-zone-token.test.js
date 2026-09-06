import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe.each(['O', 'OOOO', 'VV'])('DateTime time-zone token %s', function(token) {
    it.each([
        'UTC',
        '+05:00',
        '-08:00',
        '+05:30',
        '-03:30',
        '+05:45',
        '+00:09:21',
        '-00:00:30',
        'Australia/Brisbane',
        'US/East-Indiana',
        'Etc/GMT+1',
    ])('parses its own output for %s', function(timeZone) {
        const date = new DateTime('2024-01-01T12:34:56.789Z', { locale: 'en-US', timeZone });
        const pattern = `yyyy-MM-dd HH:mm:ss.SSS ${token}`;
        const parsed = DateTime.fromFormat(pattern, date.format(pattern), { locale: 'en-US', timeZone: 'UTC' });

        assert.strictEqual(parsed.getTime(), date.getTime());
        assert.strictEqual(parsed.isValid, true);
    });

    it.each(['+24:00', '+05:60', '+05:30:60', '+05:3', '+05:30:2'])('rejects invalid offset %s', function(offset) {
        const input = token === 'VV' ? offset : `GMT${offset}`;

        assert.throws((_) => DateTime.fromFormat(token, input));
    });
});

describe('DateTime time-zone token boundaries', function() {
    it.each(['UTC', 'America/New_York', 'Etc/GMT+1'])('preserves a colon after the zone name %s', function(timeZone) {
        const date = new DateTime('2024-01-01T12:34:56.789Z', { locale: 'en-US', timeZone });
        const pattern = 'yyyy-MM-dd VV:HH:mm:ss.SSS';
        const parsed = DateTime.fromFormat(pattern, date.format(pattern), { locale: 'en-US', timeZone: 'UTC' });

        assert.strictEqual(parsed.getTime(), date.getTime());
        assert.strictEqual(parsed.isValid, true);
    });

    it('requires minutes for a nonzero OOOO offset', function() {
        assert.throws((_) => DateTime.fromFormat('OOOO', 'GMT+05'));
    });
});
