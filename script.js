import {
  generateAddition,
  generateSubtraction,
  generateMultiplication,
  generateDivision
} from "./generators/question-engine.js";

let answers = [];

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

window.showAnswers = function () {

  if (answers.length === 0) {
    alert("Generate first!");
    return;
  }

  const worksheet = document.getElementById("worksheet");

  const answerDiv = document.createElement("div");
  answerDiv.innerHTML = "<h3>Answer Key</h3>";

  answers.forEach((ans, i) => {
    const p = document.createElement("div");
    p.innerText = `${i + 1}. ${ans}`;
    answerDiv.appendChild(p);
  });

  worksheet.appendChild(answerDiv);
};
