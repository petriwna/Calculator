import { Button } from './Button';
import { Calculation } from './Calculation';
import { ICalculator } from './ICalculator';

export class Calculator implements ICalculator {
  displayValue: string;
  firstOperand: number;
  waitingForSecondOperand: boolean;
  operator: string;
  member: number;

  constructor() {
    this.displayValue = '0';
    this.firstOperand = 0;
    this.waitingForSecondOperand = false;
    this.operator = '';
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
      case 'action':
        console.log('open');
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
        this.checkOperator(operator);
        break;
      case '+/-':
        this.inputNegativeNumber();
        break;
      case '.':
        this.inputDecimal();
        break;
      case 'clear':
        this.clearAll();
        break;
      case 'backspace':
        this.handleBackspace();
        break;
    }
    this.updateDisplay(this.displayValue);
  }

  checkOperator(operator: string) {
    const inputValue = parseFloat(this.displayValue);
    if (this.operator && this.waitingForSecondOperand) {
      this.operator = operator;
      return;
    }

    if (this.firstOperand === 0 && !isNaN(inputValue)) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.compute(this.firstOperand, inputValue, this.operator);
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = operator;
  }

  compute(firstOperand: number, secondOperand: number, operator: string) {
    const calculation = new Calculation();

    switch (operator) {
      case '+':
        return calculation.add(firstOperand, secondOperand);
      case '-':
        return calculation.subtract(firstOperand, secondOperand);
      case '*':
        return calculation.multiply(firstOperand, secondOperand);
      case '/':
        return calculation.divide(firstOperand, secondOperand);
      default:
        return secondOperand;
    }
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

  handlerFn(): void {
    //TODO
  }

  handlerMemory(): void {
    //TODO
  }

  inputNegativeNumber(): void {
    const currentInput = parseFloat(this.displayValue);

    const result = currentInput * -1;
    this.displayValue = `${parseFloat(result.toFixed(10))}`;

    if (this.waitingForSecondOperand) {
      this.waitingForSecondOperand = false;
    }
  }

  inputDecimal(): void {
    if (this.waitingForSecondOperand) {
      this.displayValue = '0';
      this.waitingForSecondOperand = false;
      return;
    }
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  handleBackspace(): void {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
  }

  clearAll(): void {
    this.displayValue = '0';
    this.firstOperand = 0;
    this.waitingForSecondOperand = false;
    this.operator = '';
    this.updateDisplay(this.displayValue);
  }
}
