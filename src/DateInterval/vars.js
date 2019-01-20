// lang
DateInterval.lang = {
    intervals: {
        day: '%d day',
        days: '%d days',
        hour: '%h hour',
        hours: '%h hours',
        minute: '%i minute',
        minutes: '%i minutes',
        month: '%m month',
        months: '%m months',
        second: '%s second',
        seconds: '%s seconds',
        year: '%y year',
        years: '%y years'
    },
    relative: {
        ago: '{interval} ago',
        in: 'In {interval}',
        now: 'Now'
    },
    seperator: ', '
};

// ISO Regex
DateInterval.isoRegex = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:(\d+)W)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?|)$/;

// string Regex
DateInterval.stringRegex = /([\+\-]?\s*\d+)\s*(?:(years?)|(months?)|(fortnights?|forthnights?)|(weeks?)|(days?)|(hours?)|(minutes?|mins?)|(seconds?|secs?))/;