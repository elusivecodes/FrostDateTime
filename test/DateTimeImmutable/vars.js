const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Variables', function() {

    describe('formats', function() {
        it('contains valid atom property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.atom,
                'Y-m-d\\TH:i:sP'
            );
        });

        it('contains valid cookie property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.cookie,
                'l, d-M-Y H:i:s T'
            );
        });

        it('contains valid date property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.date,
                'D M d Y'
            );
        });

        it('contains valid iso8601 property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.iso8601,
                'Y-m-d\\TH:i:sO'
            );
        });

        it('contains valid rfc822 property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.rfc822,
                'D, d M y H:i:s O'
            );
        });

        it('contains valid rfc850 property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.rfc850,
                'l, d-M-y H:i:s T'
            );
        });

        it('contains valid rfc1036 property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.rfc1036,
                'D, d M y H:i:s O'
            );
        });

        it('contains valid rfc1123 property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.rfc1123,
                'D, d M Y H:i:s O'
            );
        });

        it('contains valid rfc2822 property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.rfc2822,
                'D, d M Y H:i:s O'
            );
        });

        it('contains valid rfc3339 property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.rfc3339,
                'Y-m-d\\TH:i:sP'
            );
        });

        it('contains valid rfc3339_extended property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.rfc3339_extended,
                'Y-m-d\\TH:i:s.vP'
            );
        });

        it('contains valid rss property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.rss,
                'D, d M Y H:i:s O'
            );
        });

        it('contains valid string property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.string,
                'D M d Y H:i:s O (e)'
            );
        });

        it('contains valid time property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.time,
                'H:i:s O (e)'
            );
        });

        it('contains valid w3c property', function() {
            assert.strictEqual(
                DateTimeImmutable.formats.w3c,
                'Y-m-d\\TH:i:sP'
            );
        });
    });

});

