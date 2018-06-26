DateTime.formatData = {

    /* YEAR */

    // leap year
    leapYear: {
        token: 'L',
        output: date => date.isLeapYear() ? 1 : 0
    },

    // year
    year: {
        token: 'Y',
        regex: () => '(\\d{4})',
        input: (date, value) => date.year = value,
        output: date => padString(date.year(), 4)
    },

    // year short
    yearShort: {
        token: 'y',
        regex: () => '(\\d{2})',
        input: (date, value) => {
            value += value < 70 ? 2000 : 1900;
            date.year = value;
        },
        output: date => {
            const year = '' + date.year();
            return year.substring(year.length - 2);
        }
    },

    // iso year
    isoYear: {
        token: 'o',
        output: date => date.isoYear()
    },

    /* MONTH */

    // month name
    monthName: {
        token: 'F',
        regex: () =>  '(' + DateTime.lang.months.full.join('|') + ')',
        input: (date, value) => date.month = value,
        output: date => date.monthName()
    },

    // month name short
    monthNameShort: {
        token: 'M',
        regex: () =>  '(' + DateTime.lang.months.short.join('|') + ')',
        input: (date, value) => date.month = value,
        output: date => date.monthName('short')
    },

    // month
    month: {
        token: 'm',
        regex: () => '(\\d{2})',
        input: (date, value) => date.month = value,
        output: date => padString(date.month(), 2)
    },

    // month short
    monthShort: {
        token: 'n',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.month = value,
        output: date => date.month()
    },

    // days in month
    daysInMonth: {
        token: 't',
        output: date => date.daysInMonth()
    },

    /* WEEKS */

    // iso week
    isoWeek: {
        token: 'W',
        output: date => date.isoWeek()
    },

    /* DAYS */

    // day of year
    dayOfYear: {
        token: 'z',
        regex: () => '(\\d{1,3})',
        input: (date, value) => date.dayOfYear = value + 1,
        output: date => date.dayOfYear() - 1
    },

    // date
    date: {
        token: 'd',
        regex: () => '(\\d{2})',
        input: (date, value) => date.date = value,
        output: date => padString(date.date(), 2)
    },

    // date short
    dateShort: {
        token: 'j',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.date = value,
        output: date => date.date()
    },

    // ordinal suffix
    dateSuffix: {
        token: 'S',
        regex: () =>  '(' + DateTime.lang.ordinal.join('|') + ')',
        output: date => date.dateSuffix()
    },

    // iso day
    isoDay: {
        token: 'N',
        output: date => date.isoDay()
    },

    // day of week
    day: {
        token: 'w',
        output: date => date.day()
    },

    // day name
    dayName: {
        token: 'l',
        regex: () =>  '(' + DateTime.lang.days.full.join('|') + ')',
        input: (date, value) => date.day = value,
        output: date => date.dayName()
    },

    // day name short
    dayNameShort: {
        token: 'D',
        regex: () =>  '(' + DateTime.lang.days.short.join('|') + ')',
        input: (date, value) => date.day = value,
        output: date => date.dayName('short')
    },

    /* TIME */

    // hours (24)
    hours24: {
        token: 'H',
        regex: () => '(\\d{2})',
        input: (date, value) => date.hours = value,
        output: date => padString(date.hours(), 2)
    },

    // hours short (24)
    hours24Short: {
        token: 'G',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.hours = value,
        output: date => date.hours()
    },

    // hours (12)
    hours12: {
        token: 'h',
        regex: () => '(\\d{2})',
        input: (date, value) => date.hours = value % 12,
        output: date => padString(date.hours() % 12, 2)
    },

    // hours short (12)
    hours12Short: {
        token: 'g',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.hours = value % 12,
        output: date => date.hours() % 12
    },

    // minutes
    minutes: {
        token: 'i',
        regex: () => '(\\d{2})',
        input: (date, value) => date.minutes = value,
        output: date => padString(date.minutes(), 2)
    },

    // seconds
    seconds: {
        token: 's',
        regex: () => '(\\d{2})',
        input: (date, value) => date.seconds = value,
        output: date => padString(date.seconds(), 2)
    },

    // microseconds
    microseconds: {
        token: 'u',
        regex: () => '(\\d{1,6})',
        input: (date, value) => date.milliseconds = value / 1000,
        output: date => date.milliseconds() * 1000
    },

    // milliseconds
    milliseconds: {
        token: 'v',
        output: date => date.milliseconds()
    },

    /* TIMEZONE */

    // timezone
    timezone: {
        token: 'e',
        regex: () => '(\\w+\\/\\w+|\\w+)',
        input: (date, value) => date.timezone = value,
        output: date => date.timezone()
    },

    // daylight savings
    dst: {
        token: 'I',
        output: date => date.isDST() ? 1 : 0
    },

    // offset
    offset: {
        token: 'O',
        regex: () => '([\\+\\-]\\d{4})',
        input: (date, value) =>  (
            parseInt(value.slice(1, 3))
            * 60
            + parseInt(value.slice(3, 5))
        )
        * (value[0] === '-' ? 1 : -1),
        output: date => {
            const offset = date.offset();
            return (offset > 0 ? '-' : '+') +
                padString(Math.abs(Math.floor(offset / 60)), 2) +
                padString(offset % 60, 2);
        }
    },

    // offset colon
    offsetColon: {
        token: 'P',
        regex: () => '([\\+\\-]\\d{2}\\:\\d{2})',
        input: (date, value) =>  (
            parseInt(value.slice(1, 3))
            * 60
            + parseInt(value.slice(4, 6))
        )
        * (value[0] === '-' ? 1 : -1),
        output: date => {
            const offset = date.offset();
            return (offset > 0 ? '-' : '+') +
                padString(Math.abs(Math.floor(offset / 60)), 2) + 
                ':' + 
                padString(offset % 60, 2);
        }
    },

    // timezone abbreviated
    timezoneAbbr: {
        token: 'T',
        regex: () => '([A-Z]{1,5})',
        input: (date, value) => date.timezone = date.timezone ||
            Object.keys(DateTime.timezones).find(timezone => timezone.abbr === value || timezone.abbrDST === value),
        output: date => DateTime.timezoneAbbr(date.timezone(), date.isDST())
    },

    // offset seconds
    offsetSeconds: {
        token: 'Z',
        input: (date, value) => date.offset = value / 60,
        output: date => date.offset() * -1 * 60
    },

    /* FULL */

    // timestamp
    iso8601: {
        token: 'c',
        output: date => date.toISOString()
    },

    rfc2822: {
        token: 'r',
        output: date => date.format(DateTime.formats.rfc822)
    },

    timestamp: {
        token: 'U',
        regex: () => '(\\d+)',
        input: (date, value) => date.timestamp = value,
        output: date => date.timestamp()
    },

    /* SPECIAL */

    // space
    space: {
        token: ' ',
        regex: () => '(\\s)'
    },

    seperator: {
        token: '#',
        regex: () => '([' + DateTime.seperators.map(seperator => '\\' + seperator).join('') + '])'
    },

    seperators: {
        regex: char => '(\\' + char + ')'
    },

    wildcard: {
        token: '?',
        regex: () => '(.)'
    },

    wildcards: {
        token: '*',
        regex: () => '([^' + DateTime.seperators.map(seperator => '\\' + seperator).concat(DateTime.lang.digits).join('') + ']+)'
    },

    reset: {
        token: '!',
        regex: () => '\\!',
        input: date => {
            const epoch = new DateTime();
            epoch.time(0);
            Object.assign(date, epoch.toObject());
        }
    },

    resetSoft: {
        token: '|',
        regex: () => '\\|',
        input: date => {
            const epoch = new DateTime();
            epoch.time(0);

            const obj = epoch.toObject();
            Object.keys(obj).forEach(key => {
                if (date[key] !== false) {
                    return;
                }

                date[key] = obj[key];
            });
        }
    }
};