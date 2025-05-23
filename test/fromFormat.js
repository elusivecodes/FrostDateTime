import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime #fromFormat', function() {
    /**
     * Era
     */

    describe('GGG - Era (Short)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGG', '1970 AD')
                    .getYear(),
                1970,
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGG', '1970 BC')
                    .getYear(),
                -1970,
            );
        });
    });

    describe('GGGG - Era (Long)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGGG', '1970 Anno Domini')
                    .getYear(),
                1970,
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGGG', '1970 Before Christ')
                    .getYear(),
                -1970,
            );
        });
    });

    describe('GGGGG - Era (Narrow)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGGGG', '1970 A')
                    .getYear(),
                1970,
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGGGG', '1970 B')
                    .getYear(),
                -1970,
            );
        });
    });

    /**
     * Year
     */

    describe('y - Year (1-digit)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('y', '2018')
                    .getYear(),
                2018,
            );
        });

        it('parses 1-digit year', function() {
            assert.strictEqual(
                DateTime.fromFormat('y', '5')
                    .getYear(),
                5,
            );
        });
    });

    describe('yy - Year (2-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yy', '2018')
                    .getYear(),
                2018,
            );
        });

        it('parses 2-digit year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yy', '88')
                    .getYear(),
                1988,
            );
        });
    });

    describe('yyy - Year (3-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyy', '2018')
                    .getYear(),
                2018,
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyy', '088')
                    .getYear(),
                88,
            );
        });
    });

    describe('yyyy - Year (4-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy', '2018')
                    .getYear(),
                2018,
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy', '0088')
                    .getYear(),
                88,
            );
        });
    });

    /**
     * Week Year
     */

    describe('Y - Year (1-digit)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('Y w e', '2018 1 1')
                    .getWeekYear(),
                2018,
            );
        });

        it('parses 1-digit year', function() {
            assert.strictEqual(
                DateTime.fromFormat('Y w e', '5 1 1')
                    .getWeekYear(),
                5,
            );
        });
    });

    describe('YY - Year (2-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YY w e', '2018 1 1')
                    .getWeekYear(),
                2018,
            );
        });

        it('parses 2-digit year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YY w e', '88 1 1')
                    .getWeekYear(),
                1988,
            );
        });
    });

    describe('YYY - Year (3-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YYY w e', '2018 1 1')
                    .getWeekYear(),
                2018,
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YYY w e', '088 1 1')
                    .getWeekYear(),
                88,
            );
        });
    });

    describe('YYYY - Year (4-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YYYY w e', '2018 1 1')
                    .getWeekYear(),
                2018,
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YYYY w e', '0088 1 1')
                    .getWeekYear(),
                88,
            );
        });
    });

    /**
     * Quarter
     */

    describe('q - Quarter (1-digit)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTime.fromFormat('q', '3')
                    .getQuarter(),
                3,
            );
        });
    });

    describe('qq - Quarter (2-digits)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTime.fromFormat('qq', '03')
                    .getQuarter(),
                3,
            );
        });
    });

    describe('Q - Quarter (1-digit)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTime.fromFormat('Q', '3')
                    .getQuarter(),
                3,
            );
        });
    });

    describe('QQ - Quarter (2-digits)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTime.fromFormat('QQ', '03')
                    .getQuarter(),
                3,
            );
        });
    });

    /**
     * Month
     */

    describe('M - Month (1-digit)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTime.fromFormat('M', '10')
                    .getMonth(),
                10,
            );
        });

        it('parses 1-digit month', function() {
            assert.strictEqual(
                DateTime.fromFormat('M', '1')
                    .getMonth(),
                1,
            );
        });
    });

    describe('MM - Month (2-digits)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTime.fromFormat('MM', '10')
                    .getMonth(),
                10,
            );
        });

        it('parses zero padded month', function() {
            assert.strictEqual(
                DateTime.fromFormat('MM', '01')
                    .getMonth(),
                1,
            );
        });
    });

    describe('MMM - Month Name (Short)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTime.fromFormat('MMM', 'Oct')
                    .getMonth(),
                10,
            );
        });
    });

    describe('MMMM - Month Name (Long)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTime.fromFormat('MMMM', 'October')
                    .getMonth(),
                10,
            );
        });
    });

    // describe('MMMMM - Month Name (Narrow)', function() {
    //     it('parses month name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('MMMMM', 'O')
    //                 .getMonth(),
    //             10
    //         );
    //     });
    // });

    describe('L - Month (1-digit)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTime.fromFormat('L', '10')
                    .getMonth(),
                10,
            );
        });

        it('parses 1-digit month', function() {
            assert.strictEqual(
                DateTime.fromFormat('L', '1')
                    .getMonth(),
                1,
            );
        });
    });

    describe('LL - Month (2-digits)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTime.fromFormat('LL', '10')
                    .getMonth(),
                10,
            );
        });

        it('parses zero padded month', function() {
            assert.strictEqual(
                DateTime.fromFormat('LL', '01')
                    .getMonth(),
                1,
            );
        });
    });

    describe('LLL - Month Name (Short)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTime.fromFormat('LLL', 'Oct')
                    .getMonth(),
                10,
            );
        });
    });

    describe('LLLL - Month Name (Long)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTime.fromFormat('LLLL', 'October')
                    .getMonth(),
                10,
            );
        });
    });

    // describe('LLLLL - Month Name (Narrow)', function() {
    //     it('parses month name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('LLLLL', 'O')
    //                 .getMonth(),
    //             10
    //         );
    //     });
    // });

    /**
     * Week
     */

    describe('w - Week Of Year (1-digit)', function() {
        it('parses week of year', function() {
            assert.strictEqual(
                DateTime.fromFormat('w', '22')
                    .getWeek(),
                22,
            );
        });

        it('parses 1-digit week of year', function() {
            assert.strictEqual(
                DateTime.fromFormat('w', '1')
                    .getWeek(),
                1,
            );
        });
    });

    describe('ww - Week Of Year (2-digits)', function() {
        it('parses week of year', function() {
            assert.strictEqual(
                DateTime.fromFormat('ww', '22')
                    .getWeek(),
                22,
            );
        });

        it('parses zero padded week of year', function() {
            assert.strictEqual(
                DateTime.fromFormat('ww', '01')
                    .getWeek(),
                1,
            );
        });
    });

    describe('W - Week Of Month', function() {
        it('parses the week of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('W', '3')
                    .getWeekOfMonth(),
                3,
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
                21,
            );
        });

        it('parses 1-digit day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('d', '1')
                    .getDate(),
                1,
            );
        });
    });

    describe('dd - Day of Month (2-digits)', function() {
        it('parses the day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd', '21')
                    .getDate(),
                21,
            );
        });

        it('parses zero padded day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd', '01')
                    .getDate(),
                1,
            );
        });
    });

    describe('D - Day of Year (1-digit)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('D', '152')
                    .getDayOfYear(),
                152,
            );
        });

        it('parses 1-digit day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('D', '1')
                    .getDayOfYear(),
                1,
            );
        });
    });

    describe('DD - Day of Year (2-digits)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DD', '152')
                    .getDayOfYear(),
                152,
            );
        });

        it('parses zero padded day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DD', '01')
                    .getDayOfYear(),
                1,
            );
        });
    });

    describe('DDD - Day of Year (3-digits)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DDD', '152')
                    .getDayOfYear(),
                152,
            );
        });

        it('parses zero padded day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DDD', '001')
                    .getDayOfYear(),
                1,
            );
        });
    });

    describe('F - Day Of Week In Month', function() {
        it('parses the day of week in the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('F', '3')
                    .getWeekDayInMonth(),
                3,
            );
        });
    });

    /**
     * Week Day
     */

    describe('EEE - Week Day (Short)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('EEE', 'Fri')
                    .getWeekDay(),
                6,
            );
        });
    });

    describe('EEEE - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('EEEE', 'Friday')
                    .getWeekDay(),
                6,
            );
        });
    });

    // describe('EEEEE - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('EEEEE', 'F')
    //                 .getWeekDay(),
    //             6
    //         );
    //     });
    // });

    describe('e - Week Day (1-digit)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTime.fromFormat('e', '6')
                    .getWeekDay(),
                6,
            );
        });
    });

    describe('ee - Week Day (2-digits)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTime.fromFormat('ee', '06')
                    .getWeekDay(),
                6,
            );
        });
    });

    describe('eee - Week Day (Short)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('eee', 'Fri')
                    .getWeekDay(),
                6,
            );
        });
    });

    describe('eeee - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('eeee', 'Friday')
                    .getWeekDay(),
                6,
            );
        });
    });

    // describe('eeeee - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('eeeee', 'F')
    //                 .getWeekDay(),
    //             6
    //         );
    //     });
    // });

    describe('c - Week Day (1-digit)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTime.fromFormat('c', '6')
                    .getWeekDay(),
                6,
            );
        });
    });

    describe('cc - Week Day (2-digits)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTime.fromFormat('cc', '06')
                    .getWeekDay(),
                6,
            );
        });
    });

    describe('ccc - Week Day (Short)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('ccc', 'Fri')
                    .getWeekDay(),
                6,
            );
        });
    });

    describe('cccc - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('cccc', 'Friday')
                    .getWeekDay(),
                6,
            );
        });
    });

    // describe('ccccc - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('ccccc', 'F')
    //                 .getWeekDay(),
    //             6
    //         );
    //     });
    // });

    /**
     * Day Period
     */

    describe('aaa - Day Period (Short)', function() {
        it('parses AM day period', function() {
            assert.strictEqual(
                DateTime.fromFormat('aaa', 'AM')
                    .getHours(),
                0,
            );
        });

        it('parses pm day period', function() {
            assert.strictEqual(
                DateTime.fromFormat('aaa', 'PM')
                    .getHours(),
                12,
            );
        });
    });

    describe('aaaa - Day Period (Long)', function() {
        it('parses AM day period', function() {
            assert.strictEqual(
                DateTime.fromFormat('aaaa', 'AM')
                    .getHours(),
                0,
            );
        });

        it('parses pm day period', function() {
            assert.strictEqual(
                DateTime.fromFormat('aaaa', 'PM')
                    .getHours(),
                12,
            );
        });
    });

    /**
     * Hour
     */

    describe('h - Hour [1-12] (1-digit)', function() {
        it('parses the hour [1-12]', function() {
            assert.strictEqual(
                DateTime.fromFormat('h', '12')
                    .getHours(),
                0,
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('h', '1')
                    .getHours(),
                1,
            );
        });
    });

    describe('hh - Hour [1-12] (2-digits)', function() {
        it('parses the hour [1-12]', function() {
            assert.strictEqual(
                DateTime.fromFormat('hh', '12')
                    .getHours(),
                0,
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('hh', '01')
                    .getHours(),
                1,
            );
        });
    });

    describe('H - Hour [0-23] (1-digit)', function() {
        it('parses the hour [0-23]', function() {
            assert.strictEqual(
                DateTime.fromFormat('H', '23')
                    .getHours(),
                23,
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('H', '0')
                    .getHours(),
                0,
            );
        });
    });

    describe('HH - Hour [0-23] (2-digits)', function() {
        it('parses the hour [0-23]', function() {
            assert.strictEqual(
                DateTime.fromFormat('HH', '23')
                    .getHours(),
                23,
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('HH', '00')
                    .getHours(),
                0,
            );
        });
    });

    describe('K - Hour [0-11] (1-digit)', function() {
        it('parses the hour [0-11]', function() {
            assert.strictEqual(
                DateTime.fromFormat('K', '11')
                    .getHours(),
                11,
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('K', '0')
                    .getHours(),
                0,
            );
        });
    });

    describe('KK - Hour [0-11] (2-digits)', function() {
        it('parses the hour [0-11]', function() {
            assert.strictEqual(
                DateTime.fromFormat('KK', '11')
                    .getHours(),
                11,
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('KK', '00')
                    .getHours(),
                0,
            );
        });
    });

    describe('k - Hour [1-24] (1-digit)', function() {
        it('parses the hour [1-24]', function() {
            assert.strictEqual(
                DateTime.fromFormat('k', '24')
                    .getHours(),
                0,
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('k', '1')
                    .getHours(),
                1,
            );
        });
    });

    describe('kk - Hour [1-24] (2-digits)', function() {
        it('parses the hour [1-24]', function() {
            assert.strictEqual(
                DateTime.fromFormat('kk', '24')
                    .getHours(),
                0,
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('kk', '01')
                    .getHours(),
                1,
            );
        });
    });

    /**
     * Minute
     */

    describe('m - Minute (1-digit)', function() {
        it('parses the minute', function() {
            assert.strictEqual(
                DateTime.fromFormat('m', '25')
                    .getMinutes(),
                25,
            );
        });

        it('parses 1-digit minute', function() {
            assert.strictEqual(
                DateTime.fromFormat('m', '1')
                    .getMinutes(),
                1,
            );
        });
    });

    describe('mm - Minute (2-digits)', function() {
        it('parses the minute', function() {
            assert.strictEqual(
                DateTime.fromFormat('mm', '25')
                    .getMinutes(),
                25,
            );
        });

        it('parses zero padded minute', function() {
            assert.strictEqual(
                DateTime.fromFormat('mm', '01')
                    .getMinutes(),
                1,
            );
        });
    });

    /**
     * Second
     */

    describe('s - Second (1-digit)', function() {
        it('parses the second', function() {
            assert.strictEqual(
                DateTime.fromFormat('s', '25')
                    .getSeconds(),
                25,
            );
        });

        it('parses 1-digit second', function() {
            assert.strictEqual(
                DateTime.fromFormat('s', '1')
                    .getSeconds(),
                1,
            );
        });
    });

    describe('ss - Second (2-digits)', function() {
        it('parses the second', function() {
            assert.strictEqual(
                DateTime.fromFormat('ss', '25')
                    .getSeconds(),
                25,
            );
        });

        it('parses zero padded second', function() {
            assert.strictEqual(
                DateTime.fromFormat('ss', '01')
                    .getSeconds(),
                1,
            );
        });
    });

    describe('S - Fractional Second', function() {
        it('parses the fractional second', function() {
            assert.strictEqual(
                DateTime.fromFormat('SSS', '123')
                    .getMilliseconds(),
                0,
            );
        });
    });

    /**
     * Time Zone
     */

    describe('ZZZ - Time Zone (ISO8601 basic format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZ', '01/01/2019 00:00:00 +0000')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZ', '01/01/2019 00:00:00 +1000')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('ZZZZ - Time Zone (Long localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZ', '01/01/2019 00:00:00 GMT+00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZ', '01/01/2019 00:00:00 GMT+10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('ZZZZZ - Time Zone (ISO8601 extended format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('O - Time Zone (Short localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss O', '01/01/2019 00:00:00 GMT+00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss O', '01/01/2019 00:00:00 GMT+10')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('OOOO - Time Zone (Long localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss OOOO', '01/01/2019 00:00:00 GMT+00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss OOOO', '01/01/2019 00:00:00 GMT+10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('VV - Time Zone (Long time zone ID)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss VV', '01/01/2019 00:00:00 UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss VV', '01/01/2019 00:00:00 Australia/Brisbane')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('X - Time Zone (ISO8601 basic format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss X', '01/01/2019 00:00:00 Z')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss X', '01/01/2019 00:00:00 +10')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('XX - Time Zone (ISO8601 basic format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss XX', '01/01/2019 00:00:00 Z')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss XX', '01/01/2019 00:00:00 +1000')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('XXX - Time Zone (ISO8601 extended format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss XXX', '01/01/2019 00:00:00 Z')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss XXX', '01/01/2019 00:00:00 +10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('x - Time Zone (ISO8601 basic format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +10')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('xx - Time Zone (ISO8601 basic format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +0000')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +1000')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('xxx - Time Zone (ISO8601 extended format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    // it('works with narrow month names when month is specified prior', function() {
    //     assert.strictEqual(
    //         DateTime.fromFormat('yyyy-MM MMMMM', '2019-06 J').isValid,
    //         true
    //     );
    // });

    // it('works with narrow day names when date is specified prior', function() {
    //     assert.strictEqual(
    //         DateTime.fromFormat('yyyy-MM-dd EEEEE', '2019-01-03 T').isValid,
    //         true
    //     );
    // });

    it('creates time only dates from January 01 1970', function() {
        assert.strictEqual(
            DateTime.fromFormat('hh:mm a', '12:00 PM')
                .toISOString(),
            '1970-01-01T12:00:00.000+00:00',
        );
    });

    it('returns a new DateTime', function() {
        assert.ok(
            DateTime.fromFormat('yyyy', '2018').constructor === DateTime,
        );
    });
});
