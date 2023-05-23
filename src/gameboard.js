function GameboardFactory(player, shipList) {
  const gameboard = Array.from({ length: 10 }, (_, i) =>
    Array.from({ length: 10 }, (_, j) => [i, j])
  );

  let missedAttacksList = [];

  gameboard.map((row) => {
    row.map((space) => {
      space.push("empty");
    });
  });

  function placeShip(ship, bowPosition, axis) {
    const x = +bowPosition[0];
    const y = +bowPosition[3];

    const shipLength = ship.length;
    const tentShipCoords = horizonatalOrVerticalPlacement(
      axis,
      shipLength,
      x,
      y
    );

    tentShipCoords.forEach((space, index) => {
      if (space[2] === "empty") {
        if (index === 0) {
          space[2] = "ship bow";
        } else {
          space[2] = "ship";
        }
      } else {
        alert(
          "Invalid ship placement, must have at least one square buffer, reload page and try again"
        );
        return false;
      }
    });
    shipGiveOneSpaceBuffer();
    return true;
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
        if (space[2] === "ship" || space[2] === "ship bow") {
          relativePositionOfSurroundingSquares.forEach(([x, y]) => {
            const bufferRow = i + x;
            const bufferCol = j + y;
            // guard clause...
            if (
              bufferRow < 0 ||
              bufferRow > gameboard.length - 1 ||
              bufferCol < 0 ||
              bufferCol > row.length - 1
            ) {
              return;
            }

            const bufferSpace = gameboard[i + x][j + y];
            if (bufferSpace[2] === "empty") {
              bufferSpace[2] = "buffer";
            }
          });
        }
      });
    });
  }

  function horizonatalOrVerticalPlacement(axis, shipLength, x, y) {
    let tentativeShipCoords = [];
    if (axis === "horizontal") {
      if (y + shipLength > 10) {
        //		console.log('y + shipLength > 10', y + shipLength);
        alert(
          "Invalid ship placement, ship must be completely on the gameboard, reload page and try again"
        );
        throw new Error("Invalid ship placement off board");
      }
      for (let i = 0; i < shipLength; i++) {
        const shipPos = gameboard[x][y + i];
        tentativeShipCoords.push(shipPos);
      }
    }
    if (axis === "vertical") {
      if (x + shipLength > 10) {
        //		console.log('x + shipLength > 10', x + shipLength);
        alert(
          "Invalid ship placement, ship must be completely on the gameboard, reload page and try again"
        );
        throw new Error("Invalid ship placement off board");
      }
      for (let i = 0; i < shipLength; i++) {
        const shipPos = gameboard[x + i][y];
        tentativeShipCoords.push(shipPos);
      }
    }

    return tentativeShipCoords;
  }

  function receiveAttack(position) {
    if (position === undefined) {
      return;
    }
    const x = [...position][0];
    const y = [...position][3];
    const space = this.gameboard[x][y];
    //console.log(this.gameboard); // proves the attacks are going to the right place

    //	console.log(space, 'from gameboard array');
    if (space[2] === "ship" || space[2] === "ship bow") {
      space[2] = "hit";
    } else if (space[2] === "miss" || space[2] === "hit") {
      alert("You already attacked this space - you lose your turn");
      throw new Error("You already attacked this space");
    } else {
      space[2] = "miss";
      trackMissedAttacks(space);
    }
    //	console.log(space, 'after the attack');

    if (this.player === "COMPUTER") {
      const computerCell = document.querySelector(
        `section.computer-board .cell[data-row-col="${x}, ${y}"]`
      );
      computerCell.dataset.status = space[2];
    }
    if (this.player !== "COMPUTER") {
      const playerCell = document.querySelector(
        `section.player-board .cell[data-row-col="${x}, ${y}"]`
      );

      playerCell.dataset.status = space[2];
    }
    console.log("-------an attack over ----------");
  }

  function trackMissedAttacks(miss) {
    missedAttacksList.push(miss);
    // console.log(missedAttacksList, 'missed attacks list');
  }

  function allShipsSunk() {
    let areAllShipsSunk = false;
    const allShips = gameboard.flat().filter((space) => space[2] === "ship");
    if (allShips.length === 0) {
      areAllShipsSunk = true;
    }
    return areAllShipsSunk;
  }

  return {
    player,
    shipList,
    gameboard,
    placeShip,
    receiveAttack,
    allShipsSunk,
    missedAttacksList,
  };
}

export default GameboardFactory;
