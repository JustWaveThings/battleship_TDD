// add starting status to each square on the board of empty - but keep the rest for future use
// empty
// ship
// miss
// hit
// buffer

function GameboardFactory() {
	const gameboard = Array.from({ length: 10 }, (_, i) =>
		Array.from({ length: 10 }, (_, j) => [i, j])
	);

	let missedAttacksList = [];
	let ships = [];

	gameboard.map(row => {
		row.map(space => {
			space.push('empty');
		});
	});

	function placeShip(ship, bowPosition, axis) {
		const [x, y] = bowPosition;
		const shipLength = ship.length;
		const tentShipCoords = horizonatalOrVerticalPlacement(
			axis,
			shipLength,
			x,
			y
		);
		tentShipCoords.forEach(space => {
			if (space[2] === 'empty') {
				space[2] = 'ship';
			} else {
				throw new Error('Invalid ship placement on board');
			}
		});
		ships.push({
			ship,
			position: bowPosition,
			orientation: axis,
		});
		shipGiveOneSpaceBuffer();
	}

	function shipGiveOneSpaceBuffer() {
		const relativePositionOfSurroundingSquares = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1],
		];
		gameboard.forEach((row, i) => {
			row.forEach((space, j) => {
				if (space[2] === 'ship') {
					relativePositionOfSurroundingSquares.forEach(([x, y]) => {
						const bufferRow = i + x;
						const bufferCol = j + y;
						// guard clause...
						if (
							bufferRow < 0 ||
							bufferRow > gameboard.length ||
							bufferCol < 0 ||
							bufferCol > row.length
						) {
							return;
						}

						const bufferSpace = gameboard[i + x][j + y];
						if (bufferSpace[2] === 'empty') {
							bufferSpace[2] = 'buffer';
						}
					});
				}
			});
		});
	}

	function horizonatalOrVerticalPlacement(axis, shipLength, x, y) {
		let tentativeShipCoords = [];
		if (axis === 'horizontal') {
			if (x + shipLength > 10) {
				throw new Error('Invalid ship placement off board');
			}
			for (let i = 0; i < shipLength; i++) {
				const shipPos = gameboard[x][y + i];
				tentativeShipCoords.push(shipPos);
			}
		}
		if (axis === 'vertical') {
			if (y + shipLength > 10) {
				throw new Error('Invalid ship placement off board');
			}
			for (let i = 0; i < shipLength; i++) {
				const shipPos = gameboard[x + i][y];
				tentativeShipCoords.push(shipPos);
			}
		}

		return tentativeShipCoords;
	}

	function receiveAttack(position) {
		const [x, y] = position;

		const space = gameboard[x][y];
		if (space[2] === 'ship') {
			space[2] = 'hit';
		} else if (space[2] === 'miss') {
			throw new Error('You already attacked this space');
		} else {
			space[2] = 'miss';
			trackMissedAttacks(space);
		}
		console.log(space[2]);
	}

	function trackMissedAttacks(miss) {
		missedAttacksList.push(miss);
	}

	function allShipsSunk() {
		let areAllShipsSunk = false;
		const allShips = gameboard.flat().filter(space => space[2] === 'ship');
		if (allShips.length === 0) {
			areAllShipsSunk = true;
		}
		return areAllShipsSunk;
	}

	function getShips() {
		return ships;
	}

	return {
		gameboard,
		placeShip,
		receiveAttack,
		allShipsSunk,
		missedAttacksList,
		getShips,
	};
}

export default GameboardFactory;
