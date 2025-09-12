// دالة تنظيف الإدخال
function sanitize(expr) {
  return String(expr).replace(/[^0-9+\-*/().√^ ]/g, '');
}

// دالة تقييم التعبير
function evaluateExpression(expr) {
  let safe = sanitize(expr);

  // التربيع: ^2 → **2
  safe = safe.replace(/(\d+)\^2/g, '($1**2)');

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

// دالة إضافة قيمة للشاشة
function append(value) {
  document.getElementById('display').value += value;
}

// دالة مسح الشاشة
function clearDisplay() {
  document.getElementById('display').value = '';
}

// دالة حساب النتيجة
function calculate() {
  const expr = document.getElementById('display').value;
  document.getElementById('display').value = evaluateExpression(expr);
}
