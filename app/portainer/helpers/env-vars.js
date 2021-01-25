import _ from 'lodash-es';

export function parseVariables(src) {
  const KEYVAL_REGEX = /^\s*([\w.-]+)\s*=(.*)?\s*$/;
  const NEWLINES_REGEX = /\n|\r|\r\n/;

  return _.filter(
    _.map(
      src.split(NEWLINES_REGEX),
      (line) => {
        const parsedKeyValArr = line.match(KEYVAL_REGEX);
        if (parsedKeyValArr != null && parsedKeyValArr.length > 2) {
          return { name: parsedKeyValArr[1], value: parsedKeyValArr[2] || '' };
        }
      },
      (val) => val
    )
  );
}

/**
 * parses an array of name=value to array of {name, value}
 *
 * @param  {[string]} array array of strings in format name=value
 *
 * @returns {[{name: string, value: string}]} array of {name, value}
 */
export function parseArrayOfStrings(array) {
  return array.map((variableString) => {
    if (!variableString.includes('=')) {
      return variableString;
    }
    const [name, value] = variableString.split(/\=(.*)/);
    return { name, value };
  });
}
/**
 * converts an array of {name, value} to array of `name=value`, name is always defined
 *
 * @param  {[{name, value}]} array array of {name, value}
 *
 * @returns {[string]} array of `name=value`
 */
export function convertToArrayOfStrings(array) {
  return array.filter((variable) => variable.name).map(({ name, value }) => (value || value === '' ? `${name}=${value}` : name));
}
