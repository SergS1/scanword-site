// script.js
// Поддержка нескольких сканвордов через select + JSON-файлы

// -------------------------
// 0. КОНФИГ СПИСКА СКАНВОРДОВ
// -------------------------
const PUZZLE_LIST = [
    {
        id: "food-1",
        title: "Сканворд №1: Еда и напитки",
        file: "puzzles/food-1.json"
    },
    {
        id: "animals-1",
        title: "Сканворд №2: Животные",
        file: "puzzles/animals-1.json"
    }
];

// -------------------------
// 1. ГЛОБАЛЬНОЕ СОСТОЯНИЕ
// -------------------------
let clues = [];                // текущие подсказки (слова)
let clueByNumber = new Map();  // быстрый поиск подсказки по номеру
let GRID_ROWS = 0;
let GRID_COLS = 0;
let puzzleGrid = [];           // двумерный массив символов (# или буква)
let activeClueNumber = null;

// -------------------------
// 2. ЭЛЕМЕНТЫ СТРАНИЦЫ
// -------------------------
const gridElement = document.getElementById("puzzle-grid");
const btnCheck = document.getElementById("check-button");
const btnHint = document.getElementById("hint-button");
const resultMessage = document.getElementById("result-message");

const acrossCluesEl = document.getElementById("across-clues");
const downCluesEl = document.getElementById("down-clues");

const activeClueTextEl = document.getElementById("active-clue-text");

const puzzleTitleEl = document.getElementById("puzzle-title");
const puzzleThemeEl = document.getElementById("puzzle-theme");
const puzzleDescriptionEl = document.getElementById("puzzle-description");
const puzzleSelectEl = document.getElementById("puzzle-select");

// -------------------------
// 3. ЗАГРУЗКА СКАНВОРДА
// -------------------------
// Строим сетку по подсказкам
function buildGridFromClues(rows, cols, cluesArr) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill("#"));

    cluesArr.forEach((clue) => {
        const word = clue.answer.toUpperCase();
        clue.answer = word;

        const isHorizontal = clue.direction.toLowerCase().startsWith("гор");
        const r0 = clue.row;
        const c0 = clue.col;

        for (let i = 0; i < word.length; i++) {
            const r = r0 + (isHorizontal ? 0 : i);
            const c = c0 + (isHorizontal ? i : 0);

            if (r < 0 || r >= rows || c < 0 || c >= cols) break;

            const existing = grid[r][c];
            const ch = word[i];
            if (existing !== "#" && existing !== ch) {
                console.warn(
                    `Конфликт букв: слово ${clue.number} клетка (${r},${c}) было "${existing}", ставим "${ch}"`
                );
            }
            grid[r][c] = ch;
        }
    });

    return grid;
}

// Применяем загруженные данные сканворда
function applyPuzzleData(data) {
    // Обновляем заголовки
    if (puzzleTitleEl) puzzleTitleEl.textContent = data.title || "Сканворд";
    document.title = data.title || "Сканворд";

    if (puzzleThemeEl) {
        const themeText = data.theme ? `Тема: ${data.theme}` : "Тема: —";
        puzzleThemeEl.textContent = themeText;
    }
    if (puzzleDescriptionEl && data.description) {
        puzzleDescriptionEl.textContent = data.description;
    }

    GRID_ROWS = data.rows || 20;
    GRID_COLS = data.cols || 20;

    // Копируем подсказки и приводим ответы к верхнему регистру
    clues = (data.clues || []).map((c) => ({
        ...c,
        answer: (c.answer || "").toUpperCase()
    }));

    // Пересобираем карту по номеру
    clueByNumber = new Map();
    clues.forEach((clue) => clueByNumber.set(clue.number, clue));

    // Строим сетку символов
    puzzleGrid = buildGridFromClues(GRID_ROWS, GRID_COLS, clues);

    // Сбрасываем активное слово и сообщение
    activeClueNumber = null;
    setActiveClueText(null);
    if (resultMessage) resultMessage.textContent = "";

    // Перерисовываем сетку и вопросы
    createPuzzleGrid();
    renderClues();
}

// Загружаем JSON по id из списка PUZZLE_LIST
function loadPuzzleById(id) {
    const meta = PUZZLE_LIST.find((p) => p.id === id);
    if (!meta) {
        console.error("Не найден сканворд с id", id);
        if (resultMessage) resultMessage.textContent = "Не найден выбранный сканворд.";
        return;
    }

    // Можно сразу обновить заголовок (до загрузки JSON)
    if (puzzleTitleEl) puzzleTitleEl.textContent = meta.title || "Сканворд";
    document.title = meta.title || "Сканворд";

    fetch(meta.file)
        .then((response) => {
            if (!response.ok) throw new Error("HTTP " + response.status);
            return response.json();
        })
        .then((data) => {
            applyPuzzleData(data);
        })
        .catch((err) => {
            console.error("Ошибка загрузки сканворда:", err);
            if (resultMessage) {
                resultMessage.textContent = "Не удалось загрузить выбранный сканворд.";
            }
        });
}

