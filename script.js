// script.js
// Классический кроссворд на 30 слов (еда и напитки)

// -------------------------
// 1. КОНФИГУРАЦИЯ СЛОВ
// -------------------------
const clues = [
    // Горизонтальные (1–15)
    { number: 1, answer: "ХЛЕБ", direction: "горизонтально", row: 0, col: 0, question: "Основной хлебобулочный продукт из муки и дрожжей (по горизонтали)" },
    { number: 2, answer: "МОЛОКО", direction: "горизонтально", row: 1, col: 0, question: "Белый напиток, который часто пьют по утрам (по горизонтали)" },
    { number: 3, answer: "СЫР", direction: "горизонтально", row: 2, col: 0, question: "Твёрдый молочный продукт, который кладут на бутерброд (по горизонтали)" },
    { number: 4, answer: "ЯБЛОКО", direction: "горизонтально", row: 3, col: 0, question: "Красный или зелёный фрукт, любимый врачами (по горизонтали)" },
    { number: 5, answer: "ГРУША", direction: "горизонтально", row: 4, col: 0, question: "Фрукт грушевидной формы, сладкий и сочный (по горизонтали)" },
    { number: 6, answer: "БАНАН", direction: "горизонтально", row: 5, col: 0, question: "Жёлтый длинный фрукт из тёплых стран (по горизонтали)" },
    { number: 7, answer: "АПЕЛЬСИН", direction: "горизонтально", row: 6, col: 0, question: "Круглый цитрусовый фрукт оранжевого цвета (по горизонтали)" },
    { number: 8, answer: "КЛУБНИКА", direction: "горизонтально", row: 7, col: 0, question: "Красная садовая ягода с семечками на поверхности (по горизонтали)" },
    { number: 9, answer: "ОГУРЕЦ", direction: "горизонтально", row: 8, col: 0, question: "Зелёный овощ, который часто солят в банках (по горизонтали)" },
    { number: 10, answer: "ПОМИДОР", direction: "горизонтально", row: 9, col: 0, question: "Красный овощ, из которого делают сок и кетчуп (по горизонтали)" },
    { number: 11, answer: "КАРТОФЕЛЬ", direction: "горизонтально", row: 10, col: 0, question: "Корнеплод, из которого делают пюре и фри (по горизонтали)" },
    { number: 12, answer: "МОРКОВЬ", direction: "горизонтально", row: 11, col: 0, question: "Оранжевый корнеплод, любят кролики (по горизонтали)" },
    { number: 13, answer: "КАПУСТА", direction: "горизонтально", row: 12, col: 0, question: "Листовой овощ, из которого делают щи (по горизонтали)" },
    { number: 14, answer: "ЛУК", direction: "горизонтально", row: 13, col: 0, question: "Овощ, от которого слезятся глаза (по горизонтали)" },
    { number: 15, answer: "ЧЕСНОК", direction: "горизонтально", row: 14, col: 0, question: "Ароматный овощ, защищает от простуды и вампиров (по горизонтали)" },

    // Вертикальные (16–30)
    { number: 16, answer: "САХАР", direction: "вертикально", row: 0, col: 11, question: "Сладкие белые кристаллики для чая и кофе (по вертикали)" },
    { number: 17, answer: "СОЛЬ", direction: "вертикально", row: 0, col: 12, question: "Белая приправа, без неё пресно, но с ней пересолено (по вертикали)" },
    { number: 18, answer: "ПЕРЕЦ", direction: "вертикально", row: 0, col: 13, question: "Острая или сладкая приправа, бывает чёрный и красный (по вертикали)" },
    { number: 19, answer: "МАСЛО", direction: "вертикально", row: 0, col: 14, question: "Жирный продукт, который намазывают на хлеб (по вертикали)" },
    { number: 20, answer: "КАША", direction: "вертикально", row: 0, col: 15, question: "Горячее блюдо из крупы, полезный завтрак (по вертикали)" },
    { number: 21, answer: "СУП", direction: "вертикально", row: 0, col: 16, question: "Горячее первое блюдо в тарелке (по вертикали)" },
    { number: 22, answer: "БОРЩ", direction: "вертикально", row: 0, col: 17, question: "Густой суп со свёклой и капустой (по вертикали)" },
    { number: 23, answer: "ПЕЛЬМЕНИ", direction: "вертикально", row: 0, col: 18, question: "Маленькие варёные изделия из теста с мясной начинкой (по вертикали)" },
    { number: 24, answer: "ВАРЕНИКИ", direction: "вертикально", row: 0, col: 19, question: "Мучное блюдо, похоже на пельмени, но с творогом или ягодами (по вертикали)" },
    { number: 25, answer: "КОМПОТ", direction: "вертикально", row: 8, col: 11, question: "Сладкий напиток из сваренных фруктов или ягод (по вертикали)" },
    { number: 26, answer: "ЧАЙ", direction: "вертикально", row: 8, col: 12, question: "Горячий напиток из заваренных листьев (по вертикали)" },
    { number: 27, answer: "КОФЕ", direction: "вертикально", row: 8, col: 13, question: "Бодрящий тёмный напиток, его пьют утром (по вертикали)" },
    { number: 28, answer: "СОК", direction: "вертикально", row: 8, col: 14, question: "Напиток, который получают из фруктов или овощей (по вертикали)" },
    { number: 29, answer: "ЙОГУРТ", direction: "вертикально", row: 8, col: 15, question: "Густой кисломолочный напиток с ягодами или фруктами (по вертикали)" },
    { number: 30, answer: "МОРОЖЕНОЕ", direction: "вертикально", row: 8, col: 16, question: "Холодный десерт в рожке или стаканчике (по вертикали)" }
];

