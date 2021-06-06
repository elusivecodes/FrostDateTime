const { DateTime } = require('../dist/frost-datetime.min');

before(async function() {
    DateTime.setDefaultLocale('en');
    DateTime.setDefaultTimeZone('UTC');
});