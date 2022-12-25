import DateTime from './../src/index.js';

before(async function() {
    DateTime.setDefaultLocale('en');
    DateTime.setDefaultTimeZone('UTC');
});
