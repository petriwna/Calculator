import { Calculation } from '../Calculation';

let calculation: Calculation;
let result;

beforeEach(() => {
  calculation = new Calculation();
});

describe('add', () => {
  test('should correctly add two numbers', () => {
    result = calculation.add(2, 3);
    expect(result).toBe(5);
  });
});

describe('divide', () => {
  test('should correctly divide two numbers', () => {
    result = calculation.divide(10, 2);

    expect(result).toBe(5);
  });
});

describe('interest', () => {
  test('should correctly calculate the interest', () => {
    result = calculation.interest(100);

    expect(result).toBe(1);
  });
});

describe('multiply', () => {
  test('should correctly multiply two numbers', () => {
    result = calculation.multiply(2, 3);

    expect(result).toBe(6);
  });
});

describe('subtract', () => {
  test('should correctly subtract two numbers', () => {
    result = calculation.subtract(5, 2);

    expect(result).toBe(3);
  });
});
