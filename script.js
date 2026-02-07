const gridElement = document.getElementById('puzzle-grid');

function createPuzzleGrid() {
    gridElement.innerHTML = ''; // очистка на всякий случай

    for (let row = 0; row < puzzle.length; row++) {
        const line = puzzle[row];
        for (let col = 0; col < line.length; col++) {
            const char = line[col];

            const cell = document.createElement('div');
            cell.classList.add('puzzle-cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (char === '#') {
                cell.classList.add('blocked');
            } else {
                const input = document.createElement('input');
                input.maxLength = 1;
                input.dataset.answer = char; // правильный ответ
                input.addEventListener('input', (e) => {
                    e.target.value = e.target.value.toUpperCase();
                    // при вводе очищаем подсветку
                    cell.classList.remove('wrong', 'correct');
                });
                cell.appendChild(input);
            }

            gridElement.appendChild(cell);
        }
    }
}

createPuzzleGrid();

const btnCheck = document.getElementById('btn-check');
const btnShowAnswer = document.getElementById('btn-show-answer');
const resultMessage = document.getElementById('result-message');

function checkPuzzle() {
    const inputs = gridElement.querySelectorAll('input');
    let allCorrect = true;

    inputs.forEach(input => {
        const cell = input.parentElement;
        const correctLetter = input.dataset.answer;
        const userLetter = (input.value || '').toUpperCase();

        cell.classList.remove('wrong', 'correct');

        if (!userLetter) {
            allCorrect = false;
            // пустые клетки не подсвечиваем
        } else if (userLetter === correctLetter) {
            cell.classList.add('correct');
        } else {
            cell.classList.add('wrong');
            allCorrect = false;
        }
    });

    if (allCorrect && inputs.length > 0) {
        resultMessage.textContent = "Отлично! Все правильно.";
    } else {
        resultMessage.textContent = "Есть ошибки или пустые клетки.";
    }
}

function showAnswer() {
    const inputs = gridElement.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = input.dataset.answer;
        const cell = input.parentElement;
        cell.classList.remove('wrong');
        cell.classList.add('correct');
    });
    resultMessage.textContent = "Ответ показан.";
}

btnCheck.addEventListener('click', checkPuzzle);
btnShowAnswer.addEventListener('click', showAnswer);


