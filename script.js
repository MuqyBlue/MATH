
import {
  generateAddition,
  generateSubtraction,
  generateMultiplication,
  generateDivision
} from "./generators/question-engine.js";

let answers = [];

// ---------------- GENERATE ----------------

window.generate = function () {

  const operation = document.getElementById("operation").value;
  const difficulty = document.getElementById("difficulty").value;
  const count = parseInt(document.getElementById("count").value);
  const columns = parseInt(document.getElementById("columns").value);
  const worksheet = document.getElementById("worksheet");

  worksheet.innerHTML = "";
  worksheet.style.columnCount = columns;

  let result;

  if (operation === "add") {
    result = generateAddition(difficulty, count);
  }
  else if (operation === "subtract") {
    result = generateSubtraction(difficulty, count);
  }
  else if (operation === "multiply") {
    result = generateMultiplication(difficulty, count);
  }
  else if (operation === "divide") {
    result = generateDivision(difficulty, count);
  }

  // 🔥 เก็บ answers จาก engine
  answers = result.answers;

  // 🔥 แสดงคำถาม
  result.questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerText = `${i + 1}. ${q}`;
    worksheet.appendChild(div);
  });
  // 🔥 Reset answer section
const answerSection = document.getElementById("answerKey");
const button = document.getElementById("showAnswerBtn");

answerSection.style.display = "none";
answerSection.innerHTML = "";
button.textContent = "Show Answers";

  console.log("RESET RUNNING");
};


// ---------------- SHOW ANSWERS ----------------

window.showAnswers = function () {
    const answerSection = document.getElementById("answerKey");
    const button = document.getElementById("showAnswerBtn");

    if (answerSection.style.display === "none") {

        // 🔥 ใส่คำตอบลงไปก่อนแสดง
        answerSection.innerHTML = "<h2>Answer Key</h2>";

        answers.forEach((ans, i) => {
            const div = document.createElement("div");
            div.innerText = `${i + 1}. ${ans}`;
            answerSection.appendChild(div);
        });

        answerSection.style.display = "block";
        button.textContent = "Hide Answers";

    } else {

        answerSection.style.display = "none";
        button.textContent = "Show Answers";
    }
};

window.changeTheme = function () {
  const theme = document.getElementById("themeSelect").value;
  document.body.className = theme;
};

document.addEventListener("DOMContentLoaded", () => {

  const exportBtn = document.getElementById("exportBtn");

  if (!exportBtn) {
    alert("Export button not found");
    return;
  }

  exportBtn.addEventListener("click", () => {

  window.html2canvas(document.body, {
    scale: 2
  }).then(canvas => {

    const link = document.createElement("a");
    link.download = "worksheet.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

  });

});

});
