// tests/calculator.dom.test.js
/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

describe('Calculator DOM integration', () => {
  let documentRef;
  let exported;

  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../docs/index.html'), 'utf8');
    documentRef = document;
    documentRef.body.innerHTML = html.match(/<body[\s\S]*<\/body>/i)[0];
    // حمّل السكربت بعد إعداد DOM
    exported = require('../docs/script.js'); // عدّل المسار إذا لزم
  });

  test('display exists', () => {
    const display = document.getElementById('display');
    expect(display).not.toBeNull();
    expect(display.disabled).toBe(true);
  });

  test('append adds characters to display', () => {
    const display = document.getElementById('display');
    exported.clearDisplay();
    exported.append('1');
    exported.append('+');
    exported.append('2');
    expect(display.value).toBe('1+2');
  });

  test('calculate updates display with result', () => {
    const display = document.getElementById('display');
    exported.clearDisplay();
    exported.append('3');
    exported.append('*');
    exported.append('4');
    exported.calculate();
    expect(display.value).toBe('12');
  });

  test('clearDisplay empties the display', () => {
    const display = document.getElementById('display');
    display.value = '123';
    exported.clearDisplay();
    expect(display.value).toBe('');
  });

  test('invalid expression shows Error', () => {
    const display = document.getElementById('display');
    exported.clearDisplay();
    exported.append('1');
    exported.append('+');
    exported.append('+');
    exported.append('2');
    exported.calculate();
    expect(display.value).toBe('Error');
  });
});
