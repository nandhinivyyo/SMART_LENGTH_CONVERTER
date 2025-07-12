const input = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const resultDiv = document.getElementById("result");
const historyList = document.getElementById("historyList");

const unitToMeters = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.34
};

function convertLength(value, from, to) {
  return (value * unitToMeters[from]) / unitToMeters[to];
}

function updateResult() {
  const value = parseFloat(input.value);
  if (isNaN(value)) {
    resultDiv.innerText = "Result: ";
    return;
  }

  const from = fromUnit.value;
  const to = toUnit.value;
  const result = convertLength(value, from, to);

  const rounded = result.toFixed(4);
  resultDiv.innerText = `Result: ${rounded} ${to}`;

  saveToHistory(`${value} ${from} = ${rounded} ${to}`);
}

function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("lengthHistory")) || [];
  history.unshift(entry);
  if (history.length > 5) history.pop();
  localStorage.setItem("lengthHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem("lengthHistory")) || [];
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    historyList.appendChild(li);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Attach event listeners
input.addEventListener("input", updateResult);
fromUnit.addEventListener("change", updateResult);
toUnit.addEventListener("change", updateResult);

// Initial render
renderHistory();
