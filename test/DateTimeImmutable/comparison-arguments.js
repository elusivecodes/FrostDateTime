const assert = require('assert').strict;
const { DateTime, DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Comparison Argument Tests', function() {

    describe('#isAfter', function() {
        it('works with no argument', function() {
            const date = new DateTimeImmutable(Date.now(), 'UTC');
            assert.doesNotThrow(_ => {
                date.isAfter();
            });
        });

        it('works with timestamp', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const timestamp = 1514764799000;
            assert.equal(
                date.isAfter(timestamp),
                true
            );
        });

        it('works with Date', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new Date(1514764799000);
            assert.equal(
                date1.isAfter(date2),
                true
            );
        });

        it('works with DateTime', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2017, 11, 31, 23, 59, 59], 'UTC');
            assert.equal(
                date1.isAfter(date2),
                true
            );
        });

        it('works with DateTimeImmutable', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            assert.equal(
                date1.isAfter(date2),
                true
            );
        });

        it('works with date string', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const dateString = '31 Dec 2017 23:59:59 GMT';
            assert.equal(
                date.isAfter(dateString),
                true
            );
        });

        it('works with date array', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const dateArray = [2017, 11, 31, 23, 59, 59];
            assert.equal(
                date.isAfter(dateArray),
                true
            );
        });

        it('works with timezones', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date1.isAfter(date2),
                true
            );
        });
    });

    describe('#isBefore', function() {
        it('works with no argument', function() {
            const date = new DateTimeImmutable(Date.now(), 'UTC');
            assert.doesNotThrow(_ => {
                date.isBefore();
            });
        });

        it('works with timestamp', function() {
            const date = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const timestamp = 1514764800000;
            assert.equal(
                date.isBefore(timestamp),
                true
            );
        });

        it('works with Date', function() {
            const date1 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const date2 = new Date(1514764800000);
            assert.equal(
                date1.isBefore(date2),
                true
            );
        });

        it('works with DateTime', function() {
            const date1 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            assert.equal(
                date1.isBefore(date2),
                true
            );
        });

        it('works with DateTimeImmutable', function() {
            const date1 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            assert.equal(
                date1.isBefore(date2),
                true
            );
        });

        it('works with date string', function() {
            const date = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const dateString = '1 Jan 2018 00:00:00 GMT';
            assert.equal(
                date.isBefore(dateString),
                true
            );
        });


        it('works with date array', function() {
            const date = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const dateArray = [2018, 0, 1, 0, 0, 0];
            assert.equal(
                date.isBefore(dateArray),
                true
            );
        });

        it('works with timezones', function() {
            const date1 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'Australia/Brisbane');
            const date2 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            assert.equal(
                date1.isBefore(date2),
                true
            );
        });
    });

    describe('#isBetween', function() {
        it('works with no argument', function() {
            const date = new DateTimeImmutable(Date.now(), 'UTC');
            assert.doesNotThrow(_ => {
                date.isBetween();
            });
        });

        it('works with timestamp', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const timestamp1 = 1514764799000;
            const timestamp2 = 1514764801000;
            assert.equal(
                date.isBetween(timestamp1, timestamp2),
                true
            );
        });

        it('works with Date', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new Date(1514764799000);
            const date3 = new Date(1514764801000);
            assert.equal(
                date1.isBetween(date2, date3),
                true
            );
        });

        it('works with DateTime', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2017, 11, 31, 23, 59, 59], 'UTC');
            const date3 = new DateTime([2018, 0, 1, 0, 0, 0, 1], 'UTC');
            assert.equal(
                date1.isBetween(date2, date3),
                true
            );
        });

        it('works with DateTimeImmutable', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const date3 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 1], 'UTC');
            assert.equal(
                date1.isBetween(date2, date3),
                true
            );
        });

        it('works with date string', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const dateString1 = '31 Dec 2017 23:59:59 GMT';
            const dateString2 = '1 Jan 2018 00:00:01 GMT';
            assert.equal(
                date.isBetween(dateString1, dateString2),
                true
            );
        });

        it('works with date array', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const dateArray1 = [2017, 11, 31, 23, 59, 59];
            const dateArray2 = [2018, 0, 1, 0, 0, 0, 1];
            assert.equal(
                date.isBetween(dateArray1, dateArray2),
                true
            );
        });

        it('works with timezones', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            const date3 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'America/New_York');
            assert.equal(
                date1.isBetween(date2, date3),
                true
            );
        });
    });

    describe('#isSame', function() {
        it('works with no argument', function() {
            const date = new DateTimeImmutable(Date.now(), 'UTC');
            assert.doesNotThrow(_ => {
                date.isSame();
            });
        });

        it('works with timestamp', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const timestamp = 1514764800000;
            assert.equal(
                date.isSame(timestamp),
                true
            );
        });

        it('works with Date', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new Date(1514764800000);
            assert.equal(
                date1.isSame(date2),
                true
            );
        });

        it('works with DateTime', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            assert.equal(
                date1.isSame(date2),
                true
            );
        });

        it('works with DateTimeImmutable', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            assert.equal(
                date1.isSame(date2),
                true
            );
        });

        it('works with date string', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const dateString = '1 Jan 2018 00:00:00 GMT';
            assert.equal(
                date.isSame(dateString),
                true
            );
        });


        it('works with date array', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const dateArray = [2018, 0, 1, 0, 0, 0];
            assert.equal(
                date.isSame(dateArray),
                true
            );
        });

        it('works with timezones', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 10, 0, 0], 'Australia/Brisbane');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            assert.equal(
                date1.isSame(date2),
                true
            );
        });
    });

    describe('#isSameOrAfter', function() {
        it('works with no argument', function() {
            const date = new DateTimeImmutable(Date.now(), 'UTC');
            assert.doesNotThrow(_ => {
                date.isSameOrAfter();
            });
        });

        it('works with timestamp', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const timestamp = 1514764799000;
            assert.equal(
                date.isSameOrAfter(timestamp),
                true
            );
        });

        it('works with Date', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new Date(1514764799000);
            assert.equal(
                date1.isSameOrAfter(date2),
                true
            );
        });

        it('works with DateTime', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2017, 11, 31, 23, 59, 59], 'UTC');
            assert.equal(
                date1.isSameOrAfter(date2),
                true
            );
        });

        it('works with DateTimeImmutable', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            assert.equal(
                date1.isSameOrAfter(date2),
                true
            );
        });

        it('works with date string', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const dateString = '31 Dec 2017 23:59:59 GMT';
            assert.equal(
                date.isSameOrAfter(dateString),
                true
            );
        });

        it('works with date array', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const dateArray = [2017, 11, 31, 23, 59, 59];
            assert.equal(
                date.isSameOrAfter(dateArray),
                true
            );
        });

        it('works with timezones', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'Australia/Brisbane');
            assert.equal(
                date1.isSameOrAfter(date2),
                true
            );
        });
    });

    describe('#isSameOrBefore', function() {
        it('works with no argument', function() {
            const date = new DateTimeImmutable(Date.now(), 'UTC');
            assert.doesNotThrow(_ => {
                date.isSameOrBefore();
            });
        });

        it('works with timestamp', function() {
            const date = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const timestamp = 1514764800000;
            assert.equal(
                date.isSameOrBefore(timestamp),
                true
            );
        });

        it('works with Date', function() {
            const date1 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const date2 = new Date(1514764800000);
            assert.equal(
                date1.isSameOrBefore(date2),
                true
            );
        });

        it('works with DateTime', function() {
            const date1 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            assert.equal(
                date1.isSameOrBefore(date2),
                true
            );
        });

        it('works with DateTimeImmutable', function() {
            const date1 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            assert.equal(
                date1.isSameOrBefore(date2),
                true
            );
        });

        it('works with date string', function() {
            const date = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const dateString = '1 Jan 2018 00:00:00 GMT';
            assert.equal(
                date.isSameOrBefore(dateString),
                true
            );
        });


        it('works with date array', function() {
            const date = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            const dateArray = [2018, 0, 1, 0, 0, 0];
            assert.equal(
                date.isSameOrBefore(dateArray),
                true
            );
        });

        it('works with timezones', function() {
            const date1 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'Australia/Brisbane');
            const date2 = new DateTimeImmutable([2017, 11, 31, 23, 59, 59], 'UTC');
            assert.equal(
                date1.isSameOrBefore(date2),
                true
            );
        });
    });

});
