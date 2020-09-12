const assert = require('assert').strict;
const { DateTime } = require('../dist/frost-datetime.min');

describe('DateTime DST Transitions', function() {

    describe('Non-DST Offset (Post-Transition)', function() {
        it('creates correct date from format', function() {
            const date = DateTime.fromFormat('d/m/Y H:i:s P', '07/04/2019 03:01:00 +10:00');
            date.setTimeZone('Australia/Sydney');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 03:01:00 +1000 (Australia/Sydney)'
            );
        });

        it('creates correct date from constructor', function() {
            const date = DateTime.fromArray([2019, 4, 7, 3, 1, 0, 0], '+10:00');
            date.setTimeZone('Australia/Sydney');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 03:01:00 +1000 (Australia/Sydney)'
            );
        });
    });

    describe('Non-DST Offset (Pre-Transition)', function() {
        it('creates correct date from format', function() {
            const date = DateTime.fromFormat('d/m/Y H:i:s P', '07/04/2019 02:01:00 +10:00');
            date.setTimeZone('Australia/Sydney');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)'
            );
        });

        it('creates correct date from constructor', function() {
            const date = DateTime.fromArray([2019, 4, 7, 2, 1, 0, 0], '+10:00');
            date.setTimeZone('Australia/Sydney');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)'
            );
        });
    });

    describe('DST Offset (Pre-Transition)', function() {
        it('creates correct date from format', function() {
            const date = DateTime.fromFormat('d/m/Y H:i:s P', '07/04/2019 02:01:00 +11:00');
            date.setTimeZone('Australia/Sydney');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 02:01:00 +1100 (Australia/Sydney)'
            );
        });

        it('creates correct date from constructor', function() {
            const date = DateTime.fromArray([2019, 4, 7, 2, 1, 0, 0], '+11:00');
            date.setTimeZone('Australia/Sydney');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 02:01:00 +1100 (Australia/Sydney)'
            );
        });
    });

    describe('DST Offset (Post-Transition)', function() {
        it('creates correct date if offset is not correct', function() {
            const date = DateTime.fromFormat('d/m/Y H:i:s P', '07/04/2019 03:01:00 +11:00');
            date.setTimeZone('Australia/Sydney');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)'
            );
        });

        it('creates correct date from constructor', function() {
            const date = DateTime.fromArray([2019, 4, 7, 3, 1, 0, 0], '+11:00');
            date.setTimeZone('Australia/Sydney');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)'
            );
        });
    });

    describe('DST -> Non-DST', function() {
        it('uses correct offset after transition', function() {
            const date = DateTime.fromFormat('d/m/Y H:i:s P', '07/04/2019 02:01:00 +11:00');
            date.setTimeZone('Australia/Sydney');
            date.add(1, 'hour');
            assert.equal(
                date.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)'
            );
        });
    });

});
