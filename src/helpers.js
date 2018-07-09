function padString(string, length, padding = 0) {
    string = '' + string;

    return string.length >= length ?
        string :
        new Array(length - string.length + 1).join(padding) + string;
}

function isNumeric(value) {
    return ! isNaN(parseFloat(value)) && isFinite(value);
}