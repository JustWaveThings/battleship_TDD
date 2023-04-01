const domMethods = {
	createGridElement() {
		const gridElement = document.createElement('div');
		gridElement.classList.add('grid');
		return gridElement;
	},

	createCellElementPlayer(row, col, content) {
		const cellElement = document.createElement('div');
		cellElement.classList.add('cell');
		cellElement.dataset.status = `${content}`;
		cellElement.dataset.rowCol = `${row}, ${col}`;
		return cellElement;
	},

	createCellElementComputer(row, col) {
		const cellElement = document.createElement('div');
		cellElement.classList.add('cell');
		cellElement.dataset.status = ``;
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
	addPlayerAttackListener(computerBoard, computer) {
		const computerCells = document.querySelectorAll(
			'section.computer-board .cell'
		);
		computerCells.forEach(cell => {
			cell.addEventListener('click', e => {
				this.playerInput(e, computerBoard, computer);
			});
		});
	},
	playerInput(e, computerBoard) {
		const rowCol = e.target.dataset.rowCol;
		const x = rowCol[0];
		const y = rowCol[3];
		const playedAttack = [x, y];
		this.playerMove(computerBoard, playedAttack);
	},
	playerMove(computerBoard, attack) {
		const [x, y] = attack;
		const previousStatus = computerBoard.gameboard[x][y][2];

		computerBoard.receiveAttack(attack);
		const newStatus = computerBoard.gameboard[x][y][2];

		const computerCell = document.querySelector(
			`section.computer-board .cell[data-row-col="${x}, ${y}"]`
		);
		computerCell.dataset.status = newStatus;

		if (previousStatus !== newStatus) {
			const computerCell = document.querySelector(
				`section.computer-board .cell[data-row-col="${x}, ${y}"]`
			);
			computerCell.dataset.status = newStatus;
		}
	},
	computerMove(playerBoard, computer) {
		const computerAttack = computer.computerAttack();
		playerBoard.receiveAttack(computerAttack);
		this.updatePlayerBoardDOM(playerBoard, computerAttack);
		return computerAttack;
	},

	updatePlayerBoardDOM(playerBoard, computerAttack) {
		if (computerAttack) {
			const [x, y] = computerAttack;
			const playerCell = document.querySelector(
				`section.player-board .cell[data-row-col="${x}, ${y}"]`
			);
			const newStatus = playerBoard.gameboard[x][y][2];
			playerCell.dataset.status = newStatus;
		}
	},
};

export default domMethods;

/* const computerAttack = this.computerMove(playerBoard, computer);
		this.updatePlayerBoardDOM(playerBoard, computerAttack); */
