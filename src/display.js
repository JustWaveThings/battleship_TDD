const domMethods = {
	createGridElement() {
		const gridElement = document.createElement('div');
		gridElement.classList.add('grid');
		return gridElement;
	},

	createCellElementPlayer(row, col, content) {
		const cellElement = document.createElement('div');
		cellElement.classList.add('cell');
		cellElement.dataset.status = `${content}`; // Add a data attribute for the cell's status
		cellElement.dataset.rowCol = `${row}, ${col}`;
		return cellElement;
	},

	createCellElementComputer(row, col) {
		const cellElement = document.createElement('div');
		cellElement.classList.add('cell');
		cellElement.dataset.status = ``; // Add a data attribute for the cell's status
		cellElement.dataset.rowCol = `${row}, ${col}`;
		return cellElement;
	},

	renderGridPlayer(board, container) {
		const gridElement = this.createGridElement();
		for (let row = 0; row < 10; row++) {
			const rowElement = document.createElement('div');
			rowElement.classList.add('row');
			gridElement.appendChild(rowElement);
			for (let col = 0; col < 10; col++) {
				const content = board.gameboard[row][col][2];
				const cellElement = this.createCellElementPlayer(row, col, content);
				rowElement.appendChild(cellElement);
			}
		}
		container.appendChild(gridElement);
	},

	renderGridComputer(board, container) {
		const gridElement = this.createGridElement();
		for (let row = 0; row < 10; row++) {
			const rowElement = document.createElement('div');
			rowElement.classList.add('row');
			gridElement.appendChild(rowElement);
			for (let col = 0; col < 10; col++) {
				const content = board.gameboard[row][col][2];
				const cellElement = this.createCellElementComputer(row, col, content);
				rowElement.appendChild(cellElement);
			}
		}
		container.appendChild(gridElement);
	},

	renderGame(playerBoard, computerBoard) {
		const playerBoardContainer = document.querySelector('section.player-board');
		const computerBoardContainer = document.querySelector(
			'section.computer-board'
		);
		this.renderGridPlayer(playerBoard, playerBoardContainer);
		this.renderGridComputer(computerBoard, computerBoardContainer);
	},
};

export default domMethods;
