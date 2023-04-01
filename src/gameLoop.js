import domMethods from './display.js';
import GameboardFactory from './gameboard.js';
import PlayerFactory from './player.js';
import ShipFactory from './shipFactory.js';

function gameLoop() {
	function gameStart() {
		const player = PlayerFactory('Player');
		const computer = PlayerFactory('Computer');

		const playerBoard = GameboardFactory();
		const computerBoard = GameboardFactory();

		const carrier = ShipFactory(5);
		const battleship = ShipFactory(4);
		const cruiser = ShipFactory(3);
		const submarine = ShipFactory(3);
		const destroyer = ShipFactory(2);

		playerBoard.placeShip(carrier, [0, 0], 'horizontal');
		playerBoard.placeShip(battleship, [3, 3], 'horizontal');
		playerBoard.placeShip(cruiser, [5, 0], 'horizontal');
		playerBoard.placeShip(destroyer, [7, 0], 'horizontal');
		playerBoard.placeShip(submarine, [7, 6], 'horizontal');

		computerBoard.placeShip(carrier, [0, 0], 'horizontal');
		computerBoard.placeShip(battleship, [3, 3], 'horizontal');
		computerBoard.placeShip(cruiser, [5, 0], 'horizontal');
		computerBoard.placeShip(destroyer, [7, 0], 'horizontal');
		computerBoard.placeShip(submarine, [7, 6], 'horizontal');

		domMethods.renderGame(playerBoard, computerBoard);

		const computerCells = document.querySelectorAll(
			'section.computer-board .cell'
		);
		computerCells.forEach(cell => {
			cell.addEventListener('click', e => {
				playerInput(e);
			});
		});

		function playerInput(e) {
			const rowCol = e.target.dataset.rowCol;
			const x = rowCol[0];
			const y = rowCol[3];
			const playedAttack = [x, y];
			computerBoard.receiveAttack(playedAttack);
		}
	}
	gameStart();
}

export default gameLoop;
