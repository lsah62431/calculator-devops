// script.js

// دالة مساعدة: تنظيف التعبير لمنع أي رموز غير متوقعة
function sanitize(expr) {
  return String(expr).replace(/[^0-9+\-*/(). ]/g, '');
}

// منطق الحساب كدالة نقية يمكن اختبارها
function evaluateExpression(expr) {
  const safe = sanitize(expr);
  if (safe.trim() === '') return '';
  try {
    // ملاحظة: نستخدم Function بدل eval مع تنقية الإدخال
    // هذا يكفي لآلة حاسبة بسيطة (بدون دوال متقدمة)
    // معالجة القسمة على صفر تُعيد Infinity من JS — سنحوّلها إلى رسالة ودية
    const result = Function(`"use strict"; return (${safe})`)();
    if (!isFinite(result)) {
      return 'Error';
    }
    // تقليل مشاكل الكسور العشرية
    const rounded = Math.round((result + Number.EPSILON) * 1e12) / 1e12;
    return rounded.toString();
  } catch (e) {
    return 'Error';
  }
}

// الدوال المرتبطة بالواجهة
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

// تعريض الدوال للاختبارات وللاستخدام في المتصفح
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
