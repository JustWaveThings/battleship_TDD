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
	let movesList = [];
	function computerAttack(playerGameboard) {
		if (movesList.length === 300) {
			throw new Error('All moves have been made');
		}
		const randomMoveX = Math.floor(Math.random() * 10);
		const randomMoveY = Math.floor(Math.random() * 10);
		let move = `${randomMoveX}, ${randomMoveY}`;

		if (movesList.includes(move)) {
			console.log(
				movesList.includes(move),
				'movesList.includes(move)',
				moveslist[movesList.length - 1],
				'movesList DUPLICATE???? move'
			);
		}
		if (!movesList.includes(move)) {
			movesList.push(move);
			console.log(
				movesList[movesList.length - 1],
				'movesList last added move',
				movesList.length,
				'movesList.length'
			);
		} else {
			computerAttack(playerGameboard);
		}
		return move;
	}

	return {
		getPlayerName,
		playerAttack,
		isCurrentPlayer,
		computerAttack,
	};
}

export default PlayerFactory;
