// script.js
// Классический кроссворд на 30 слов (еда и напитки)

// -------------------------
// 1. КОНФИГУРАЦИЯ СЛОВ
// -------------------------
// row / col – начальная клетка слова (0-based)
// direction: "горизонтально" или "вертикально"
const clues = [
    // Горизонтальные (1–15), слева
    {
        number: 1,
        answer: "ХЛЕБ",
        direction: "горизонтально",
        row: 0,
        col: 0,
        question: "Основной хлебобулочный продукт из муки и дрожжей (по горизонтали)"
    },
    {
        number: 2,
        answer: "МОЛОКО",
        direction: "горизонтально",
        row: 1,
        col: 0,
        question: "Белый напиток, который часто пьют по утрам (по горизонтали)"
    },
    {
        number: 3,
        answer: "СЫР",
        direction: "горизонтально",
        row: 2,
        col: 0,
        question: "Твёрдый молочный продукт, который кладут на бутерброд (по горизонтали)"
    },
    {
        number: 4,
        answer: "ЯБЛОКО",
        direction: "горизонтально",
        row: 3,
        col: 0,
        question: "Красный или зелёный фрукт, любимый врачами (по горизонтали)"
    },
    {
        number: 5,
        answer: "ГРУША",
        direction: "горизонтально",
        row: 4,
        col: 0,
        question: "Фрукт грушевидной формы, сладкий и сочный (по горизонтали)"
    },
    {
        number: 6,
        answer: "БАНАН",
        direction: "горизонтально",
        row: 5,
        col: 0,
        question: "Жёлтый длинный фрукт из тёплых стран (по горизонтали)"
    },
    {
        number: 7,
        answer: "АПЕЛЬСИН",
        direction: "горизонтально",
        row: 6,
        col: 0,
        question: "Круглый цитрусовый фрукт оранжевого цвета (по горизонтали)"
    },
    {
        number: 8,
        answer: "КЛУБНИКА",
        direction: "горизонтально",
        row: 7,
        col: 0,
        question: "Красная садовая ягода с семечками на поверхности (по горизонтали)"
    },
    {
        number: 9,
        answer: "ОГУРЕЦ",
        direction: "горизонтально",
        row: 8,
        col: 0,
        question: "Зелёный овощ, который часто солят в банках (по горизонтали)"
    },
    {
        number: 10,
        answer: "ПОМИДОР",
        direction: "горизонтально",
        row: 9,
        col: 0,
        question: "Красный овощ, из которого делают сок и кетчуп (по горизонтали)"
    },
    {
        number: 11,
        answer: "КАРТОФЕЛЬ",
        direction: "горизонтально",
        row: 10,
        col: 0,
        question: "Корнеплод, из которого делают пюре и фри (по горизонтали)"
    },
    {
        number: 12,
        answer: "МОРКОВЬ",
        direction: "горизонтально",
        row: 11,
        col: 0,
        question: "Оранжевый корнеплод, любят кролики (по горизонтали)"
    },
    {
        number: 13,
        answer: "КАПУСТА",
        direction: "горизонтально",
        row: 12,
        col: 0,
        question: "Листовой овощ, из которого делают щи (по горизонтали)"
    },
    {
        number: 14,
        answer: "ЛУК",
        direction: "горизонтально",
        row: 13,
        col: 0,
        question: "Овощ, от которого слезятся глаза (по горизонтали)"
    },
    {
        number: 15,
        answer: "ЧЕСНОК",
        direction: "горизонтально",
        row: 14,
        col: 0,
        question: "Ароматный овощ, защищает от простуды и вампиров (по горизонтали)"
    },

    // Вертикальные (16–30), справа, в отдельных колонках
    {
        number: 16,
        answer: "САХАР",
        direction: "вертикально",
        row: 0,
        col: 11,
        question: "Сладкие белые кристаллики для чая и кофе (по вертикали)"
    },
    {
        number: 17,
        answer: "СОЛЬ",
        direction: "вертикально",
        row: 0,
        col: 12,
        question: "Белая приправа, без неё пресно, но с ней пересолено (по вертикали)"
    },
    {
        number: 18,
        answer: "ПЕРЕЦ",
        direction: "вертикально",
        row: 0,
        col: 13,
        question: "Острая или сладкая приправа, бывает чёрный и красный (по вертикали)"
    },
    {
        number: 19,
        answer: "МАСЛО",
        direction: "вертикально",
        row: 0,
        col: 14,
        question: "Жирный продукт, который намазывают на хлеб (по вертикали)"
    },
    {
        number: 20,
        answer: "КАША",
        direction: "вертикально",
        row: 0,
        col: 15,
        question: "Горячее блюдо из крупы, полезный завтрак (по вертикали)"
    },
    {
        number: 21,
        answer: "СУП",
        direction: "вертикально",
        row: 0,
        col: 16,
        question: "Горячее первое блюдо в тарелке (по вертикали)"
    },
    {
        number: 22,
        answer: "БОРЩ",
        direction: "вертикально",
        row: 0,
        col: 17,
        question: "Густой суп со свёклой и капустой (по вертикали)"
    },
    {
        number: 23,
        answer: "ПЕЛЬМЕНИ",
        direction: "вертикально",
        row: 0,
        col: 18,
        question: "Маленькие варёные изделия из теста с мясной начинкой (по вертикали)"
    },
    {
        number: 24,
        answer: "ВАРЕНИКИ",
        direction: "вертикально",
        row: 0,
        col: 19,
        question: "Мучное блюдо, похоже на пельмени, но с творогом или ягодами (по вертикали)"
    },
    {
        number: 25,
        answer: "КОМПОТ",
        direction: "вертикально",
        row: 8,
        col: 11,
        question: "Сладкий напиток из сваренных фруктов или ягод (по вертикали)"
    },
    {
        number: 26,
        answer: "ЧАЙ",
        direction: "вертикально",
        row: 8,
        col: 12,
        question: "Горячий напиток из заваренных листьев (по вертикали)"
    },
    {
        number: 27,
        answer: "КОФЕ",
        direction: "вертикально",
        row: 8,
        col: 13,
        question: "Бодрящий тёмный напиток, его пьют утром (по вертикали)"
    },
    {
        number: 28,
        answer: "СОК",
        direction: "вертикально",
        row: 8,
        col: 14,
        question: "Напиток, который получают из фруктов или овощей (по вертикали)"
    },
    {
        number: 29,
        answer: "ЙОГУРТ",
        direction: "вертикально",
        row: 8,
        col: 15,
        question: "Густой кисломолочный напиток с ягодами или фруктами (по вертикали)"
    },
    {
        number: 30,
        answer: "МОРОЖЕНОЕ",
        direction: "вертикально",
        row: 8,
        col: 16,
        question: "Холодный десерт в рожке или стаканчике (по вертикали)"
    }
];

