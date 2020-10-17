const assert = require('assert');
const { DateInterval } = require('../../dist/frost-datetime.min');

describe('DateInterval #fromString', function() {

    describe('#fromString', function() {
        it('works with years', function() {
            assert.deepStrictEqual(
                {
                    ...DateInterval.fromString('1 year')
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
            assert.deepStrictEqual(
                {
                    ...DateInterval.fromString('1 month')
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
            assert.deepStrictEqual(
                {
                    ...DateInterval.fromString('1 day')
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
            assert.deepStrictEqual(
                {
                    ...DateInterval.fromString('1 hour')
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
            assert.deepStrictEqual(
                {
                    ...DateInterval.fromString('1 minute')
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
            assert.deepStrictEqual(
                {
                    ...DateInterval.fromString('1 second')
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
            assert.deepStrictEqual(
                {
                    ...DateInterval.fromString('1 year, 2 months, 3 days, 4 hours, 5 minutes and 6 seconds')
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
    });

});
