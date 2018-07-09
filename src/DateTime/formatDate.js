DateTime.formatData = {

    /* YEAR */

    // leap year
    leapYear: {
        token: 'L',
        output: date => DateTime.isLeapYear(date.getUTCFullYear()) ? 1 : 0
    },

    // year
    year: {
        token: 'Y',
        regex: () => '(\\d{1,4})',
        input: (date, value) => date.year = value,
        output: date => date.getUTCFullYear()
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
            const year = '' + date.getUTCFullYear();
            return year.substring(year.length - 2);
        }
    },

    // iso year
    isoYear: {
        token: 'o',
        output: date => DateTime.getIsoYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    },

    /* MONTH */

    // month name
    monthName: {
        token: 'F',
        regex: () =>  '(' + DateTime.lang.months.full.join('|') + ')',
        input: (date, value) => date.month = DateTime.getMonthFromName(value),
        output: date => DateTime.getMonthName(date.getUTCMonth())
    },

    // month name short
    monthNameShort: {
        token: 'M',
        regex: () =>  '(' + DateTime.lang.months.short.join('|') + ')',
        input: (date, value) => date.month = DateTime.getMonthFromName(value, 'short'),
        output: date => DateTime.getMonthName(date.getUTCMonth(), 'short')
    },

    // month
    month: {
        token: 'm',
        regex: () => '(\\d{2})',
        input: (date, value) => date.month = value - 1,
        output: date => padString(date.getUTCMonth() + 1, 2)
    },

    // month short
    monthShort: {
        token: 'n',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.month = value - 1,
        output: date => date.getUTCMonth() + 1
    },

    // days in month
    daysInMonth: {
        token: 't',
        output: date => DateTime.daysInMonth(date.getUTCFullYear(), date.getUTCMonth())
    },

    /* WEEKS */

    // iso week
    isoWeek: {
        token: 'W',
        output: date => DateTime.getIsoWeek(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    },

    /* DAYS */

    // day of year
    dayOfYear: {
        token: 'z',
        regex: () => '(\\d{1,3})',
        input: (date, value) => date.dayOfYear = value,
        output: date => DateTime.dayOfYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    },

    // date
    date: {
        token: 'd',
        regex: () => '(\\d{2})',
        input: (date, value) => date.date = value,
        output: date => padString(date.getUTCDate(), 2)
    },

    // date short
    dateShort: {
        token: 'j',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.date = value,
        output: date => date.getUTCDate()
    },

    // ordinal suffix
    dateSuffix: {
        token: 'S',
        regex: () =>  '(' + DateTime.lang.ordinal.join('|') + ')',
        output: date => DateTime.dateSuffix(date.getUTCDate())
    },

    // iso day
    isoDay: {
        token: 'N',
        output: date => DateTime.getIsoDay(date.getUTCDay())
    },

    // day of week
    day: {
        token: 'w',
        output: date => date.getUTCDay()
    },

    // day name
    dayName: {
        token: 'l',
        regex: () =>  '(' + DateTime.lang.days.full.join('|') + ')',
        input: (date, value) => date.day = DateTime.getDayFromName(value),
        output: date => DateTime.getDayName(date.getUTCDay())
    },

    // day name short
    dayNameShort: {
        token: 'D',
        regex: () =>  '(' + DateTime.lang.days.short.join('|') + ')',
        input: (date, value) => date.day = DateTime.getDayFromName(value, 'short'),
        output: date => DateTime.getDayName(date.getUTCDay(), 'short')
    },

    /* TIME */

    amppm: {
        token: 'a',
        regex: () => '(' + DateTime.lang.ampm.lower.join('|') + ')',
        input: (date, value) => date.pm = DateTime.lang.ampm.lower.indexOf(value),
        output: date => date.getUTCHours() < 12 ? DateTime.lang.ampm.lower[0] : DateTime.lang.ampm.lower[1]
    },

    amppmUpper: {
        token: 'A',
        regex: () => '(' + DateTime.lang.ampm.lower.join('|') + ')',
        input: (date, value) => date.pm = DateTime.lang.ampm.upper.indexOf(value),
        output: date => date.getUTCHours() < 12 ? DateTime.lang.ampm.upper[0] : DateTime.lang.ampm.upper[1]
    },

    beat: {
        token: 'B',
        output: date => Math.round((date.getUTCHours() + (date.getUTCMinutes() / 60)) / 24 * 1000)
    },

    // hours (24)
    hours24: {
        token: 'H',
        regex: () => '(\\d{2})',
        input: (date, value) => date.hours24 = value,
        output: date => padString(date.getUTCHours(), 2)
    },

    // hours short (24)
    hours24Short: {
        token: 'G',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.hours24 = value,
        output: date => date.getUTCHours()
    },

    // hours (12)
    hours12: {
        token: 'h',
        regex: () => '(\\d{2})',
        input: (date, value) => date.hours12 = value % 12,
        output: date => padString(date.getUTCHours() % 12 || 12, 2)
    },

    // hours short (12)
    hours12Short: {
        token: 'g',
        regex: () => '(\\d{1,2})',
        input: (date, value) => date.hours12 = value % 12,
        output: date => date.getUTCHours() % 12 || 12
    },

    // minutes
    minutes: {
        token: 'i',
        regex: () => '(\\d{2})',
        input: (date, value) => date.minutes = value,
        output: date => padString(date.getUTCMinutes(), 2)
    },

    // seconds
    seconds: {
        token: 's',
        regex: () => '(\\d{2})',
        input: (date, value) => date.seconds = value,
        output: date => padString(date.getUTCSeconds(), 2)
    },

    // microseconds
    microseconds: {
        token: 'u',
        regex: () => '(\\d{1,6})',
        input: (date, value) => date.milliseconds = value / 1000,
        output: date => date.getUTCMilliseconds() * 1000
    },

    // milliseconds
    milliseconds: {
        token: 'v',
        output: date => date.getUTCMilliseconds()
    },

    /* TIMEZONE */

    // timezone
    timezone: {
        token: 'e',
        regex: () => '(\\w+\\/\\w+|\\w+)',
        input: (date, value) => date.timezone = value,
        output: (date, datetime) => datetime._timezone
    },

    // daylight savings
    dst: {
        token: 'I',
        output: (date, datetime) => datetime.isDST() ? 1 : 0
    },

    // offset
    offset: {
        token: 'O',
        regex: () => '([\\+\\-]\\d{4})',
        input: (date, value) => date.offset = (
            parseInt(value.slice(1, 3))
            * 60
            + parseInt(value.slice(3, 5))
        )
        * (value[0] === '-' ? 1 : -1),
        output: (date, datetime) => (datetime._offset > 0 ? '-' : '+') +
            padString(Math.abs(Math.floor(datetime._offset / 60)), 2) +
            padString(datetime._offset % 60, 2)
    },

    // offset colon
    offsetColon: {
        token: 'P',
        regex: () => '([\\+\\-]\\d{2}\\:\\d{2})',
        input: (date, value) => date.offset = (
            parseInt(value.slice(1, 3))
            * 60
            + parseInt(value.slice(4, 6))
        )
        * (value[0] === '-' ? 1 : -1),
        output: (date, datetime) => (datetime._offset > 0 ? '-' : '+') +
            padString(Math.abs(Math.floor(datetime._offset / 60)), 2) + 
            ':' + 
            padString(datetime._offset % 60, 2)
    },

    // timezone abbreviated
    timezoneAbbr: {
        token: 'T',
        regex: () => '([A-Z]{1,5})',
        input: (date, value) => date.timezone = date.timezone ||
            Object.keys(DateTime.timezones).find(timezone => timezone.abbr === value || timezone.abbrDST === value),
        output: (date, datetime) => DateTime.timezoneAbbr(datetime._timezone, datetime.isDST())
    },

    // offset seconds
    offsetSeconds: {
        token: 'Z',
        input: (date, value) => date.offset = value / 60,
        output: (date, datetime) => datetime._offset * -60
    },

    /* FULL */

    // timestamp
    iso8601: {
        token: 'c',
        output: (date, datetime) => datetime.toISOString()
    },

    rfc2822: {
        token: 'r',
        output: (date, datetime) => datetime.format(DateTime.formats.rfc822)
    },

    timestamp: {
        token: 'U',
        regex: () => '(\\d+)',
        input: (date, value) => date.timestamp = value,
        output: (date, datetime) => datetime.getTime()
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