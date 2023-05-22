export interface ICalculation {
  add: (firstOperand: number, secondOperand: number) => number;
  subtract: (firstOperand: number, secondOperand: number) => number;
  multiply: (firstOperand: number, secondOperand: number) => number;
  divide: (firstOperand: number, secondOperand: number) => number;
  interest: (operand: number) => number;
}
