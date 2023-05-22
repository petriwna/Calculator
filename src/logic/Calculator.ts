import { Button } from './Button';
import { ICalculator } from './ICalculator';

export class Calculator implements ICalculator {
  displayValue: string;
  firstOperand: number | null;
  waitingForSecondOperand: boolean;
  operator: string | null;
  member: number;

  constructor() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
    this.member = 0;
  }

  updateDisplay(displayValue: string): void {
    const display = <HTMLParagraphElement>document.getElementById('output-value');
    display.innerText = displayValue;
  }

  handlerButtons(btn: Button): void {
    switch (btn.type) {
      case 'operator':
        this.handleOperator(btn.value);
        break;
      case 'number':
        this.handleNumber(btn.value);
        break;
    }
  }

  handleOperator(operator: string): void {
    switch (operator) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        console.log(this.displayValue);
        break;
      case '.':
        this.inputDecimal(operator);
        break;
      case 'clear':
        this.clearAll();
        break;
      case 'backspace':
        this.handleBackspace(this.displayValue);
        break;
    }
    this.updateDisplay(this.displayValue);
    this.waitingForSecondOperand = true;
  }

  handleNumber(value: string): void {
    if (this.waitingForSecondOperand) {
      this.displayValue = value;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? value : this.displayValue + value;
    }
    this.updateDisplay(this.displayValue);
  }

  handlerFn(): void {}

  handlerMemory(): void {}

  inputDecimal(dot: string): void {}

  inputDisplay(): void {}

  handleBackspace(value: string): void {
    if (value.length > 1) {
      this.displayValue = value.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
  }

  clearAll(): void {
    this.displayValue = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
    this.updateDisplay(this.displayValue);
  }
}
