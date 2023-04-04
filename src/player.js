let movesList = [];

function PlayerFactory(name) {
	function getPlayerName() {
		return name;
	}
	/*
	function playerAttack(position) {
		console.log(' in playerAttack in player.js', position);
		gameboard.receiveAttack(position);
	} */

	function isCurrentPlayer(turn) {
		turn++;
		return turn % 2 === 0 ? true : false;
	}

	function computerAttack(playerGameboard) {
		const randomMove = Math.floor(
			Math.random() * playerGameboard.flat().length
		);
		let move = playerGameboard.flat()[randomMove];

		if (move[2] === 'empty' && movesList.includes(move) === false) {
			movesList.push(move);
		} else if (move[2] === 'ship' && movesList.includes(move) === false) {
			movesList.push(move);
		} else {
			computerAttack(playerGameboard);
		}
		return `${move[0]}, ${move[1]}`;
	}

	return {
		getPlayerName,
		// playerAttack,
		isCurrentPlayer,
		computerAttack,
	};
}

export default PlayerFactory;
