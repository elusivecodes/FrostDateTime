/**
 * DateTime (Static) Properties
 */

Object.assign(DateTime, {

    // Whether to clamp current date when adjusting month
    clampDates: true,

    // Default timeZone
    defaultTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    // Formats
    formats: {
        atom: `yyyy-MM-dd'THH:mm:ssxxx`,
        cookie: `eeee, dd-MMM-yyyy HH:mm:ss ZZZZ`,
        date: `eee MMM dd yyyy`,
        iso8601: `yyyy-MM-dd'THH:mm:ssxx`,
        rfc822: `eee, dd MMM yy HH:mm:ss xx`,
        rfc850: `eeee dd-MMM-yy HH:mm:ss ZZZZ`,
        rfc1036: `eee, dd MMM yy HH:mm:ss xx`,
        rfc1123: `eee, dd MMM yyyy HH:mm:ss xx`,
        rfc2822: `eee, dd MMM yyyy HH:mm:ss xx`,
        rfc3339: `yyyy-MM-dd'THH:mm:ssxxx`,
        rfc3339_extended: `yyyy-MM-dd'THH:mm:ss.0xxx`,
        rss: `eee, dd MMM yyyy HH:mm:ss xx`,
        string: `eee MMM dd yyyy HH:mm:ss xx (VV)`,
        time: `HH:mm:ss xx (VV)`,
        w3c: `yyyy-MM-dd'THH:mm:ssxxx`
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

    // Formatter locale
    _formatterLocale: 'en-US',

    // Formatter options
    _formatterOptions: {
        timeZone: 'UTC',
        hourCycle: 'h23',
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
    _dateStringTimeZoneRegExp: /\s(?:UTC|GMT|Z|[\+\-]\d)|\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}[\+\-]\d{2}\:\d{2}/i,

    // Format token RegExp
    _formatTokenRegExp: /(?<!\')([a-z])\1*/i,

    // Offset RegExp
    _offsetRegExp: /(?:GMT)?([\+\-])(\d{2})(\:?)(\d{2})?/,

    // Parsing key order
    _parseOrderKeys: [
        ['year', 'weekYear'],
        ['era'],
        ['quarter', 'month', 'week', 'dayOfYear'],
        ['weekOfMonth'],
        ['date', 'dayOfWeek'],
        ['dayOfWeekInMonth'],
        ['hours24', 'hours12', 'dayPeriod'],
        ['minutes', 'seconds', 'milliseconds']
    ]

});

// UTC formatter
DateTime._utcFormatter = new Intl.DateTimeFormat(DateTime._formatterLocale, DateTime._formatterOptions);