// Размер сетки
const GRID_ROWS = 20;
const GRID_COLS = 20;

// -------------------------
// 2. ПОСТРОЕНИЕ СЕТКИ БУКВ
// -------------------------
const puzzle = (function buildPuzzle() {
    const grid = Array.from({ length: GRID_ROWS }, () =>
        Array(GRID_COLS).fill("#")
    );

    clues.forEach((clue) => {
        const word = clue.answer.toUpperCase();
        clue.answer = word;
        const isHorizontal = clue.direction.toLowerCase().startsWith("гор");
        const r0 = clue.row;
        const c0 = clue.col;

        for (let i = 0; i < word.length; i++) {
            const r = r0 + (isHorizontal ? 0 : i);
            const c = c0 + (isHorizontal ? i : 0);

            if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) {
                console.warn(`Слово ${clue.number} выходит за границы поля`, clue);
                break;
            }

            const existing = grid[r][c];
            const ch = word[i];
            if (existing !== "#" && existing !== ch) {
                console.warn(
                    `Конфликт букв для слова ${clue.number} в клетке (${r},${c}): было "${existing}", ставим "${ch}"`
                );
            }
            grid[r][c] = ch;
        }
    });

    return grid;
})();

// -------------------------
// 3. ЭЛЕМЕНТЫ СТРАНИЦЫ
// -------------------------
const gridElement = document.getElementById("puzzle-grid");
const btnCheck = document.getElementById("btn-check");
const btnShowAnswer = document.getElementById("btn-show-answer");
const resultMessage = document.getElementById("result-message");
const cluesList = document.getElementById("clues-list");

// -------------------------
// 4. СОЗДАНИЕ СЕТКИ КРОССВОРДА
// -------------------------
function createPuzzleGrid() {
    gridElement.innerHTML = "";

    const rows = puzzle.length;
    const cols = puzzle[0].length;

    // Столько колонок, сколько нужно
    gridElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

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

                // Ввод буквы + авто‑переход вперёд
                input.addEventListener("input", (event) => {
                    const target = event.target;
                    target.value = target.value.toUpperCase();
                    cell.classList.remove("wrong", "correct");
                    if (resultMessage) resultMessage.textContent = "";
                    if (target.value.length === 1) {
                        focusNextInput(target);
                    }
                });

                // Backspace: при пустой клетке переходим назад
                input.addEventListener("keydown", (event) => {
                    if (event.key === "Backspace" && !input.value) {
                        event.preventDefault();
                        focusPrevInput(input);
                    }
                });

                // Подсветка вопроса и слова при фокусе/клике
                input.addEventListener("focus", () => {
                    highlightClueForCell(cell);
                });
                input.addEventListener("click", () => {
                    highlightClueForCell(cell);
                });

                cell.appendChild(input);
            }

            gridElement.appendChild(cell);
        }
    }

    addClueNumbers();
}

