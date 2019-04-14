try {
    console.log('\x1b[0m');
    console.log('-- Testing DateTime class');

    require('./tests/attributes-get');
    require('./tests/attributes-set');
    require('./tests/format');
    require('./tests/fromFormat');
    require('./tests/manipulate');
    require('./tests/utility');
    require('./tests/diff');

    console.log('\x1b[0m');
    console.log('-- Testing DateInterval class');

    require('./tests/interval');
} catch (error) {
    console.error('\x1b[31m', error.message);
}
