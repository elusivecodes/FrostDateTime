const assert = require('assert').strict;
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime Variables', function() {

    describe('formats', function() {
        it('contains valid atom property', function() {
            assert.equal(
                DateTime.formats.atom,
                'Y-m-d\\TH:i:sP'
            );
        });

        it('contains valid cookie property', function() {
            assert.equal(
                DateTime.formats.cookie,
                'l, d-M-Y H:i:s T'
            );
        });

        it('contains valid date property', function() {
            assert.equal(
                DateTime.formats.date,
                'D M d Y'
            );
        });

        it('contains valid iso8601 property', function() {
            assert.equal(
                DateTime.formats.iso8601,
                'Y-m-d\\TH:i:sO'
            );
        });

        it('contains valid rfc822 property', function() {
            assert.equal(
                DateTime.formats.rfc822,
                'D, d M y H:i:s O'
            );
        });

        it('contains valid rfc850 property', function() {
            assert.equal(
                DateTime.formats.rfc850,
                'l, d-M-y H:i:s T'
            );
        });

        it('contains valid rfc1036 property', function() {
            assert.equal(
                DateTime.formats.rfc1036,
                'D, d M y H:i:s O'
            );
        });

        it('contains valid rfc1123 property', function() {
            assert.equal(
                DateTime.formats.rfc1123,
                'D, d M Y H:i:s O'
            );
        });

        it('contains valid rfc2822 property', function() {
            assert.equal(
                DateTime.formats.rfc2822,
                'D, d M Y H:i:s O'
            );
        });

        it('contains valid rfc3339 property', function() {
            assert.equal(
                DateTime.formats.rfc3339,
                'Y-m-d\\TH:i:sP'
            );
        });

        it('contains valid rfc3339_extended property', function() {
            assert.equal(
                DateTime.formats.rfc3339_extended,
                'Y-m-d\\TH:i:s.vP'
            );
        });

        it('contains valid rss property', function() {
            assert.equal(
                DateTime.formats.rss,
                'D, d M Y H:i:s O'
            );
        });

        it('contains valid string property', function() {
            assert.equal(
                DateTime.formats.string,
                'D M d Y H:i:s O (e)'
            );
        });

        it('contains valid time property', function() {
            assert.equal(
                DateTime.formats.time,
                'H:i:s O (e)'
            );
        });

        it('contains valid w3c property', function() {
            assert.equal(
                DateTime.formats.w3c,
                'Y-m-d\\TH:i:sP'
            );
        });
    });

    describe('timezones', function() {
        it('contains more than 400 timezones', function() {
            assert.ok(
                Object.keys(DateTime._timeZones).length > 400
            );
        });

        it('contains only valid timezones', function() {
            for (const timezone in DateTime._timeZones) {
                new DateTime(null, timezone);
            }
        });
    });

    describe('timezone abbreviations', function() {
        it('contains more than 100 abbreviations', function() {
            assert.ok(
                Object.keys(DateTime._abbreviations).length > 100
            );
        });

        it('contains only valid abbreviations', function() {
            for (const abbreviation in DateTime._abbreviations) {
                new DateTime(null, abbreviation);
            }
        });
    });

});

