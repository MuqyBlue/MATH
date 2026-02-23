export function generateQuestions(operation, difficulty, count) {

  const range = getRange(difficulty);
  const questions = [];
  const answers = [];

  for (let i = 0; i < count; i++) {

    let a = random(range);
    let b = random(range);

    let text = "";
    let answer = 0;

    if (operation === "add") {
      text = `${a} + ${b} = ____`;
      answer = a + b;
    }

    else if (operation === "subtract") {
      if (a < b) [a, b] = [b, a];
      text = `${a} - ${b} = ____`;
      answer = a - b;
    }

    else if (operation === "multiply") {
      text = `${a} × ${b} = ____`;
      answer = a * b;
    }

    else if (operation === "divide") {
      answer = a;
      const product = a * b;
      text = `${product} ÷ ${b} = ____`;
    }

    questions.push(text);
    answers.push(answer);
  }

  return { questions, answers };
}

function getRange(level) {
  if (level === "easy") return 10;
  if (level === "medium") return 50;
  return 100;
}

function random(max) {
  return Math.floor(Math.random() * max) + 1;
}
