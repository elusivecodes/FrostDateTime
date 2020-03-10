const assert = require('assert').strict;
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Output Tests', function() {

    describe('#toDateString', function() {
        it('returns the date string', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toDateString(),
                'Mon Jan 01 2018'
            );
        });
    });

    describe('#toTimeString', function() {
        it('returns the time string', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toTimeString(),
                '00:00:00 +1000 (Australia/Brisbane)'
            );
        });
    });

    describe('#toISOString', function() {
        it('returns the ISO string', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toISOString(),
                '2018-01-01T00:00:00.0+10:00'
            );
        });
    });

    describe('#toUTCString', function() {
        it('returns the UTC string', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toUTCString(),
                'Sun Dec 31 2017 14:00:00 +0000 (UTC)'
            );
        });
    });

    describe('#toLocaleString', function() {
        it('returns the UTC string', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleString('en-US'),
                '1/1/2018, 12:00:00 AM'
            );
        });

        it('works with locales', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleString('ko-KR'),
                '2018. 1. 1. 오전 12:00:00'
            );
        });

        it('works with timezones', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleString('en-US', { timeZone: 'America/New_York' }),
                '12/31/2017, 9:00:00 AM'
            );
        });
    });

    describe('#toLocaleDateString', function() {
        it('returns the UTC string', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleDateString('en-US'),
                '1/1/2018'
            );
        });

        it('works with locales', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleDateString('ko-KR'),
                '2018. 1. 1.'
            );
        });

        it('works with timezones', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleDateString('en-US', { timeZone: 'America/New_York' }),
                '12/31/2017'
            );
        });
    });

    describe('#toLocaleTimeString', function() {
        it('returns the UTC string', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleTimeString('en-US'),
                '12:00:00 AM'
            );
        });

        it('works with locales', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleTimeString('ko-KR'),
                '오전 12:00:00'
            );
        });

        it('works with timezones', function() {
            const date = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }),
                '9:00:00 AM'
            );
        });
    });

});
