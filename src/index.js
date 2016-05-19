import isNumeric from '@economist/utility-dti-isnumeric';
import mapValues from 'lodash/mapValues';

/**
 * Parses an array of numeric data into numbers. Meant to run through
 * imported JSON/CSV data and make sure everything numeric is the
 * proper type.
 *
 * @param {*} d - a list whose items should be evaluated for numericity
 */
const percentMatcher = /(.+)%$/;
export default function parseNumerics(toParse) {
  function evaluator(value) {
    const match = value && value.match && value.match(percentMatcher);
    return isNumeric(value) ? parseFloat(value) : // eslint-disable-line no-nested-ternary
      match && isNumeric(match[1]) ? parseFloat(match[1]) : value;
  }
  return toParse instanceof Array ? toParse.map(evaluator) : mapValues(toParse, evaluator);
}
