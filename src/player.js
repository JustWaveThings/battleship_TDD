let movesList = [];

function PlayerFactory(name) {
	function getPlayerName() {
		return name;
	}

	function playerAttack(position) {
		console.log(' in playerAttack in player.js', position);
		gameboard.receiveAttack(position);
	}

	function isCurrentPlayer(turn) {
		turn++;
		return turn % 2 === 0 ? true : false;
	}

	function computerAttack() {
		const randomMove = Math.floor(
			Math.random() * gameboard.gameboard.flat().length
		);
		let move = gameboard.gameboard.flat()[randomMove];

		if (move[2] === 'empty' && movesList.includes(move) === false) {
			movesList.push(move);
		} else if (move[2] === 'ship' && movesList.includes(move) === false) {
			movesList.push(move);
		} else {
			computerAttack();
		}
		return `${move[0]}, ${move[1]}`;
	}

	return {
		getPlayerName,
		playerAttack,
		isCurrentPlayer,
		computerAttack: gameboard => computerAttack(gameboard),
	};
}

export default PlayerFactory;
