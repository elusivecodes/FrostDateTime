const assert = require('assert').strict;
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime #fromObject Tests', function() {

    describe('Year', function() {
        it('uses the year', function() {
            const date = DateTime.fromObject({
                year: 2018
            });
            assert.equal(
                date.getYear(),
                2018
            );
        });
    });

    describe('Month', function() {
        it('uses the month', function() {
            const date = DateTime.fromObject({
                month: 0
            });
            assert.equal(
                date.getMonth(),
                0
            );
        });
    });

    describe('Date', function() {
        it('uses the date', function() {
            const date = DateTime.fromObject({
                date: 1
            });
            assert.equal(
                date.getDate(),
                1
            );
        });
    });

    describe('Hours', function() {
        it('uses the hours', function() {
            const date = DateTime.fromObject({
                hours: 0
            });
            assert.equal(
                date.getHours(),
                0
            );
        });
    });

    describe('Minutes', function() {
        it('uses the minutes', function() {
            const date = DateTime.fromObject({
                minutes: 0
            });
            assert.equal(
                date.getMinutes(),
                0
            );
        });
    });

    describe('Seconds', function() {
        it('uses the seconds', function() {
            const date = DateTime.fromObject({
                seconds: 0
            });
            assert.equal(
                date.getSeconds(),
                0
            );
        });
    });

    describe('Milliseconds', function() {
        it('uses the milliseconds', function() {
            const date = DateTime.fromObject({
                milliseconds: 0
            });
            assert.equal(
                date.getMilliseconds(),
                0
            );
        });
    });

    describe('Timezone', function() {
        it('uses the timezone', function() {
            const date = DateTime.fromObject({
                timeZone: 'Australia/Brisbane'
            });
            assert.equal(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with abbreviation', function() {
            const date = DateTime.fromObject({
                timeZone: 'AEST'
            });
            assert.equal(
                date.getTimeZone(),
                'AEST'
            );
        });

        it('works with offset with colon', function() {
            const date = DateTime.fromObject({
                timeZone: '+10:00'
            });
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offset without colon', function() {
            const date = DateTime.fromObject({
                timeZone: '+1000'
            });
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                DateTime.fromObject({
                    timeZone: 'INVALID'
                });
            });
        });
    });

    describe('Timezone Argument', function() {
        it('works with timezone argument', function() {
            const date = DateTime.fromObject({}, 'Australia/Brisbane');
            assert.equal(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with offset with colon', function() {
            const date = DateTime.fromObject({}, '+10:00');
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offset without colon', function() {
            const date = DateTime.fromObject({}, '+1000');
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('does not overwrite timezone when specified in object', function() {
            const date = DateTime.fromObject({
                timeZone: 'UTC'
            }, 'Australia/Brisbane');
            assert.equal(
                date.getTimeZone(),
                'UTC'
            );
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                DateTime.fromObject({}, 'INVALID');
            });
        });
    });

});
