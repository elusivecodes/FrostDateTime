const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Primitive', function() {

    describe('#toString', function() {
        it('returns the date/time string', function() {
            const date = DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.strictEqual(
                date.toString(),
                'Mon Jan 01 2018 00:00:00 +1000 (Australia/Brisbane)'
            );
        });
    });

    describe('#toObject', function() {
        it('returns an object representation of the date/time', function() {
            const date = DateTimeImmutable.fromArray([2018, 6, 15, 12, 30, 30, 500], 'Australia/Brisbane');
            assert.deepStrictEqual(
                date.toObject(),
                {
                    year: 2018,
                    month: 6,
                    date: 15,
                    hours: 12,
                    minutes: 30,
                    seconds: 30,
                    milliseconds: 500,
                    timeZone: 'Australia/Brisbane'
                }
            );
        });
    });

    describe('#valueOf', function() {
        it('returns the timestamp', function() {
            const date = DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.strictEqual(
                date.valueOf(),
                1514728800000
            );
        });
    });

    describe('#[Symbol.toPrimitive]', function() {
        it('returns the date/time string', function() {
            const date = DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.strictEqual(
                date[Symbol.toPrimitive]('string'),
                'Mon Jan 01 2018 00:00:00 +1000 (Australia/Brisbane)'
            );
        });

        it('returns the timestamp', function() {
            const date = DateTimeImmutable.fromArray([2018, 1, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.strictEqual(
                date[Symbol.toPrimitive]('number'),
                1514728800000
            );
        });
    });

});
