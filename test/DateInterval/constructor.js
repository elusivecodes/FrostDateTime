const assert = require('assert');
const { DateInterval } = require('../../dist/frost-datetime.min');

describe('DateInterval #constructor', function() {

    describe('Interval String', function() {
        it('works with years', function() {
            const interval = new DateInterval('P1Y');
            assert.deepStrictEqual(
                {
                    ...interval
                },
                {
                    y: 1,
                    m: 0,
                    d: 0,
                    days: null,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with months', function() {
            const interval = new DateInterval('P1M');
            assert.deepStrictEqual(
                {
                    ...interval
                },
                {
                    y: 0,
                    m: 1,
                    d: 0,
                    days: null,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with days', function() {
            const interval = new DateInterval('P1D');
            assert.deepStrictEqual(
                {
                    ...interval
                },
                {
                    y: 0,
                    m: 0,
                    d: 1,
                    days: null,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with hours', function() {
            const interval = new DateInterval('PT1H');
            assert.deepStrictEqual(
                {
                    ...interval
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: null,
                    h: 1,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with minutes', function() {
            const interval = new DateInterval('PT1M');
            assert.deepStrictEqual(
                {
                    ...interval
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: null,
                    h: 0,
                    i: 1,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with seconds', function() {
            const interval = new DateInterval('PT1S');
            assert.deepStrictEqual(
                {
                    ...interval
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: null,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with multiple arguments', function() {
            const interval = new DateInterval('P1Y2M3DT4H5M6S');
            assert.deepStrictEqual(
                {
                    ...interval
                },
                {
                    y: 1,
                    m: 2,
                    d: 3,
                    days: null,
                    h: 4,
                    i: 5,
                    s: 6,
                    f: 0,
                    invert: false
                }
            );
        });

        it('throws error with invalid format', function() {
            assert.throws(_ => {
                new DateInterval('INVALID');
            });
        });
    });

});
