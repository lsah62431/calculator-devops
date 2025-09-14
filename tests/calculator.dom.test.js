const { evaluateExpression, sanitize } = require('../docs/script');

describe('sanitize()', () => {
  test('يحذف الرموز غير المسموح بها', () => {
    expect(sanitize('2+3$%')).toBe('2+3');
    expect(sanitize('√(9)#')).toBe('√(9)');
  });
});

describe('evaluateExpression()', () => {
  test('يجمع الأرقام بشكل صحيح', () => {
    expect(evaluateExpression('2+3')).toBe('5');
  });

  test('يطرح الأرقام بشكل صحيح', () => {
    expect(evaluateExpression('10-4')).toBe('6');
  });

  test('يضرب الأرقام بشكل صحيح', () => {
    expect(evaluateExpression('3*4')).toBe('12');
  });

  test('يقسم الأرقام بشكل صحيح', () => {
    expect(evaluateExpression('12/3')).toBe('4');
  });

  test('يحسب الجذر √x بشكل صحيح', () => {
    expect(evaluateExpression('√9')).toBe('3');
  });

  test('يحسب الجذر √(x) بشكل صحيح', () => {
    expect(evaluateExpression('√(16)')).toBe('4');
  });

  test('يحسب التربيع x^2 بشكل صحيح', () => {
    expect(evaluateExpression('5^2')).toBe('25');
  });

  test('يحسب التربيع (x)^2 بشكل صحيح', () => {
    expect(evaluateExpression('(2+3)^2')).toBe('25');
  });

  test('يرجع "Error" عند تعبير غير صالح', () => {
    expect(evaluateExpression('2++3')).toBe('Error');
    expect(evaluateExpression('√')).toBe('Error');
  });
});
