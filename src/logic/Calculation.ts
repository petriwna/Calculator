import { ICalculation } from './ICalculation';

export class Calculation implements ICalculation {
  add(firstOperand: number, secondOperand: number): number {
    return firstOperand + secondOperand;
  }

  subtract(firstOperand: number, secondOperand: number): number {
    return firstOperand - secondOperand;
  }

  interest(operand: number): number {
    return operand / 100;
  }

  multiply(firstOperand: number, secondOperand: number): number {
    return firstOperand * secondOperand;
  }

  divide(firstOperand: number, secondOperand: number): number {
    return firstOperand / secondOperand;
  }
}
