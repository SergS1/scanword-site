// script.js
// ЛОГИКА САЙТА «СКАНВОРДЫ ОНЛАЙН»
// -------------------------
// 1. ДАННЫЕ СКАНВОРДА
// -------------------------
const puzzle = [
    "##########",
    "#######МЕД",
    "####СУПО##",
    "####А#ХЛЕБ",
    "####Х#СОЛЬ",
    "#Ч##А##К##",
    "#А##Р#БОРЩ",
    "#Й########",
    "##########",
    "##########"
];
// В этой сетке зашиты слова:
// по горизонтали: МЕД, СУП, ХЛЕБ, СОЛЬ, БОРЩ
// по вертикали:   САХАР, МОЛОКО, ЧАЙ
// -------------------------
// 2. ВОПРОСЫ К СКАНВОРДУ
// -------------------------
const clues = [
    {
        number: 1,
        question: "Сладкий продукт пчеловодства, который кладут в чай (по горизонтали)",
        answer: "МЕД",
        direction: "горизонтально"
    },
    {
        number: 2,
        question: "Горячее первое блюдо в тарелке (по горизонтали)",
        answer: "СУП",
        direction: "горизонтально"
    },
    {
        number: 3,
        question: "Основной продукт, который пекут из муки и дрожжей (по горизонтали)",
        answer: "ХЛЕБ",
        direction: "горизонтально"
    },
    {
        number: 4,
        question: "Белая приправа, без неё пресно, но с ней пересолено (по горизонтали)",
        answer: "СОЛЬ",
        direction: "горизонтально"
    },
    {
        number: 5,
        question: "Густой суп со свёклой и капустой (по горизонтали)",
        answer: "БОРЩ",
        direction: "горизонтально"
    },
    {
        number: 6,
        question: "Прозрачные сладкие кристаллики для чая (по вертикали)",
        answer: "САХАР",
        direction: "вертикально"
    },
    {
        number: 7,
        question: "Белый напиток из коровы (по вертикали)",
        answer: "МОЛОКО",
        direction: "вертикально"
    },
    {
        number: 8,
        question: "Горячий напиток из заваренных листьев (по вертикали)",
        answer: "ЧАЙ",
        direction: "вертикально"
    }
];
// -------------------------
// 3. ПОЛУЧАЕМ ЭЛЕМЕНТЫ СТРАНИЦЫ
// -------------------------
const gridElement = document.getElementById("puzzle-grid");
const btnCheck = document.getElementById("btn-check");
const btnShowAnswer = document.getElementById("btn-show-answer");
const resultMessage = document.getElementById("result-message");
const cluesList = document.getElementById("clues-list");
// -------------------------
// 4. СОЗДАНИЕ СЕТКИ СКАНВОРДА
// -------------------------
function createPuzzleGrid() {
    gridElement.innerHTML = "";
    if (!puzzle || puzzle.length === 0) {
        resultMessage.textContent = "Сканворд не найден.";
        return;
    }
    const rows = puzzle.length;
    const cols = puzzle[0].length;
    gridElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    for (let row = 0; row < rows; row++) {
        const line = puzzle[row];
        for (let col = 0; col < cols; col++) {
            const char = line[col];
            const cell = document.createElement("div");
            cell.classList.add("puzzle-cell");
            cell.dataset.row = String(row);
            cell.dataset.col = String(col);
            if (char === "#") {
                cell.classList.add("blocked");
            } else {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.dataset.answer = char;
                input.addEventListener("input", (event) => {
                    const target = event.target;
                    target.value = target.value.toUpperCase();
                    cell.classList.remove("wrong", "correct");
                    resultMessage.textContent = "";
                    // после ввода буквы переходим к следующей
                    if (target.value.length === 1) {
                        focusNextInput(target);
                    }
                });
                cell.appendChild(input);
            }
            gridElement.appendChild(cell);
        }
    }
    addClueNumbers();
}
// -------------------------
// 5. ПЕРЕХОД К СЛЕДУЮЩЕЙ КЛЕТКЕ
// -------------------------
function focusNextInput(currentInput) {
    const inputs = Array.from(gridElement.querySelectorAll("input"));
    const index = inputs.indexOf(currentInput);
    if (index >= 0 && index < inputs.length - 1) {
        inputs[index + 1].focus();
    }
}
// -------------------------
// 6. НУМЕРАЦИЯ НАЧАЛ СЛОВ
// -------------------------
function addClueNumbers() {
    if (!clues || clues.length === 0) return;
    const rows = puzzle.length;
    const cols = puzzle[0].length;
    clues.forEach((clue) => {
        const answer = clue.answer;
        if (!answer || !answer.length) return;
        const isHorizontal = clue.direction &&
            clue.direction.toLowerCase().startsWith("гор");
        let start = null;
        if (isHorizontal) {
            outer: for (let r = 0; r < rows; r++) {
                for (let c = 0; c <= cols - answer.length; c++) {
                    let ok = true;
                    for (let i = 0; i < answer.length; i++) {
                        if (puzzle[r][c + i] !== answer[i]) {
                            ok = false;
                            break;
                        }
                    }
                    if (ok) {
                        start = { row: r, col: c };
                        break outer;
                    }
                }
            }
        } else {
            outer: for (let c = 0; c < cols; c++) {
                for (let r = 0; r <= rows - answer.length; r++) {
                    let ok = true;
                    for (let i = 0; i < answer.length; i++) {
                        if (puzzle[r + i][c] !== answer[i]) {
                            ok = false;
                            break;
                        }
                    }
                    if (ok) {
                        start = { row: r, col: c };
                        break outer;
                    }
                }
            }
        }
        if (!start) return;
        const selector = `.puzzle-cell[data-row="${start.row}"][data-col="${start.col}"]`;
        const cell = gridElement.querySelector(selector);
        if (!cell || cell.classList.contains("blocked")) return;
        if (cell.querySelector(".clue-number")) return;
        const numberLabel = document.createElement("span");
        numberLabel.classList.add("clue-number");
        numberLabel.textContent = clue.number;
        cell.appendChild(numberLabel);
    });
}
// -------------------------
// 7. ВЫВОД ВОПРОСОВ НА СТРАНИЦУ
// -------------------------
function renderClues() {
    if (!cluesList || !clues || clues.length === 0) {
        return;
    }
    cluesList.innerHTML = "";
    clues.forEach((clue) => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.question}`;
        cluesList.appendChild(li);
    });
}
// -------------------------
// 8. ПРОВЕРКА ОТВЕТОВ
// -------------------------
function checkPuzzle() {
    const inputs = gridElement.querySelectorAll("input");
    let allCorrect = true;
    let hasAnyLetter = false;
    inputs.forEach((input) => {
        const cell = input.parentElement;
        const correctLetter = input.dataset.answer;
        const userLetter = (input.value || "").toUpperCase();
        cell.classList.remove("wrong", "correct");
        if (!userLetter) {
            allCorrect = false;
        } else if (userLetter === correctLetter) {
            cell.classList.add("correct");
            hasAnyLetter = true;
        } else {
            cell.classList.add("wrong");
            allCorrect = false;
            hasAnyLetter = true;
        }
    });
    if (!hasAnyLetter) {
        resultMessage.textContent = "Заполните хотя бы одну букву.";
    } else if (allCorrect) {
        resultMessage.textContent = "Отлично! Все правильно.";
    } else {
        resultMessage.textContent = "Есть ошибки или пустые клетки.";
    }
}
// -------------------------
// 9. ПОКАЗ ОТВЕТА
// -------------------------
function showAnswer() {
    const inputs = gridElement.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = input.dataset.answer;
        const cell = input.parentElement;
        cell.classList.remove("wrong");
        cell.classList.add("correct");
    });
    resultMessage.textContent = "Ответ показан.";
}
// -------------------------
// 10. СТАРТ
// -------------------------
createPuzzleGrid();
renderClues();
if (btnCheck) {
    btnCheck.addEventListener("click", checkPuzzle);
}
if (btnShowAnswer) {
    btnShowAnswer.addEventListener("click", showAnswer);
}
