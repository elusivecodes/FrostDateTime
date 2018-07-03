DateTime.lang = {
    ampm: {
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
    ordinal: ['st', 'nd', 'rd', 'th']
};

DateTime.seperators = [';', ':', '/', '.', ',', '-', '(', ')'];

DateTime.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

DateTime.formats = {
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
};

DateTime.defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

DateTime.utcLocale = 'en-US';
DateTime.utcOptions = {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};
DateTime.utcFormatter = new Intl.DateTimeFormat(DateTime.utcLocale, DateTime.utcOptions);

DateInterval.isoRegex = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:(\d+)W)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?|)$/;
DateInterval.stringRegex = /([\+\-]?\s*\d+)\s*(day|forthnight|fortnight|hour|minute|min|month|second|sec|week|year)s?/;