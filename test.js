try {
    require('./tests/attributes-get');
    require('./tests/attributes-set');
    require('./tests/format');
    require('./tests/fromFormat');
    require('./tests/manipulate');
    require('./tests/utility');
    require('./tests/diff');
} catch (error) {
    console.error('\x1b[31m', error.message);
}
