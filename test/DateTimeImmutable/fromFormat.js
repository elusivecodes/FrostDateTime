const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable #fromFormat', function() {

    /**
     * Era
     */

    describe('GGG - Era (Short)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy GGG', '1970 AD')
                    .getYear(),
                1970
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy GGG', '1970 BC')
                    .getYear(),
                -1970
            );
        });
    });

    describe('GGGG - Era (Long)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy GGGG', '1970 Anno Domini')
                    .getYear(),
                1970
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy GGGG', '1970 Before Christ')
                    .getYear(),
                -1970
            );
        });
    });

    describe('GGGGG - Era (Narrow)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy GGGGG', '1970 A')
                    .getYear(),
                1970
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy GGGGG', '1970 B')
                    .getYear(),
                -1970
            );
        });
    });

    /**
     * Year
     */

    describe('y - Year (1-digit)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('y', '2018')
                    .getYear(),
                2018
            );
        });

        it('parses 1-digit year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('y', '5')
                    .getYear(),
                5
            );
        });
    });

    describe('yy - Year (2-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yy', '2018')
                    .getYear(),
                2018
            );
        });

        it('parses 2-digit year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yy', '88')
                    .getYear(),
                1988
            );
        });
    });

    describe('yyy - Year (3-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyy', '2018')
                    .getYear(),
                2018
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyy', '088')
                    .getYear(),
                88
            );
        });
    });

    describe('yyyy - Year (4-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy', '2018')
                    .getYear(),
                2018
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy', '0088')
                    .getYear(),
                88
            );
        });
    });

    /**
     * Week Year
     */

    describe('Y - Year (1-digit)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('Y', '2018')
                    .getWeekYear(),
                2018
            );
        });

        it('parses 1-digit year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('Y', '5')
                    .getWeekYear(),
                5
            );
        });
    });

    describe('YY - Year (2-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('YY', '2018')
                    .getWeekYear(),
                2018
            );
        });

        it('parses 2-digit year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('YY', '88')
                    .getWeekYear(),
                1988
            );
        });
    });

    describe('YYY - Year (3-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('YYY', '2018')
                    .getWeekYear(),
                2018
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('YYY', '088')
                    .getWeekYear(),
                88
            );
        });
    });

    describe('YYYY - Year (4-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('YYYY', '2018')
                    .getWeekYear(),
                2018
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('YYYY', '0088')
                    .getWeekYear(),
                88
            );
        });
    });

    /**
     * Quarter
     */

    describe('q - Quarter (1-digit)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('q', '3')
                    .getQuarter(),
                3
            );
        });
    });

    describe('qq - Quarter (2-digits)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('qq', '03')
                    .getQuarter(),
                3
            );
        });
    });

    describe('Q - Quarter (1-digit)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('Q', '3')
                    .getQuarter(),
                3
            );
        });
    });

    describe('QQ - Quarter (2-digits)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('QQ', '03')
                    .getQuarter(),
                3
            );
        });
    });

    /**
     * Month
     */

    describe('M - Month (1-digit)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('M', '10')
                    .getMonth(),
                10
            );
        });

        it('parses 1-digit month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('M', '1')
                    .getMonth(),
                1
            );
        });
    });

    describe('MM - Month (2-digits)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('MM', '10')
                    .getMonth(),
                10
            );
        });

        it('parses zero padded month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('MM', '01')
                    .getMonth(),
                1
            );
        });
    });

    describe('MMM - Month Name (Short)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('MMM', 'Oct')
                    .getMonth(),
                10
            );
        });
    });

    describe('MMMM - Month Name (Long)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('MMMM', 'October')
                    .getMonth(),
                10
            );
        });
    });

    // describe('MMMMM - Month Name (Narrow)', function() {
    //     it('parses month name', function() {
    //         assert.strictEqual(
    //             DateTimeImmutable.fromFormat('MMMMM', 'O')
    //                 .getMonth(),
    //             10
    //         );
    //     });
    // });

    describe('L - Month (1-digit)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('L', '10')
                    .getMonth(),
                10
            );
        });

        it('parses 1-digit month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('L', '1')
                    .getMonth(),
                1
            );
        });
    });

    describe('LL - Month (2-digits)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('LL', '10')
                    .getMonth(),
                10
            );
        });

        it('parses zero padded month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('LL', '01')
                    .getMonth(),
                1
            );
        });
    });

    describe('LLL - Month Name (Short)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('LLL', 'Oct')
                    .getMonth(),
                10
            );
        });
    });

    describe('LLLL - Month Name (Long)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('LLLL', 'October')
                    .getMonth(),
                10
            );
        });
    });

    // describe('LLLLL - Month Name (Narrow)', function() {
    //     it('parses month name', function() {
    //         assert.strictEqual(
    //             DateTimeImmutable.fromFormat('LLLLL', 'O')
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
                DateTimeImmutable.fromFormat('w', '22')
                    .getWeek(),
                22
            );
        });

        it('parses 1-digit week of year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('w', '1')
                    .getWeek(),
                1
            );
        });
    });

    describe('ww - Week Of Year (2-digits)', function() {
        it('parses week of year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('ww', '22')
                    .getWeek(),
                22
            );
        });

        it('parses zero padded week of year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('ww', '01')
                    .getWeek(),
                1
            );
        });
    });

    describe('W - Week Of Month', function() {
        it('parses the week of the month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('W', '3')
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
                DateTimeImmutable.fromFormat('d', '21')
                    .getDate(),
                21
            );
        });

        it('parses 1-digit day of the month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('d', '1')
                    .getDate(),
                1
            );
        });
    });

    describe('dd - Day of Month (2-digits)', function() {
        it('parses the day of the month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd', '21')
                    .getDate(),
                21
            );
        });

        it('parses zero padded day of the month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd', '01')
                    .getDate(),
                1
            );
        });
    });

    describe('D - Day of Year (1-digit)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('D', '152')
                    .getDayOfYear(),
                152
            );
        });

        it('parses 1-digit day of the year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('D', '1')
                    .getDayOfYear(),
                1
            );
        });
    });

    describe('DD - Day of Year (2-digits)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('DD', '152')
                    .getDayOfYear(),
                152
            );
        });

        it('parses zero padded day of the year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('DD', '01')
                    .getDayOfYear(),
                1
            );
        });
    });

    describe('DDD - Day of Year (3-digits)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('DDD', '152')
                    .getDayOfYear(),
                152
            );
        });

        it('parses zero padded day of the year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('DDD', '001')
                    .getDayOfYear(),
                1
            );
        });
    });

    describe('F - Day Of Week In Month', function() {
        it('parses the day of week in the month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('F', '3')
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
            assert.strictEqual(
                DateTimeImmutable.fromFormat('EEE', 'Fri')
                    .getWeekDay(),
                6
            );
        });
    });

    describe('EEEE - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('EEEE', 'Friday')
                    .getWeekDay(),
                6
            );
        });
    });

    // describe('EEEEE - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTimeImmutable.fromFormat('EEEEE', 'F')
    //                 .getWeekDay(),
    //             6
    //         );
    //     });
    // });

    describe('e - Week Day (1-digit)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('e', '6')
                    .getWeekDay(),
                6
            );
        });
    });

    describe('ee - Week Day (2-digits)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('ee', '06')
                    .getWeekDay(),
                6
            );
        });
    });

    describe('eee - Week Day (Short)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('eee', 'Fri')
                    .getWeekDay(),
                6
            );
        });
    });

    describe('eeee - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('eeee', 'Friday')
                    .getWeekDay(),
                6
            );
        });
    });

    // describe('eeeee - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTimeImmutable.fromFormat('eeeee', 'F')
    //                 .getWeekDay(),
    //             6
    //         );
    //     });
    // });

    describe('c - Week Day (1-digit)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('c', '6')
                    .getWeekDay(),
                6
            );
        });
    });

    describe('cc - Week Day (2-digits)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('cc', '06')
                    .getWeekDay(),
                6
            );
        });
    });

    describe('ccc - Week Day (Short)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('ccc', 'Fri')
                    .getWeekDay(),
                6
            );
        });
    });

    describe('cccc - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('cccc', 'Friday')
                    .getWeekDay(),
                6
            );
        });
    });

    // describe('ccccc - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTimeImmutable.fromFormat('ccccc', 'F')
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
                DateTimeImmutable.fromFormat('aaa', 'AM')
                    .getHours(),
                0
            );
        });

        it('parses pm day period', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('aaa', 'PM')
                    .getHours(),
                12
            );
        });
    });

    describe('aaaa - Day Period (Long)', function() {
        it('parses AM day period', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('aaaa', 'AM')
                    .getHours(),
                0
            );
        });

        it('parses pm day period', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('aaaa', 'PM')
                    .getHours(),
                12
            );
        });
    });

    /**
     * Hour
     */

    describe('h - Hour [1-12] (1-digit)', function() {
        it('parses the hour [1-12]', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('h', '12')
                    .getHours(),
                0
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('h', '1')
                    .getHours(),
                1
            );
        });
    });

    describe('hh - Hour [1-12] (2-digits)', function() {
        it('parses the hour [1-12]', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('hh', '12')
                    .getHours(),
                0
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('hh', '01')
                    .getHours(),
                1
            );
        });
    });

    describe('H - Hour [0-23] (1-digit)', function() {
        it('parses the hour [0-23]', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('H', '23')
                    .getHours(),
                23
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('H', '0')
                    .getHours(),
                0
            );
        });
    });

    describe('HH - Hour [0-23] (2-digits)', function() {
        it('parses the hour [0-23]', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('HH', '23')
                    .getHours(),
                23
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('HH', '00')
                    .getHours(),
                0
            );
        });
    });

    describe('K - Hour [0-11] (1-digit)', function() {
        it('parses the hour [0-11]', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('K', '11')
                    .getHours(),
                11
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('K', '0')
                    .getHours(),
                0
            );
        });
    });

    describe('KK - Hour [0-11] (2-digits)', function() {
        it('parses the hour [0-11]', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('KK', '11')
                    .getHours(),
                11
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('KK', '00')
                    .getHours(),
                0
            );
        });
    });

    describe('k - Hour [1-24] (1-digit)', function() {
        it('parses the hour [1-24]', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('k', '24')
                    .getHours(),
                0
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('k', '1')
                    .getHours(),
                1
            );
        });
    });

    describe('kk - Hour [1-24] (2-digits)', function() {
        it('parses the hour [1-24]', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('kk', '24')
                    .getHours(),
                0
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('kk', '01')
                    .getHours(),
                1
            );
        });
    });

    /**
     * Minute
     */

    describe('m - Minute (1-digit)', function() {
        it('parses the minute', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('m', '25')
                    .getMinutes(),
                25
            );
        });

        it('parses 1-digit minute', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('m', '1')
                    .getMinutes(),
                1
            );
        });
    });

    describe('mm - Minute (2-digits)', function() {
        it('parses the minute', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('mm', '25')
                    .getMinutes(),
                25
            );
        });

        it('parses zero padded minute', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('mm', '01')
                    .getMinutes(),
                1
            );
        });
    });

    /**
     * Second
     */

    describe('s - Second (1-digit)', function() {
        it('parses the second', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('s', '25')
                    .getSeconds(),
                25
            );
        });

        it('parses 1-digit second', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('s', '1')
                    .getSeconds(),
                1
            );
        });
    });

    describe('ss - Second (2-digits)', function() {
        it('parses the second', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('ss', '25')
                    .getSeconds(),
                25
            );
        });

        it('parses zero padded second', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('ss', '01')
                    .getSeconds(),
                1
            );
        });
    });

    describe('S - Fractional Second', function() {
        it('parses the fractional second', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('SSS', '123')
                    .getMilliseconds(),
                0
            );
        });
    });

    /**
     * Time Zone
     */

    describe('ZZZ - Time Zone (ISO8601 basic format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss ZZZ', '01/01/2019 00:00:00 +0000')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss ZZZ', '01/01/2019 00:00:00 +1000')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('ZZZZ - Time Zone (Long localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZ', '01/01/2019 00:00:00 GMT+00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZ', '01/01/2019 00:00:00 GMT+10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('ZZZZZ - Time Zone (ISO8601 extended format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('O - Time Zone (Short localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss O', '01/01/2019 00:00:00 GMT+00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss O', '01/01/2019 00:00:00 GMT+10')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('OOOO - Time Zone (Long localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss OOOO', '01/01/2019 00:00:00 GMT+00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss OOOO', '01/01/2019 00:00:00 GMT+10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('VV - Time Zone (Long time zone ID)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss VV', '01/01/2019 00:00:00 UTC')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss VV', '01/01/2019 00:00:00 Australia/Brisbane')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('X - Time Zone (ISO8601 basic format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss X', '01/01/2019 00:00:00 Z')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss X', '01/01/2019 00:00:00 +10')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('XX - Time Zone (ISO8601 basic format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss XX', '01/01/2019 00:00:00 Z')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss XX', '01/01/2019 00:00:00 +1000')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('XXX - Time Zone (ISO8601 extended format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss XXX', '01/01/2019 00:00:00 Z')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss XXX', '01/01/2019 00:00:00 +10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('x - Time Zone (ISO8601 basic format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +10')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('xx - Time Zone (ISO8601 basic format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +0000')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +1000')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    describe('xxx - Time Zone (ISO8601 extended format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +00:00')
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +10:00')
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00'
            );
        });
    });

    // it('works with narrow month names when month is specified prior', function() {
    //     assert.strictEqual(
    //         DateTimeImmutable.fromFormat('yyyy-MM MMMMM', '2019-06 J').isValid,
    //         true
    //     );
    // });

    // it('works with narrow day names when date is specified prior', function() {
    //     assert.strictEqual(
    //         DateTimeImmutable.fromFormat('yyyy-MM-dd EEEEE', '2019-01-03 T').isValid,
    //         true
    //     );
    // });

    it('returns a new DateTimeImmutable', function() {
        assert.ok(
            DateTimeImmutable.fromFormat('yyyy', '2018').constructor === DateTimeImmutable
        );
    });

});