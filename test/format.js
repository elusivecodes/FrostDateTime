import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime #format', function() {
    /**
     * Era
     */

    describe('GGG - Era (Short)', function() {
        it('outputs AD era', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('GGG'),
                'AD',
            );
        });

        it('outputs BC era', function() {
            assert.strictEqual(
                DateTime.fromArray([-5])
                    .format('GGG'),
                'BC',
            );
        });
    });

    describe('GGGG - Era (Long)', function() {
        it('outputs AD era', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('GGGG'),
                'Anno Domini',
            );
        });

        it('outputs BC era', function() {
            assert.strictEqual(
                DateTime.fromArray([-5])
                    .format('GGGG'),
                'Before Christ',
            );
        });
    });

    describe('GGGGG - Era (Narrow)', function() {
        it('outputs AD era', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('GGGGG'),
                'A',
            );
        });

        it('outputs BC era', function() {
            assert.strictEqual(
                DateTime.fromArray([-5])
                    .format('GGGGG'),
                'B',
            );
        });
    });

    /**
     * Year
     */

    describe('y - Year (1-digit)', function() {
        it('outputs full year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('y'),
                '2018',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([5])
                    .format('y'),
                '5',
            );
        });

        it('outputs absolute year', function() {
            assert.strictEqual(
                DateTime.fromArray([-2000])
                    .format('y'),
                '2000',
            );
        });
    });

    describe('yy - Year (2-digits)', function() {
        it('outputs 2 low-order digits of year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('yy'),
                '18',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5])
                    .format('yy'),
                '05',
            );
        });

        it('outputs absolute year', function() {
            assert.strictEqual(
                DateTime.fromArray([-2000])
                    .format('yy'),
                '00',
            );
        });
    });

    describe('yyy - Year (3-digits)', function() {
        it('outputs full year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('yyy'),
                '2018',
            );
        });

        it('zero pads to 3-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5])
                    .format('yyy'),
                '005',
            );
        });

        it('outputs absolute year', function() {
            assert.strictEqual(
                DateTime.fromArray([-2000])
                    .format('yyy'),
                '2000',
            );
        });
    });

    describe('yyyy - Year (4-digits)', function() {
        it('outputs full year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('yyyy'),
                '2018',
            );
        });

        it('zero pads to 4-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5])
                    .format('yyyy'),
                '0005',
            );
        });

        it('outputs absolute year', function() {
            assert.strictEqual(
                DateTime.fromArray([-2000])
                    .format('yyyy'),
                '2000',
            );
        });
    });

    /**
     * Week Year
     */

    describe('Y - Week Year (1-digit)', function() {
        it('outputs full week year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('Y'),
                '2018',
            );
        });

        it('uses the year of current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30])
                    .format('Y'),
                '2020',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([5])
                    .format('Y'),
                '5',
            );
        });

        it('outputs absolute year', function() {
            assert.strictEqual(
                DateTime.fromArray([-2000, 1, 4])
                    .format('Y'),
                '2000',
            );
        });
    });

    describe('YY - Week Year (2-digits)', function() {
        it('outputs 2 low-order digits of year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('YY'),
                '18',
            );
        });

        it('uses the year of current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30])
                    .format('YY'),
                '20',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5])
                    .format('YY'),
                '05',
            );
        });

        it('outputs absolute year', function() {
            assert.strictEqual(
                DateTime.fromArray([-2000, 1, 4])
                    .format('YY'),
                '00',
            );
        });
    });

    describe('YYY - Week Year (3-digits)', function() {
        it('outputs full week year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('YYY'),
                '2018',
            );
        });

        it('uses the year of current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30])
                    .format('YYY'),
                '2020',
            );
        });

        it('zero pads to 3-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5])
                    .format('YYY'),
                '005',
            );
        });

        it('outputs absolute year', function() {
            assert.strictEqual(
                DateTime.fromArray([-2000, 1, 4])
                    .format('YYY'),
                '2000',
            );
        });
    });

    describe('YYYY - Week Year (4-digits)', function() {
        it('outputs full week year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018])
                    .format('YYYY'),
                '2018',
            );
        });

        it('uses the year of current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30])
                    .format('YYYY'),
                '2020',
            );
        });

        it('zero pads to 4-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5])
                    .format('YYYY'),
                '0005',
            );
        });

        it('outputs absolute year', function() {
            assert.strictEqual(
                DateTime.fromArray([-2000, 1, 4])
                    .format('YYYY'),
                '2000',
            );
        });
    });

    /**
     * Quarter
     */

    describe('q - Quarter (1-digit)', function() {
        it('outputs quarter', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8])
                    .format('q'),
                '3',
            );
        });
    });

    describe('q - Quarter (2-digits)', function() {
        it('outputs quarter zero padded to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8])
                    .format('qq'),
                '03',
            );
        });
    });

    describe('Q - Standalone Quarter (1-digit)', function() {
        it('outputs quarter', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8])
                    .format('Q'),
                '3',
            );
        });
    });

    describe('Q - Standalone Quarter (2-digits)', function() {
        it('outputs quarter zero padded to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8])
                    .format('QQ'),
                '03',
            );
        });
    });

    /**
     * Month
     */

    describe('M - Month (1-digit)', function() {
        it('outputs month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('M'),
                '10',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .format('M'),
                '1',
            );
        });
    });

    describe('MM - Month (2-digits)', function() {
        it('outputs month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('MM'),
                '10',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .format('MM'),
                '01',
            );
        });
    });

    describe('MMM - Month Name (Short)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('MMM'),
                'Oct',
            );
        });
    });

    describe('MMMM - Month Name (Long)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('MMMM'),
                'October',
            );
        });
    });

    describe('MMMMM - Month Name (Narrow)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('MMMMM'),
                'O',
            );
        });
    });

    describe('L - Standalone Month (1-digit)', function() {
        it('outputs month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('L'),
                '10',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .format('L'),
                '1',
            );
        });
    });

    describe('LL - Standalone Month (2-digits)', function() {
        it('outputs month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('LL'),
                '10',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .format('LL'),
                '01',
            );
        });
    });

    describe('LLL - Standalone Month Name (Short)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('LLL'),
                'Oct',
            );
        });
    });

    describe('LLLL - Standalone Month Name (Long)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('LLLL'),
                'October',
            );
        });
    });

    describe('LLLLL - Standalone Month Name (Narrow)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10])
                    .format('LLLLL'),
                'O',
            );
        });
    });

    /**
     * Week
     */

    describe('w - Week Of Year (1-digit)', function() {
        it('outputs week of year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6])
                    .format('w'),
                '22',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .format('w'),
                '1',
            );
        });
    });

    describe('ww - Week Of Year (2-digits)', function() {
        it('outputs week of year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6])
                    .format('ww'),
                '22',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1])
                    .format('ww'),
                '01',
            );
        });
    });

    describe('W - Week Of Month', function() {
        it('outputs the week of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('W'),
                '1',
            );
        });

        it('uses the local week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 3])
                    .format('W'),
                '2',
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
                '21',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('d'),
                '1',
            );
        });
    });

    describe('dd - Day of Month (2-digits)', function() {
        it('outputs the day of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 21])
                    .format('dd'),
                '21',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('dd'),
                '01',
            );
        });
    });

    describe('D - Day of Year (1-digit)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('D'),
                '152',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('D'),
                '1',
            );
        });
    });

    describe('DD - Day of Year (2-digits)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('DD'),
                '152',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('DD'),
                '01',
            );
        });
    });

    describe('DDD - Day of Year (3-digits)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('DDD'),
                '152',
            );
        });

        it('zero pads to 3-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1])
                    .format('DDD'),
                '001',
            );
        });
    });

    describe('F - Day Of Week In Month', function() {
        it('outputs the day of week in the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1])
                    .format('F'),
                '1',
            );
        });

        it('uses the local week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 7])
                    .format('F'),
                '1',
            );
        });
    });

    /**
     * Week Day
     */

    describe('EEE - Week Day (Short)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('EEE'),
                'Fri',
            );
        });
    });

    describe('EEEE - Week Day (Long)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('EEEE'),
                'Friday',
            );
        });
    });

    describe('EEEEE - Week Day (Narrow)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('EEEEE'),
                'F',
            );
        });
    });

    describe('e - Week Day (1-digit)', function() {
        it('outputs day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('e'),
                '6',
            );
        });
    });

    describe('ee - Week Day (2-digits)', function() {
        it('outputs day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('ee'),
                '06',
            );
        });
    });

    describe('eee - Week Day (Short)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('eee'),
                'Fri',
            );
        });
    });

    describe('eeee - Week Day (Long)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('eeee'),
                'Friday',
            );
        });
    });

    describe('eeeee - Week Day (Narrow)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('eeeee'),
                'F',
            );
        });
    });

    describe('c - Standalone Week Day (1-digit)', function() {
        it('outputs day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('c'),
                '6',
            );
        });
    });

    describe('cc - Standalone Week Day (2-digits)', function() {
        it('outputs day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('cc'),
                '6',
            );
        });
    });

    describe('ccc - Standalone Week Day (Short)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('ccc'),
                'Fri',
            );
        });
    });

    describe('cccc - Standalone Week Day (Long)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('cccc'),
                'Friday',
            );
        });
    });

    describe('ccccc - Standalone Week Day (Narrow)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1])
                    .format('ccccc'),
                'F',
            );
        });
    });

    /**
     * Day Period
     */

    describe('aaa - Day Period (Short)', function() {
        it('outputs AM day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0])
                    .format('aaa'),
                'AM',
            );
        });

        it('outputs pm day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 12])
                    .format('aaa'),
                'PM',
            );
        });
    });

    describe('aaaa - Day Period (Long)', function() {
        it('outputs AM day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0])
                    .format('aaaa'),
                'AM',
            );
        });

        it('outputs pm day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 12])
                    .format('aaaa'),
                'PM',
            );
        });
    });

    /**
     * Hour
     */

    describe('h - Hour [1-12] (1-digit)', function() {
        it('outputs the hour [1-12]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 12])
                    .format('h'),
                '12',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1])
                    .format('h'),
                '1',
            );
        });
    });

    describe('hh - Hour [1-12] (2-digits)', function() {
        it('outputs the hour [1-12]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23])
                    .format('hh'),
                '11',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1])
                    .format('hh'),
                '01',
            );
        });
    });

    describe('H - Hour [0-23] (1-digit)', function() {
        it('outputs the hour [0-23]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23])
                    .format('H'),
                '23',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0])
                    .format('H'),
                '0',
            );
        });
    });

    describe('HH - Hour [0-23] (2-digits)', function() {
        it('outputs the hour [0-23]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23])
                    .format('HH'),
                '23',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0])
                    .format('HH'),
                '00',
            );
        });
    });

    describe('K - Hour [0-11] (1-digit)', function() {
        it('outputs the hour [0-11]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23])
                    .format('K'),
                '11',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0])
                    .format('K'),
                '0',
            );
        });
    });

    describe('KK - Hour [0-11] (2-digits)', function() {
        it('outputs the hour [0-11]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23])
                    .format('KK'),
                '11',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0])
                    .format('KK'),
                '00',
            );
        });
    });

    describe('k - Hour [1-24] (1-digit)', function() {
        it('outputs the hour [1-24]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0])
                    .format('k'),
                '24',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1])
                    .format('k'),
                '1',
            );
        });
    });

    describe('kk - Hour [1-24] (2-digits)', function() {
        it('outputs the hour [1-24]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0])
                    .format('kk'),
                '24',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1])
                    .format('kk'),
                '01',
            );
        });
    });

    /**
     * Minute
     */

    describe('m - Minute (1-digit)', function() {
        it('outputs the minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 25])
                    .format('m'),
                '25',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 1])
                    .format('m'),
                '1',
            );
        });
    });

    describe('mm - Minute (2-digits)', function() {
        it('outputs the minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 25])
                    .format('mm'),
                '25',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 1])
                    .format('mm'),
                '01',
            );
        });
    });

    /**
     * Second
     */

    describe('s - Minute (1-digit)', function() {
        it('outputs the second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 25])
                    .format('s'),
                '25',
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 1])
                    .format('s'),
                '1',
            );
        });
    });

    describe('ss - Minute (2-digits)', function() {
        it('outputs the second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 25])
                    .format('ss'),
                '25',
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 1])
                    .format('ss'),
                '01',
            );
        });
    });

    describe('S - Fractional Second', function() {
        it('outputs the fractional second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 123])
                    .format('SSS'),
                '123',
            );
        });

        it('truncates to token length', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 123])
                    .format('S'),
                '1',
            );
        });

        it('pads to token length', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 123])
                    .format('SSSSSS'),
                '123000',
            );
        });
    });

    /**
     * Time Zone
     */

    describe('zzz - Time Zone (Short specific non-location format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('zzz'),
                'UTC',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('zzz'),
                'GMT+10',
            );
        });
    });

    describe('zzzz - Time Zone (Long specific non-location format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('zzzz'),
                'Coordinated Universal Time',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('zzzz'),
                'Australian Eastern Standard Time',
            );
        });
    });

    describe('ZZZ - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('ZZZ'),
                '+0000',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('ZZZ'),
                '+1000',
            );
        });
    });

    describe('ZZZZ - Time Zone (Long localized GMT format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('ZZZZ'),
                'GMT',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('ZZZZ'),
                'GMT+10:00',
            );
        });
    });

    describe('ZZZZZ - Time Zone (ISO8601 extended format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('ZZZZZ'),
                'Z',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('ZZZZZ'),
                '+10:00',
            );
        });
    });

    describe('O - Time Zone (Short localized GMT format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('O'),
                'GMT',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('O'),
                'GMT+10',
            );
        });
    });

    describe('OOOO - Time Zone (Long localized GMT format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('OOOO'),
                'GMT',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('OOOO'),
                'GMT+10:00',
            );
        });
    });

    describe('VV - Time Zone (Long time zone ID)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('VV'),
                'UTC',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('VV'),
                'Australia/Brisbane',
            );
        });
    });

    describe('X - Time Zone (ISO8601 basic format with Z)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('X'),
                'Z',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('X'),
                '+10',
            );
        });
    });

    describe('XX - Time Zone (ISO8601 basic format with Z)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('XX'),
                'Z',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('XX'),
                '+1000',
            );
        });
    });

    describe('XXX - Time Zone (ISO8601 extended format with Z)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('XXX'),
                'Z',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('XXX'),
                '+10:00',
            );
        });
    });

    describe('x - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('x'),
                '+00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('x'),
                '+10',
            );
        });
    });

    describe('xx - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('xx'),
                '+0000',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('xx'),
                '+1000',
            );
        });
    });

    describe('xxx - Time Zone (ISO8601 extended format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now()
                    .format('xxx'),
                '+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane' })
                    .format('xxx'),
                '+10:00',
            );
        });
    });
});
