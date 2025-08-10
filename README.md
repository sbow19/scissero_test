# Instructions

To run the script, just run:
```bash
    npm init
    
    npm start <note value> <buffer percentage> <years> <interest per annum> <table gradations>
```
Validate.js validates the types of the arguments and checks whether they fall within
some reasonable bounds.

The script generates a .docx file in the current working directory. The file contains a table of Underlying Return to the Payment at Maturity. 

There is an example table in this directory.

main.js is the entry point to the application. Calculate generates rows of values which is passed to doc_gen.js, which generates the .docx file. validate.js carries out some initial validation, and types.js has some jsDoc type definitions.

## Interpretation of Instructions and Code Explanation

There are two formulas used when calculating the Payment at Maturity, and which formula is used is dependent on the Final Value of each Underlying (that is, the Buffer Threshold), and whether the Final Value falls in respect of the Buffer Threshold. The Underlying Return represents the percentage change of the Underlying over the maturity period.

If the Buffer Threshold is 90%, then that means that the Underlying is 90% of it's original value at maturity.

Each row of the table represents different Underlying Return values and the resultant Payment a Maturity. In my code, I chose to represent various values between 100% and -100% for Underlying Return. 

The two interest calculations are the Contingent Interest Rate and what I call the Basic Interest Rate. The Contingent Interest Rate is applied when the Underlying value at maturity is greater than or equal to the Buffer Threshold amount (e.g. greater than 90% when the Buffer Threshold is 90%), otherwise the Basic Interest Rate is applied.

In my code, I check some given ```underlyingFinalValue```
to see if it's greater than or equal to the Buffer Threshold. The user must provide this value. I did not assume that Buffer Amount and Buffer Threshold are compliments, and as such the user must provide values for each.

The Contingent Interest Rate is calculated using the following compound interest formula:

noteValue * (1 + r/n)^nt

Where r is the interest rate per annum
n is the number of interest accruing intervals 
t is the number of years.

The Contingent Interest can be defined as the interest accrued.

The Basic Interest Rate does not apply a compound interest formula, and simply applies a flat increase or decrease at maturity, depending on the performance of the Underlying and the Buffer Amount. Essentially, the Buffer Amount is the amount of decrease that is tolerated in the Underlying's value before the note value's final value decreases, and as such there might be some values of Underlying Return and Buffer Amount where interest is accrued.

I made the following assumptions in the code:
    - the notes have not been redeemed early
    - maturity period can between 0 and 100 years(exclusive)
    - buffer threshold is between 0 and 100 percent
    - buffer amount is between 0 and 100 percent




