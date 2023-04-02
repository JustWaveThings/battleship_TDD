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
	addPlayerAttackListener(computerBoard, computer, playerBoard) {
		const computerCells = document.querySelectorAll(
			'section.computer-board .cell'
		);
		computerCells.forEach(cell => {
			cell.addEventListener('click', e => {
				this.playerInput(e, computerBoard, playerBoard, computer);
			});
		});
	},

	playerInput(e, computerBoard, playerBoard, computer) {
		const rowCol = e.target.dataset.rowCol;
		const x = +rowCol[0];
		const y = +rowCol[3];
		const attack = [x, y];
		computer.playerAttack(attack);
		const newStatus = computerBoard.gameboard[x][y][2];
		const computerCell = document.querySelector(
			`section.computer-board .cell[data-row-col="${x}, ${y}"]`
		);
		computerCell.dataset.status = newStatus;
		this.computerInput(playerBoard, computer);
		this.gameEnd(computerBoard, playerBoard);
	},
	computerInput(playerBoard, computer) {
		const computerAttack = computer.computerAttack();
		const [x, y] = computerAttack;
		playerBoard.receiveAttack(computerAttack);
		const newStatus = playerBoard.gameboard[x][y][2];
		const playerCell = document.querySelector(
			`section.player-board .cell[data-row-col="${x}, ${y}"]`
		);
		playerCell.dataset.status = newStatus;
	},
	gameEnd(computerBoard, playerBoard) {
		// display modal that says game over and asks if you want to play again
		// if yes, call gameStart()
		// if no, close modal
		if (computerBoard.allShipsSunk()) {
			console.log('player wins');
		}
		if (playerBoard.allShipsSunk()) {
			console.log('computer wins');
		}
	},
	createGridItems() {
		const grid = document.getElementById('grid');
		for (let y = 0; y < 10; y++) {
			for (let x = 0; x < 10; x++) {
				const gridItem = document.createElement('div');
				gridItem.classList.add('grid-item');
				gridItem.dataset.x = x;
				gridItem.dataset.y = y;
				grid.appendChild(gridItem);
			}
		}
	},
	previewShip(startX, startY, length, alignment) {
		const gridItems = document.querySelectorAll('.grid-item');

		for (let i = 0; i < length; i++) {
			const x = alignment === 'horizontal' ? startX + i : startX;
			const y = alignment === 'vertical' ? startY + i : startY;

			if (x < 0 || x >= 10 || y < 0 || y >= 10) {
				throw new Error('Invalid ship placement');
			}

			const gridItem = Array.from(gridItems).find(
				item => item.dataset.x == x && item.dataset.y == y
			);

			if (gridItem) {
				gridItem.classList.add('ship');
			}
		}
	},
	updatePreviewShip() {
		const carrierX = parseInt(document.getElementById('carrier-x').value);
		const carrierY = parseInt(document.getElementById('carrier-y').value);
		const carrierAlignment = document.getElementById('carrier-align').value;

		const battleshipX = parseInt(document.getElementById('battleship-x').value);
		const battleshipY = parseInt(document.getElementById('battleship-y').value);
		const battleshipAlignment =
			document.getElementById('battleship-align').value;

		const cruiserX = parseInt(document.getElementById('cruiser-x').value);
		const cruiserY = parseInt(document.getElementById('cruiser-y').value);
		const cruiserAlignment = document.getElementById('cruiser-align').value;

		const submarineX = parseInt(document.getElementById('submarine-x').value);
		const submarineY = parseInt(document.getElementById('submarine-y').value);
		const submarineAlignment = document.getElementById('submarine-align').value;

		const destroyerX = parseInt(document.getElementById('destroyer-x').value);
		const destroyerY = parseInt(document.getElementById('destroyer-y').value);
		const destroyerAlignment = document.getElementById('destroyer-align').value;

		domMethods.previewShip(carrierX, carrierY, 5, carrierAlignment);
		domMethods.previewShip(battleshipX, battleshipY, 4, battleshipAlignment);
		domMethods.previewShip(cruiserX, cruiserY, 3, cruiserAlignment);
		domMethods.previewShip(submarineX, submarineY, 3, submarineAlignment);
		domMethods.previewShip(destroyerX, destroyerY, 2, destroyerAlignment);
	},
	previewListener() {
		const gridItems = document.querySelectorAll('form');
		gridItems.forEach(item => {
			item.addEventListener('click', e => {
				domMethods.reRenderPreviewShip();
				console.log('rerendered');
			});
		});
	},
	reRenderPreviewShip() {
		const gridItems = document.querySelectorAll('.grid-item');
		gridItems.forEach(item => {
			item.classList.remove('ship');
		});
		domMethods.updatePreviewShip();
	},
	shipPlacements() {
		return {
			carrier: {
				position: [
					parseInt(document.getElementById('carrier-x').value),
					parseInt(document.getElementById('carrier-y').value),
				],
				alignment: document.getElementById('carrier-align').value,
			},
			battleship: {
				position: [
					parseInt(document.getElementById('battleship-x').value),
					parseInt(document.getElementById('battleship-y').value),
				],
				alignment: document.getElementById('battleship-align').value,
			},
			cruiser: {
				position: [
					parseInt(document.getElementById('cruiser-x').value),
					parseInt(document.getElementById('cruiser-y').value),
				],
				alignment: document.getElementById('cruiser-align').value,
			},
			submarine: {
				position: [
					parseInt(document.getElementById('submarine-x').value),
					parseInt(document.getElementById('submarine-y').value),
				],
				alignment: document.getElementById('submarine-align').value,
			},
			destroyer: {
				position: [
					parseInt(document.getElementById('destroyer-x').value),
					parseInt(document.getElementById('destroyer-y').value),
				],
				alignment: document.getElementById('destroyer-align').value,
			},
		};
	},
};

export default domMethods;
