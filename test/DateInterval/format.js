const assert = require('assert');
const { DateInterval, DateTime } = require('../../dist/frost-datetime.min');

describe('DateInterval #format', function() {

    describe('Y - 2-Digit Year', function() {
        it('outputs the 2-digit year', function() {
            const interval = new DateInterval('P1Y');
            const intervalString = interval.format('%Y');
            assert.strictEqual(
                intervalString,
                '01'
            );
        });
    });

    describe('y - Year', function() {
        it('outputs the year', function() {
            const interval = new DateInterval('P1Y');
            const intervalString = interval.format('%y');
            assert.strictEqual(
                intervalString,
                '1'
            );
        });
    });

    describe('M - 2-Digit Month', function() {
        it('outputs the 2-digit month', function() {
            const interval = new DateInterval('P1M');
            const intervalString = interval.format('%M');
            assert.strictEqual(
                intervalString,
                '01'
            );
        });
    });

    describe('m - Month', function() {
        it('outputs the month', function() {
            const interval = new DateInterval('P1M');
            const intervalString = interval.format('%m');
            assert.strictEqual(
                intervalString,
                '1'
            );
        });
    });

    describe('D - 2-Digit Day', function() {
        it('outputs the 2-digit day', function() {
            const interval = new DateInterval('P1D');
            const intervalString = interval.format('%D');
            assert.strictEqual(
                intervalString,
                '01'
            );
        });
    });

    describe('d - Day', function() {
        it('outputs the day', function() {
            const interval = new DateInterval('P1D');
            const intervalString = interval.format('%d');
            assert.strictEqual(
                intervalString,
                '1'
            );
        });
    });

    describe('a - Days', function() {
        it('outputs the days', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 0, 0, 0], 'UTC');
            const date2 = DateTime.fromArray([2019, 1, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%a');
            assert.strictEqual(
                intervalString,
                '365'
            );
        });
    });

    describe('H - 2-Digit Hour', function() {
        it('outputs the 2-digit hour', function() {
            const interval = new DateInterval('PT1H');
            const intervalString = interval.format('%H');
            assert.strictEqual(
                intervalString,
                '01'
            );
        });
    });

    describe('h - Hour', function() {
        it('outputs the hour', function() {
            const interval = new DateInterval('PT1H');
            const intervalString = interval.format('%h');
            assert.strictEqual(
                intervalString,
                '1'
            );
        });
    });

    describe('I - 2-Digit Minute', function() {
        it('outputs the 2-digit minute', function() {
            const interval = new DateInterval('PT1M');
            const intervalString = interval.format('%I');
            assert.strictEqual(
                intervalString,
                '01'
            );
        });
    });

    describe('i - Minute', function() {
        it('outputs the minute', function() {
            const interval = new DateInterval('PT1M');
            const intervalString = interval.format('%i');
            assert.strictEqual(
                intervalString,
                '1'
            );
        });
    });

    describe('S - 2-Digit Second', function() {
        it('outputs the 2-digit second', function() {
            const interval = new DateInterval('PT1S');
            const intervalString = interval.format('%S');
            assert.strictEqual(
                intervalString,
                '01'
            );
        });
    });

    describe('s - Second', function() {
        it('outputs the second', function() {
            const interval = new DateInterval('PT1S');
            const intervalString = interval.format('%s');
            assert.strictEqual(
                intervalString,
                '1'
            );
        });
    });

    describe('R - Sign (with plus)', function() {
        it('outputs the sign (with plus)', function() {
            const date1 = DateTime.fromArray([2019, 1, 1, 0, 0, 0], 'UTC');
            const date2 = DateTime.fromArray([2018, 1, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%R');
            assert.strictEqual(
                intervalString,
                '+'
            );
        });

        it('works with negative intervals', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 0, 0, 0], 'UTC');
            const date2 = DateTime.fromArray([2019, 1, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%R');
            assert.strictEqual(
                intervalString,
                '-'
            );
        });
    });

    describe('r - Sign (without plus)', function() {
        it('outputs the sign (without plus)', function() {
            const date1 = DateTime.fromArray([2019, 1, 1, 0, 0, 0], 'UTC');
            const date2 = DateTime.fromArray([2018, 1, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%r');
            assert.strictEqual(
                intervalString,
                ''
            );
        });

        it('works with negative intervals', function() {
            const date1 = DateTime.fromArray([2018, 1, 1, 0, 0, 0], 'UTC');
            const date2 = DateTime.fromArray([2019, 1, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.format('%r');
            assert.strictEqual(
                intervalString,
                '-'
            );
        });
    });

});
