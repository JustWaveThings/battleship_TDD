const domNewMethods = {
	createBoardContainer() {
		const boardContainer = document.createElement('div');
		boardContainer.classList.add('board-container');
		return boardContainer;
	},
	createCells(row, col, content, specificGameboard) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.dataset.status = `${content}`;
		if (specificGameboard === 'computer') {
			cell.dataset.rowCol = '';
		} else {
			cell.dataset.rowCol = `${row}, ${col}`;
		}
		return cell;
	},
	createGameboard(gameboard) {
		const boardContainer = this.createBoardContainer();
		gameboard.forEach((row, i) => {
			row.forEach((space, j) => {
				const cell = this.createCells(i, j, space[2]);
				boardContainer.appendChild(cell);
			});
		});
		return boardContainer;
	},
};
