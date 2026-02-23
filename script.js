let answers = [];

function getRange(level) {
  if (level === "easy") return 10;
  if (level === "medium") return 50;
  return 100;
}

function generate() {

  const operation = document.getElementById("operation").value;
  const difficulty = document.getElementById("difficulty").value;
  const count = parseInt(document.getElementById("count").value);
  const columns = parseInt(document.getElementById("columns").value);
  const worksheet = document.getElementById("worksheet");

  worksheet.innerHTML = "";
  worksheet.style.columnCount = columns;

  answers = [];

  const max = getRange(difficulty);

  for (let i = 0; i < count; i++) {

    let a = Math.floor(Math.random() * max) + 1;
    let b = Math.floor(Math.random() * max) + 1;

    let questionText = "";
    let correctAnswer;

    if (operation === "add") {
      questionText = `${a} + ${b} = ____`;
      correctAnswer = a + b;
    }

    if (operation === "subtract") {
      if (a < b) [a, b] = [b, a];
      questionText = `${a} - ${b} = ____`;
      correctAnswer = a - b;
    }

    if (operation === "multiply") {
      questionText = `${a} × ${b} = ____`;
      correctAnswer = a * b;
    }

    if (operation === "divide") {
      correctAnswer = a;
      let product = a * b;
      questionText = `${product} ÷ ${b} = ____`;
    }

    answers.push(correctAnswer);

    const div = document.createElement("div");
    div.className = "question";
    div.innerText = `${i + 1}. ${questionText}`;
    worksheet.appendChild(div);
  }
}

function showAnswers() {

  if (answers.length === 0) {
    alert("Please generate worksheet first!");
    return;
  }

  const worksheet = document.getElementById("worksheet");

  const oldAnswers = document.getElementById("answerSection");
  if (oldAnswers) oldAnswers.remove();

  const answerDiv = document.createElement("div");
  answerDiv.id = "answerSection";
  answerDiv.innerHTML = "<h3>Answers</h3>";

  answers.forEach((ans, i) => {
    const p = document.createElement("div");
    p.innerText = `${i + 1}. ${ans}`;
    answerDiv.appendChild(p);
  });

  worksheet.appendChild(answerDiv);
}
