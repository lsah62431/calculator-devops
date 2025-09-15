/**
 * @jest-environment jsdom
 */

const {
  sanitize,
  evaluateExpression,
  append,
  clearDisplay,
  calculate,
  backspace,
} = require('../docs/script');

describe('sanitize()', () => {
  test('يحذف الرموز غير المسموح بها', () => {
    expect(sanitize('2+3$%')).toBe('2+3');
    expect(sanitize('√(9)#')).toBe('√(9)');
  });
});

describe('evaluateExpression()', () => {
  test('يجمع الأرقام بشكل صحيح', () => {
    expect(evaluateExpression('2+3')).toBe(5);
  });

  test('يطرح الأرقام بشكل صحيح', () => {
    expect(evaluateExpression('10-4')).toBe(6);
  });

  test('يضرب الأرقام بشكل صحيح', () => {
    expect(evaluateExpression('3*4')).toBe(12);
  });

  test('يقسم الأرقام بشكل صحيح', () => {
    expect(evaluateExpression('12/3')).toBe(4);
  });

  test('يحسب الجذر √x بشكل صحيح', () => {
    expect(evaluateExpression('√9')).toBe(3);
  });

  test('يحسب الجذر √(x) بشكل صحيح', () => {
    expect(evaluateExpression('√(16)')).toBe(4);
  });

  test('يحسب التربيع x^2 بشكل صحيح', () => {
    expect(evaluateExpression('5^2')).toBe(25);
  });

  test('يحسب التربيع (x)^2 بشكل صحيح', () => {
    expect(evaluateExpression('(2+3)^2')).toBe(25);
  });

  test('يرجع "Error" عند تعبير غير صالح', () => {
    expect(evaluateExpression('2++3')).toBe('Error');
    expect(evaluateExpression('√')).toBe('Error');
  });
});

describe('DOM functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `<input type="text" id="display" value="">`;
  });

  test('backspace() يحذف آخر رمز من الشاشة', () => {
    document.getElementById('display').value = '5678';
    backspace();
    expect(document.getElementById('display').value).toBe('567');
  });

  test('backspace() لا يسبب خطأ عند كون الشاشة فارغة', () => {
    document.getElementById('display').value = '';
    backspace();
    expect(document.getElementById('display').value).toBe('');
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
