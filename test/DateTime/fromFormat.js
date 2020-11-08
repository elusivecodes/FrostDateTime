const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime #fromFormat', function() {

    /**
     * Era
     */

    describe('GGG - Era (Short)', function() {
        it('parses AD era', function() {
            const date = DateTime.fromFormat('GGG', 'AD');
            assert.strictEqual(
                date.getYear(),
                1970
            );
        });

        it('parses BC era', function() {
            const date = DateTime.fromFormat('GGG', 'BC');
            assert.strictEqual(
                date.getYear(),
                -1970
            );
        });
    });

    describe('GGGG - Era (Long)', function() {
        it('parses AD era', function() {
            const date = DateTime.fromFormat('GGGG', 'Anno Domini');
            assert.strictEqual(
                date.getYear(),
                1970
            );
        });

        it('parses BC era', function() {
            const date = DateTime.fromFormat('GGGG', 'Before Christ');
            assert.strictEqual(
                date.getYear(),
                -1970
            );
        });
    });

    describe('GGGGG - Era (Narrow)', function() {
        it('parses AD era', function() {
            const date = DateTime.fromFormat('GGGGG', 'A');
            assert.strictEqual(
                date.getYear(),
                1970
            );
        });

        it('parses BC era', function() {
            const date = DateTime.fromFormat('GGGGG', 'B');
            assert.strictEqual(
                date.getYear(),
                -1970
            );
        });
    });

    /**
     * Year
     */

    describe('y - Year (1-digit)', function() {
        it('parses full year', function() {
            const date = DateTime.fromFormat('y', '2018');
            assert.strictEqual(
                date.getYear(),
                2018
            );
        });

        it('parses 1-digit year', function() {
            const date = DateTime.fromFormat('y', '5');
            assert.strictEqual(
                date.getYear(),
                5
            );
        });
    });

    describe('yy - Year (2-digits)', function() {
        it('parses full year', function() {
            const date = DateTime.fromFormat('yy', '2018');
            assert.strictEqual(
                date.getYear(),
                2018
            );
        });

        it('parses 2-digit year', function() {
            const date = DateTime.fromFormat('yy', '88');
            assert.strictEqual(
                date.getYear(),
                1988
            );
        });
    });

    describe('yyy - Year (3-digits)', function() {
        it('parses full year', function() {
            const date = DateTime.fromFormat('yyy', '2018');
            assert.strictEqual(
                date.getYear(),
                2018
            );
        });

        it('parses zero padded year', function() {
            const date = DateTime.fromFormat('yyy', '088');
            assert.strictEqual(
                date.getYear(),
                88
            );
        });
    });

    describe('yyyy - Year (4-digits)', function() {
        it('parses full year', function() {
            const date = DateTime.fromFormat('yyyy', '2018');
            assert.strictEqual(
                date.getYear(),
                2018
            );
        });

        it('parses zero padded year', function() {
            const date = DateTime.fromFormat('yyyy', '0088');
            assert.strictEqual(
                date.getYear(),
                88
            );
        });
    });

    /**
     * Week Year
     */

    describe('Y - Year (1-digit)', function() {
        it('parses full year', function() {
            const date = DateTime.fromFormat('Y', '2018');
            assert.strictEqual(
                date.getWeekYear(),
                2018
            );
        });

        it('parses 1-digit year', function() {
            const date = DateTime.fromFormat('Y', '5');
            assert.strictEqual(
                date.getWeekYear(),
                5
            );
        });
    });

    describe('YY - Year (2-digits)', function() {
        it('parses full year', function() {
            const date = DateTime.fromFormat('YY', '2018');
            assert.strictEqual(
                date.getWeekYear(),
                2018
            );
        });

        it('parses 2-digit year', function() {
            const date = DateTime.fromFormat('YY', '88');
            assert.strictEqual(
                date.getWeekYear(),
                1988
            );
        });
    });

    describe('YYY - Year (3-digits)', function() {
        it('parses full year', function() {
            const date = DateTime.fromFormat('YYY', '2018');
            assert.strictEqual(
                date.getWeekYear(),
                2018
            );
        });

        it('parses zero padded year', function() {
            const date = DateTime.fromFormat('YYY', '088');
            assert.strictEqual(
                date.getWeekYear(),
                88
            );
        });
    });

    describe('YYYY - Year (4-digits)', function() {
        it('parses full year', function() {
            const date = DateTime.fromFormat('YYYY', '2018');
            assert.strictEqual(
                date.getWeekYear(),
                2018
            );
        });

        it('parses zero padded year', function() {
            const date = DateTime.fromFormat('YYYY', '0088');
            assert.strictEqual(
                date.getWeekYear(),
                88
            );
        });
    });

    /**
     * Quarter
     */

    describe('q - Quarter (1-digit)', function() {
        it('parses quarter', function() {
            const date = DateTime.fromFormat('q', '3');
            assert.strictEqual(
                date.getQuarter(),
                3
            );
        });
    });

    describe('qq - Quarter (2-digits)', function() {
        it('parses quarter', function() {
            const date = DateTime.fromFormat('qq', '03');
            assert.strictEqual(
                date.getQuarter(),
                3
            );
        });
    });

    describe('Q - Quarter (1-digit)', function() {
        it('parses quarter', function() {
            const date = DateTime.fromFormat('Q', '3');
            assert.strictEqual(
                date.getQuarter(),
                3
            );
        });
    });

    describe('QQ - Quarter (2-digits)', function() {
        it('parses quarter', function() {
            const date = DateTime.fromFormat('QQ', '03');
            assert.strictEqual(
                date.getQuarter(),
                3
            );
        });
    });

    /**
     * Month
     */

    describe('M - Month (1-digit)', function() {
        it('parses month', function() {
            const date = DateTime.fromFormat('M', '10');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });

        it('parses 1-digit month', function() {
            const date = DateTime.fromFormat('M', '1');
            assert.strictEqual(
                date.getMonth(),
                1
            );
        });
    });

    describe('MM - Month (2-digits)', function() {
        it('parses month', function() {
            const date = DateTime.fromFormat('MM', '10');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });

        it('parses zero padded month', function() {
            const date = DateTime.fromFormat('MM', '01');
            assert.strictEqual(
                date.getMonth(),
                1
            );
        });
    });

    describe('MMM - Month Name (Short)', function() {
        it('parses month name', function() {
            const date = DateTime.fromFormat('MMM', 'Oct');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });
    });

    describe('MMMM - Month Name (Long)', function() {
        it('parses month name', function() {
            const date = DateTime.fromFormat('MMMM', 'October');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });
    });

    describe('MMMMM - Month Name (Narrow)', function() {
        it('parses month name', function() {
            const date = DateTime.fromFormat('MMMMM', 'O');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });
    });

    describe('L - Month (1-digit)', function() {
        it('parses month', function() {
            const date = DateTime.fromFormat('L', '10');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });

        it('parses 1-digit month', function() {
            const date = DateTime.fromFormat('L', '1');
            assert.strictEqual(
                date.getMonth(),
                1
            );
        });
    });

    describe('LL - Month (2-digits)', function() {
        it('parses month', function() {
            const date = DateTime.fromFormat('LL', '10');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });

        it('parses zero padded month', function() {
            const date = DateTime.fromFormat('LL', '01');
            assert.strictEqual(
                date.getMonth(),
                1
            );
        });
    });

    describe('LLL - Month Name (Short)', function() {
        it('parses month name', function() {
            const date = DateTime.fromFormat('LLL', 'Oct');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });
    });

    describe('LLLL - Month Name (Long)', function() {
        it('parses month name', function() {
            const date = DateTime.fromFormat('LLLL', 'October');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });
    });

    describe('LLLLL - Month Name (Narrow)', function() {
        it('parses month name', function() {
            const date = DateTime.fromFormat('LLLLL', 'O');
            assert.strictEqual(
                date.getMonth(),
                10
            );
        });
    });

    /**
     * Week
     */

    describe('w - Week Of Year (1-digit)', function() {
        it('parses week of year', function() {
            const date = DateTime.fromFormat('w', '22');
            assert.strictEqual(
                date.getWeek(),
                22
            );
        });

        it('parses 1-digit week of year', function() {
            const date = DateTime.fromFormat('w', '1');
            assert.strictEqual(
                date.getWeek(),
                1
            );
        });
    });

    describe('ww - Week Of Year (2-digits)', function() {
        it('parses week of year', function() {
            const date = DateTime.fromFormat('ww', '22');
            assert.strictEqual(
                date.getWeek(),
                22
            );
        });

        it('parses zero padded week of year', function() {
            const date = DateTime.fromFormat('ww', '01');
            assert.strictEqual(
                date.getWeek(),
                1
            );
        });
    });

});