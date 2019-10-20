function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function stringToInt(str) {
  return parseInt(str);
}

module.exports = {
  capitalize: capitalize,
  stringToInt: stringToInt,
};