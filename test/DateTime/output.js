const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Output', function() {

    describe('#toDateString', function() {
        it('returns the date string', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.toDateString(),
                'Mon Jan 01 2018'
            );
        });
    });

    describe('#toTimeString', function() {
        it('returns the time string', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.toTimeString(),
                '00:00:00 +0000 (UTC)'
            );
        });
    });

    describe('#toISOString', function() {
        it('returns the ISO string', function() {
            const date = DateTime.fromArray([2018], { timeZone: 'Australia/Brisbane' });
            assert.strictEqual(
                date.toISOString(),
                '2017-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('#toUTCString', function() {
        it('returns the UTC string', function() {
            const date = DateTime.fromArray([2018], { timeZone: 'Australia/Brisbane' });
            assert.strictEqual(
                date.toUTCString(),
                'Sun Dec 31 2017 14:00:00 +0000 (UTC)'
            );
        });
    });

});
