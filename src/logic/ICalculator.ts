export interface ICalculator {
  inputDisplay: () => void;
  updateDisplay: (displayValue: string) => void;
  handlerButtons: (button: any) => void;
  handleOperator: (value: string) => void;
  handleNumber: (value: string) => void;
  handlerFn: () => void;
  inputDecimal: (value: string) => void;
  handlerMemory: () => void;
  handleBackspace: (value: string) => void;
  clearAll: () => void;
}
