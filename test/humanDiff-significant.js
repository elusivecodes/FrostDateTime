const assert = require('assert');
const { DateTime } = require('../dist/frost-datetime.min');

describe('DateTime #humanDiff Significant Values', function() {

    it('uses relative years when there is actual year difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1])
                .humanDiff(
                    DateTime.fromArray([2016, 2])
                ),
            'in 2 years'
        )
    });

    it('uses relative months when there is relative year difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1])
                .humanDiff(
                    DateTime.fromArray([2017, 2])
                ),
            'in 11 months'
        )
    });

    it('uses relative months when there is actual month difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 3, 1])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 2])
                ),
            'in 2 months'
        )
    });

    it('uses relative days when there is relative month difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 2, 1])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 5])
                ),
            'in 27 days'
        )
    });

    it('uses relative days when there is actual day difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 3, 0])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 1, 1])
                ),
            'in 2 days'
        )
    });

    it('uses relative hours when there is relative day difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 2, 0])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 1, 1])
                ),
            'in 23 hours'
        )
    });

    it('uses relative hours when there is actual hour difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 2, 0])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 1, 0, 1])
                ),
            'in 2 hours'
        )
    });

    it('uses relative minutes when there is relative hour difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 1, 0])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 1, 0, 1])
                ),
            'in 59 minutes'
        )
    });

    it('uses relative minutes when there is actual minute difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 0, 2, 0])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 1, 0, 0, 1])
                ),
            'in 2 minutes'
        )
    });

    it('uses relative seconds when there is relative minute difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 0, 1, 0])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 1, 0, 0, 1])
                ),
            'in 59 seconds'
        )
    });

    it('uses relative seconds when there is actual seconds difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2018, 1, 1, 0, 0, 2, 0])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 1, 0, 0, 0, 1])
                ),
            'in 2 seconds'
        )
    });

    it('uses relative days when there is relative year difference', function() {
        assert.strictEqual(
            DateTime.fromArray([2019, 1, 1])
                .humanDiff(
                    DateTime.fromArray([2018, 12, 31]
                    )
                ),
            'tomorrow'
        );
    });

    it('uses relative years when relative month difference is equal to months in year', function() {
        assert.strictEqual(
            DateTime.fromArray([2019, 1, 1])
                .humanDiff(
                    DateTime.fromArray([2018, 1, 31])
                ),
            'next year'
        );
    });

    it('uses relative days when relative day difference is less than days in this month', function() {
        assert.strictEqual(
            DateTime.fromArray([2019, 2, 27])
                .humanDiff(
                    DateTime.fromArray([2019, 1, 31])
                ),
            'in 27 days'
        );
    });

    it('uses relative days when relative day difference is less than days in other month', function() {
        assert.strictEqual(
            DateTime.fromArray([2019, 1, 31])
                .humanDiff(
                    DateTime.fromArray([2019, 2, 27])
                ),
            '27 days ago'
        );
    });

    it('uses relative months when relative day difference is greater than days in month', function() {
        assert.strictEqual(
            DateTime.fromArray([2019, 2, 28])
                .humanDiff(
                    DateTime.fromArray([2019, 1, 31])
                ),
            'next month'
        );
    });

    it('uses relative days when relative day difference is greater than days in other month', function() {
        assert.strictEqual(
            DateTime.fromArray([2019, 1, 30])
                .humanDiff(
                    DateTime.fromArray([2019, 2, 28])
                ),
            'last month'
        );
    });

});