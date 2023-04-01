import domMethods from './display.js';
import GameboardFactory from './gameboard.js';
import PlayerFactory from './player.js';
import ShipFactory from './shipFactory.js';

function gameLoop() {
	function gameStart() {
		const playerBoard = GameboardFactory();
		const computerBoard = GameboardFactory();
		console.log(playerBoard, computerBoard);
		const player = PlayerFactory('Player', playerBoard);
		const computer = PlayerFactory('Computer', computerBoard);

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
		domMethods.addPlayerAttackListener(computerBoard, computer);
	}
	gameStart();

	function gamePlay() {
		// game loop
	}
	gamePlay();

	function gameEnd() {
		// display modal that says game over and asks if you want to play again
	}
}

export default gameLoop;
