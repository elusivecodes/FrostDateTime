function matchesString(string, compare, insensitive = true) {
    return ! insensitive ?
        '' + string === '' + compare :
        '' + string.toLowerCase() === '' + compare.toLowerCase();
}

function padString(string, length, padding = 0) {
    string = '' + string;

    return string.length >= length ?
        string : new Array(length - string.length + 1).join(padding) + string;
}