const GRID_ROWS = 20;
const GRID_COLS = 20;

const puzzle = (function buildPuzzle() {
    const grid = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill("#"));

    clues.forEach((clue) => {
        const word = clue.answer.toUpperCase();
        clue.answer = word;

        const isHorizontal = clue.direction.toLowerCase().startsWith("гор");
        const r0 = clue.row;
        const c0 = clue.col;

        for (let i = 0; i < word.length; i++) {
            const r = r0 + (isHorizontal ? 0 : i);
            const c = c0 + (isHorizontal ? i : 0);

            if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) break;

            const existing = grid[r][c];
            const ch = word[i];
            if (existing !== "#" && existing !== ch) {
                console.warn(`Конфликт букв: слово ${clue.number} клетка (${r},${c}) было "${existing}", ставим "${ch}"`);
            }
            grid[r][c] = ch;
        }
    });

    return grid;
})();

const clueByNumber = new Map();
clues.forEach((clue) => clueByNumber.set(clue.number, clue));

let activeClueNumber = null;

// -------------------------
// ЭЛЕМЕНТЫ СТРАНИЦЫ
// -------------------------
const gridElement = document.getElementById("puzzle-grid");
const btnCheck = document.getElementById("check-button");
const btnHint = document.getElementById("hint-button");
const resultMessage = document.getElementById("result-message");

const acrossCluesEl = document.getElementById("across-clues");
const downCluesEl = document.getElementById("down-clues");

const activeClueTextEl = document.getElementById("active-clue-text");

// -------------------------
// ПАНЕЛЬ С ВЫБРАННЫМ ВОПРОСОМ
// -------------------------
function setActiveClueText(clueNum) {
    if (!activeClueTextEl) return;

    if (!clueNum) {
        activeClueTextEl.textContent = "Выберите слово: нажмите на клетку в сетке или на вопрос справа.";
        return;
    }

    const clue = clueByNumber.get(clueNum);
    if (!clue) {
        activeClueTextEl.textContent = "Выберите слово: нажмите на клетку в сетке или на вопрос справа.";
        return;
    }

    const len = clue.answer?.length ?? 0;
    activeClueTextEl.textContent = `${clue.number}. ${clue.question} (${len} букв)`;
}

// -------------------------
// СОЗДАНИЕ СЕТКИ
// -------------------------
function createPuzzleGrid() {
    gridElement.innerHTML = "";

    const rows = puzzle.length;
    const cols = puzzle[0].length;

    gridElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const char = puzzle[row][col];

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
                    target.value = (target.value || "").toUpperCase();
                    cell.classList.remove("wrong", "correct");
                    if (resultMessage) resultMessage.textContent = "";
                    if (target.value.length === 1) focusNextInput(target);
                });

                input.addEventListener("keydown", (event) => {
                    if (event.key === "Backspace" && !input.value) {
                        event.preventDefault();
                        focusPrevInput(input);
                    }
                });

                input.addEventListener("focus", () => highlightClueForCell(cell));
                input.addEventListener("click", () => highlightClueForCell(cell));

                cell.appendChild(input);
            }

            gridElement.appendChild(cell);
        }
    }

    addClueNumbers();
}

