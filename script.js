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
};


// ---------------- SHOW ANSWERS ----------------

window.showAnswers = function () {

  if (answers.length === 0) {
    alert("Generate first!");
    return;
  }

  const answerSection = document.getElementById("answerSection");
  answerSection.innerHTML = "";

  const title = document.createElement("h3");
  title.innerText = "Answer Key";
  answerSection.appendChild(title);

  const container = document.createElement("div");
  container.className = "answer-grid";

  answers.forEach((ans, i) => {
    const div = document.createElement("div");
    div.className = "answer-item";
    div.innerText = `${i + 1}. ${ans}`;
    container.appendChild(div);
  });

  answerSection.appendChild(container);
};
