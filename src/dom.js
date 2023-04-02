const domNewMethods = {
	createBoardContainer() {
		const boardContainer = document.createElement('div');
		boardContainer.classList.add('board-container');
		return boardContainer;
	},
	createCells(row, col, content) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.dataset.status = `${content}`;
		cell.dataset.rowCol = `${row}, ${col}`;
		return cell;
	},
	createComputerCells(row, col) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.dataset.status = ``;
		cell.dataset.rowCol = `${row}, ${col}`;
		cell.addEventListener('click', () => {
			console.log('clicked {row, col}: ', row, col);
		});
		return cell;
	},
	createGameboard(gameboard, player) {
		if (player === 'COMPUTER') {
			const boardContainer = this.createBoardContainer();
			boardContainer.setAttribute('data-player', `${player}`);
			gameboard.forEach((row, i) => {
				const rowElement = document.createElement('div');
				rowElement.classList.add('row');
				boardContainer.appendChild(rowElement);
				row.forEach((_, j) => {
					const cell = this.createComputerCells(i, j);
					rowElement.appendChild(cell);
				});
			});
			return boardContainer;
		} else {
			const boardContainer = this.createBoardContainer();
			boardContainer.setAttribute('data-player', `${player}`);
			gameboard.forEach((row, i) => {
				const rowElement = document.createElement('div');
				rowElement.classList.add('row');
				boardContainer.appendChild(rowElement);
				row.forEach((space, j) => {
					const cell = this.createCells(i, j, space[2]);
					rowElement.appendChild(cell);
				});
			});
			return boardContainer;
		}
	},
};

export default domNewMethods;