// -------------------------
// ПЕРЕХОДЫ ПО БУКВАМ ВНУТРИ АКТИВНОГО СЛОВА
// -------------------------
function focusNextInput(currentInput) {
    moveInActiveWord(currentInput, +1);
}

function focusPrevInput(currentInput) {
    moveInActiveWord(currentInput, -1);
}

function moveInActiveWord(currentInput, step) {
    const cell = currentInput.parentElement;
    if (!cell) return;

    const numsStr = cell.dataset.clueNumbers;
    if (!numsStr) return;

    const numbers = numsStr.split(",").map((n) => parseInt(n, 10)).filter((n) => !Number.isNaN(n));
    if (!numbers.length) return;

    let clueNum = activeClueNumber;
    if (!clueNum || !numbers.includes(clueNum)) {
        clueNum = numbers[0];
        activeClueNumber = clueNum;
        setActiveClueText(clueNum);
    }

    const clue = clueByNumber.get(clueNum);
    if (!clue) return;

    const word = clue.answer;
    const isHorizontal = clue.direction.toLowerCase().startsWith("гор");

    const inputsInWord = [];
    for (let i = 0; i < word.length; i++) {
        const r = clue.row + (isHorizontal ? 0 : i);
        const c = clue.col + (isHorizontal ? i : 0);
        const cellEl = gridElement.querySelector(`.puzzle-cell[data-row="${r}"][data-col="${c}"]`);
        const inputEl = cellEl?.querySelector("input");
        if (inputEl) inputsInWord.push(inputEl);
    }

    const index = inputsInWord.indexOf(currentInput);
    if (index === -1) return;

    const nextIndex = index + step;
    if (nextIndex >= 0 && nextIndex < inputsInWord.length) inputsInWord[nextIndex].focus();
}

// -------------------------
// НУМЕРАЦИЯ И ПРИВЯЗКА КЛЕТОК К СЛОВАМ
// -------------------------
function addClueNumbers() {
    clues.forEach((clue) => {
        const word = clue.answer;
        if (!word || !word.length) return;

        const isHorizontal = clue.direction.toLowerCase().startsWith("гор");
        const startRow = clue.row;
        const startCol = clue.col;

        const startCell = gridElement.querySelector(`.puzzle-cell[data-row="${startRow}"][data-col="${startCol}"]`);
        if (startCell && !startCell.classList.contains("blocked")) {
            if (!startCell.querySelector(".clue-number")) {
                const numberLabel = document.createElement("span");
                numberLabel.classList.add("clue-number");
                numberLabel.textContent = clue.number;
                startCell.appendChild(numberLabel);
            }
        }

        for (let i = 0; i < word.length; i++) {
            const r = startRow + (isHorizontal ? 0 : i);
            const c = startCol + (isHorizontal ? i : 0);
            const cell = gridElement.querySelector(`.puzzle-cell[data-row="${r}"][data-col="${c}"]`);
            if (!cell) continue;

            const existing = cell.dataset.clueNumbers || "";
            const nums = existing ? existing.split(",") : [];
            if (!nums.includes(String(clue.number))) {
                nums.push(String(clue.number));
                cell.dataset.clueNumbers = nums.join(",");
            }
        }
    });
}

// -------------------------
// ПОДСВЕТКА ВОПРОСА И СЛОВА
// -------------------------
function highlightClueForCell(cell) {
    if (!cell) return;

    const nums = cell.dataset.clueNumbers;
    if (!nums) return;

    const firstNum = parseInt(nums.split(",")[0], 10);
    if (Number.isNaN(firstNum)) return;

    activeClueNumber = firstNum;
    setActiveClueText(firstNum);

    // подсветка вопросов справа
    const allLis = document.querySelectorAll(".puzzle-clues li");
    allLis.forEach((li) => {
        if (Number(li.dataset.number) === firstNum) li.classList.add("active-clue");
        else li.classList.remove("active-clue");
    });

    // подсветка слова на сетке
    gridElement.querySelectorAll(".puzzle-cell.active-word").forEach((c) => c.classList.remove("active-word"));
    gridElement.querySelectorAll(".puzzle-cell").forEach((c) => {
        const data = c.dataset.clueNumbers;
        if (!data) return;
        if (data.split(",").includes(String(firstNum))) c.classList.add("active-word");
    });
}

