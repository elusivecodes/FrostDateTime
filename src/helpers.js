
/**
 * Returns true if the value is numeric
 * @param {*} value The value to test
 * @returns {bool} Where the value is numeric
 */
function isNumeric(value)
{
    return !isNaN(parseFloat(value)) && isFinite(value);
}