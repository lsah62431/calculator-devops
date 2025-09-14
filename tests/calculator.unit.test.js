/**
 * @jest-environment jsdom
 */

const {
  sanitize,
  evaluateExpression,
  append,
  clearDisplay,
  calculate,
} = require('../docs/script');

describe('sanitize()', () => {
  test('يحذف الرموز غير المسموح بها', () => {
    expect(sanitize('2+3$%')).toBe('2+3');
  });
});

describe('evaluateExpression()', () => {
  test('يحسب العمليات الأساسية', () => {
    expect(evaluateExpression('2+3')).toBe(5);
    expect(evaluateExpression('10-4')).toBe(6);
    expect(evaluateExpression('3*4')).toBe(12);
    expect(evaluateExpression('12/3')).toBe(4);
    expect(evaluateExpression('√9')).toBe(3);
    expect(evaluateExpression('5^2')).toBe(25);
  });

  test('يرجع "Error" عند تعبير غير صالح', () => {
    expect(evaluateExpression('2++3')).toBe('Error');
    expect(evaluateExpression('√')).toBe('Error');
    expect(evaluateExpression('')).toBe('');
  });
});

describe('DOM functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `<input type="text" id="display" value="">`;
  });

  test('append() يضيف قيمة إلى الشاشة', () => {
    append('5');
    expect(document.getElementById('display').value).toBe('5');
  });

  test('clearDisplay() يمسح الشاشة', () => {
    document.getElementById('display').value = '123';
    clearDisplay();
    expect(document.getElementById('display').value).toBe('');
  });

  test('calculate() يحسب التعبير ويعرض النتيجة', () => {
    document.getElementById('display').value = '2+3';
    calculate();
    expect(document.getElementById('display').value).toBe('5');
  });
});