// -------------------------
// ВЫВОД ВОПРОСОВ (в 2 списка: горизонталь/вертикаль)
// -------------------------
function renderClues() {
    if (acrossCluesEl) acrossCluesEl.innerHTML = "";
    if (downCluesEl) downCluesEl.innerHTML = "";

    clues.forEach((clue) => {
        const li = document.createElement("li");
        const len = clue.answer?.length ?? 0;

        li.textContent = `${clue.number}. ${clue.question} (${len} букв)`;
        li.dataset.number = String(clue.number);

        li.addEventListener("click", () => {
            activeClueNumber = clue.number;
            setActiveClueText(clue.number);

            const startCell = gridElement.querySelector(`.puzzle-cell[data-row="${clue.row}"][data-col="${clue.col}"]`);
            if (startCell) highlightClueForCell(startCell);

            const startInput = startCell?.querySelector("input");
            if (startInput) startInput.focus();
        });

        const isHorizontal = clue.direction.toLowerCase().startsWith("гор");
        if (isHorizontal) acrossCluesEl?.appendChild(li);
        else downCluesEl?.appendChild(li);
    });
}

// -------------------------
// ПРОВЕРКА
// -------------------------
function checkPuzzle() {
    const inputs = gridElement.querySelectorAll("input");
    let allCorrect = true;
    let hasAnyLetter = false;

    inputs.forEach((input) => {
        const cell = input.parentElement;
        const correctLetter = (input.dataset.answer || "").toUpperCase();
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

    if (!resultMessage) return;
    if (!hasAnyLetter) resultMessage.textContent = "Заполните хотя бы одну букву.";
    else if (allCorrect) resultMessage.textContent = "Отлично! Все правильно.";
    else resultMessage.textContent = "Есть ошибки или пустые клетки.";
}

// -------------------------
// ПОДСКАЗКА (15% букв активного слова)
// -------------------------
function hintActiveWord() {
    if (!resultMessage) return;

    if (!activeClueNumber) {
        resultMessage.textContent = "Выберите слово: нажмите на вопрос или на клетку слова.";
        return;
    }

    const clue = clueByNumber.get(activeClueNumber);
    if (!clue) {
        resultMessage.textContent = "Не удалось определить активное слово.";
        return;
    }

    const word = clue.answer;
    const isHorizontal = clue.direction.toLowerCase().startsWith("гор");
    const len = word.length;

    const revealCount = Math.max(1, Math.round(len * 0.15));

    const candidates = [];
    for (let i = 0; i < len; i++) {
        const r = clue.row + (isHorizontal ? 0 : i);
        const c = clue.col + (isHorizontal ? i : 0);
        const cellEl = gridElement.querySelector(`.puzzle-cell[data-row="${r}"][data-col="${c}"]`);
        const inputEl = cellEl?.querySelector("input");
        if (!cellEl || !inputEl) continue;

        const correct = word[i].toUpperCase();
        const current = (inputEl.value || "").toUpperCase();
        if (current !== correct) candidates.push({ cellEl, inputEl, correct });
    }

    if (candidates.length === 0) {
        resultMessage.textContent = "В этом слове уже все буквы правильные.";
        return;
    }

    shuffle(candidates);
    const toReveal = candidates.slice(0, Math.min(revealCount, candidates.length));

    toReveal.forEach(({ cellEl, inputEl, correct }) => {
        inputEl.value = correct;
        cellEl.classList.remove("wrong");
        cellEl.classList.add("correct");
    });

    resultMessage.textContent = `Подсказка: открыто ${toReveal.length} буквы(а) в слове №${activeClueNumber}.`;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// -------------------------
// СТАРТ
// -------------------------
createPuzzleGrid();
renderClues();
setActiveClueText(null);

btnCheck?.addEventListener("click", checkPuzzle);
btnHint?.addEventListener("click", hintActiveWord);
