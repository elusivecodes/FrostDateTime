/**
 * DateInterval Properties
 */

Object.assign(DateInterval, {

    // Language
    lang: {
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
            ago: '%n ago',
            in: 'In %n',
            now: 'Now'
        },
        seperator: ', '
    },

    langs: {
        y: ['year', 'years'],
        m: ['month', 'months'],
        d: ['day', 'days'],
        h: ['hour', 'hours'],
        i: ['minute', 'minutes'],
        s: ['second', 'seconds']
    },

    // ISO RegEx
    isoRegex: /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:(\d+)W)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?|)$/,

    // String RegEx
    stringRegex: /([\+\-]?\s*\d+)\s*(?:(years?)|(months?)|(fortnights?|forthnights?)|(weeks?)|(days?)|(hours?)|(minutes?|mins?)|(seconds?|secs?))/

});
