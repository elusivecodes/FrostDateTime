DateInterval.formatData = {

    /* YEAR */

    Y: interval => DateInterval._formatNumber(interval.y, 2),

    y: interval => DateInterval._formatNumber(interval.y),

    /* MONTH */

    M: interval => DateInterval._formatNumber(interval.m, 2),

    m: interval => DateInterval._formatNumber(interval.m),

    /* DAYS */

    D: interval => DateInterval._formatNumber(interval.d, 2),

    d: interval => DateInterval._formatNumber(interval.d),

    a: interval => DateInterval._formatNumber(interval.days),

    /* HOURS */

    H: interval => DateInterval._formatNumber(interval.h, 2),

    h: interval => DateInterval._formatNumber(interval.h),

    /* MINUTES */

    I: interval => DateInterval._formatNumber(interval.i, 2),

    i: interval => DateInterval._formatNumber(interval.i),

    /* SECONDS */

    S: interval => DateInterval._formatNumber(interval.s, 2),

    s: interval => DateInterval._formatNumber(interval.s),

    /* MICROSECONDS */

    F: interval => DateInterval._formatNumber(interval.f, 6),

    f: interval => DateInterval._formatNumber(interval.f),

    /* SIGN */

    R: interval => interval.invert ?
        '-' :
        '+',

    r: interval => interval.invert ?
        '-' :
        ''

};