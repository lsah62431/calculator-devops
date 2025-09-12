// script.js

function sanitize(expr) {
  return String(expr).replace(/[^0-9+\-*/().√ ]/g, '');
}

function evaluateExpression(expr) {
  let safe = sanitize(expr);

  // استبدال √(x) بـ Math.sqrt(x)
  safe = safe.replace(/√\(/g, 'Math.sqrt(');

  if (safe.trim() === '') return '';
  try {
    const result = Function(`"use strict"; return (${safe})`)();
    if (!isFinite(result)) {
      return 'Error';
    }
    const rounded = Math.round((result + Number.EPSILON) * 1e12) / 1e12;
    return rounded.toString();
  } catch (e) {
    return 'Error';
  }
}

function getDisplay() {
  return document.getElementById('display');
}

function clearDisplay() {
  const display = getDisplay();
  if (display) display.value = '';
}

function append(value) {
  const display = getDisplay();
  if (!display) return;
  display.value += value;
}

function calculate() {
  const display = getDisplay();
  if (!display) return;
  display.value = evaluateExpression(display.value);
}

if (typeof window !== 'undefined') {
  window.clearDisplay = clearDisplay;
  window.append = append;
  window.calculate = calculate;
}

if (typeof module !== 'undefined') {
  module.exports = {
    sanitize,
    evaluateExpression,
    clearDisplay,
    append,
    calculate,
  };
}
