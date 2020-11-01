/**
 * DateInterval Format Data
 */

DateInterval._formatData = {

    /* YEAR */

    Y: interval =>
        interval.formatter.formatNumber(interval.y, 2),

    y: interval =>
        interval.formatter.formatNumber(interval.y),

    /* MONTH */

    M: interval =>
        interval.formatter.formatNumber(interval.m, 2),

    m: interval =>
        interval.formatter.formatNumber(interval.m),

    /* DAYS */

    D: interval =>
        interval.formatter.formatNumber(interval.d, 2),

    d: interval =>
        interval.formatter.formatNumber(interval.d),

    a: interval =>
        interval.formatter.formatNumber(interval.days),

    /* HOURS */

    H: interval =>
        interval.formatter.formatNumber(interval.h, 2),

    h: interval =>
        interval.formatter.formatNumber(interval.h),

    /* MINUTES */

    I: interval =>
        interval.formatter.formatNumber(interval.i, 2),

    i: interval =>
        interval.formatter.formatNumber(interval.i),

    /* SECONDS */

    S: interval =>
        interval.formatter.formatNumber(interval.s, 2),

    s: interval =>
        interval.formatter.formatNumber(interval.s),

    /* MICROSECONDS */

    F: interval =>
        interval.formatter.formatNumber(interval.f, 6),

    f: interval =>
        interval.formatter.formatNumber(interval.f),

    /* SIGN */

    R: interval =>
        interval.invert ?
            '-' :
            '+',

    r: interval =>
        interval.invert ?
            '-' :
            ''

};
