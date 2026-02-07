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
