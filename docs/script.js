// script.js

// دالة تنظيف التعبير من أي رموز غير مسموح بها
function sanitize(expr) {
  // أضفنا رمز الجذر √ إلى قائمة الرموز المسموح بها
  return String(expr).replace(/[^0-9+\-*/().√ ]/g, '');
}

// دالة تقييم التعبير
function evaluateExpression(expr) {

  
  let safe = sanitize(expr);
  // استبدال ^2 بـ **2 (مشغل الأس في JavaScript)
  safe = safe.replace(/(\d+)\^2/g, '($1**2)');


  safe = safe.replace(/(\d+)\^2/g, '($1**2)');
  // استبدال √(x) بـ Math.sqrt(x)
  safe = safe.replace(/√\s*\(/g, 'Math.sqrt(');

  // استبدال √x (بدون أقواس) بـ Math.sqrt(x)
  safe = safe.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

  if (safe.trim() === '') return '';
  try {
    const result = Function(`"use strict"; return (${safe})`)();
    if (!isFinite(result)) {
      return 'Error';
    }
    // تقريب النتيجة لتفادي مشاكل الكسور العشرية
    const rounded = Math.round((result + Number.EPSILON) * 1e12) / 1e12;
    return rounded.toString();
  } catch (e) {
    return 'Error';
  }
}

// دوال التحكم في واجهة الآلة الحاسبة
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

// ربط الدوال بالنافذة لاستخدامها في HTML
if (typeof window !== 'undefined') {
  window.clearDisplay = clearDisplay;
  window.append = append;
  window.calculate = calculate;
}

// تصدير الدوال للاختبارات
if (typeof module !== 'undefined') {
  module.exports = {
    sanitize,
    evaluateExpression,
    clearDisplay,
    append,
    calculate,
  };
}
