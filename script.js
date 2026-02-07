// script.js
// ЛОГИКА САЙТА «СКАНВОРДЫ ОНЛАЙН»
// -------------------------
// 1. ДАННЫЕ СКАНВОРДА
// -------------------------
// # - закрашенная клетка (в нее вводить ничего не нужно)
// Буква - правильный ответ в этой клетке
// Все строки должны быть одной длины
const puzzle = [
    "##########",
    "#КОТ######",
    "#О#СОБАКА#",
    "#Т#О######",
    "##########",
    "###ЛЕВ####",
    "###Е######",
    "###В######",
    "##########",
    "##########"
];
// -------------------------
// 2. ВОПРОСЫ К СКАНВОРДУ
// -------------------------
// number    – номер вопроса
// question  – текст вопроса
// answer    – ответ (для тебя, можно не показывать пользователю)
// direction – направление (для информации)
const clues = [
    {
        number: 1,
        question: "Домашнее животное, говорит «мяу» (по горизонтали)",
        answer: "КОТ",
        direction: "горизонтально"
    },
    {
        number: 2,
        question: "Самое верное домашнее животное (по горизонтали)",
        answer: "СОБАКА",
        direction: "горизонтально"
    },
    {
        number: 3,
        question: "Царь зверей (по горизонтали)",
        answer: "ЛЕВ",
        direction: "горизонтально"
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
    // Очистим сетку на всякий случай
    gridElement.innerHTML = "";
    // Если пазл пустой — выходим
    if (!puzzle || puzzle.length === 0) {
        resultMessage.textContent = "Сканворд не найден.";
        return;
    }
    const rows = puzzle.length;
    const cols = puzzle[0].length;
    // Делаем число колонок динамическим, чтобы не зависеть от CSS
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
                // Закрашенная (пустая) клетка
                cell.classList.add("blocked");
            } else {
                // Клетка с буквой — создаем поле ввода
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.dataset.answer = char; // правильная буква
                input.addEventListener("input", (event) => {
                    const target = event.target;
                    target.value = target.value.toUpperCase();
                    cell.classList.remove("wrong", "correct");
                    resultMessage.textContent = "";
                });
                cell.appendChild(input);
            }
            gridElement.appendChild(cell);
        }
    }
}
// -------------------------
// 5. ВЫВОД ВОПРОСОВ НА СТРАНИЦУ
// -------------------------
function renderClues() {
    if (!cluesList || !clues || clues.length === 0) {
        return;
    }
    // Очистить список
    cluesList.innerHTML = "";
    clues.forEach((clue) => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.question}`;
        cluesList.appendChild(li);
    });
}
// -------------------------
// 6. ПРОВЕРКА ОТВЕТОВ
// -------------------------
function checkPuzzle() {
    const inputs = gridElement.querySelectorAll("input");
    let allCorrect = true;
    let hasAnyLetter = false;
    inputs.forEach((input) => {
        const cell = input.parentElement;
        const correctLetter = input.dataset.answer;
        const userLetter = (input.value || "").toUpperCase();
        // Сбрасываем старую подсветку
        cell.classList.remove("wrong", "correct");
        if (!userLetter) {
            // Пустую клетку учитываем как незаполненную
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
// 7. ПОКАЗ ОТВЕТА
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
// 8. СТАРТ: СОЗДАНИЕ СЕТКИ И ВОПРОСОВ
// -------------------------
createPuzzleGrid();
renderClues();
if (btnCheck) {
    btnCheck.addEventListener("click", checkPuzzle);
}
if (btnShowAnswer) {
    btnShowAnswer.addEventListener("click", showAnswer);
}
