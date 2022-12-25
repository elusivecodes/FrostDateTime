import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime Primitive', function() {
    describe('#toString', function() {
        it('returns the date/time string', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.toString(),
                'Mon Jan 01 2018 00:00:00 +0000 (UTC)',
            );
        });
    });

    describe('#valueOf', function() {
        it('returns the timestamp', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.valueOf(),
                1514764800000,
            );
        });
    });

    describe('#[Symbol.toPrimitive]', function() {
        it('returns the date/time string', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date[Symbol.toPrimitive]('string'),
                'Mon Jan 01 2018 00:00:00 +0000 (UTC)',
            );
        });

        it('returns the timestamp', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date[Symbol.toPrimitive]('number'),
                1514764800000,
            );
        });
    });
});
