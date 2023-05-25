import { Calculator } from '../Calculator';

let calculator: Calculator;

beforeEach(() => {
  calculator = new Calculator();
});

describe('updateDisplay', () => {
  document.body.innerHTML = `
      <div>
        <p id="output-value"></p>
      </div>
    `;

  test('should update the display correctly', () => {
    const displayValue = '123';

    calculator.updateDisplay(displayValue);

    const display = document.getElementById('output-value');

    expect(display?.innerText).toBe(displayValue);
  });
});

describe('handlerButtons', () => {
  test('handlerButtons - invokes handleOperator for operator buttons', () => {
    calculator.handleOperator = jest.fn();
    calculator.handlerButtons({ type: 'operator', value: '+' });
    calculator.handlerButtons({ type: 'operator', value: '-' });
    calculator.handlerButtons({ type: 'operator', value: '*' });
    calculator.handlerButtons({ type: 'operator', value: '/' });
    calculator.handlerButtons({ type: 'operator', value: '=' });

    expect(calculator.handleOperator).toHaveBeenCalledTimes(5);

    expect(calculator.handleOperator).toHaveBeenCalledWith('+');

    expect(calculator.handleOperator).toHaveBeenCalledWith('-');

    expect(calculator.handleOperator).toHaveBeenCalledWith('*');

    expect(calculator.handleOperator).toHaveBeenCalledWith('/');

    expect(calculator.handleOperator).toHaveBeenCalledWith('=');
  });

  test('handlerButtons - invokes handleNumber for number buttons', () => {
    calculator.handleNumber = jest.fn();
    calculator.handlerButtons({ type: 'number', value: '0' });
    calculator.handlerButtons({ type: 'number', value: '1' });
    calculator.handlerButtons({ type: 'number', value: '2' });
    calculator.handlerButtons({ type: 'number', value: '3' });
    calculator.handlerButtons({ type: 'number', value: '4' });

    expect(calculator.handleNumber).toHaveBeenCalledTimes(5);

    expect(calculator.handleNumber).toHaveBeenCalledWith('0');

    expect(calculator.handleNumber).toHaveBeenCalledWith('1');

    expect(calculator.handleNumber).toHaveBeenCalledWith('2');

    expect(calculator.handleNumber).toHaveBeenCalledWith('3');

    expect(calculator.handleNumber).toHaveBeenCalledWith('4');
  });

  test('handlerButtons - does nothing for action buttons', () => {
    console.log = jest.fn();
    calculator.handlerButtons({ type: 'action', value: 'open' });

    expect(console.log).toHaveBeenCalledWith('open');
  });
});

describe('handleOperator', () => {
  beforeEach(() => {
    calculator.updateDisplay = jest.fn(); // Mock the updateDisplay method
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handleOperator - calls corresponding methods for different operators', () => {
    calculator.checkOperator = jest.fn();
    calculator.inputNegativeNumber = jest.fn();
    calculator.inputDecimal = jest.fn();
    calculator.clearAll = jest.fn();
    calculator.handleBackspace = jest.fn();

    calculator.handleOperator('+');
    expect(calculator.checkOperator).toHaveBeenCalledWith('+');

    calculator.handleOperator('+/-');
    expect(calculator.inputNegativeNumber).toHaveBeenCalled();

    calculator.handleOperator('.');
    expect(calculator.inputDecimal).toHaveBeenCalled();

    calculator.handleOperator('clear');
    expect(calculator.clearAll).toHaveBeenCalled();

    calculator.handleOperator('backspace');
    expect(calculator.handleBackspace).toHaveBeenCalled();

    expect(calculator.updateDisplay).toHaveBeenCalledWith(calculator.displayValue);
  });
});

describe('checkOperator', () => {
  test('checkOperator - updates operator when operator and waitingForSecondOperand are true', () => {
    calculator.operator = '+';
    calculator.waitingForSecondOperand = true;
    calculator.checkOperator('-');

    expect(calculator.operator).toBe('-');
  });

  test('checkOperator - sets firstOperand when firstOperand is 0 and inputValue is a valid number', () => {
    calculator.firstOperand = 0;
    calculator.displayValue = '123';
    calculator.checkOperator('+');

    expect(calculator.firstOperand).toBe(123);
  });

  test('checkOperator - computes result and updates displayValue when operator is set', () => {
    calculator.firstOperand = 9;
    calculator.displayValue = '3';
    calculator.operator = '/';
    calculator.checkOperator('=');

    expect(calculator.displayValue).toBe('3');

    expect(calculator.firstOperand).toBe(3);
  });

  test('checkOperator - sets waitingForSecondOperand and operator', () => {
    calculator.checkOperator('*');

    expect(calculator.waitingForSecondOperand).toBe(true);

    expect(calculator.operator).toBe('*');
  });
});

