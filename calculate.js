/**
 *@typedef {import('./types.js').TableData} TableData
 *@typedef {import('./types.js').Arguments} Arguments
 *
 * */

/**
 *
 * @param {Arguments} args
 * @returns {TableData} - Underlying Return mapped to final note value based on different Underlying Return amounts
 */
function calculate(args) {
  const tableData = [];
  let underlyingReturn = 100; // Change in Underlying as percentage point value
  const threshold = args.bufferThreshold; // Final percentage point value of Underlying where Contingent Interest is based
  const gradation = Number((100 / args.tableGradations).toPrecision(1));

  // Calculate final note value for each Underlying Return amount
  while (underlyingReturn>= -100) {

    const underlyingFinalValue = 100 + underlyingReturn;

    if (underlyingFinalValue >= threshold) {

      // Apply contingent interest rate
      tableData.push([
        underlyingReturn,
        _contingentInterest(args.noteValue, args.years, args.interestRate),
      ]);
    } else {
      // Apply basic interest rate
      tableData.push([
        underlyingReturn,
        _basicInterest(args.noteValue, args.buffer, underlyingReturn),
      ]);
    }

    underlyingReturn= underlyingReturn- gradation;
  }

  return tableData;
}

/**
 * Contingent interest defined as:
 *  noteValue * (1 + r/n)^nt
 * 
 * @param {number} noteValue
 * @param {number} years
 * @param {number} interestRate
 * @returns {number} - to two decimal points
 */
function _contingentInterest(noteValue, years, interestRate) {
  let finalReturn = noteValue;

  finalReturn = finalReturn * Math.pow(1 + ((interestRate / 100) / 12), 12 * years);

  return finalReturn;
}

/**
 * Basic interest defined as:
 *  noteValue + [noteValue * (Buffer Amount + Underlying Return)]
 *
 * @param {number} noteValue
 * @param {number} buffer
 * @param {number} underlyingReturn
 * @returns {number}  - to two decimal points
 */
function _basicInterest(noteValue, buffer, underlyingReturn) {
  return noteValue + noteValue * ((buffer + underlyingReturn) / 100);
}

export default calculate;
