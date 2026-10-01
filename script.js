const drone = document.getElementById("virtualDrone");
const altitudeLabel = document.getElementById("altitude");
const positionLabel = document.getElementById("position");
const flightState = document.getElementById("flightState");
const message = document.getElementById("message");

let state = {
  x: 50,
  y: 55,
  altitude: 0,
  heading: 0,
  flying: false
};

function updateDisplay() {
  drone.style.left = state.x + "%";
  drone.style.top = state.y + "%";
  drone.style.rotate = state.heading + "deg";

  altitudeLabel.textContent = state.altitude + " m";
  flightState.textContent = state.flying
    ? "EM VOO VIRTUAL"
    : "NO SOLO";

  if (state.x < 44) {
    positionLabel.textContent = "ESQUERDA";
  } else if (state.x > 56) {
    positionLabel.textContent = "DIREITA";
  } else if (state.y < 49) {
    positionLabel.textContent = "FRENTE";
  } else if (state.y > 61) {
    positionLabel.textContent = "FUNDO";
  } else {
    positionLabel.textContent = "CENTRO";
  }
}

function command(action) {
  if (!state.flying) {
    message.textContent =
      "Clique em DECOLAR antes de usar os controles.";
    return;
  }

  switch (action) {
    case "up":
      state.altitude = Math.min(30, state.altitude + 2);
      message.textContent = "Subida virtual realizada.";
      break;

    case "down":
      state.altitude = Math.max(1, state.altitude - 2);
      message.textContent = "Descida virtual realizada.";
      break;

    case "forward":
      state.y = Math.max(18, state.y - 4);
      message.textContent = "Avanço virtual realizado.";
      break;

    case "back":
      state.y = Math.min(82, state.y + 4);
      message.textContent = "Recuo virtual realizado.";
      break;

    case "left":
      state.x = Math.max(12, state.x - 4);
      message.textContent = "Movimento à esquerda realizado.";
      break;

    case "right":
      state.x = Math.min(88, state.x + 4);
      message.textContent = "Movimento à direita realizado.";
      break;

    case "rotateLeft":
      state.heading -= 15;
      message.textContent = "Giro virtual à esquerda.";
      break;

    case "rotateRight":
      state.heading += 15;
      message.textContent = "Giro virtual à direita.";
      break;
  }

  updateDisplay();
}

document.querySelectorAll("[data-command]").forEach(button => {
  button.addEventListener("click", () => {
    command(button.dataset.command);
  });
});

document.getElementById("takeoff").addEventListener("click", () => {
  if (state.flying) {
    message.textContent = "O drone virtual já está no ar.";
    return;
  }

  state.flying = true;
  state.altitude = 2;
  message.textContent =
    "Decolagem virtual concluída. Pratique um comando por vez.";

  updateDisplay();
});

document.getElementById("land").addEventListener("click", () => {
  state.flying = false;
  state.altitude = 0;
  state.x = 50;
  state.y = 55;
  state.heading = 0;

  message.textContent =
    "Pouso virtual concluído. O drone voltou ao ponto inicial.";

  updateDisplay();
});

document.getElementById("reset").addEventListener("click", () => {
  state = {
    x: 50,
    y: 55,
    altitude: 0,
    heading: 0,
    flying: false
  };

  message.textContent =
    "Simulação reiniciada. Clique em DECOLAR para começar.";

  updateDisplay();
});


// CHECKLIST DE SEGURANÇA

const checks = [
  ...document.querySelectorAll('.checklist input[type="checkbox"]')
];

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateChecklist() {
  const completed = checks.filter(item => item.checked).length;

  progressBar.style.width =
    (completed / checks.length * 100) + "%";

  progressText.textContent =
    `${completed} de ${checks.length} itens concluídos`;
}

checks.forEach(item => {
  item.addEventListener("change", updateChecklist);
});


// TESTE DE CONHECIMENTO

const questions = [
  {
    question: "O que fazer antes de decolar?",
    answers: [
      "Acelerar imediatamente",
      "Verificar o equipamento e o local",
      "Voar perto de pessoas"
    ],
    correct: 1,
    explanation:
      "Correto! Verifique o drone, o ambiente e as regras aplicáveis."
  },
  {
    question: "Para que serve o comando de altitude?",
    answers: [
      "Para subir ou descer",
      "Para tirar fotografias",
      "Para desligar o controle"
    ],
    correct: 0,
    explanation:
      "Correto! O comando controla a subida e a descida."
  },
  {
    question: "Qual prática ajuda a manter o voo seguro?",
    answers: [
      "Ignorar o vento",
      "Voar sem observar o entorno",
      "Manter o drone à vista e longe de pessoas"
    ],
    correct: 2,
    explanation:
      "Correto! Mantenha contato visual e evite riscos no entorno."
  }
];

let questionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextQuestion");
const questionNumber = document.getElementById("questionNumber");

function showQuestion() {
  const item = questions[questionIndex];

  answered = false;
  questionElement.textContent = item.question;
  questionNumber.textContent =
    `QUESTÃO 0${questionIndex + 1} / 03`;

  feedback.textContent = "Selecione uma resposta.";
  nextButton.disabled = true;
  nextButton.textContent =
    questionIndex === questions.length - 1
      ? "VER RESULTADO →"
      : "PRÓXIMA →";

  answersElement.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent =
      String.fromCharCode(65 + index) + ". " + answer;

    button.addEventListener("click", () => selectAnswer(index));

    answersElement.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;

  answered = true;

  const item = questions[questionIndex];
  const buttons = [...answersElement.querySelectorAll("button")];

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === item.correct) {
      button.classList.add("correct");
    }

    if (i === index && index !== item.correct) {
      button.classList.add("wrong");
    }
  });

  if (index === item.correct) {
    score++;
  }

  feedback.textContent = item.explanation;
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;

  if (questionIndex < questions.length - 1) {
    questionIndex++;
    showQuestion();
    return;
  }

  questionNumber.textContent = "RESULTADO FINAL";
  questionElement.textContent =
    `Você acertou ${score} de ${questions.length} questões.`;

  answersElement.innerHTML = "";

  feedback.textContent = score === questions.length
    ? "Excelente! Você acertou todas as questões."
    : "Revise os fundamentos e tente novamente.";

  nextButton.textContent = "REFAZER TESTE";
  nextButton.disabled = false;

  nextButton.onclick = () => {
    score = 0;
    questionIndex = 0;
    nextButton.onclick = null;
    showQuestion();
  };
});

updateDisplay();
updateChecklist();
showQuestion();