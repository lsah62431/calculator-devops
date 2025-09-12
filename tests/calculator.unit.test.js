// tests/calculator.unit.test.js
const { sanitize, evaluateExpression } = require('../docs/script.js'); // عدّل المسار إذا لزم

describe('sanitize', () => {
  test('removes any non-allowed characters', () => {
    expect(sanitize('1+2a$%3')).toBe('1+23');
    expect(sanitize(' (2 + 3) *4 ')).toBe(' (2 + 3) *4 ');
  });

  test('returns empty string for non-string inputs', () => {
    expect(sanitize(null)).toBe('');
    expect(sanitize(undefined)).toBe('');
  });
});

describe('evaluateExpression', () => {
  test('evaluates simple addition', () => {
    expect(evaluateExpression('1+2')).toBe('3');
  });

  test('supports subtraction, multiplication, division', () => {
    expect(evaluateExpression('7-5')).toBe('2');
    expect(evaluateExpression('3*4')).toBe('12');
    expect(evaluateExpression('12/3')).toBe('4');
  });

  test('respects parentheses and precedence', () => {
    expect(evaluateExpression('(2+3)*4')).toBe('20');
    expect(evaluateExpression('2+3*4')).toBe('14');
  });

  test('handles floating point precision with rounding', () => {
    expect(evaluateExpression('0.1+0.2')).toBe('0.3');
  });

  test('division by zero yields Error', () => {
    expect(evaluateExpression('1/0')).toBe('Error');
  });

  test('invalid expression yields Error', () => {
    expect(evaluateExpression('1++2')).toBe('Error');
    expect(evaluateExpression('abc')).toBe('Error');
  });

  test('empty or whitespace returns empty string', () => {
    expect(evaluateExpression('')).toBe('');
    expect(evaluateExpression('   ')).toBe('');
  });
});
