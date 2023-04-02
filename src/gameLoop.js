import domMethods from './display.js';
import GameboardFactory from './gameboard.js';
import PlayerFactory from './player.js';
import ShipFactory from './shipFactory.js';

function gameLoop() {
	function gameStart(shipPlacements) {
		domMethods.createGridItems();
		domMethods.updatePreviewShip();
		domMethods.previewListener();

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

		domMethods.renderGame(playerBoard, computerBoard);
		playerBoard.placeShip(
			carrier,
			shipPlacements.carrier.position,
			shipPlacements.carrier.alignment
		);
		playerBoard.placeShip(
			battleship,
			shipPlacements.battleship.position,
			shipPlacements.battleship.alignment
		);
		playerBoard.placeShip(
			cruiser,
			shipPlacements.cruiser.position,
			shipPlacements.cruiser.alignment
		);
		playerBoard.placeShip(
			submarine,
			shipPlacements.submarine.position,
			shipPlacements.submarine.alignment
		);
		playerBoard.placeShip(
			destroyer,
			shipPlacements.destroyer.position,
			shipPlacements.destroyer.alignment
		);
		/* playerBoard.placeShip(carrier, [carrierX, carrierY], carrierAlignment);
		playerBoard.placeShip(battleship, [3, 3], 'horizontal');
		playerBoard.placeShip(cruiser, [5, 0], 'horizontal');
		playerBoard.placeShip(destroyer, [7, 0], 'horizontal');
		playerBoard.placeShip(submarine, [7, 6], 'horizontal'); */

		computerBoard.placeShip(carrier, [1, 1], 'vertical');
		computerBoard.placeShip(battleship, [3, 0], 'horizontal');
		computerBoard.placeShip(cruiser, [5, 3], 'vertical');
		computerBoard.placeShip(destroyer, [5, 8], 'horizontal');
		computerBoard.placeShip(submarine, [8, 1], 'horizontal');

		domMethods.addPlayerAttackListener(computerBoard, computer, playerBoard);
	}
	const shipPlacements = domMethods.shipPlacements();

	gameStart(shipPlacements);
}

export default gameLoop;
