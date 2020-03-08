const assert = require('assert').strict;
const { DateInterval, DateTime } = require('../../dist/frost-datetime.min');

describe('DateInterval #format Tests', function() {

    describe('Y - 2-Digit Year', function() {
        it('outputs the 2-digit year', function() {
            const interval = new DateInterval('P1Y');
            const intervalString = interval.format('%Y');
            assert.equal(
                intervalString,
                '01'
            );
        });
    });

    describe('y - Year', function() {
        it('outputs the year', function() {
            const interval = new DateInterval('P1Y');
            const intervalString = interval.format('%y');
            assert.equal(
                intervalString,
                '1'
            );
        });
    });

    describe('M - 2-Digit Month', function() {
        it('outputs the 2-digit month', function() {
            const interval = new DateInterval('P1M');
            const intervalString = interval.format('%M');
            assert.equal(
                intervalString,
                '01'
            );
        });
    });

    describe('m - Month', function() {
        it('outputs the month', function() {
            const interval = new DateInterval('P1M');
            const intervalString = interval.format('%m');
            assert.equal(
                intervalString,
                '1'
            );
        });
    });

    describe('D - 2-Digit Day', function() {
        it('outputs the 2-digit day', function() {
            const interval = new DateInterval('P1D');
            const intervalString = interval.format('%D');
            assert.equal(
                intervalString,
                '01'
            );
        });
    });

    describe('d - Day', function() {
        it('outputs the day', function() {
            const interval = new DateInterval('P1D');
            const intervalString = interval.format('%d');
            assert.equal(
                intervalString,
                '1'
            );
        });
    });

    describe('a - Days', function() {
        it('outputs the days', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2019, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%a');
            assert.equal(
                intervalString,
                '365'
            );
        });
    });

    describe('H - 2-Digit Hour', function() {
        it('outputs the 2-digit hour', function() {
            const interval = new DateInterval('PT1H');
            const intervalString = interval.format('%H');
            assert.equal(
                intervalString,
                '01'
            );
        });
    });

    describe('h - Hour', function() {
        it('outputs the hour', function() {
            const interval = new DateInterval('PT1H');
            const intervalString = interval.format('%h');
            assert.equal(
                intervalString,
                '1'
            );
        });
    });

    describe('I - 2-Digit Minute', function() {
        it('outputs the 2-digit minute', function() {
            const interval = new DateInterval('PT1M');
            const intervalString = interval.format('%I');
            assert.equal(
                intervalString,
                '01'
            );
        });
    });

    describe('i - Minute', function() {
        it('outputs the minute', function() {
            const interval = new DateInterval('PT1M');
            const intervalString = interval.format('%i');
            assert.equal(
                intervalString,
                '1'
            );
        });
    });

    describe('S - 2-Digit Second', function() {
        it('outputs the 2-digit second', function() {
            const interval = new DateInterval('PT1S');
            const intervalString = interval.format('%S');
            assert.equal(
                intervalString,
                '01'
            );
        });
    });

    describe('s - Second', function() {
        it('outputs the second', function() {
            const interval = new DateInterval('PT1S');
            const intervalString = interval.format('%s');
            assert.equal(
                intervalString,
                '1'
            );
        });
    });

    describe('R - Sign (with plus)', function() {
        it('outputs the sign (with plus)', function() {
            const date1 = new DateTime([2019, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%R');
            assert.equal(
                intervalString,
                '+'
            );
        });

        it('works with negative intervals', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2019, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%R');
            assert.equal(
                intervalString,
                '-'
            );
        });
    });

    describe('r - Sign (without plus)', function() {
        it('outputs the sign (without plus)', function() {
            const date1 = new DateTime([2019, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%r');
            assert.equal(
                intervalString,
                ''
            );
        });

        it('works with negative intervals', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2019, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%r');
            assert.equal(
                intervalString,
                '-'
            );
        });
    });

});
