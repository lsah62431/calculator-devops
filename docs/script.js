function sanitize(expr) {
  return String(expr).replace(/[^0-9+\-*/().√^ ]/g, '');
}

function evaluateExpression(expr) {
  let safe = sanitize(expr);

  // استبدال التربيع: ^2 → **2
  // يدعم الأرقام أو التعبيرات بين أقواس
  safe = safe.replace(/(\([^)]+\)|\d+(\.\d+)?)\^2/g, '($1**2)');

  // الجذر √(x)
  safe = safe.replace(/√\s*\((\d+(\.\d+)?)\)/g, 'Math.sqrt($1)');

  // الجذر √x
  safe = safe.replace(/√\s*(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

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
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculate() {
  const expr = document.getElementById('display').value;
  document.getElementById('display').value = evaluateExpression(expr);
}