// Инициализация селекта
function initPuzzleSelect() {
    if (!puzzleSelectEl) {
        if (PUZZLE_LIST.length > 0) loadPuzzleById(PUZZLE_LIST[0].id);
        return;
    }

    PUZZLE_LIST.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p.id;
        opt.textContent = p.title;
        puzzleSelectEl.appendChild(opt);
    });

    puzzleSelectEl.addEventListener("change", () => {
        const id = puzzleSelectEl.value;
        loadPuzzleById(id);
    });

    if (PUZZLE_LIST.length > 0) {
        puzzleSelectEl.value = PUZZLE_LIST[0].id;
        loadPuzzleById(PUZZLE_LIST[0].id);
    }
}

// -------------------------
// 4. ПАНЕЛЬ С ВЫБРАННЫМ ВОПРОСОМ
// -------------------------
function setActiveClueText(clueNum) {
    if (!activeClueTextEl) return;

    if (!clueNum) {
        activeClueTextEl.textContent =
            "Выберите слово: нажмите на клетку в сетке или на вопрос справа.";
        return;
    }

    const clue = clueByNumber.get(clueNum);
    if (!clue) {
        activeClueTextEl.textContent =
            "Выберите слово: нажмите на клетку в сетке или на вопрос справа.";
        return;
    }

    const len = clue.answer?.length ?? 0;
    activeClueTextEl.textContent = `${clue.number}. ${clue.question} (${len} букв)`;
}

// -------------------------
// 5. СОЗДАНИЕ СЕТКИ
// -------------------------
function createPuzzleGrid() {
    gridElement.innerHTML = "";

    const rows = puzzleGrid.length;
    if (!rows) return;
    const cols = puzzleGrid[0].length;

    gridElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const char = puzzleGrid[row][col];

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
// 6. ПЕРЕХОДЫ ПО БУКВАМ ВНУТРИ АКТИВНОГО СЛОВА
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

    const numbers = numsStr
        .split(",")
        .map((n) => parseInt(n, 10))
        .filter((n) => !Number.isNaN(n));
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
        const cellEl = gridElement.querySelector(
            `.puzzle-cell[data-row="${r}"][data-col="${c}"]`
        );
        const inputEl = cellEl?.querySelector("input");
        if (inputEl) inputsInWord.push(inputEl);
    }

    const index = inputsInWord.indexOf(currentInput);
    if (index === -1) return;

    const nextIndex = index + step;
    if (nextIndex >= 0 && nextIndex < inputsInWord.length) {
        inputsInWord[nextIndex].focus();
    }
}

// -------------------------
// 7. НУМЕРАЦИЯ И ПРИВЯЗКА КЛЕТОК К СЛОВАМ
// -------------------------
function addClueNumbers() {
    clues.forEach((clue) => {
        const word = clue.answer;
        if (!word || !word.length) return;

        const isHorizontal = clue.direction.toLowerCase().startsWith("гор");
        const startRow = clue.row;
        const startCol = clue.col;

        const startCell = gridElement.querySelector(
            `.puzzle-cell[data-row="${startRow}"][data-col="${startCol}"]`
        );
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
            const cell = gridElement.querySelector(
                `.puzzle-cell[data-row="${r}"][data-col="${c}"]`
            );
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
// 8. ПОДСВЕТКА ВОПРОСА И СЛОВА
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
        if (Number(li.dataset.number) === firstNum) {
            li.classList.add("active-clue");
        } else {
            li.classList.remove("active-clue");
        }
    });

    // подсветка слова на сетке
    gridElement
        .querySelectorAll(".puzzle-cell.active-word")
        .forEach((c) => c.classList.remove("active-word"));
    gridElement.querySelectorAll(".puzzle-cell").forEach((c) => {
        const data = c.dataset.clueNumbers;
        if (!data) return;
        if (data.split(",").includes(String(firstNum))) {
            c.classList.add("active-word");
        }
    });
}

// -------------------------
// 9. ВЫВОД ВОПРОСОВ
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

            const startCell = gridElement.querySelector(
                `.puzzle-cell[data-row="${clue.row}"][data-col="${clue.col}"]`
            );
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
// 10. ПРОВЕРКА
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
// 11. ПОДСКАЗКА (15% букв активного слова)
// -------------------------
function hintActiveWord() {
    if (!resultMessage) return;

    if (!activeClueNumber) {
        resultMessage.textContent =
            "Выберите слово: нажмите на вопрос или на клетку слова.";
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
        const cellEl = gridElement.querySelector(
            `.puzzle-cell[data-row="${r}"][data-col="${c}"]`
        );
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
// 12. СТАРТ
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    initPuzzleSelect();
    btnCheck?.addEventListener("click", checkPuzzle);
    btnHint?.addEventListener("click", hintActiveWord);
});
