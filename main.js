import generateTable from "./doc_gen.js";
import calculate from "./calculate.js";
import validate from "./validate.js";
/**
 *@typedef {import('./types.js').TableData} TableData
 *@typedef {import('./types.js').Arguments} Arguments
 * */

function main() {
  // Get arguments
  const args = process.argv.slice(2);

  if (args.length !== 6) {

    console.error(
      "Usage: npm run <note value> <buffer threshold> <buffer amount> <years> <interest per annum> <table gradations>"
    );
    process.exit(1);
  }

  let validatedArgs = {};
  try {
    validatedArgs = validate(args);
  }catch(e){
    console.log(e);
    process.exit(1);
  }

  try {
    const tableData = calculate(validatedArgs);
    generateTable(tableData);
  } catch (e) {
    console.log(e);
  }
}

main();
