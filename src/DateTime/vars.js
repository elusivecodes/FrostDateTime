/**
 * DateTime (Static) Properties
 */

// get resolved options
const resolvedOptions = Intl.DateTimeFormat().resolvedOptions();

Object.assign(DateTime, {

    // Whether to clamp current date when adjusting month
    clampDates: true,

    // Default locale
    defaultLocale: resolvedOptions.locale,

    // Default timeZone
    defaultTimeZone: resolvedOptions.timeZone,

    // Formats
    formats: {
        atom: 'Y-m-d\\TH:i:sP',
        cookie: 'l, d-M-Y H:i:s T',
        date: 'D M d Y',
        iso8601: 'Y-m-d\\TH:i:sO',
        rfc822: 'D, d M y H:i:s O',
        rfc850: 'l, d-M-y H:i:s T',
        rfc1036: 'D, d M y H:i:s O',
        rfc1123: 'D, d M Y H:i:s O',
        rfc2822: 'D, d M Y H:i:s O',
        rfc3339: 'Y-m-d\\TH:i:sP',
        rfc3339_extended: 'Y-m-d\\TH:i:s.vP',
        rss: 'D, d M Y H:i:s O',
        string: 'D M d Y H:i:s O (e)',
        time: 'H:i:s O (e)',
        w3c: 'Y-m-d\\TH:i:sP'
    },

    // Language
    lang: {
        dayPeriods: {
            lower: ['am', 'pm'],
            upper: ['AM', 'PM']
        },
        days: {
            min: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        months: {
            short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        numberRegExp: '\\d',
        numbers: false,
        ordinal: value => {
            const j = value % 10;
            const k = value % 100;

            if (j === 1 && k !== 11) {
                return 'st';
            }

            if (j === 2 && k !== 12) {
                return 'nd';
            }

            if (j === 3 && k !== 13) {
                return 'rd';
            }

            return 'th';
        },
        ordinalRegExp: '(st|[nr]d|th)'
    },

    // Comparison lookup
    _compareLookup: [
        {
            values: ['year'],
            method: 'getYear'
        },
        {
            values: ['month'],
            method: 'getMonth'
        },
        {
            values: ['day', 'date'],
            method: 'getDate'
        },
        {
            values: ['hour'],
            method: 'getHours'
        },
        {
            values: ['minute'],
            method: 'getMinutes'
        },
        {
            values: ['second'],
            method: 'getSeconds'
        }
    ],

    // Unix epoch
    _epoch: {
        year: 1970,
        month: 0,
        date: 1,
        hours: 0,
        pm: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        timeZone: 'UTC'
    },

    // Formatter locale
    _formatterLocale: 'en-US',

    // Formatter options
    _formatterOptions: {
        timeZone: 'UTC',
        hour12: false,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    },

    // Days in months
    _monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

    // Seperators
    _seperators: [';', ':', '/', '.', ',', '-', '(', ')'],

    // Date string timezone RegExp
    _dateStringTimeZoneRegExp: /\s(?:UTC|GMT|[\+\-]\d)|\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}[\+\-]\d{2}\:\d{2}/i,

    // Offset RegExp
    _offsetRegExp: /([\+\-])(\d{2})(\:?)(\d{2})/,

    // abbeviations
    _abbreviations: {},

    // timeZones
    _timeZones: {}

});

// UTC formatter
DateTime._utcFormatter = new Intl.DateTimeFormat(DateTime._formatterLocale, DateTime._formatterOptions);

// Aliases
DateTime.prototype.getFullYear = DateTime.prototype.getYear;
DateTime.prototype.setFullYear = DateTime.prototype.setYear;

/**
 * Populate TimeZones
 */

for (const timeZone in zones) {
    const parts = values[zones[timeZone]].split('|'),
        zoneAbbrs = parts.shift().split(';')
            .map(a => abbrs[a]),
        transitions = parts.shift().split(';')
            .map(t => {
                const data = t.split(',');
                data[0] = data[0] ?
                    parseInt(data[0], 36) :
                    -Number.MAX_VALUE;
                return data;
            });

    DateTime._timeZones[timeZone] = transitions.map((transition, i) => {
        const start = transition[0];
        const end = i == transitions.length - 1 ?
            Number.MAX_VALUE :
            transitions[i + 1][0] - 1;
        const abbr = transition[1] && zoneAbbrs[transition[1]];
        const dst = transition[2] && zoneAbbrs[transition[2]];

        return {
            start,
            end,
            abbr,
            dst
        };
    });
}

for (const abbr in abbrOffsets) {
    const offset = parseInt(abbrOffsets[abbr], 36) / 60;
    DateTime._abbreviations[abbr] = offset ?
        offset * -1 :
        0;
}
