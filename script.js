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
