module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(obj => obj.trim());
}