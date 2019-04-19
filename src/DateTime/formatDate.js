/**
 * DateTime Format Data
 */

DateTime.formatData = {

    /* YEAR */

    // leap year
    L: {
        output: datetime => DateTime._formatNumber(datetime.isLeapYear() ? 1 : 0)
    },

    // year
    Y: {
        value: 'year',
        regex: () => '([' + DateTime.lang.numberRegex + ']{1,4})',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getFullYear())
    },

    // year short
    y: {
        value: 'year',
        regex: () => '([' + DateTime.lang.numberRegex + ']{2})',
        input: value => (value < 70 ? 2000 : 1900) + DateTime._parseNumber(value),
        output: datetime => {
            const year = datetime.getFullYear().toString();
            return DateTime._formatNumber(year.substring(year.length - 2));
        }
    },

    // iso year
    o: {
        output: datetime => DateTime._formatNumber(datetime.getISOYear())
    },

    /* MONTH */

    // month name
    F: {
        value: 'month',
        regex: () => '(' + DateTime.lang.months.full.join('|') + ')',
        input: value => DateTime.lang.months['full'].findIndex(month => month === value),
        output: datetime => datetime.getMonthName()
    },

    // month name short
    M: {
        value: 'month',
        regex: () => '(' + DateTime.lang.months.short.join('|') + ')',
        input: value => DateTime.lang.months['short'].findIndex(month => month === value),
        output: datetime => datetime.getMonthName('short')
    },

    // month
    m: {
        value: 'month',
        regex: () => '([' + DateTime.lang.numberRegex + ']{2})',
        input: value => DateTime._parseNumber(value) - 1,
        output: datetime => DateTime._formatNumber((datetime.getMonth() + 1), 2)
    },

    // month short
    n: {
        value: 'month',
        regex: () => '([' + DateTime.lang.numberRegex + ']{1,2})',
        input: value => DateTime._parseNumber(value) - 1,
        output: datetime => DateTime._formatNumber(datetime.getMonth() + 1)
    },

    // days in month
    t: {
        output: datetime => DateTime._formatNumber(datetime.daysInMonth())
    },

    /* WEEKS */

    // iso week
    W: {
        output: datetime => DateTime._formatNumber(datetime.getISOWeek())
    },

    /* DAYS */

    // day of year
    z: {
        regex: () => '([' + DateTime.lang.numberRegex + ']{1,3})',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getDayOfYear())
    },

    // date
    d: {
        value: 'date',
        regex: () => '([' + DateTime.lang.numberRegex + ']{2})',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getDate(), 2)
    },

    // date short
    j: {
        value: 'date',
        regex: () => '([' + DateTime.lang.numberRegex + ']{1,2})',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getDate())
    },

    // ordinal suffix
    S: {
        regex: () => '(st|[nr]d|th)',
        output: datetime => datetime.dateSuffix()
    },

    // iso day
    N: {
        output: datetime => DateTime._formatNumber(datetime.getISODay())
    },

    // day of week
    w: {
        output: datetime => DateTime._formatNumber(datetime.getDay())
    },

    // day name
    l: {
        value: 'day',
        regex: () => '(' + DateTime.lang.days.full.join('|') + ')',
        input: value => DateTime.lang.days.full.findIndex(day => day === value),
        output: datetime => datetime.getDayName()
    },

    // day name short
    D: {
        value: 'day',
        regex: () => '(' + DateTime.lang.days.short.join('|') + ')',
        input: value => DateTime.lang.days.short.findIndex(day => day === value),
        output: datetime => datetime.getDayName('short')
    },

    /* TIME */

    // day period
    a: {
        value: 'dayPeriod',
        regex: () => '(' + DateTime.lang.dayPeriods.lower.join('|') + ')',
        input: value => DateTime.lang.dayPeriods.lower.findIndex(period => period === value) ? 'pm' : 'am',
        output: datetime => datetime.getHours() < 12 ?
            DateTime.lang.dayPeriods.lower[0] :
            DateTime.lang.dayPeriods.lower[1]
    },

    // day period upper
    A: {
        value: 'dayPeriod',
        regex: () => '(' + DateTime.lang.dayPeriods.upper.join('|') + ')',
        input: value => DateTime.lang.dayPeriods.upper.findIndex(period => period === value) ? 'pm' : 'am',
        output: datetime => datetime.getHours() < 12 ?
            DateTime.lang.dayPeriods.upper[0] :
            DateTime.lang.dayPeriods.upper[1]
    },

    // swatch time
    B: {
        output: datetime => DateTime._formatNumber(datetime.getBeat())
    },

    // hours (24)
    H: {
        value: 'hours',
        regex: () => '([' + DateTime.lang.numberRegex + ']{2})',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getHours(), 2)
    },

    // hours short (24)
    G: {
        value: 'hours',
        regex: () => '([' + DateTime.lang.numberRegex + ']{1,2})',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getHours())
    },

    // hours (12)
    h: {
        value: 'hours',
        regex: () => '([' + DateTime.lang.numberRegex + ']{2})',
        input: value => DateTime._parseNumber(value) % 12,
        output: datetime => DateTime._formatNumber((datetime.getHours() % 12 || 12), 2)
    },

    // hours short (12)
    g: {
        value: 'hours',
        regex: () => '([' + DateTime.lang.numberRegex + ']{1,2})',
        input: value => DateTime._parseNumber(value) % 12,
        output: datetime => DateTime._formatNumber(datetime.getHours() % 12 || 12)
    },

    // minutes
    i: {
        value: 'minutes',
        regex: () => '([' + DateTime.lang.numberRegex + ']{2})',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getMinutes(), 2)
    },

    // seconds
    s: {
        value: 'seconds',
        regex: () => '([' + DateTime.lang.numberRegex + ']{2})',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getSeconds(), 2)
    },

    // microseconds
    u: {
        value: 'milliseconds',
        regex: () => '([' + DateTime.lang.numberRegex + ']{1,6})',
        input: value => DateTime._parseNumber(value) / 1000,
        output: datetime => DateTime._formatNumber(datetime.getMilliseconds() * 1000)
    },

    // milliseconds
    v: {
        output: datetime => DateTime._formatNumber(datetime.getMilliseconds())
    },

    /* TIMEZONE */

    // timezone
    e: {
        value: 'timezone',
        regex: '([\\w\\/]+)',
        input: value => value,
        output: datetime => datetime._timezone
    },

    // daylight savings
    I: {
        output: datetime => DateTime._formatNumber(datetime.isDST() ? 1 : 0)
    },

    // offset
    O: {
        value: 'offset',
        regex: () => '([\\+\\-][' + DateTime.lang.numberRegex + ']{4})',
        input: value =>
            (
                DateTime._parseNumber(value.slice(1, 3))
                * 60
                + DateTime._parseNumber(value.slice(3, 5))
            )
            * (value[0] === '-' ? 1 : -1),
        output: datetime => (datetime._offset > 0 ? '-' : '+') +
            DateTime._formatNumber(Math.abs((datetime._offset / 60) | 0), 2) +
            DateTime._formatNumber((datetime._offset % 60), 2)
    },

    // offset colon
    P: {
        value: 'offset',
        regex: () => '([\\+\\-][' + DateTime.lang.numberRegex + ']{2}\\:[' + DateTime.lang.numberRegex + ']{2})',
        input: value =>
            (
                DateTime._parseNumber(value.slice(1, 3))
                * 60
                + DateTime._parseNumber(value.slice(4, 6))
            )
            * (value[0] === '-' ? 1 : -1),
        output: datetime => (datetime._offset > 0 ? '-' : '+') +
            DateTime._formatNumber(Math.abs((datetime._offset / 60) | 0), 2) +
            ':' +
            DateTime._formatNumber((datetime._offset % 60), 2)
    },

    // timezone abbreviated
    T: {
        value: 'timezoneAbbr',
        regex: '([A-Z]{1,5})',
        input: value => value,
        output: datetime => datetime.getTimezoneAbbr()
    },

    // offset seconds
    Z: {
        value: 'offset',
        regex: () => '([' + DateTime.lang.numberRegex + ']{1,5})',
        input: value => DateTime._parseNumber(value) / 60,
        output: datetime => DateTime._formatNumber(datetime._offset * -60)
    },

    /* FULL */

    // iso 8601
    c: {
        output: datetime => datetime.toISOString()
    },

    // rfc 2822
    r: {
        output: datetime => datetime.format(DateTime.formats.rfc822)
    },

    // timestamp
    U: {
        value: 'timestamp',
        regex: () => '([' + DateTime.lang.numberRegex + ']+)',
        input: value => DateTime._parseNumber(value),
        output: datetime => DateTime._formatNumber(datetime.getTime())
    },

    /* SPECIAL */

    // space
    ' ': {
        regex: '(\\s)'
    },

    // seperator
    '#': {
        regex: () => '([' + DateTime._seperators.map(seperator => '\\' + seperator).join('') + '])'
    },

    // wildcard
    '?': {
        regex: '(.)'
    },

    // wildcards
    '*': {
        regex: () => '([^' + DateTime._seperators.map(seperator => '\\' + seperator) + DateTime.lang.numberRegex + ']*)'
    },

    // reset
    '!': {
        regex: '\\!'
    },

    // reset soft
    '|': {
        regex: '\\|'
    }

};
