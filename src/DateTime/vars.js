// language
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
    numberRegex: '\\d',
    numbers: false,
    ordinal: value =>
    {
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
    }
};

// seperators
DateTime.seperators = [';', ':', '/', '.', ',', '-', '(', ')'];

// days in months
DateTime.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// default formats
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

// default locale
DateTime.defaultLocale = Intl.DateTimeFormat().resolvedOptions().locale;

// default timezone
DateTime.defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// UTC Formatter
DateTime.formatterLocale = 'en-US';
DateTime.formatterOptions = {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};
DateTime.utcFormatter = new Intl.DateTimeFormat(DateTime.formatterLocale, DateTime.formatterOptions);

// aliases
DateTime.prototype.getFullYear = DateTime.prototype.getYear;
DateTime.prototype.setFullYear = DateTime.prototype.setYear;

// timezones
DateTime.timezones = {};

Object.keys(zones).forEach(timezone =>
{
    const parts = values[zones[timezone]].split('|');
    const abbr = parts.shift().split(';')
        .map(a => a || 'LMT');
    const transitions = parts.shift().split(';')
        .map(t =>
        {
            const data = t.split(',');
            data[0] = data[0] ?
                parseInt(data[0], 36) :
                -Number.MAX_VALUE;
            return data;
        });

    DateTime.timezones[timezone] = transitions.map((transition, i) =>
    {
        return {
            start: transition[0],
            end: i == transitions.length - 1 ?
                Number.MAX_VALUE :
                transitions[i + 1][0] - 1,
            abbr: transition[1] && abbr[transition[1]],
            dst: transition[2] && abbr[transition[2]]
        };
    });
});