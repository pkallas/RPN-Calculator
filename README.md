## Reverse Polish Notation RPN_Calculator

This is a simple Reverse Polish Notation calculator implemented in Javascript. It
contains a function that can add, subtract, divide, multiply, sum all, or find the
average of any valid string provided in Reverse Polish Notation. If an invalid string
is provided, the function will either throw an error if it could not calculate a valid
number, or return a warning that not enough operators were provided for the amount
of integers provided. In the latter case, it will still print out the result of the
incomplete calculation.

This package uses the npm package [chalk](https://www.npmjs.com/package/chalk) to
add color to the printed messages.
