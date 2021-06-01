const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Variables', function() {

    describe('formats', function() {
        it('contains valid atom property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.atom),
                '2020-01-01T00:00:00+00:00'
            );
        });

        it('contains valid cookie property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.cookie),
                'Wednesday, 01-Jan-2020 00:00:00 GMT'
            );
        });

        it('contains valid date property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.date),
                'Wed Jan 01 2020'
            );
        });

        it('contains valid iso8601 property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.iso8601),
                '2020-01-01T00:00:00+0000'
            );
        });

        it('contains valid rfc822 property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.rfc822),
                'Wed, 01 Jan 20 00:00:00 +0000'
            );
        });

        it('contains valid rfc850 property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.rfc850),
                'Wednesday 01-Jan-20 00:00:00 GMT'
            );
        });

        it('contains valid rfc1036 property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.rfc1036),
                'Wed, 01 Jan 20 00:00:00 +0000'
            );
        });

        it('contains valid rfc1123 property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.rfc1123),
                'Wed, 01 Jan 2020 00:00:00 +0000'
            );
        });

        it('contains valid rfc2822 property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.rfc2822),
                'Wed, 01 Jan 2020 00:00:00 +0000'
            );
        });

        it('contains valid rfc3339 property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.rfc3339),
                '2020-01-01T00:00:00+00:00'
            );
        });

        it('contains valid rfc3339_extended property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.rfc3339_extended),
                '2020-01-01T00:00:00.000+00:00'
            );
        });

        it('contains valid rss property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.rss),
                'Wed, 01 Jan 2020 00:00:00 +0000'
            );
        });

        it('contains valid string property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.string),
                'Wed Jan 01 2020 00:00:00 +0000 (UTC)'
            );
        });

        it('contains valid time property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.time),
                '00:00:00 +0000 (UTC)'
            );
        });

        it('contains valid w3c property', function() {
            assert.strictEqual(
                DateTime.fromArray([2020])
                    .format(DateTime.formats.w3c),
                '2020-01-01T00:00:00+00:00'
            );
        });
    });

});

