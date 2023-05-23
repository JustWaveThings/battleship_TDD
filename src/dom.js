import { newComputer, newPlayerBoard, newComputerBoard } from "./gameLoop.js";

const domNewMethods = {
  initializeEventListeners(playerBoardContainer, gameboard, player) {
    playerBoardContainer.addEventListener("click", (e) => {
      this.renderPlayerGameboard(gameboard, player);
    });
  },

  createBoardContainer() {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");
    return boardContainer;
  },

  createCells(row, col, content) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.status = `${content}`;
    cell.dataset.rowCol = `${row}, ${col}`;
    return cell;
  },
  createComputerCells(row, col) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.status = ``;
    cell.dataset.rowCol = `${row}, ${col}`;

    return cell;
  },
  createGameboard(gameboard, player) {
    if (player === "COMPUTER") {
      const boardContainer = this.createBoardContainer();
      boardContainer.setAttribute("data-player", `${player}`);
      gameboard.forEach((row, i) => {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        boardContainer.appendChild(rowElement);
        row.forEach((_, j) => {
          const cell = this.createComputerCells(i, j);
          rowElement.appendChild(cell);
        });
      });
      return boardContainer;
    } else {
      const boardContainer = this.createBoardContainer();
      boardContainer.setAttribute("data-player", `${player}`);
      gameboard.forEach((row, i) => {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        boardContainer.appendChild(rowElement);
        row.forEach((space, j) => {
          const cell = this.createCells(i, j, space[2]);
          cell.dataset.orientation = "horizontal";
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
    const rows = boardContainer.querySelectorAll("div.row");
    rows.forEach((row, i) => {
      const cells = row.querySelectorAll("div.cell");
      cells.forEach((cell, j) => {
        cell.dataset.status = gameboard[i][j][2];
      });
    });
  },

  placePlayerShipsAtStart(playerShips, playerBoard, gameboard, player) {
    const boardContainer = document.querySelector(".board-container");
    const instructionsContainer = document.querySelector(
      ".instructions-container"
    );
    const instructionsDiv = document.querySelector(".instructions");
    const nextShipButton = document.querySelector(".next-ship-button");
    let shipIndex = 0;
    let selectedCell;

    const handleCellClick = (e) => {
      selectedCell = e.target;
      selectedCell.classList.add("ship");
      selectedCell.dataset.status = "ship bow";

      // Add orientation information to the instructions text
      instructionsContainer.textContent = `Click the same square to change the orientation of the ship. Current orientation: ${selectedCell.dataset.orientation}`;

      nextShipButton.style.display = "flex";
      boardContainer.addEventListener("click", handleOrientationClick);
      this.renderPlayerGameboard(gameboard, player);
    };

    const handleOrientationClick = (e) => {
      if (selectedCell) {
        const orientation =
          e.target.dataset.orientation === "horizontal"
            ? "vertical"
            : "horizontal";

        selectedCell.dataset.orientation = orientation;
        // Update the instructions text with the new orientation
        instructionsContainer.textContent = `Click the same square to change the orientation of the ship. Current orientation: ${selectedCell.dataset.orientation}`;

        this.renderPlayerGameboard(gameboard, player);
      }
    };
    const handleNextShipButtonClick = (e) => {
      if (selectedCell) {
        const orientation = selectedCell.dataset.orientation;
        const position = selectedCell.dataset.rowCol;

        // Check if ship placement is valid
        if (
          playerBoard.placeShip(playerShips[shipIndex], position, orientation)
        ) {
          // remove orientation attribute from cell
          selectedCell.removeAttribute("data-orientation");
          shipIndex++;

          if (shipIndex === playerShips.length) {
            // All ships placed, hide instructions and remove event listener
            this.renderPlayerGameboard(gameboard, player);
            instructionsContainer.style.display = "none";
            instructionsDiv.style.display = "none";
            nextShipButton.style.display = "none";
            // console.log(gameboard);
            gameboard.forEach((row, i) => {
              row.forEach((_, j) => {
                const cellElement = document.querySelector(
                  `div.cell[data-row-col="${i}, ${j}"]`
                );
                cellElement.classList.remove("ship");
                cellElement.removeAttribute("data-orientation");
              });
            });

            boardContainer.removeEventListener("click", handleOrientationClick);
            boardContainer.removeEventListener("click", handleCellClick);
            return;
          } else {
            // Show instructions for the next ship
            instructionsContainer.textContent = `Place the ship of length ${playerShips[shipIndex].length} on the board by clicking anywhere on the gameboard.`;
            nextShipButton.style.display = "none";
            selectedCell.removeAttribute("data-orientation");
          }
        } else {
          // Invalid ship placement, prompt user to reposition ship
          alert("Invalid ship placement, please try again.");
          return;
        }

        // Revert back to the initial event listener for ship placement
        //boardContainer.removeEventListener('click', handleOrientationClick);
        boardContainer.addEventListener("click", handleCellClick);
        this.renderPlayerGameboard(gameboard, player);
      }
    };

    // Show initial instructions
    instructionsContainer.textContent = `Place the ship of length ${playerShips[shipIndex].length} on the board by clicking anywhere on the gameboard. Note: any ship must have at least 1 square buffer between it and any other ship and cannot be drawn outside of the gameboard.`;

    // Start the ship placement loop

    boardContainer.addEventListener("click", handleCellClick);
    nextShipButton.addEventListener("click", handleNextShipButtonClick);
  },

  addPlayerAttackListener(callback) {
    const computerCells = document.querySelectorAll(
      "section.computer-board .cell"
    );
    computerCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        const { rowCol } = e.target.dataset;
        // console.log('player attack computer board', rowCol);
        callback(rowCol);
        this.computerInput(newPlayerBoard, newComputer);
      });
    });
  },

  gameEnd(computerBoard, playerBoard) {
    // display modal that says game over and asks if you want to play again
    // if yes, call gameStart()
    // if no, close modal
    if (computerBoard.allShipsSunk()) {
      alert("player wins");
      console.log("player wins");
    }
    if (playerBoard.allShipsSunk()) {
      alert("computer wins");
      console.log("computer wins");
    }
  },
  playerInput(e, callback) {
    const cellClicked = e.target.dataset.rowCol;
    console.log("player attack computer board", cellClicked);
    callback(cellClicked);
    this.computerInput(newPlayerBoard, newComputer);
    const computerCell = document.querySelector(
      `section.computer-board .cell[data-row-col="${x}, ${y}"]`
    );
    computerCell.dataset.status = newStatus;
    domNewMethods.gameEnd(newComputerBoard, newPlayerBoard);
  },
  computerInput(playerBoard, computer) {
    let computerAttack;
    let newStatus;

    computerAttack = computer.computerAttack(playerBoard.gameboard);
    const x = +computerAttack[0];
    const y = +computerAttack[3];

    newStatus = playerBoard.gameboard[x][y][2];

    playerBoard.receiveAttack(computerAttack);
    domNewMethods.gameEnd(newComputerBoard, newPlayerBoard);
  },
};
export default domNewMethods;