// -------------------------
// 5. ПЕРЕХОДЫ МЕЖДУ КЛЕТКАМИ
// -------------------------
function getAllInputs() {
    return Array.from(gridElement.querySelectorAll("input"));
}

function focusNextInput(currentInput) {
    const inputs = getAllInputs();
    const index = inputs.indexOf(currentInput);
    if (index >= 0 && index < inputs.length - 1) {
        inputs[index + 1].focus();
    }
}

function focusPrevInput(currentInput) {
    const inputs = getAllInputs();
    const index = inputs.indexOf(currentInput);
    if (index > 0) {
        inputs[index - 1].focus();
    }
}

// -------------------------
// 6. НУМЕРАЦИЯ СЛОВ И ПРИВЯЗКА КЛЕТОК
// -------------------------
function addClueNumbers() {
    clues.forEach((clue) => {
        const word = clue.answer;
        if (!word || !word.length) return;

        const isHorizontal = clue.direction.toLowerCase().startsWith("гор");
        const startRow = clue.row;
        const startCol = clue.col;

        // Номер в стартовой клетке слова
        const startSelector = `.puzzle-cell[data-row="${startRow}"][data-col="${startCol}"]`;
        const startCell = gridElement.querySelector(startSelector);
        if (startCell && !startCell.classList.contains("blocked")) {
            if (!startCell.querySelector(".clue-number")) {
                const numberLabel = document.createElement("span");
                numberLabel.classList.add("clue-number");
                numberLabel.textContent = clue.number;
                startCell.appendChild(numberLabel);
            }
        }

        // Пометить все клетки слова его номером (для подсветки)
        for (let i = 0; i < word.length; i++) {
            const r = startRow + (isHorizontal ? 0 : i);
            const c = startCol + (isHorizontal ? i : 0);
            const selector = `.puzzle-cell[data-row="${r}"][data-col="${c}"]`;
            const cell = gridElement.querySelector(selector);
            if (!cell) continue;

            const existing = cell.dataset.clueNumbers || "";
            const numbers = existing ? existing.split(",") : [];
            if (!numbers.includes(String(clue.number))) {
                numbers.push(String(clue.number));
                cell.dataset.clueNumbers = numbers.join(",");
            }
        }
    });
}

// -------------------------
// 7. ПОДСВЕТКА ВОПРОСА И СЛОВА ДЛЯ КЛЕТКИ
// -------------------------
function highlightClueForCell(cell) {
    if (!cell || !cluesList) return;
    const nums = cell.dataset.clueNumbers;
    if (!nums) return;

    // Берём первый номер (если клетка пересечения)
    const firstNum = parseInt(nums.split(",")[0], 10);
    if (Number.isNaN(firstNum)) return;

    // Подсветка вопроса
    const items = cluesList.querySelectorAll("li");
    items.forEach((li) => {
        if (Number(li.dataset.number) === firstNum) {
            li.classList.add("active-clue");
        } else {
            li.classList.remove("active-clue");
        }
    });

    // Убрать старую подсветку слова
    const allCells = gridElement.querySelectorAll(".puzzle-cell.active-word");
    allCells.forEach((c) => c.classList.remove("active-word"));

    // Подсветить все клетки выбранного слова
    const cells = gridElement.querySelectorAll(".puzzle-cell");
    cells.forEach((c) => {
        const data = c.dataset.clueNumbers;
        if (!data) return;
        const arr = data.split(",");
        if (arr.includes(String(firstNum))) {
            c.classList.add("active-word");
        }
    });
}

// -------------------------
// 8. ВЫВОД ВОПРОСОВ
// -------------------------
function renderClues() {
    if (!cluesList || !clues || clues.length === 0) return;

    cluesList.innerHTML = "";
    clues.forEach((clue) => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.question}`;
        li.dataset.number = String(clue.number);
        cluesList.appendChild(li);
    });
}

// -------------------------
// 9. ПРОВЕРКА ОТВЕТОВ
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

    if (!hasAnyLetter) {
        resultMessage.textContent = "Заполните хотя бы одну букву.";
    } else if (allCorrect) {
        resultMessage.textContent = "Отлично! Все правильно.";
    } else {
        resultMessage.textContent = "Есть ошибки или пустые клетки.";
    }
}

// -------------------------
// 10. ПОКАЗ ОТВЕТА
// -------------------------
function showAnswer() {
    const inputs = gridElement.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = input.dataset.answer || "";
        const cell = input.parentElement;
        cell.classList.remove("wrong");
        cell.classList.add("correct");
    });
    if (resultMessage) {
        resultMessage.textContent = "Ответ показан.";
    }
}

// -------------------------
// 11. СТАРТ
// -------------------------
createPuzzleGrid();
renderClues();

if (btnCheck) {
    btnCheck.addEventListener("click", checkPuzzle);
}
if (btnShowAnswer) {
    btnShowAnswer.addEventListener("click", showAnswer);
}
