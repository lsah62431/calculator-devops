function append(value) {
  const display = document.getElementById('display');
  // منع إدخال عمليتين متتاليتين
  const ops = ['+', '-', '*', '/'];
  if (ops.includes(value) && ops.includes(display.value.slice(-1))) return;
  display.value += value;
}
function clearDisplay() {
  document.getElementById('display').value = '';
}
function calculate() {
  const display = document.getElementById('display');
  try {
    // ملاحظة: eval غير آمن لتطبيقات مع مدخلات غير موثوقة
    // سنستبدله لاحقًا بمكتبة آمنة ضمن خطوات DevOps
    const result = eval(display.value);
    display.value = (result !== undefined && !Number.isNaN(result)) ? result : '';
  } catch {
    alert('خطأ في المعادلة');
  }
}
