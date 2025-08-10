/**
 * @typedef {import('./types.js').Arguments} Arguments
 */

/**
 * Validate raw values taken from command line with the following rules:
 *
 *  - noteValue must be between at least 1 and 1000, They must be positive integers.
 *  - buffer must be a positive integer or float between 0 and 100. Buffer of 100 indicates a change in th Underlying Value has
 *      of 100 percentage points, and cannot fall by more. Buffer of 0 indicates indicates a 0 percentage value change.
 *  - years must be a positive integer or float greater than 0. Years may be a floating point value.
 *  - interestRate must be a positive integer or float greater than 0.
 *  - tableGradations must be greater than 1 and less than or equal to 20.
 *
 * @param {Array<string>} args
 * @returns {Arguments}
 */
function validate(args) {
  const finalArguments = {};

  // Cast strings to numbers. Where string cannot be cast to number, it will return type NaN
  const noteValue = Number(args[0]);
  const bufferThreshold = Number(args[1]);
  const buffer = Number(args[2]);
  const years = Number(args[3]);
  const interestRate = Number(args[4]);
  const tableGradations = Number(args[5]);

  // Validate note value
  _validateNumberInRange(noteValue, "noteValue", 1, 1000, false);
  finalArguments["noteValue"] = noteValue;

  // Validate bufferThreshold
  _validateNumberInRange(bufferThreshold, "bufferThreshold", 0, 100, true);
  finalArguments["bufferThreshold"] = bufferThreshold;

  // Validate buffer
  _validateNumberInRange(buffer, "buffer", 0, 100, true);
  finalArguments["buffer"] = buffer;

  // Validate years
  _validateNumberInRange(years, "years", 0, 100, true);
  finalArguments["years"] = years;

  // Validate interest rate
  _validateNumberInRange(interestRate, "interestRate", 0, 50, true);
  finalArguments["interestRate"] = interestRate;

  // Validate table gradations
  _validateNumberInRange(tableGradations, "tableGradations", 1, 20, false);
  finalArguments["tableGradations"] = tableGradations;

  return finalArguments;
}

/**
 * Check argument is a number (integer or float) )and that it falls within the provided range.
 *
 * @param {number} value
 * @param {string} name
 * @param {number} min
 * @param {number} max
 * @param {boolean} canBeFloat
 */
function _validateNumberInRange(value, name, min, max, canBeFloat) {
  // Validate type
  if (canBeFloat) {
    if (!Number.isInteger(value) && !_isValidFloat(value)) {
      throw new Error(`${name} must be an integer or float.`);
    }
  } else {
    if (!Number.isInteger(value)) {
      throw new Error(`${name} must be an integer.`);
    }
  }

  // Validate range
  if (value < min || value > max) {
    throw new Error(`${name} must be between ${min} and ${max}.`);
  }
}

/**
 *  Check if value is a floating point number,
 *  by seeing if value is a number (because of previous type casting),
 *  if the value is finite, and that the number is not an integer.
 *
 * @param {number} value - some value to check
 * @returns {boolean}
 */
function _isValidFloat(value) {
  return !isNaN(value) && isFinite(value) && !Number.isInteger(value);
}

export default validate;
