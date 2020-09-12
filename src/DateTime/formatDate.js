/**
 * DateTime Format Data
 */

DateTime._formatData = {

    /* YEAR */

    // leap year
    L: {
        output: datetime =>
            DateTime._formatNumber(
                datetime.isLeapYear() ?
                    1 :
                    0
            )
    },

    // year
    Y: {
        value: 'year',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,4})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getFullYear()
            )
    },

    // year short
    y: {
        value: 'year',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{2})`,
        input: value =>
            (value < 70 ? 2000 : 1900)
            + DateTime._parseNumber(value),
        output: datetime => {
            const year = datetime.getFullYear()
                .toString();
            return DateTime._formatNumber(
                year.substring(year.length - 2)
            );
        }
    },

    // iso year
    o: {
        output: datetime =>
            DateTime._formatNumber(
                datetime.getISOYear()
            )
    },

    /* MONTH */

    // month name
    F: {
        value: 'month',
        regex: _ =>
            `(${DateTime.lang.months.full.join('|')})`,
        input: value =>
            DateTime.lang.months['full'].indexOf(value) + 1,
        output: datetime =>
            datetime.monthName()
    },

    // month name short
    M: {
        value: 'month',
        regex: _ =>
            `(${DateTime.lang.months.short.join('|')})`,
        input: value =>
            DateTime.lang.months['short'].indexOf(value) + 1,
        output: datetime =>
            datetime.monthName('short')
    },

    // month
    m: {
        value: 'month',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{2})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getMonth(),
                2
            )
    },

    // month short
    n: {
        value: 'month',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,2})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getMonth()
            )
    },

    // days in month
    t: {
        output: datetime =>
            DateTime._formatNumber(
                datetime.daysInMonth()
            )
    },

    /* WEEKS */

    // iso week
    W: {
        output: datetime =>
            DateTime._formatNumber(
                datetime.getISOWeek()
            )
    },

    /* DAYS */

    // day of year
    z: {
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,3})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getDayOfYear()
            )
    },

    // date
    d: {
        value: 'date',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{2})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getDate(),
                2
            )
    },

    // date short
    j: {
        value: 'date',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,2})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getDate()
            )
    },

    // ordinal suffix
    S: {
        regex: _ =>
            DateTime.lang.ordinalRegExp,
        output: datetime =>
            datetime.dateSuffix()
    },

    // iso day
    N: {
        output: datetime =>
            DateTime._formatNumber(
                datetime.getISODay()
            )
    },

    // day of week
    w: {
        output: datetime =>
            DateTime._formatNumber(
                datetime.getDay()
            )
    },

    // day name
    l: {
        value: 'day',
        regex: _ =>
            `(${DateTime.lang.days.full.join('|')})`,
        input: value =>
            DateTime.lang.days.full.indexOf(value),
        output: datetime =>
            datetime.dayName()
    },

    // day name short
    D: {
        value: 'day',
        regex: _ =>
            `(${DateTime.lang.days.short.join('|')})`,
        input: value =>
            DateTime.lang.days.short.indexOf(value),
        output: datetime =>
            datetime.dayName('short')
    },

    /* TIME */

    // day period
    a: {
        value: 'dayPeriod',
        regex: _ =>
            `(${DateTime.lang.dayPeriods.lower.join('|')})`,
        input: value =>
            DateTime.lang.dayPeriods.lower.indexOf(value) ?
                'pm' :
                'am',
        output: datetime =>
            DateTime.lang.dayPeriods.lower[datetime.getHours() < 12 ?
                0 :
                1
            ]
    },

    // day period upper
    A: {
        value: 'dayPeriod',
        regex: _ =>
            `(${DateTime.lang.dayPeriods.upper.join('|')})`,
        input: value =>
            DateTime.lang.dayPeriods.upper.indexOf(value) ?
                'pm' :
                'am',
        output: datetime =>
            DateTime.lang.dayPeriods.upper[datetime.getHours() < 12 ?
                0 :
                1
            ]
    },

    // swatch time
    B: {
        output: datetime =>
            DateTime._formatNumber(
                datetime.getBeat()
            )
    },

    // hours (24)
    H: {
        value: 'hours',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{2})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getHours(),
                2
            )
    },

    // hours short (24)
    G: {
        value: 'hours',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,2})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getHours()
            )
    },

    // hours (12)
    h: {
        value: 'hours',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{2})`,
        input: value =>
            DateTime._parseNumber(value) % 12,
        output: datetime =>
            DateTime._formatNumber(
                (
                    datetime.getHours() % 12 ||
                    12
                ),
                2
            )
    },

    // hours short (12)
    g: {
        value: 'hours',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,2})`,
        input: value =>
            DateTime._parseNumber(value) % 12,
        output: datetime =>
            DateTime._formatNumber(
                datetime.getHours() % 12 ||
                12
            )
    },

    // minutes
    i: {
        value: 'minutes',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{2})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getMinutes(),
                2
            )
    },

    // seconds
    s: {
        value: 'seconds',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{2})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getSeconds(),
                2
            )
    },

    // milliseconds
    v: {
        value: 'milliseconds',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,3})`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime => {
            return DateTime._formatNumber(
                datetime.getMilliseconds()
            );
        }
    },

    // microseconds
    u: {
        value: 'milliseconds',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,6})`,
        input: value =>
            DateTime._parseNumber(value)
            / 1000,
        output: datetime => {
            return DateTime._formatNumber(
                Math.floor(
                    (
                        datetime.getMilliseconds()
                        + datetime._fraction
                    )
                    * 1000
                )
            );
        }
    },

    /* TIMEZONE */

    // timeZone
    e: {
        value: 'timeZone',
        regex: '([\\w\\/]+)',
        input: value => value,
        output: datetime => datetime._timeZone
    },

    // daylight savings
    I: {
        output: datetime =>
            DateTime._formatNumber(
                datetime.isDST() ?
                    1 :
                    0
            )
    },

    // offset
    O: {
        value: 'timeZone',
        regex: _ =>
            `([\\+\\-][${DateTime.lang.numberRegExp}]{4})`,
        input: value => value,
        output: datetime =>
            DateTime._formatOffset(datetime._offset, false)
    },

    // offset colon
    P: {
        value: 'timeZone',
        regex: _ =>
            `([\\+\\-][${DateTime.lang.numberRegExp}]{2}\\:[${DateTime.lang.numberRegExp}]{2})`,
        input: value => value,
        output: datetime =>
            DateTime._formatOffset(datetime._offset)
    },

    // timeZone abbreviated
    T: {
        value: 'timeZone',
        regex: '([A-Z]{1,5})',
        input: value => value,
        output: datetime =>
            datetime.getTimeZoneAbbr()
    },

    // offset seconds
    Z: {
        value: 'offset',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]{1,5})`,
        input: value =>
            DateTime._parseNumber(value)
            / 60,
        output: datetime =>
            DateTime._formatNumber(
                datetime._offset
                * -60
            )
    },

    /* FULL */

    // iso 8601
    c: {
        output: datetime =>
            datetime.toISOString()
    },

    // rfc 2822
    r: {
        output: datetime =>
            datetime.format(DateTime.formats.rfc822)
    },

    // timestamp
    U: {
        value: 'timestamp',
        regex: _ =>
            `([${DateTime.lang.numberRegExp}]+)`,
        input: value =>
            DateTime._parseNumber(value),
        output: datetime =>
            DateTime._formatNumber(
                datetime.getTime()
            )
    },

    /* SPECIAL */

    // space
    ' ': {
        regex: '(\\s)'
    },

    // seperator
    '#': {
        regex: _ =>
            `([${DateTime._seperators.map(
                seperator => '\\' + seperator
            ).join('')}])`
    },

    // wildcard
    '?': {
        regex: '(.)'
    },

    // wildcards
    '*': {
        regex: _ =>
            `([^${DateTime._seperators.map(
                seperator => '\\' + seperator
            )}${DateTime.lang.numberRegExp}]*)`
    }

};
