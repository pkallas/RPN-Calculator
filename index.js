// Assume you are given a reverse Polish notation string
// '1 2 + --> 3'
// '1 2 + 3 * --> 9'
// '2 3 * 1 + --> 7'
// '2 4 / --> 2'
// '2 4 / 2 + --> 4'
// '2 1 - --> 1'
// '2 4 - --> -2'
// '2 2 2 2 SUMALL --> 8'
// '2 1 - 1 2 6 SUMALL --> 10'
// '2 2 2 2 SUMALL 4 * --> 32'
// '4 4 4 4 AVGALL --> 4'
// '3 2 4 AVGALL --> 3'
// '3 2 4 AVGALL 3 + 3 / --> 2'
// '1 4 3 + 2 * + --> 15'
// Given the string, return the result of performing the mathematical operation

const chalk = require('chalk');

function ouroboros(rpn) {
  let rpnSplit = rpn.split(' ');
  let stack = [];
  rpnSplit.forEach(el => {
    /*
    This if statement is not intuitive, parseInt performed on a string that
    is not a number is falsey. Therefore, the if statement just needs to check
    parseInt(el)
    */
    if (parseFloat(el)) {
      stack.push(parseFloat(el));
    } else {
      if (el === 'SUMALL') {
        let calculatedSum = SUMALL(stack);
        stack = [];
        stack.push(calculatedSum[0]);
        return;
      }

      if (el === 'AVGALL') {
        let calculatedSum = SUMALL(stack);
        stack = [];
        stack.push(calculatedSum[0] / calculatedSum[1]);
        return;
      }

      let operand1 = stack.pop();
      let operand2 = stack.pop();

      if (el === '+') {
        stack.push(operand1 + operand2);
        return;
      }

      if (el === '*') {
        stack.push(operand1 * operand2);
        return;
      }

      if (el === '-') {
        stack.push(operand2 - operand1);
        return;
      }

      if (el === '/') {
        stack.push(operand2 / operand1);
        return;
      }
    }
  });
  let result = stack.pop();
  if (!parseFloat(result)) {
    throw new Error(chalk.red('Invalid input. Please ensure that you have the correct amount of arguments for each operation.'));
  };

  if (stack.length > 0) {
    console.log(chalk.yellow('Warning: too many numbers and not enough operands.'));
    console.log(chalk.yellow(`Maybe you wanted ${chalk.cyan(result)}, but this is not a valid Reverse Polish Notation operation.`));
    console.log(chalk.yellow('Please review what constitutes valid Reverse Polish Noation statement.'));
    return;
  }

  console.log(chalk.green(result));
};

function SUMALL(arr) {
  let sum = 0;
  let count = 0;
  arr.forEach(el => {
    sum += el;
    count++;
  });
  return [sum, count];
};

ouroboros('1 2 +');
ouroboros('1 2 + 3 *');
ouroboros('2 3 * 1 +');
ouroboros('4 2 /');
ouroboros('4 2 / 2 +');
ouroboros('2 1 -');
ouroboros('2 4 -');
ouroboros('2 2 2 2 SUMALL');
ouroboros('2 1 - 1 2 6 SUMALL');
ouroboros('2 2 2 2 SUMALL 4 *');
ouroboros('4 4 4 4 AVGALL');
ouroboros('3 2 4 AVGALL');
ouroboros('3 2 4 AVGALL 3 + 3 /');
ouroboros('1 4 3 + 2 * +');
ouroboros('1 2 3 4 5 +');
ouroboros('1 + -');
