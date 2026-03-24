const textInput = document.getElementById("textInput");

textInput.addEventListener("input", updateStats);

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function updateStats() {
  const text = textInput.value;
  const tokens = estimateTokens(text);
  const words = text.trim().split(/\s+/).filter(w => w).length;

  document.getElementById("tokens").innerText = "Tokens: " + tokens;
  document.getElementById("words").innerText = "Words: " + words;
}

function calculate() {
  const text = textInput.value;
  const inputTokens = estimateTokens(text);
  const outputTokens = parseInt(document.getElementById("outputTokens").value) || 0;
  const model = document.getElementById("model").value;

  const pricing = {
    gpt4: { input: 0.03, output: 0.06 },
    gpt35: { input: 0.001, output: 0.002 }
  };

  const cost =
    inputTokens * pricing[model].input +
    outputTokens * pricing[model].output;

  document.getElementById("cost").innerText =
    "💰 Cost: $" + cost.toFixed(4);
}

function optimize() {
  let text = textInput.value;
  let optimized = text
    .replace(/\s+/g, " ")
    .replace(/very|really|basically|actually/gi, "");

  textInput.value = optimized;
  updateStats();
  alert("✅ Prompt optimized!");
}

function saveHistory() {
  const text = textInput.value;
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(text);
  localStorage.setItem("history", JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

document.getElementById("fileInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      textInput.value = e.target.result;
      updateStats();
    };
    reader.readAsText(file);
  }
});

loadHistory();
