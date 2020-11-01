const { DateFormatter, DateTime } = require('../dist/frost-datetime.min');

before(async function() {
    DateFormatter.defaultLocale = 'en-GB';
    DateTime.defaultTimeZone = 'UTC';
});