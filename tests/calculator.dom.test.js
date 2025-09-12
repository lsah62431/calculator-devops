const { sanitize, evaluateExpression } = require('../docs/script.js');

describe('sanitize', () => {
  test('removes invalid characters', () => {
    expect(sanitize('1+2a$%3')).toBe('1+23');
  });
});

describe('evaluateExpression', () => {
  test('basic operations', () => {
    expect(evaluateExpression('1+2')).toBe('3');
    expect(evaluateExpression('7-5')).toBe('2');
    expect(evaluateExpression('3*4')).toBe('12');
    expect(evaluateExpression('12/3')).toBe('4');
  });

  test('parentheses and precedence', () => {
    expect(evaluateExpression('(2+3)*4')).toBe('20');
    expect(evaluateExpression('2+3*4')).toBe('14');
  });

  test('floating point rounding', () => {
    expect(evaluateExpression('0.1+0.2')).toBe('0.3');
  });

  test('division by zero', () => {
    expect(evaluateExpression('1/0')).toBe('Error');
  });

  test('invalid expression', () => {
    expect(evaluateExpression('1++2')).toBe('Error');
  });

  test('square root', () => {
    expect(evaluateExpression('√(9)')).toBe('3');
    expect(evaluateExpression('√(2)')).toBe(Math.sqrt(2).toString());
  });
});
