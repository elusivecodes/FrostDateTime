const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime #format', function() {

    /**
     * Era
     */

    describe('GGG - Era (Short)', function() {
        it('outputs AD era', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('GGG'),
                'AD'
            );
        });

        it('outputs BC era', function() {
            const date = DateTime.fromArray([-5]);
            assert.strictEqual(
                date.format('GGG'),
                'BC'
            );
        });
    });

    describe('GGGG - Era (Long)', function() {
        it('outputs AD era', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('GGGG'),
                'Anno Domini'
            );
        });

        it('outputs BC era', function() {
            const date = DateTime.fromArray([-5]);
            assert.strictEqual(
                date.format('GGGG'),
                'Before Christ'
            );
        });
    });

    describe('GGGGG - Era (Narrow)', function() {
        it('outputs AD era', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('GGGGG'),
                'A'
            );
        });

        it('outputs BC era', function() {
            const date = DateTime.fromArray([-5]);
            assert.strictEqual(
                date.format('GGGGG'),
                'B'
            );
        });
    });

    /**
     * Year
     */

    describe('y - Year (1-digit)', function() {
        it('outputs full year', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('y'),
                '2018'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([5]);
            assert.strictEqual(
                date.format('y'),
                '5'
            );
        });
    });

    describe('yy - Year (2-digits)', function() {
        it('outputs 2 low-order digits of year', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('yy'),
                '18'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([5]);
            assert.strictEqual(
                date.format('yy'),
                '05'
            );
        });
    });

    describe('yyy - Year (3-digits)', function() {
        it('outputs full year', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('yyy'),
                '2018'
            );
        });

        it('zero pads to 3-digits', function() {
            const date = DateTime.fromArray([5]);
            assert.strictEqual(
                date.format('yyy'),
                '005'
            );
        });
    });

    describe('yyyy - Year (4-digits)', function() {
        it('outputs full year', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('yyyy'),
                '2018'
            );
        });

        it('zero pads to 4-digits', function() {
            const date = DateTime.fromArray([5]);
            assert.strictEqual(
                date.format('yyyy'),
                '0005'
            );
        });
    });

    /**
     * Week Year
     */

    describe('Y - Week Year (1-digit)', function() {
        it('outputs full week year', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('Y'),
                '2018'
            );
        });

        it('uses the year of current week', function() {
            const date = DateTime.fromArray([2019, 12, 30]);
            assert.strictEqual(
                date.format('Y'),
                '2020'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([5]);
            assert.strictEqual(
                date.format('Y'),
                '4'
            );
        });
    });

    describe('YY - Week Year (2-digits)', function() {
        it('outputs 2 low-order digits of year', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('YY'),
                '18'
            );
        });

        it('uses the year of current week', function() {
            const date = DateTime.fromArray([2019, 12, 30]);
            assert.strictEqual(
                date.format('YY'),
                '20'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([5]);
            assert.strictEqual(
                date.format('YY'),
                '04'
            );
        });
    });

    describe('YYY - Week Year (3-digits)', function() {
        it('outputs full week year', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('YYY'),
                '2018'
            );
        });

        it('uses the year of current week', function() {
            const date = DateTime.fromArray([2019, 12, 30]);
            assert.strictEqual(
                date.format('YYY'),
                '2020'
            );
        });

        it('zero pads to 3-digits', function() {
            const date = DateTime.fromArray([5]);
            assert.strictEqual(
                date.format('YYY'),
                '004'
            );
        });
    });

    describe('YYYY - Week Year (4-digits)', function() {
        it('outputs full week year', function() {
            const date = DateTime.fromArray([2018]);
            assert.strictEqual(
                date.format('YYYY'),
                '2018'
            );
        });

        it('uses the year of current week', function() {
            const date = DateTime.fromArray([2019, 12, 30]);
            assert.strictEqual(
                date.format('YYYY'),
                '2020'
            );
        });

        it('zero pads to 4-digits', function() {
            const date = DateTime.fromArray([5]);
            assert.strictEqual(
                date.format('YYYY'),
                '0004'
            );
        });
    });

    /**
     * Quarter
     */

    describe('q - Quarter (1-digit)', function() {
        it('outputs quarter', function() {
            const date = DateTime.fromArray([2018, 8]);
            assert.strictEqual(
                date.format('q'),
                '3'
            );
        });
    });

    describe('q - Quarter (2-digits)', function() {
        it('outputs quarter zero padded to 2-digits', function() {
            const date = DateTime.fromArray([2018, 8]);
            assert.strictEqual(
                date.format('qq'),
                '03'
            );
        });
    });

    describe('Q - Standalone Quarter (1-digit)', function() {
        it('outputs quarter', function() {
            const date = DateTime.fromArray([2018, 8]);
            assert.strictEqual(
                date.format('Q'),
                '3'
            );
        });
    });

    describe('Q - Standalone Quarter (2-digits)', function() {
        it('outputs quarter zero padded to 2-digits', function() {
            const date = DateTime.fromArray([2018, 8]);
            assert.strictEqual(
                date.format('QQ'),
                '03'
            );
        });
    });

    /**
     * Month
     */

    describe('M - Month (1-digit)', function() {
        it('outputs month', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('M'),
                '10'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date.format('M'),
                '1'
            );
        });
    });

    describe('MM - Month (2-digits)', function() {
        it('outputs month', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('MM'),
                '10'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date.format('MM'),
                '01'
            );
        });
    });

    describe('MMM - Month Name (Short)', function() {
        it('outputs month name', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('MMM'),
                'Oct'
            );
        });
    });

    describe('MMMM - Month Name (Long)', function() {
        it('outputs month name', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('MMMM'),
                'October'
            );
        });
    });

    describe('MMMMM - Month Name (Narrow)', function() {
        it('outputs month name', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('MMMMM'),
                'O'
            );
        });
    });

    describe('L - Standalone Month (1-digit)', function() {
        it('outputs month', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('L'),
                '10'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date.format('L'),
                '1'
            );
        });
    });

    describe('LL - Standalone Month (2-digits)', function() {
        it('outputs month', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('LL'),
                '10'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date.format('LL'),
                '01'
            );
        });
    });

    describe('LLL - Standalone Month Name (Short)', function() {
        it('outputs month name', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('LLL'),
                'Oct'
            );
        });
    });

    describe('LLLL - Standalone Month Name (Long)', function() {
        it('outputs month name', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('LLLL'),
                'October'
            );
        });
    });

    describe('LLLLL - Standalone Month Name (Narrow)', function() {
        it('outputs month name', function() {
            const date = DateTime.fromArray([2018, 10]);
            assert.strictEqual(
                date.format('LLLLL'),
                'O'
            );
        });
    });

    /**
     * Week
     */

    describe('w - Week Of Year (1-digit)', function() {
        it('outputs week of year', function() {
            const date = DateTime.fromArray([2018, 6]);
            assert.strictEqual(
                date.format('w'),
                '22'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date.format('w'),
                '1'
            );
        });
    });

    describe('ww - Week Of Year (2-digits)', function() {
        it('outputs week of year', function() {
            const date = DateTime.fromArray([2018, 6]);
            assert.strictEqual(
                date.format('ww'),
                '22'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2018, 1]);
            assert.strictEqual(
                date.format('ww'),
                '01'
            );
        });
    });

    describe('W - Week Of Month', function() {
        it('outputs the week of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('W'),
                '1'
            );
        });

        it('uses the local week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 3])
                    .format('W'),
                '2'
            );
        });
    });

    /**
     * Day
     */

    describe('d - Day of Month (1-digit)', function() {
        it('outputs the day of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 21])
                    .format('d'),
                '21'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('d'),
                '1'
            );
        });
    });

    describe('dd - Day of Month (2-digits)', function() {
        it('outputs the day of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 21])
                    .format('dd'),
                '21'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('dd'),
                '01'
            );
        });
    });

    describe('D - Day of Year (1-digit)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('D'),
                '152'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('D'),
                '1'
            );
        });
    });

    describe('DD - Day of Year (2-digits)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('DD'),
                '152'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('DD'),
                '01'
            );
        });
    });

    describe('DDD - Day of Year (3-digits)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('DDD'),
                '152'
            );
        });

        it('zero pads to 3-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('DDD'),
                '001'
            );
        });
    });

    describe('F - Day Of Week In Month', function() {
        it('outputs the day of week in the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('F'),
                '1'
            );
        });

        it('uses the local week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 7])
                    .format('F'),
                '1'
            );
        });
    });

    /**
     * Week Day
     */

    describe('EEE - Week Day (Short)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('EEE'),
                'Fri'
            );
        });
    });

    describe('EEEE - Week Day (Long)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('EEEE'),
                'Friday'
            );
        });
    });

    describe('EEEEE - Week Day (Narrow)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('EEEEE'),
                'F'
            );
        });
    });

    describe('e - Week Day (1-digit)', function() {
        it('outputs day', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('e'),
                '5'
            );
        });
    });

    describe('ee - Week Day (2-digits)', function() {
        it('outputs day', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('ee'),
                '05'
            );
        });
    });

    describe('eee - Week Day (Short)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('eee'),
                'Fri'
            );
        });
    });

    describe('eeee - Week Day (Long)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('eeee'),
                'Friday'
            );
        });
    });

    describe('eeeee - Week Day (Narrow)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('eeeee'),
                'F'
            );
        });
    });

    describe('c - Week Day (1-digit)', function() {
        it('outputs day', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('c'),
                '5'
            );
        });
    });

    describe('cc - Week Day (2-digits)', function() {
        it('outputs day', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('cc'),
                '05'
            );
        });
    });

    describe('ccc - Week Day (Short)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('ccc'),
                'Fri'
            );
        });
    });

    describe('cccc - Week Day (Long)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('cccc'),
                'Friday'
            );
        });
    });

    describe('ccccc - Week Day (Narrow)', function() {
        it('outputs day name', function() {
            const date = DateTime.fromArray([2018, 6, 1]);
            assert.strictEqual(
                date.format('ccccc'),
                'F'
            );
        });
    });

    /**
     * Day Period
     */

    describe('aaa - Day Period (Short)', function() {
        it('outputs AM day period', function() {
            const date = DateTime.fromArray([2018, 1, 1, 0]);
            assert.strictEqual(
                date.format('aaa'),
                'AM'
            );
        });

        it('outputs pm day period', function() {
            const date = DateTime.fromArray([2018, 1, 1, 12]);
            assert.strictEqual(
                date.format('aaa'),
                'PM'
            );
        });
    });

    describe('aaaa - Day Period (Long)', function() {
        it('outputs AM day period', function() {
            const date = DateTime.fromArray([2018, 1, 1, 0]);
            assert.strictEqual(
                date.format('aaaa'),
                'AM'
            );
        });

        it('outputs pm day period', function() {
            const date = DateTime.fromArray([2018, 1, 1, 12]);
            assert.strictEqual(
                date.format('aaaa'),
                'PM'
            );
        });
    });

    // describe('aaaaa - Day Period (Narrow)', function() {
    //     it('outputs AM day period', function() {
    //         const date = DateTime.fromArray([2018, 1, 1, 0]);
    //         assert.strictEqual(
    //             date.format('aaaaa'),
    //             'A'
    //         );
    //     });

    //     it('outputs pm day period', function() {
    //         const date = DateTime.fromArray([2018, 1, 1, 12]);
    //         assert.strictEqual(
    //             date.format('aaaaa'),
    //             'P'
    //         );
    //     });
    // });

    /**
     * Hour
     */

    describe('h - Hour [1-12] (1-digit)', function() {
        it('outputs the hour [1-12]', function() {
            const date = DateTime.fromArray([2019, 1, 1, 12]);
            assert.strictEqual(
                date.format('h'),
                '12'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2019, 1, 1, 1]);
            assert.strictEqual(
                date.format('h'),
                '1'
            );
        });
    });

    describe('hh - Hour [1-12] (2-digits)', function() {
        it('outputs the hour [1-12]', function() {
            const date = DateTime.fromArray([2019, 1, 1, 23]);
            assert.strictEqual(
                date.format('hh'),
                '11'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2019, 1, 1, 1]);
            assert.strictEqual(
                date.format('hh'),
                '01'
            );
        });
    });

    describe('H - Hour [0-23] (1-digit)', function() {
        it('outputs the hour [0-23]', function() {
            const date = DateTime.fromArray([2019, 1, 1, 23]);
            assert.strictEqual(
                date.format('H'),
                '23'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0]);
            assert.strictEqual(
                date.format('H'),
                '0'
            );
        });
    });

    describe('HH - Hour [0-23] (2-digits)', function() {
        it('outputs the hour [0-23]', function() {
            const date = DateTime.fromArray([2019, 1, 1, 23]);
            assert.strictEqual(
                date.format('HH'),
                '23'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0]);
            assert.strictEqual(
                date.format('HH'),
                '00'
            );
        });
    });

    describe('K - Hour [0-11] (1-digit)', function() {
        it('outputs the hour [0-11]', function() {
            const date = DateTime.fromArray([2019, 1, 1, 23]);
            assert.strictEqual(
                date.format('K'),
                '11'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0]);
            assert.strictEqual(
                date.format('K'),
                '0'
            );
        });
    });

    describe('KK - Hour [0-11] (2-digits)', function() {
        it('outputs the hour [0-11]', function() {
            const date = DateTime.fromArray([2019, 1, 1, 23]);
            assert.strictEqual(
                date.format('KK'),
                '11'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0]);
            assert.strictEqual(
                date.format('KK'),
                '00'
            );
        });
    });

    describe('k - Hour [1-24] (1-digit)', function() {
        it('outputs the hour [1-24]', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0]);
            assert.strictEqual(
                date.format('k'),
                '24'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2019, 1, 1, 1]);
            assert.strictEqual(
                date.format('k'),
                '1'
            );
        });
    });

    describe('kk - Hour [1-24] (2-digits)', function() {
        it('outputs the hour [1-24]', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0]);
            assert.strictEqual(
                date.format('kk'),
                '24'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2019, 1, 1, 1]);
            assert.strictEqual(
                date.format('kk'),
                '01'
            );
        });
    });

    /**
     * Minute
     */

    describe('m - Minute (1-digit)', function() {
        it('outputs the minute', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 25]);
            assert.strictEqual(
                date.format('m'),
                '25'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 1]);
            assert.strictEqual(
                date.format('m'),
                '1'
            );
        });
    });

    describe('mm - Minute (2-digits)', function() {
        it('outputs the minute', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 25]);
            assert.strictEqual(
                date.format('mm'),
                '25'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 1]);
            assert.strictEqual(
                date.format('mm'),
                '01'
            );
        });
    });

    /**
     * Second
     */

    describe('s - Minute (1-digit)', function() {
        it('outputs the second', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 0, 25]);
            assert.strictEqual(
                date.format('s'),
                '25'
            );
        });

        it('does not zero pad', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 0, 1]);
            assert.strictEqual(
                date.format('s'),
                '1'
            );
        });
    });

    describe('ss - Minute (2-digits)', function() {
        it('outputs the second', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 0, 25]);
            assert.strictEqual(
                date.format('ss'),
                '25'
            );
        });

        it('zero pads to 2-digits', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 0, 1]);
            assert.strictEqual(
                date.format('ss'),
                '01'
            );
        });
    });

    describe('S - Fractional Second', function() {
        it('outputs the fractional second', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 0, 0, 123]);
            assert.strictEqual(
                date.format('SSS'),
                '123'
            );
        });

        it('truncates to token length', function() {
            const date = DateTime.fromArray([2019, 1, 1, 0, 0, 0, 123]);
            assert.strictEqual(
                date.format('S'),
                '1'
            );
        });
    });

    /**
     * Time Zone
     */

    describe('zzz - Time Zone (Short specific non-location format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('zzz'),
                'UTC'
            );
        });
    });

    describe('zzzz - Time Zone (Long specific non-location format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('zzzz'),
                'Coordinated Universal Time'
            );
        });
    });

    describe('ZZZ - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('ZZZ'),
                '+0000'
            );
        });
    });

    describe('ZZZZ - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('ZZZZ'),
                'GMT+00:00'
            );
        });
    });

    describe('ZZZZZ - Time Zone (ISO8601 extended format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('ZZZZZ'),
                '+00:00'
            );
        });
    });

    describe('O - Time Zone (Short localized GMT format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('O'),
                'GMT+00'
            );
        });
    });

    describe('OOOO - Time Zone (Long localized GMT format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('OOOO'),
                'GMT+00:00'
            );
        });
    });

    describe('VV - Time Zone (Long time zone ID)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('VV'),
                'UTC'
            );
        });
    });

    describe('X - Time Zone (ISO8601 basic format with Z)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('X'),
                'Z'
            );
        });
    });

    describe('XX - Time Zone (ISO8601 basic format with Z)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('XX'),
                'Z'
            );
        });
    });

    describe('XXX - Time Zone (ISO8601 extended format with Z)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('XXX'),
                'Z'
            );
        });
    });

    describe('x - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('x'),
                '+00'
            );
        });
    });

    describe('xx - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('xx'),
                '+0000'
            );
        });
    });

    describe('xxx - Time Zone (ISO8601 extended format)', function() {
        it('outputs the time zone', function() {
            const date = DateTime.now();
            assert.strictEqual(
                date.format('xxx'),
                '+00:00'
            );
        });
    });

});