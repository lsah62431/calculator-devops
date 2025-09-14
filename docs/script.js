function sanitize(expr) {
  return String(expr).replace(/[^0-9+\-*/().√^ ]/g, '');
}

function evaluateExpression(expr) {
  let safe = sanitize(expr);

  // التربيع: ^2 → **2 (يدعم الأرقام والتعابير بين أقواس)
  safe = safe.replace(/(\([^)]+\)|\d+(\.\d+)?)\^2/g, '($1**2)');

  // الجذر √(x)
  safe = safe.replace(/√\s*\(/g, 'Math.sqrt(');

  // الجذر √x
  safe = safe.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

  if (safe.trim() === '') return '';
  try {
    const result = Function(`"use strict"; return (${safe})`)();
    if (!isFinite(result)) return 'Error';
    return Math.round((result + Number.EPSILON) * 1e12) / 1e12;
  } catch {
    return 'Error';
  }
}

function append(value) {
  const display = document.getElementById('display');
  if (display) display.value += value;
}

function clearDisplay() {
  const display = document.getElementById('display');
  if (display) display.value = '';
}

function calculate() {
  const display = document.getElementById('display');
  if (display) display.value = evaluateExpression(display.value);
}

// تصدير الدوال للاختبارات
if (typeof module !== 'undefined') {
  module.exports = {
    sanitize,
    evaluateExpression,
    append,
    clearDisplay,
    calculate,
  };
}
