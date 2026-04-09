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
  const answerSection = document.getElementById("answerSection")

answerSection.style.display = "block"

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

    const exportArea = document.getElementById("exportArea");
    const answerSection = document.getElementById("answerSection");

    // เปิด answer ก่อน export
    answerSection.style.display = "block";

    html2canvas(exportArea, {
      scale: 3
    }).then(canvas => {

      const link = document.createElement("a");
      link.download = "math-worksheet.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

    });

  });

});
//////////////////////
window.exportPDF = function () {

  const printContents = document.getElementById("exportArea").innerHTML;
  const newWindow = window.open("", "", "width=800,height=600");

  newWindow.document.write(`
    <html>
      <head>
        <title>Worksheet</title>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);

  newWindow.document.close();
  newWindow.print();
};
//////////////
window.exportSVG = function () {

  let svgWidth = 800;
  let svgHeight = 1100;

  let y = 80;

  let svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
    <style>
      text { font-family: Nunito, Arial; font-size: 16px; fill: black; }
      .title { font-size: 28px; font-weight: bold; }
    </style>

    <text x="50%" y="40" text-anchor="middle" class="title">Math Worksheet</text>
    <text x="50" y="70">Name: __________   Date: __________</text>
  `;

  // 🔥 2 columns layout
  const col1X = 50;
  const col2X = 400;

  answers.forEach((ans, i) => {

    const col = i < answers.length / 2 ? 1 : 2;

    let x = col === 1 ? col1X : col2X;

    if (col === 2 && i === Math.ceil(answers.length / 2)) {
      y = 80; // reset y for column 2
    }

    const questionText = document.querySelectorAll(".question-box")[i].innerText;

    svgContent += `<text x="${x}" y="${y}">${questionText}</text>`;

    y += 30;

  });

  // 🔥 Answer Key
  y += 20;
  svgContent += `<text x="50" y="${y}" class="title">Answer Key</text>`;

  y += 30;

  answers.forEach((ans, i) => {
    svgContent += `<text x="50" y="${y}">${i + 1}. ${ans}</text>`;
    y += 25;
  });

  svgContent += `</svg>`;

  // 🔥 download
  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "worksheet.svg";
  link.click();

};
