import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime #fromFormat (Locale)', function() {
    /**
     * Era
     */

    describe('GGG - Era (Short)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGG', '1970 н. э.', { locale: 'ru' })
                    .getYear(),
                1970,
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGG', '1970 до н. э.', { locale: 'ru' })
                    .getYear(),
                -1970,
            );
        });
    });

    describe('GGGG - Era (Long)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGGG', '1970 от Рождества Христова', { locale: 'ru' })
                    .getYear(),
                1970,
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGGG', '1970 до Рождества Христова', { locale: 'ru' })
                    .getYear(),
                -1970,
            );
        });
    });

    describe('GGGGG - Era (Narrow)', function() {
        it('parses AD era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGGGG', '1970 н.э.', { locale: 'ru' })
                    .getYear(),
                1970,
            );
        });

        it('parses BC era', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy GGGGG', '1970 до н.э.', { locale: 'ru' })
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
                DateTime.fromFormat('y', '٢٠١٨', { locale: 'ar-eg' })
                    .getYear(),
                2018,
            );
        });

        it('parses 1-digit year', function() {
            assert.strictEqual(
                DateTime.fromFormat('y', '٥', { locale: 'ar-eg' })
                    .getYear(),
                5,
            );
        });
    });

    describe('yy - Year (2-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yy', '٢٠١٨', { locale: 'ar-eg' })
                    .getYear(),
                2018,
            );
        });

        it('parses 2-digit year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yy', '٨٨', { locale: 'ar-eg' })
                    .getYear(),
                1988,
            );
        });
    });

    describe('yyy - Year (3-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyy', '٢٠١٨', { locale: 'ar-eg' })
                    .getYear(),
                2018,
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyy', '٠٨٨', { locale: 'ar-eg' })
                    .getYear(),
                88,
            );
        });
    });

    describe('yyyy - Year (4-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy', '٢٠١٨', { locale: 'ar-eg' })
                    .getYear(),
                2018,
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTime.fromFormat('yyyy', '٠٠٨٨', { locale: 'ar-eg' })
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
                DateTime.fromFormat('Y w e', '٢٠١٨ ١ ٣', { locale: 'ar-eg' })
                    .getWeekYear(),
                2018,
            );
        });

        it('parses 1-digit year', function() {
            assert.strictEqual(
                DateTime.fromFormat('Y w e', '٥ ١ ١', { locale: 'ar-eg' })
                    .getWeekYear(),
                5,
            );
        });
    });

    describe('YY - Year (2-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YY w e', '٢٠١٨ ١ ٣', { locale: 'ar-eg' })
                    .getWeekYear(),
                2018,
            );
        });

        it('parses 2-digit year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YY w e', '٨٨ ١ ٦', { locale: 'ar-eg' })
                    .getWeekYear(),
                1988,
            );
        });
    });

    describe('YYY - Year (3-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YYY w e', '٢٠١٨ ١ ٣', { locale: 'ar-eg' })
                    .getWeekYear(),
                2018,
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YYY w e', '٠٨٨ ١ ٦', { locale: 'ar-eg' })
                    .getWeekYear(),
                88,
            );
        });
    });

    describe('YYYY - Year (4-digits)', function() {
        it('parses full year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YYYY w e', '٢٠١٨ ١ ٣', { locale: 'ar-eg' })
                    .getWeekYear(),
                2018,
            );
        });

        it('parses zero padded year', function() {
            assert.strictEqual(
                DateTime.fromFormat('YYYY w e', '٠٠٨٨ ١ ٦', { locale: 'ar-eg' })
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
                DateTime.fromFormat('q', '٣', { locale: 'ar-eg' })
                    .getQuarter(),
                3,
            );
        });
    });

    describe('qq - Quarter (2-digits)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTime.fromFormat('qq', '٠٣', { locale: 'ar-eg' })
                    .getQuarter(),
                3,
            );
        });
    });

    describe('Q - Quarter (1-digit)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTime.fromFormat('Q', '٣', { locale: 'ar-eg' })
                    .getQuarter(),
                3,
            );
        });
    });

    describe('QQ - Quarter (2-digits)', function() {
        it('parses quarter', function() {
            assert.strictEqual(
                DateTime.fromFormat('QQ', '٠٣', { locale: 'ar-eg' })
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
                DateTime.fromFormat('M', '١٠', { locale: 'ar-eg' })
                    .getMonth(),
                10,
            );
        });

        it('parses 1-digit month', function() {
            assert.strictEqual(
                DateTime.fromFormat('M', '١', { locale: 'ar-eg' })
                    .getMonth(),
                1,
            );
        });
    });

    describe('MM - Month (2-digits)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTime.fromFormat('MM', '١٠', { locale: 'ar-eg' })
                    .getMonth(),
                10,
            );
        });

        it('parses zero padded month', function() {
            assert.strictEqual(
                DateTime.fromFormat('MM', '٠١', { locale: 'ar-eg' })
                    .getMonth(),
                1,
            );
        });
    });

    describe('MMM - Month Name (Short)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTime.fromFormat('MMM', 'окт.', { locale: 'ru' })
                    .getMonth(),
                10,
            );
        });
    });

    describe('MMMM - Month Name (Long)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTime.fromFormat('MMMM', 'октября', { locale: 'ru' })
                    .getMonth(),
                10,
            );
        });
    });

    // describe('MMMMM - Month Name (Narrow)', function() {
    //     it('parses month name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('MMMMM', 'О', { locale: 'ru' })
    //                 .getMonth(),
    //             10
    //         );
    //     });
    // });

    describe('L - Month (1-digit)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTime.fromFormat('L', '١٠', { locale: 'ar-eg' })
                    .getMonth(),
                10,
            );
        });

        it('parses 1-digit month', function() {
            assert.strictEqual(
                DateTime.fromFormat('L', '١', { locale: 'ar-eg' })
                    .getMonth(),
                1,
            );
        });
    });

    describe('LL - Month (2-digits)', function() {
        it('parses month', function() {
            assert.strictEqual(
                DateTime.fromFormat('LL', '١٠', { locale: 'ar-eg' })
                    .getMonth(),
                10,
            );
        });

        it('parses zero padded month', function() {
            assert.strictEqual(
                DateTime.fromFormat('LL', '٠١', { locale: 'ar-eg' })
                    .getMonth(),
                1,
            );
        });
    });

    describe('LLL - Month Name (Short)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTime.fromFormat('LLL', 'окт.', { locale: 'ru' })
                    .getMonth(),
                10,
            );
        });
    });

    describe('LLLL - Month Name (Long)', function() {
        it('parses month name', function() {
            assert.strictEqual(
                DateTime.fromFormat('LLLL', 'октябрь', { locale: 'ru' })
                    .getMonth(),
                10,
            );
        });
    });

    // describe('LLLLL - Month Name (Narrow)', function() {
    //     it('parses month name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('LLLLL', 'О', { locale: 'ru' })
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
                DateTime.fromFormat('w', '٢٢', { locale: 'ar-eg' })
                    .getWeek(),
                22,
            );
        });

        it('parses 1-digit week of year', function() {
            assert.strictEqual(
                DateTime.fromFormat('w', '١', { locale: 'ar-eg' })
                    .getWeek(),
                1,
            );
        });
    });

    describe('ww - Week Of Year (2-digits)', function() {
        it('parses week of year', function() {
            assert.strictEqual(
                DateTime.fromFormat('ww', '٢٢', { locale: 'ar-eg' })
                    .getWeek(),
                22,
            );
        });

        it('parses zero padded week of year', function() {
            assert.strictEqual(
                DateTime.fromFormat('ww', '٠١', { locale: 'ar-eg' })
                    .getWeek(),
                1,
            );
        });
    });

    describe('W - Week Of Month', function() {
        it('parses the week of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('W', '٣', { locale: 'ar-eg' })
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
                DateTime.fromFormat('d', '٢١', { locale: 'ar-eg' })
                    .getDate(),
                21,
            );
        });

        it('parses 1-digit day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('d', '١', { locale: 'ar-eg' })
                    .getDate(),
                1,
            );
        });
    });

    describe('dd - Day of Month (2-digits)', function() {
        it('parses the day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd', '٢١', { locale: 'ar-eg' })
                    .getDate(),
                21,
            );
        });

        it('parses zero padded day of the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd', '٠١', { locale: 'ar-eg' })
                    .getDate(),
                1,
            );
        });
    });

    describe('D - Day of Year (1-digit)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('D', '١٥٢', { locale: 'ar-eg' })
                    .getDayOfYear(),
                152,
            );
        });

        it('parses 1-digit day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('D', '١', { locale: 'ar-eg' })
                    .getDayOfYear(),
                1,
            );
        });
    });

    describe('DD - Day of Year (2-digits)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DD', '١٥٢', { locale: 'ar-eg' })
                    .getDayOfYear(),
                152,
            );
        });

        it('parses zero padded day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DD', '٠١', { locale: 'ar-eg' })
                    .getDayOfYear(),
                1,
            );
        });
    });

    describe('DDD - Day of Year (3-digits)', function() {
        it('parses the day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DDD', '١٥٢', { locale: 'ar-eg' })
                    .getDayOfYear(),
                152,
            );
        });

        it('parses zero padded day of the year', function() {
            assert.strictEqual(
                DateTime.fromFormat('DDD', '٠٠١', { locale: 'ar-eg' })
                    .getDayOfYear(),
                1,
            );
        });
    });

    describe('F - Day Of Week In Month', function() {
        it('parses the day of week in the month', function() {
            assert.strictEqual(
                DateTime.fromFormat('F', '٣', { locale: 'ar-eg' })
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
                DateTime.fromFormat('EEE', 'пт', { locale: 'ru' })
                    .getWeekDay(),
                5,
            );
        });
    });

    describe('EEEE - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('EEEE', 'пятница', { locale: 'ru' })
                    .getWeekDay(),
                5,
            );
        });
    });

    // describe('EEEEE - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('EEEEE', 'П', { locale: 'ru' })
    //                 .getWeekDay(),
    //             1
    //         );
    //     });
    // });

    describe('e - Week Day (1-digit)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTime.fromFormat('e', '٥', { locale: 'ar-eg' })
                    .getWeekDay(),
                5,
            );
        });
    });

    describe('ee - Week Day (2-digits)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTime.fromFormat('ee', '٠٥', { locale: 'ar-eg' })
                    .getWeekDay(),
                5,
            );
        });
    });

    describe('eee - Week Day (Short)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('eee', 'пт', { locale: 'ru' })
                    .getWeekDay(),
                5,
            );
        });
    });

    describe('eeee - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('eeee', 'пятница', { locale: 'ru' })
                    .getWeekDay(),
                5,
            );
        });
    });

    // describe('eeeee - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('eeeee', 'П', { locale: 'ru' })
    //                 .getWeekDay(),
    //             1
    //         );
    //     });
    // });

    describe('c - Week Day (1-digit)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTime.fromFormat('c', '٥', { locale: 'ar-eg' })
                    .getWeekDay(),
                5,
            );
        });
    });

    describe('cc - Week Day (2-digits)', function() {
        it('parses day', function() {
            assert.strictEqual(
                DateTime.fromFormat('cc', '٠٥', { locale: 'ar-eg' })
                    .getWeekDay(),
                5,
            );
        });
    });

    describe('ccc - Week Day (Short)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('ccc', 'пт', { locale: 'ru' })
                    .getWeekDay(),
                5,
            );
        });
    });

    describe('cccc - Week Day (Long)', function() {
        it('parses day name', function() {
            assert.strictEqual(
                DateTime.fromFormat('cccc', 'пятница', { locale: 'ru' })
                    .getWeekDay(),
                5,
            );
        });
    });

    // describe('ccccc - Week Day (Narrow)', function() {
    //     it('parses day name', function() {
    //         assert.strictEqual(
    //             DateTime.fromFormat('ccccc', 'П', { locale: 'ru' })
    //                 .getWeekDay(),
    //             1
    //         );
    //     });
    // });

    /**
     * Day Period
     */

    describe('aaa - Day Period (Short)', function() {
        it('parses AM day period', function() {
            assert.strictEqual(
                DateTime.fromFormat('aaa', '上午', { locale: 'zh' })
                    .getHours(),
                0,
            );
        });

        it('parses pm day period', function() {
            assert.strictEqual(
                DateTime.fromFormat('aaa', '下午', { locale: 'zh' })
                    .getHours(),
                12,
            );
        });
    });

    describe('aaaa - Day Period (Long)', function() {
        it('parses AM day period', function() {
            assert.strictEqual(
                DateTime.fromFormat('aaaa', '上午', { locale: 'zh' })
                    .getHours(),
                0,
            );
        });

        it('parses pm day period', function() {
            assert.strictEqual(
                DateTime.fromFormat('aaaa', '下午', { locale: 'zh' })
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
                DateTime.fromFormat('h', '١٢', { locale: 'ar-eg' })
                    .getHours(),
                0,
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('h', '١', { locale: 'ar-eg' })
                    .getHours(),
                1,
            );
        });
    });

    describe('hh - Hour [1-12] (2-digits)', function() {
        it('parses the hour [1-12]', function() {
            assert.strictEqual(
                DateTime.fromFormat('hh', '١٢', { locale: 'ar-eg' })
                    .getHours(),
                0,
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('hh', '٠١', { locale: 'ar-eg' })
                    .getHours(),
                1,
            );
        });
    });

    describe('H - Hour [0-23] (1-digit)', function() {
        it('parses the hour [0-23]', function() {
            assert.strictEqual(
                DateTime.fromFormat('H', '٢٣', { locale: 'ar-eg' })
                    .getHours(),
                23,
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('H', '٠', { locale: 'ar-eg' })
                    .getHours(),
                0,
            );
        });
    });

    describe('HH - Hour [0-23] (2-digits)', function() {
        it('parses the hour [0-23]', function() {
            assert.strictEqual(
                DateTime.fromFormat('HH', '٢٣', { locale: 'ar-eg' })
                    .getHours(),
                23,
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('HH', '٠٠', { locale: 'ar-eg' })
                    .getHours(),
                0,
            );
        });
    });

    describe('K - Hour [0-11] (1-digit)', function() {
        it('parses the hour [0-11]', function() {
            assert.strictEqual(
                DateTime.fromFormat('K', '١١', { locale: 'ar-eg' })
                    .getHours(),
                11,
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('K', '٠', { locale: 'ar-eg' })
                    .getHours(),
                0,
            );
        });
    });

    describe('KK - Hour [0-11] (2-digits)', function() {
        it('parses the hour [0-11]', function() {
            assert.strictEqual(
                DateTime.fromFormat('KK', '١١', { locale: 'ar-eg' })
                    .getHours(),
                11,
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('KK', '٠٠', { locale: 'ar-eg' })
                    .getHours(),
                0,
            );
        });
    });

    describe('k - Hour [1-24] (1-digit)', function() {
        it('parses the hour [1-24]', function() {
            assert.strictEqual(
                DateTime.fromFormat('k', '٢٤', { locale: 'ar-eg' })
                    .getHours(),
                0,
            );
        });

        it('parses 1-digit hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('k', '١', { locale: 'ar-eg' })
                    .getHours(),
                1,
            );
        });
    });

    describe('kk - Hour [1-24] (2-digits)', function() {
        it('parses the hour [1-24]', function() {
            assert.strictEqual(
                DateTime.fromFormat('kk', '٢٤', { locale: 'ar-eg' })
                    .getHours(),
                0,
            );
        });

        it('parses zero padded hour', function() {
            assert.strictEqual(
                DateTime.fromFormat('kk', '٠١', { locale: 'ar-eg' })
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
                DateTime.fromFormat('m', '٢٥', { locale: 'ar-eg' })
                    .getMinutes(),
                25,
            );
        });

        it('parses 1-digit minute', function() {
            assert.strictEqual(
                DateTime.fromFormat('m', '١', { locale: 'ar-eg' })
                    .getMinutes(),
                1,
            );
        });
    });

    describe('mm - Minute (2-digits)', function() {
        it('parses the minute', function() {
            assert.strictEqual(
                DateTime.fromFormat('mm', '٢٥', { locale: 'ar-eg' })
                    .getMinutes(),
                25,
            );
        });

        it('parses zero padded minute', function() {
            assert.strictEqual(
                DateTime.fromFormat('mm', '٠١', { locale: 'ar-eg' })
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
                DateTime.fromFormat('s', '٢٥', { locale: 'ar-eg' })
                    .getSeconds(),
                25,
            );
        });

        it('parses 1-digit second', function() {
            assert.strictEqual(
                DateTime.fromFormat('s', '١', { locale: 'ar-eg' })
                    .getSeconds(),
                1,
            );
        });
    });

    describe('ss - Second (2-digits)', function() {
        it('parses the second', function() {
            assert.strictEqual(
                DateTime.fromFormat('ss', '٢٥', { locale: 'ar-eg' })
                    .getSeconds(),
                25,
            );
        });

        it('parses zero padded second', function() {
            assert.strictEqual(
                DateTime.fromFormat('ss', '٠١', { locale: 'ar-eg' })
                    .getSeconds(),
                1,
            );
        });
    });

    describe('S - Fractional Second', function() {
        it('parses the fractional second', function() {
            assert.strictEqual(
                DateTime.fromFormat('SSS', '١٢٣', { locale: 'ar-eg' })
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
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZ', '01/01/2019 00:00:00 +0000', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZ', '01/01/2019 00:00:00 +1000', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('ZZZZ - Time Zone (Long localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZ', '01/01/2019 00:00:00 GMT+00:00', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZ', '01/01/2019 00:00:00 GMT+10:00', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('ZZZZZ - Time Zone (ISO8601 extended format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +00:00', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '01/01/2019 00:00:00 +10:00', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('O - Time Zone (Short localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss O', '01/01/2019 00:00:00 GMT+00', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss O', '01/01/2019 00:00:00 GMT+10', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('OOOO - Time Zone (Long localized GMT format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss OOOO', '01/01/2019 00:00:00 GMT+00:00', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss OOOO', '01/01/2019 00:00:00 GMT+10:00', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('VV - Time Zone (Long time zone ID)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss VV', '01/01/2019 00:00:00 UTC', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss VV', '01/01/2019 00:00:00 Australia/Brisbane', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('X - Time Zone (ISO8601 basic format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss X', '01/01/2019 00:00:00 Z', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss X', '01/01/2019 00:00:00 +10', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('XX - Time Zone (ISO8601 basic format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss XX', '01/01/2019 00:00:00 Z', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss XX', '01/01/2019 00:00:00 +1000', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('XXX - Time Zone (ISO8601 extended format with Z)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss XXX', '01/01/2019 00:00:00 Z', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss XXX', '01/01/2019 00:00:00 +10:00', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('x - Time Zone (ISO8601 basic format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +00', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss x', '01/01/2019 00:00:00 +10', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('xx - Time Zone (ISO8601 basic format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +0000', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss xx', '01/01/2019 00:00:00 +1000', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });

    describe('xxx - Time Zone (ISO8601 extended format)', function() {
        it('parses the time zone', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +00:00', { locale: 'ru' })
                    .toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.fromFormat('dd/MM/yyyy HH:mm:ss xxx', '01/01/2019 00:00:00 +10:00', { locale: 'ru' })
                    .toISOString(),
                '2018-12-31T14:00:00.000+00:00',
            );
        });
    });
});
