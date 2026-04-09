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

  // ✅ เรียง param ให้ถูก (count, difficulty)
  if (operation === "add") {
    result = generateAddition(count, difficulty);
  } else if (operation === "subtract") {
    result = generateSubtraction(count, difficulty);
  } else if (operation === "multiply") {
    result = generateMultiplication(count, difficulty);
  } else if (operation === "divide") {
    result = generateDivision(count, difficulty);
  }

  // 🔥 เก็บ answers
  answers = result.answers;

  // 🔥 แสดงโจทย์
  result.questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question-box"; // ✅ ใช้ style ใหม่
    div.innerText = `${i + 1}. ${q}`;
    worksheet.appendChild(div);
  });

  // 🔥 reset answer section
  const answerSection = document.getElementById("answerSection");
  answerSection.style.display = "none";
  answerSection.innerHTML = "";

};

// ---------------- SHOW ANSWERS ----------------

window.showAnswers = function () {
  const answerSection = document.getElementById("answerSection");

  if (answerSection.style.display === "none") {

    answerSection.innerHTML = "<h2>Answer Key</h2>";

    const grid = document.createElement("div");
    grid.className = "answer-grid";

    answers.forEach((ans, i) => {
      const div = document.createElement("div");
      div.className = "answer-item";
      div.innerText = `${i + 1}. ${ans}`;
      grid.appendChild(div);
    });

    answerSection.appendChild(grid);
    answerSection.style.display = "block";

  } else {
    answerSection.style.display = "none";
  }
};

// ---------------- EXPORT PNG ----------------

document.addEventListener("DOMContentLoaded", () => {

  const exportBtn = document.getElementById("exportBtn");

  exportBtn.addEventListener("click", () => {

    html2canvas(document.querySelector(".container")).then(canvas => {

      const link = document.createElement("a");
      link.download = "worksheet.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

    });

  });

});
