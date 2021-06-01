const assert = require('assert');
const { DateTime } = require('../../dist/frost-datetime.min');

describe('DateTime #format (Locale)', function() {

    /**
     * Era
     */

    describe('GGG - Era (Short)', function() {
        it('outputs AD era', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ru' })
                    .format('GGG'),
                'н. э.'
            );
        });

        it('outputs BC era', function() {
            assert.strictEqual(
                DateTime.fromArray([-5], { locale: 'ru' })
                    .format('GGG'),
                'до н. э.'
            );
        });
    });

    describe('GGGG - Era (Long)', function() {
        it('outputs AD era', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ru' })
                    .format('GGGG'),
                'от Рождества Христова'
            );
        });

        it('outputs BC era', function() {
            assert.strictEqual(
                DateTime.fromArray([-5], { locale: 'ru' })
                    .format('GGGG'),
                'до Рождества Христова'
            );
        });
    });

    describe('GGGGG - Era (Narrow)', function() {
        it('outputs AD era', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ru' })
                    .format('GGGGG'),
                'н.э.'
            );
        });

        it('outputs BC era', function() {
            assert.strictEqual(
                DateTime.fromArray([-5], { locale: 'ru' })
                    .format('GGGGG'),
                'до н.э.'
            );
        });
    });

    /**
     * Year
     */

    describe('y - Year (1-digit)', function() {
        it('outputs full year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ar-eg' })
                    .format('y'),
                '٢٠١٨'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([5], { locale: 'ar-eg' })
                    .format('y'),
                '٥'
            );
        });
    });

    describe('yy - Year (2-digits)', function() {
        it('outputs 2 low-order digits of year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ar-eg' })
                    .format('yy'),
                '١٨'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5], { locale: 'ar-eg' })
                    .format('yy'),
                '٠٥'
            );
        });
    });

    describe('yyy - Year (3-digits)', function() {
        it('outputs full year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ar-eg' })
                    .format('yyy'),
                '٢٠١٨'
            );
        });

        it('zero pads to 3-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5], { locale: 'ar-eg' })
                    .format('yyy'),
                '٠٠٥'
            );
        });
    });

    describe('yyyy - Year (4-digits)', function() {
        it('outputs full year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ar-eg' })
                    .format('yyyy'),
                '٢٠١٨'
            );
        });

        it('zero pads to 4-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5], { locale: 'ar-eg' })
                    .format('yyyy'),
                '٠٠٠٥'
            );
        });
    });

    /**
     * Week Year
     */

    describe('Y - Week Year (1-digit)', function() {
        it('outputs full week year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ar-eg' })
                    .format('Y'),
                '٢٠١٨'
            );
        });

        it('uses the year of current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30], { locale: 'ar-eg' })
                    .format('Y'),
                '٢٠٢٠'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([5, 2], { locale: 'ar-eg' })
                    .format('Y'),
                '٥'
            );
        });
    });

    describe('YY - Week Year (2-digits)', function() {
        it('outputs 2 low-order digits of year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ar-eg' })
                    .format('YY'),
                '١٨'
            );
        });

        it('uses the year of current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30], { locale: 'ar-eg' })
                    .format('YY'),
                '٢٠'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5, 2], { locale: 'ar-eg' })
                    .format('YY'),
                '٠٥'
            );
        });
    });

    describe('YYY - Week Year (3-digits)', function() {
        it('outputs full week year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ar-eg' })
                    .format('YYY'),
                '٢٠١٨'
            );
        });

        it('uses the year of current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30], { locale: 'ar-eg' })
                    .format('YYY'),
                '٢٠٢٠'
            );
        });

        it('zero pads to 3-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5, 2], { locale: 'ar-eg' })
                    .format('YYY'),
                '٠٠٥'
            );
        });
    });

    describe('YYYY - Week Year (4-digits)', function() {
        it('outputs full week year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018], { locale: 'ar-eg' })
                    .format('YYYY'),
                '٢٠١٨'
            );
        });

        it('uses the year of current week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 12, 30], { locale: 'ar-eg' })
                    .format('YYYY'),
                '٢٠٢٠'
            );
        });

        it('zero pads to 4-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([5, 2], { locale: 'ar-eg' })
                    .format('YYYY'),
                '٠٠٠٥'
            );
        });
    });

    /**
     * Quarter
     */

    describe('q - Quarter (1-digit)', function() {
        it('outputs quarter', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8], { locale: 'ar-eg' })
                    .format('q'),
                '٣'
            );
        });
    });

    describe('q - Quarter (2-digits)', function() {
        it('outputs quarter zero padded to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8], { locale: 'ar-eg' })
                    .format('qq'),
                '٠٣'
            );
        });
    });

    describe('Q - Standalone Quarter (1-digit)', function() {
        it('outputs quarter', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8], { locale: 'ar-eg' })
                    .format('Q'),
                '٣'
            );
        });
    });

    describe('Q - Standalone Quarter (2-digits)', function() {
        it('outputs quarter zero padded to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 8], { locale: 'ar-eg' })
                    .format('QQ'),
                '٠٣'
            );
        });
    });

    /**
     * Month
     */

    describe('M - Month (1-digit)', function() {
        it('outputs month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ar-eg' })
                    .format('M'),
                '١٠'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1], { locale: 'ar-eg' })
                    .format('M'),
                '١'
            );
        });
    });

    describe('MM - Month (2-digits)', function() {
        it('outputs month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ar-eg' })
                    .format('MM'),
                '١٠'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1], { locale: 'ar-eg' })
                    .format('MM'),
                '٠١'
            );
        });
    });

    describe('MMM - Month Name (Short)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ru' })
                    .format('MMM'),
                'окт.'
            );
        });
    });

    describe('MMMM - Month Name (Long)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ru' })
                    .format('MMMM'),
                'октября'
            );
        });
    });

    describe('MMMMM - Month Name (Narrow)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ru' })
                    .format('MMMMM'),
                'О'
            );
        });
    });

    describe('L - Standalone Month (1-digit)', function() {
        it('outputs month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ar-eg' })
                    .format('L'),
                '١٠'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1], { locale: 'ar-eg' })
                    .format('L'),
                '١'
            );
        });
    });

    describe('LL - Standalone Month (2-digits)', function() {
        it('outputs month', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ar-eg' })
                    .format('LL'),
                '١٠'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1], { locale: 'ar-eg' })
                    .format('LL'),
                '٠١'
            );
        });
    });

    describe('LLL - Standalone Month Name (Short)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ru' })
                    .format('LLL'),
                'окт.'
            );
        });
    });

    describe('LLLL - Standalone Month Name (Long)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ru' })
                    .format('LLLL'),
                'октябрь'
            );
        });
    });

    describe('LLLLL - standalone Month Name (Narrow)', function() {
        it('outputs month name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 10], { locale: 'ru' })
                    .format('LLLLL'),
                'О'
            );
        });
    });

    /**
     * Week
     */

    describe('w - Week Of Year (1-digit)', function() {
        it('outputs week of year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6], { locale: 'ar-eg' })
                    .format('w'),
                '٢٢'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1], { locale: 'ar-eg' })
                    .format('w'),
                '١'
            );
        });
    });

    describe('ww - Week Of Year (2-digits)', function() {
        it('outputs week of year', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6], { locale: 'ar-eg' })
                    .format('ww'),
                '٢٢'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1], { locale: 'ar-eg' })
                    .format('ww'),
                '٠١'
            );
        });
    });

    describe('W - Week Of Month', function() {
        it('outputs the week of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1], { locale: 'ar-eg' })
                    .format('W'),
                '١'
            );
        });

        it('uses the local week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 8], { locale: 'ar-eg' })
                    .format('W'),
                '٢'
            );
        });
    });

    /**
     * Day
     */

    describe('d - Day of Month (1-digit)', function() {
        it('outputs the day of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 21], { locale: 'ar-eg' })
                    .format('d'),
                '٢١'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1], { locale: 'ar-eg' })
                    .format('d'),
                '١'
            );
        });
    });

    describe('dd - Day of Month (2-digits)', function() {
        it('outputs the day of the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 21], { locale: 'ar-eg' })
                    .format('dd'),
                '٢١'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1], { locale: 'ar-eg' })
                    .format('dd'),
                '٠١'
            );
        });
    });

    describe('D - Day of Year (1-digit)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1], { locale: 'ar-eg' })
                    .format('D'),
                '١٥٢'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1], { locale: 'ar-eg' })
                    .format('D'),
                '١'
            );
        });
    });

    describe('DD - Day of Year (2-digits)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1], { locale: 'ar-eg' })
                    .format('DD'),
                '١٥٢'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1], { locale: 'ar-eg' })
                    .format('DD'),
                '٠١'
            );
        });
    });

    describe('DDD - Day of Year (3-digits)', function() {
        it('outputs the day of the year', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1], { locale: 'ar-eg' })
                    .format('DDD'),
                '١٥٢'
            );
        });

        it('zero pads to 3-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1], { locale: 'ar-eg' })
                    .format('DDD'),
                '٠٠١'
            );
        });
    });

    describe('F - Day Of Week In Month', function() {
        it('outputs the day of week in the month', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 1], { locale: 'ar-eg' })
                    .format('F'),
                '١'
            );
        });

        it('uses the local week', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 6, 7], { locale: 'ar-eg' })
                    .format('F'),
                '١'
            );
        });
    });

    /**
     * Week Day
     */

    describe('EEE - Week Day (Short)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('EEE'),
                'пт'
            );
        });
    });

    describe('EEEE - Week Day (Long)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('EEEE'),
                'пятница'
            );
        });
    });

    describe('EEEEE - Week Day (Narrow)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('EEEEE'),
                'П'
            );
        });
    });

    describe('e - Week Day (1-digit)', function() {
        it('outputs day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ar-eg' })
                    .format('e'),
                '٧'
            );
        });
    });

    describe('ee - Week Day (2-digits)', function() {
        it('outputs day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ar-eg' })
                    .format('ee'),
                '٠٧'
            );
        });
    });

    describe('eee - Week Day (Short)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('eee'),
                'пт'
            );
        });
    });

    describe('eeee - Week Day (Long)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('eeee'),
                'пятница'
            );
        });
    });

    describe('eeeee - Week Day (Narrow)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('eeeee'),
                'П'
            );
        });
    });

    describe('c - Standalone Week Day (1-digit)', function() {
        it('outputs day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ar-eg' })
                    .format('c'),
                '٧'
            );
        });
    });

    describe('cc - Standalone Week Day (2-digits)', function() {
        it('outputs day', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ar-eg' })
                    .format('cc'),
                '٧'
            );
        });
    });

    describe('ccc - Standalone Week Day (Short)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('ccc'),
                'пт'
            );
        });
    });

    describe('cccc - Standalone Week Day (Long)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('cccc'),
                'пятница'
            );
        });
    });

    describe('ccccc - Standalone Week Day (Narrow)', function() {
        it('outputs day name', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 6, 1], { locale: 'ru' })
                    .format('ccccc'),
                'П'
            );
        });
    });

    /**
     * Day Period
     */

    describe('aaa - Day Period (Short)', function() {
        it('outputs AM day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0], { locale: 'zh' })
                    .format('aaa'),
                '上午'
            );
        });

        it('outputs pm day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 12], { locale: 'zh' })
                    .format('aaa'),
                '下午'
            );
        });
    });

    describe('aaaa - Day Period (Long)', function() {
        it('outputs AM day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 0], { locale: 'zh' })
                    .format('aaaa'),
                '上午'
            );
        });

        it('outputs pm day period', function() {
            assert.strictEqual(
                DateTime.fromArray([2018, 1, 1, 12], { locale: 'zh' })
                    .format('aaaa'),
                '下午'
            );
        });
    });

    /**
     * Hour
     */

    describe('h - Hour [1-12] (1-digit)', function() {
        it('outputs the hour [1-12]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 12], { locale: 'ar-eg' })
                    .format('h'),
                '١٢'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1], { locale: 'ar-eg' })
                    .format('h'),
                '١'
            );
        });
    });

    describe('hh - Hour [1-12] (2-digits)', function() {
        it('outputs the hour [1-12]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23], { locale: 'ar-eg' })
                    .format('hh'),
                '١١'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1], { locale: 'ar-eg' })
                    .format('hh'),
                '٠١'
            );
        });
    });

    describe('H - Hour [0-23] (1-digit)', function() {
        it('outputs the hour [0-23]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23], { locale: 'ar-eg' })
                    .format('H'),
                '٢٣'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0], { locale: 'ar-eg' })
                    .format('H'),
                '٠'
            );
        });
    });

    describe('HH - Hour [0-23] (2-digits)', function() {
        it('outputs the hour [0-23]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23], { locale: 'ar-eg' })
                    .format('HH'),
                '٢٣'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0], { locale: 'ar-eg' })
                    .format('HH'),
                '٠٠'
            );
        });
    });

    describe('K - Hour [0-11] (1-digit)', function() {
        it('outputs the hour [0-11]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23], { locale: 'ar-eg' })
                    .format('K'),
                '١١'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0], { locale: 'ar-eg' })
                    .format('K'),
                '٠'
            );
        });
    });

    describe('KK - Hour [0-11] (2-digits)', function() {
        it('outputs the hour [0-11]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 23], { locale: 'ar-eg' })
                    .format('KK'),
                '١١'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0], { locale: 'ar-eg' })
                    .format('KK'),
                '٠٠'
            );
        });
    });

    describe('k - Hour [1-24] (1-digit)', function() {
        it('outputs the hour [1-24]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0], { locale: 'ar-eg' })
                    .format('k'),
                '٢٤'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1], { locale: 'ar-eg' })
                    .format('k'),
                '١'
            );
        });
    });

    describe('kk - Hour [1-24] (2-digits)', function() {
        it('outputs the hour [1-24]', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0], { locale: 'ar-eg' })
                    .format('kk'),
                '٢٤'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 1], { locale: 'ar-eg' })
                    .format('kk'),
                '٠١'
            );
        });
    });

    /**
     * Minute
     */

    describe('m - Minute (1-digit)', function() {
        it('outputs the minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 25], { locale: 'ar-eg' })
                    .format('m'),
                '٢٥'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 1], { locale: 'ar-eg' })
                    .format('m'),
                '١'
            );
        });
    });

    describe('mm - Minute (2-digits)', function() {
        it('outputs the minute', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 25], { locale: 'ar-eg' })
                    .format('mm'),
                '٢٥'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 1], { locale: 'ar-eg' })
                    .format('mm'),
                '٠١'
            );
        });
    });

    /**
     * Second
     */

    describe('s - Minute (1-digit)', function() {
        it('outputs the second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 25], { locale: 'ar-eg' })
                    .format('s'),
                '٢٥'
            );
        });

        it('does not zero pad', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 1], { locale: 'ar-eg' })
                    .format('s'),
                '١'
            );
        });
    });

    describe('ss - Minute (2-digits)', function() {
        it('outputs the second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 25], { locale: 'ar-eg' })
                    .format('ss'),
                '٢٥'
            );
        });

        it('zero pads to 2-digits', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 1], { locale: 'ar-eg' })
                    .format('ss'),
                '٠١'
            );
        });
    });

    describe('S - Fractional Second', function() {
        it('outputs the fractional second', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 123], { locale: 'ar-eg' })
                    .format('SSS'),
                '١٢٣'
            );
        });

        it('truncates to token length', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 123], { locale: 'ar-eg' })
                    .format('S'),
                '١'
            );
        });

        it('pads to token length', function() {
            assert.strictEqual(
                DateTime.fromArray([2019, 1, 1, 0, 0, 0, 123], { locale: 'ar-eg' })
                    .format('SSSSSS'),
                '١٢٣٠٠٠'
            );
        });
    });

    /**
     * Time Zone
     */

    describe('zzz - Time Zone (Short specific non-location format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('zzz'),
                'UTC'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('zzz'),
                'GMT+10'
            );
        });
    });

    describe('zzzz - Time Zone (Long specific non-location format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('zzzz'),
                'Всемирное координированное время'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('zzzz'),
                'Восточная Австралия, стандартное время'
            );
        });
    });

    describe('ZZZ - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('ZZZ'),
                '+0000'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('ZZZ'),
                '+1000'
            );
        });
    });

    describe('ZZZZ - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('ZZZZ'),
                'GMT'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('ZZZZ'),
                'GMT+10:00'
            );
        });
    });

    describe('ZZZZZ - Time Zone (ISO8601 extended format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('ZZZZZ'),
                'Z'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('ZZZZZ'),
                '+10:00'
            );
        });
    });

    describe('O - Time Zone (Short localized GMT format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('O'),
                'GMT'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('O'),
                'GMT+10'
            );
        });
    });

    describe('OOOO - Time Zone (Long localized GMT format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('OOOO'),
                'GMT'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('OOOO'),
                'GMT+10:00'
            );
        });
    });

    describe('VV - Time Zone (Long time zone ID)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('VV'),
                'UTC'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('VV'),
                'Australia/Brisbane'
            );
        });
    });

    describe('X - Time Zone (ISO8601 basic format with Z)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('X'),
                'Z'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('X'),
                '+10'
            );
        });
    });

    describe('XX - Time Zone (ISO8601 basic format with Z)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('XX'),
                'Z'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('XX'),
                '+1000'
            );
        });
    });

    describe('XXX - Time Zone (ISO8601 extended format with Z)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('XXX'),
                'Z'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('XXX'),
                '+10:00'
            );
        });
    });

    describe('x - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('x'),
                '+00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('x'),
                '+10'
            );
        });
    });

    describe('xx - Time Zone (ISO8601 basic format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('xx'),
                '+0000'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('xx'),
                '+1000'
            );
        });
    });

    describe('xxx - Time Zone (ISO8601 extended format)', function() {
        it('outputs the time zone', function() {
            assert.strictEqual(
                DateTime.now({ locale: 'ru' })
                    .format('xxx'),
                '+00:00'
            );
        });

        it('works with time zones', function() {
            assert.strictEqual(
                DateTime.now({ timeZone: 'Australia/Brisbane', locale: 'ru' })
                    .format('xxx'),
                '+10:00'
            );
        });
    });

});