describe('compute', () => {
  test('compute - performs addition operation', () => {
    const result = calculator.compute(5, 3, '+');

    expect(result).toBe(8);
  });

  test('compute - performs subtraction operation', () => {
    const result = calculator.compute(10, 4, '-');
    expect(result).toBe(6);
  });

  test('compute - performs multiplication operation', () => {
    const result = calculator.compute(2, 5, '*');

    expect(result).toBe(10);
  });

  test('compute - performs division operation', () => {
    const result = calculator.compute(12, 3, '/');

    expect(result).toBe(4);
  });

  test('compute - returns secondOperand for unknown operator', () => {
    const result = calculator.compute(5, 10, '%');
    expect(result).toBe(10);
  });
});

describe('handleNumber', () => {
  test('handleNumber - appends value when displayValue is not "0"', () => {
    calculator.displayValue = '123';
    calculator.handleNumber('4');

    expect(calculator.displayValue).toBe('1234');
  });

  test('handleNumber - replaces displayValue when waitingForSecondOperand is true', () => {
    calculator.waitingForSecondOperand = true;
    calculator.handleNumber('9');

    expect(calculator.displayValue).toBe('9');

    expect(calculator.waitingForSecondOperand).toBe(false);
  });

  test('handleNumber - replaces "0" with value when displayValue is "0"', () => {
    calculator.displayValue = '0';
    calculator.handleNumber('5');

    expect(calculator.displayValue).toBe('5');
  });
});

describe('inputNegativeNumber', () => {
  test('should convert the current input to a negative number', () => {
    calculator.waitingForSecondOperand = true;
    calculator.displayValue = '5';

    calculator.inputNegativeNumber();

    expect(calculator.displayValue).toBe('-5');
  });

  test('should not change the current input if it is already a negative number', () => {
    calculator.waitingForSecondOperand = false;
    calculator.displayValue = '-10';

    calculator.inputNegativeNumber();

    expect(calculator.displayValue).toBe('10');
  });

  test('should reset the waitingForSecondOperand flag', () => {
    calculator.waitingForSecondOperand = true;
    calculator.displayValue = '7';

    calculator.inputNegativeNumber();

    expect(calculator.waitingForSecondOperand).toBe(false);
  });
});

describe('inputDecimal', () => {
  test('should set displayValue to "0" and reset waitingForSecondOperand flag if waitingForSecondOperand is true', () => {
    calculator.waitingForSecondOperand = true;
    calculator.displayValue = '12345';

    calculator.inputDecimal();

    expect(calculator.displayValue).toBe('0');

    expect(calculator.waitingForSecondOperand).toBe(false);
  });

  test('should add a decimal point to displayValue if it does not already contain one', () => {
    calculator.waitingForSecondOperand = false;
    calculator.displayValue = '12345';

    calculator.inputDecimal();

    expect(calculator.displayValue).toBe('12345.');
  });

  test('should not add a decimal point if displayValue already contains one', () => {
    calculator.waitingForSecondOperand = false;
    calculator.displayValue = '12345.';
    calculator.inputDecimal();

    expect(calculator.displayValue).toBe('12345.');
  });
});

describe('handleBackspace', () => {
  test('should remove the last character from displayValue if it has more than 1 character', () => {
    calculator.displayValue = '12345';

    calculator.handleBackspace();
    expect(calculator.displayValue).toBe('1234');
  });

  test('should set displayValue to "0" if it has only 1 character', () => {
    calculator.displayValue = '5';

    calculator.handleBackspace();

    expect(calculator.displayValue).toBe('0');
  });
});

describe('clearAll', () => {
  test('should handle the clear button correctly', () => {
    const display = document.getElementById('output-value') as HTMLParagraphElement;

    display.innerText = '123';

    calculator.clearAll();

    expect(calculator.displayValue).toBe('0');
    expect(calculator.firstOperand).toBe(0);
    expect(calculator.waitingForSecondOperand).toBe(false);
    expect(calculator.operator).toBe('');
    expect(display.innerText).toBe('0');
  });
});
