DateInterval.formatData = {

    percent: {
        token: '%',
        output: () => '%'
    },

    years: {
        token: 'Y',
        output: interval => frost.padString(interval.y, 2)
    },

    yearsShort: {
        token: 'y',
        output: interval => interval.y
    },

    months: {
        token: 'M',
        output: interval => frost.padString(interval.m, 2)
    },

    monthsShort: {
        token: 'm',
        output: interval => interval.m
    },

    days: {
        token: 'D',
        output: interval => frost.padString(interval.d, 2)
    },

    daysShort: {
        token: 'D',
        output: interval => interval.d
    },

    daysTotal: {
        token: 'a',
        output: interval => interval.days
    },

    hours: {
        token: 'H',
        output: interval => frost.padString(interval.h, 2)
    },

    hoursShort: {
        token: 'h',
        output: interval => interval.h
    },

    minutes: {
        token: 'I',
        output: interval => frost.padString(interval.i, 2)
    },

    minutesShort: {
        token: 'i',
        output: interval => interval.i
    },

    seconds: {
        token: 'S',
        output: interval => frost.padString(interval.s, 2)
    },

    secondsShort: {
        token: 's',
        output: interval => interval.s
    },

    microseconds: {
        token: 'F',
        output: interval => frost.padString(interval.f, 6)
    },

    microsecondsShort: {
        token: 'f',
        output: interval => interval.f
    },

    sign: {
        token: 'R',
        output: interval => interval.invert ? '-' : '+'
    },

    signShort: {
        token: 'r',
        output: interval => interval.invert ? '-' : ''
    }
};