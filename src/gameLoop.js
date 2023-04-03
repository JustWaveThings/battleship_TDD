import domNewMethods from './dom.js';
import GameboardFactory from './gameboard.js';
import PlayerFactory from './player.js';
import ShipFactory from './shipFactory.js';

function newGameLoop() {
	const newPlayer = PlayerFactory('TERRY');
	const newComputer = PlayerFactory('COMPUTER');
	const playerShips = [
		ShipFactory(2),
		ShipFactory(3),
		ShipFactory(3),
		ShipFactory(4),
		ShipFactory(5),
	];
	const computerShips = [
		ShipFactory(2),
		ShipFactory(3),
		ShipFactory(3),
		ShipFactory(4),
		ShipFactory(5),
	];

	const newPlayerBoard = GameboardFactory(newPlayer, playerShips);
	const newComputerBoard = GameboardFactory(newComputer, computerShips);

	newComputerBoard.placeShip(computerShips[4], '0, 0', 'vertical');
	newComputerBoard.placeShip(computerShips[3], '3, 3', 'horizontal');
	newComputerBoard.placeShip(computerShips[2], '5, 3', 'vertical');
	newComputerBoard.placeShip(computerShips[1], '7, 6', 'horizontal');
	newComputerBoard.placeShip(computerShips[0], '0, 5', 'horizontal');

	const domPlayerBoard = domNewMethods.createGameboard(
		newPlayerBoard.gameboard,
		newPlayer.getPlayerName()
	);
	const domComputerBoard = domNewMethods.createGameboard(
		newComputerBoard.gameboard,
		newComputer.getPlayerName()
	);

	const playerBoardContainer = document.querySelector('section.player-board');
	const computerBoardContainer = document.querySelector(
		'section.computer-board'
	);
	playerBoardContainer.appendChild(domPlayerBoard);
	computerBoardContainer.appendChild(domComputerBoard);

	domNewMethods.placePlayerShipsAtStart(
		playerShips,
		newPlayerBoard,
		newPlayerBoard.gameboard,
		newPlayer.getPlayerName()
	);

	domNewMethods.initializeEventListeners(
		playerBoardContainer,
		newPlayerBoard.gameboard,
		newPlayer.getPlayerName()
	);

	domNewMethods.addPlayerAttackListener(
		newPlayer,
		newComputerBoard.receiveAttack
	);

	// console.log(newComputerBoard.gameboard);
	newComputerBoard.receiveAttack();
}

newGameLoop();

export default newGameLoop;
