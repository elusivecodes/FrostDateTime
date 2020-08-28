const assert = require('assert').strict;
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable #fromObject', function() {

    describe('Year', function() {
        it('uses the year', function() {
            const date = DateTimeImmutable.fromObject({
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
            const date = DateTimeImmutable.fromObject({
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
            const date = DateTimeImmutable.fromObject({
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
            const date = DateTimeImmutable.fromObject({
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
            const date = DateTimeImmutable.fromObject({
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
            const date = DateTimeImmutable.fromObject({
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
            const date = DateTimeImmutable.fromObject({
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
            const date = DateTimeImmutable.fromObject({
                timeZone: 'Australia/Brisbane'
            });
            assert.equal(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with abbreviation', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: 'AEST'
            });
            assert.equal(
                date.getTimeZone(),
                'AEST'
            );
        });

        it('works with offset with colon', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: '+10:00'
            });
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offset without colon', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: '+1000'
            });
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                DateTimeImmutable.fromObject({
                    timeZone: 'INVALID'
                });
            });
        });
    });

    describe('Timezone Argument', function() {
        it('works with timezone argument', function() {
            const date = DateTimeImmutable.fromObject({}, 'Australia/Brisbane');
            assert.equal(
                date.getTimeZone(),
                'Australia/Brisbane'
            );
        });

        it('works with offset with colon', function() {
            const date = DateTimeImmutable.fromObject({}, '+10:00');
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('works with offset without colon', function() {
            const date = DateTimeImmutable.fromObject({}, '+1000');
            assert.equal(
                date.getTimeZoneOffset(),
                -600
            );
        });

        it('does not overwrite timezone when specified in object', function() {
            const date = DateTimeImmutable.fromObject({
                timeZone: 'UTC'
            }, 'Australia/Brisbane');
            assert.equal(
                date.getTimeZone(),
                'UTC'
            );
        });

        it('throws error with invalid timezone', function() {
            assert.throws(_ => {
                DateTimeImmutable.fromObject({}, 'INVALID');
            });
        });
    });

});
