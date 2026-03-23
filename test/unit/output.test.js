import assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import DateTime from '../../src/index.js';

describe('DateTime Output', function() {
    describe('#toDateString', function() {
        it('returns the date string', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.toDateString(),
                'Mon Jan 01 2018',
            );
        });
    });

    describe('#toTimeString', function() {
        it('returns the time string', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.toTimeString(),
                '00:00:00 +0000 (UTC)',
            );
        });
    });

    describe('#toISOString', function() {
        it('returns the ISO string', function() {
            const date = DateTime.fromArray([2018], { timeZone: 'Australia/Brisbane' });
            assert.strictEqual(
                date.toISOString(),
                '2017-12-31T14:00:00.000+00:00',
            );
        });

        it('preserves milliseconds in UTC output', function() {
            const date = DateTime.fromArray([2018, 1, 1, 0, 0, 0, 1], { timeZone: 'Australia/Brisbane' });
            assert.strictEqual(
                date.toISOString(),
                '2017-12-31T14:00:00.001+00:00',
            );
        });
    });

    describe('#toJSON', function() {
        it('returns the ISO string for valid dates', function() {
            const date = DateTime.fromArray([2018], { timeZone: 'Australia/Brisbane' });
            assert.strictEqual(
                date.toJSON(),
                '2017-12-31T14:00:00.000+00:00',
            );
        });

        it('returns null for invalid dates', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy-MM-dd', '2019-02-31').toJSON(),
                null,
            );
        });

        it('is used by JSON.stringify', function() {
            const value = {
                date: DateTime.fromArray([2018], { timeZone: 'Australia/Brisbane' }),
                invalid: DateTime.fromFormat('yyyy-MM-dd', '2019-02-31'),
            };

            assert.strictEqual(
                JSON.stringify(value),
                '{"date":"2017-12-31T14:00:00.000+00:00","invalid":null}',
            );
        });
    });

    describe('#toUTCString', function() {
        it('returns the UTC string', function() {
            const date = DateTime.fromArray([2018], { timeZone: 'Australia/Brisbane' });
            assert.strictEqual(
                date.toUTCString(),
                'Sun Dec 31 2017 14:00:00 +0000 (UTC)',
            );
        });
    });
});
