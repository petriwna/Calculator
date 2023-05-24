export interface ICalculator {
  updateDisplay: (displayValue: string) => void;
  handlerButtons: (button: any) => void;
  handleOperator: (value: string) => void;
  handleNumber: (value: string) => void;
  handlerFn: () => void;
  checkOperator: (operator: string) => void;
  compute: (firstOperand: number, secondOperand: number, operator: string) => number;
  inputDecimal: () => void;
  inputNegativeNumber: () => void;
  handlerMemory: () => void;
  handleBackspace: (value: string) => void;
  clearAll: () => void;
}
