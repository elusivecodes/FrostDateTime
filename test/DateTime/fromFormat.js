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

    describe('W - Week Of Month', function() {
        it('parses the week of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('W', '3')
                    .getWeekOfMonth(),
                3
            );
        });
    });

    /**
     * Day
     */

    describe('d - Day of Month (1-digit)', function() {
        it('parses the day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('d', '21')
                    .getDate(),
                21
            );
        });

        it('parses 1-digit day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('d', '01')
                    .getDate(),
                1
            );
        });
    });

    describe('dd - Day of Month (2-digits)', function() {
        it('parses the day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd', '21')
                    .getDate(),
                21
            );
        });

        it('parses zero padded day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd', '01')
                    .getDate(),
                1
            );
        });
    });

    describe('D - Day of Year (1-digit)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('D', '152')
                    .getDayOfYear(),
                152
            );
        });

        it('parses 1-digit day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('D', '1')
                    .getDayOfYear(),
                1
            );
        });
    });

    describe('DD - Day of Year (2-digits)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DD', '152')
                    .getDayOfYear(),
                152
            );
        });

        it('parses zero padded day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DD', '01')
                    .getDayOfYear(),
                1
            );
        });
    });

    describe('DDD - Day of Year (3-digits)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DDD', '152')
                    .getDayOfYear(),
                152
            );
        });

        it('parses zero padded day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DDD', '001')
                    .getDayOfYear(),
                1
            );
        });
    });

    describe('F - Day Of Week In Month', function() {
        it('parses the day of week in the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('F', '3')
                    .getWeekDayInMonth(),
                3
            );
        });
    });

    /**
     * Week Day
     */

    describe('EEE - Week Day (Short)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('EEE', 'Fri');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('EEEE - Week Day (Long)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('EEEE', 'Friday');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('EEEEE - Week Day (Narrow)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('EEEEE', 'F');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('e - Week Day (1-digit)', function() {
        it('parses day', function() {
            const date = DateTime.fromFormat('e', '6');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('ee - Week Day (2-digits)', function() {
        it('parses day', function() {
            const date = DateTime.fromFormat('ee', '06');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('eee - Week Day (Short)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('eee', 'Fri');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('eeee - Week Day (Long)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('eeee', 'Friday');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('eeeee - Week Day (Narrow)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('eeeee', 'F');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('c - Week Day (1-digit)', function() {
        it('parses day', function() {
            const date = DateTime.fromFormat('c', '6');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('cc - Week Day (2-digits)', function() {
        it('parses day', function() {
            const date = DateTime.fromFormat('cc', '06');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('ccc - Week Day (Short)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('ccc', 'Fri');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('cccc - Week Day (Long)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('cccc', 'Friday');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    describe('ccccc - Week Day (Narrow)', function() {
        it('parses day name', function() {
            const date = DateTime.fromFormat('ccccc', 'F');
            assert.strictEqual(
                date.getWeekDay(),
                6
            );
        });
    });

    /**
     * Day Period
     */

    describe('aaa - Day Period (Short)', function() {
        it('parses AM day period', function() {
            const date = DateTime.fromFormat('aaa', 'AM');
            assert.strictEqual(
                date.getHours(),
                0
            );
        });

        it('parses pm day period', function() {
            const date = DateTime.fromFormat('aaa', 'PM');
            assert.strictEqual(
                date.getHours(),
                12
            );
        });
    });

    describe('aaaa - Day Period (Long)', function() {
        it('parses AM day period', function() {
            const date = DateTime.fromFormat('aaa', 'AM');
            assert.strictEqual(
                date.getHours(),
                0
            );
        });

        it('parses pm day period', function() {
            const date = DateTime.fromFormat('aaa', 'PM');
            assert.strictEqual(
                date.getHours(),
                12
            );
        });
    });

    /**
     * Hour
     */

    describe('h - Hour [1-12] (1-digit)', function() {
        it('parses the hour [1-12]', function() {
            const date = DateTime.fromFormat('h', '12');
            assert.strictEqual(
                date.getHours(),
                0
            );
        });

        it('parses 1-digit hour', function() {
            const date = DateTime.fromFormat('h', '1');
            assert.strictEqual(
                date.getHours(),
                1
            );
        });
    });

    describe('hh - Hour [1-12] (2-digits)', function() {
        it('parses the hour [1-12]', function() {
            const date = DateTime.fromFormat('hh', '12');
            assert.strictEqual(
                date.getHours(),
                0
            );
        });

        it('parses zero padded hour', function() {
            const date = DateTime.fromFormat('hh', '01');
            assert.strictEqual(
                date.getHours(),
                1
            );
        });
    });

    describe('H - Hour [0-23] (1-digit)', function() {
        it('parses the hour [0-23]', function() {
            const date = DateTime.fromFormat('H', '23');
            assert.strictEqual(
                date.getHours(),
                23
            );
        });

        it('parses 1-digit hour', function() {
            const date = DateTime.fromFormat('H', '0')
            assert.strictEqual(
                date.getHours(),
                0
            );
        });
    });

    describe('HH - Hour [0-23] (2-digits)', function() {
        it('parses the hour [0-23]', function() {
            const date = DateTime.fromFormat('HH', '23');
            assert.strictEqual(
                date.getHours(),
                23
            );
        });

        it('parses zero padded hour', function() {
            const date = DateTime.fromFormat('HH', '00')
            assert.strictEqual(
                date.getHours(),
                0
            );
        });
    });

    describe('K - Hour [0-11] (1-digit)', function() {
        it('parses the hour [0-11]', function() {
            const date = DateTime.fromFormat('K', '11');
            assert.strictEqual(
                date.getHours(),
                11
            );
        });

        it('parses 1-digit hour', function() {
            const date = DateTime.fromFormat('K', '0');
            assert.strictEqual(
                date.getHours(),
                0
            );
        });
    });

    describe('KK - Hour [0-11] (2-digits)', function() {
        it('parses the hour [0-11]', function() {
            const date = DateTime.fromFormat('KK', '11');
            assert.strictEqual(
                date.getHours(),
                11
            );
        });

        it('parses zero padded hour', function() {
            const date = DateTime.fromFormat('KK', '00');
            assert.strictEqual(
                date.getHours(),
                0
            );
        });
    });

    describe('k - Hour [1-24] (1-digit)', function() {
        it('parses the hour [1-24]', function() {
            const date = DateTime.fromFormat('k', '24');
            assert.strictEqual(
                date.getHours(),
                0
            );
        });

        it('parses 1-digit hour', function() {
            const date = DateTime.fromFormat('k', '1')
            assert.strictEqual(
                date.getHours(),
                1
            );
        });
    });

    describe('kk - Hour [1-24] (2-digits)', function() {
        it('parses the hour [1-24]', function() {
            const date = DateTime.fromFormat('kk', '24');
            assert.strictEqual(
                date.getHours(),
                0
            );
        });

        it('parses zero padded hour', function() {
            const date = DateTime.fromFormat('kk', '01')
            assert.strictEqual(
                date.getHours(),
                1
            );
        });
    });

    /**
     * Minute
     */

    describe('m - Minute (1-digit)', function() {
        it('parses the minute', function() {
            const date = DateTime.fromFormat('m', '25');
            assert.strictEqual(
                date.getMinutes(),
                25
            );
        });

        it('parses 1-digit minute', function() {
            const date = DateTime.fromFormat('m', '1');
            assert.strictEqual(
                date.getMinutes(),
                1
            );
        });
    });

    describe('mm - Minute (2-digits)', function() {
        it('parses the minute', function() {
            const date = DateTime.fromFormat('mm', '25');
            assert.strictEqual(
                date.getMinutes(),
                25
            );
        });

        it('parses zero padded minute', function() {
            const date = DateTime.fromFormat('mm', '01');
            assert.strictEqual(
                date.getMinutes(),
                1
            );
        });
    });

    /**
     * Second
     */

    describe('s - Second (1-digit)', function() {
        it('parses the second', function() {
            const date = DateTime.fromFormat('s', '25');
            assert.strictEqual(
                date.getSeconds(),
                25
            );
        });

        it('parses 1-digit second', function() {
            const date = DateTime.fromFormat('s', '1');
            assert.strictEqual(
                date.getSeconds(),
                1
            );
        });
    });

    describe('ss - Second (2-digits)', function() {
        it('parses the second', function() {
            const date = DateTime.fromFormat('ss', '25');
            assert.strictEqual(
                date.getSeconds(),
                25
            );
        });

        it('parses zero padded second', function() {
            const date = DateTime.fromFormat('ss', '01');
            assert.strictEqual(
                date.getSeconds(),
                1
            );
        });
    });

    // fractional second

});