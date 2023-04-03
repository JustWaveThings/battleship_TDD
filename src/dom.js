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
		cell.dataset.clickCounter = 0;
		return cell;
	},
	createComputerCells(row, col) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.dataset.status = ``;
		cell.dataset.rowCol = `${row}, ${col}`;
		cell.addEventListener('click', () => {
			console.log('clicked {row, col - computer board}: ', row, col);
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
	renderPlayerGameboard(gameboard, player) {
		const boardContainer = document.querySelector(
			`div.board-container[data-player="${player}"]`
		);
		const rows = boardContainer.querySelectorAll('div.row');
		rows.forEach((row, i) => {
			const cells = row.querySelectorAll('div.cell');
			cells.forEach((cell, j) => {
				cell.dataset.status = gameboard[i][j][2];
			});
		});
	},

	placePlayerShipsAtStart(playerShips, playerBoard) {
		const boardContainer = document.querySelector('.board-container');
		const instructionsContainer = document.querySelector(
			'.instructions-container'
		);
		const nextShipButton = document.querySelector('.next-ship-button');
		let shipIndex = 0;

		function handleCellClick(e) {
			if (e.target.classList.contains('cell')) {
				const cell = e.target.data - rowCol;

				// Show ship orientation instructions
				instructionsContainer.textContent =
					'Click the same spot to change the orientation of the ship.';
				nextShipButton.style.display = 'block';

				// Change event listener to handle ship orientation
				boardContainer.removeEventListener('click', handleCellClick);
				boardContainer.addEventListener('click', e =>
					handleOrientationClick(e, cell)
				);
			}
		}
		function handleOrientationClick(e, cell) {
			if (e.target.classList.contains('cell')) {
				const orientation =
					e.target.dataset.orientation === 'horizontal'
						? 'vertical'
						: 'horizontal';
				e.target.dataset.orientation = orientation;
			}
		}
		function handleNextShipButtonClick() {
			const selectedCell = boardContainer.querySelector(
				'.cell[data-orientation]'
			);
			const cell = selectedCell.dataset.rowCol;
			const orientation = selectedCell.dataset.orientation;

			// Check if ship placement is valid
			if (playerBoard.placeShip(playerShips[shipIndex], cell, orientation)) {
				shipIndex++;

				if (shipIndex === playerShips.length) {
					// All ships placed, hide instructions and remove event listener
					instructionsContainer.style.display = 'none';
					nextShipButton.style.display = 'none';
					boardContainer.removeEventListener('click', handleOrientationClick);
				} else {
					// Show instructions for the next ship
					instructionsContainer.textContent = `Place the ship of length ${playerShips[shipIndex].length} on the board by clicking anywhere on the gameboard.`;
					nextShipButton.style.display = 'none';
					selectedCell.removeAttribute('data-orientation');
				}
			} else {
				// Invalid ship placement, prompt user to reposition ship
				alert('Invalid ship placement, please try again.');
			}

			// Revert back to the initial event listener for ship placement
			boardContainer.removeEventListener('click', handleOrientationClick);
			boardContainer.addEventListener('click', handleCellClick);
		}

		// Show initial instructions
		instructionsContainer.textContent = `Place the ship of length ${playerShips[shipIndex].length} on the board by clicking anywhere on the gameboard.`;

		// Start the ship placement loop
		boardContainer.addEventListener('click', handleCellClick);
		nextShipButton.addEventListener('click', handleNextShipButtonClick);
	},
};
export default domNewMethods;
