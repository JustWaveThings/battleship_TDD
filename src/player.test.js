import PlayerFactory from "./player";
/*
Write tests for playerFactory

what are the public methods and properties of playerFactory?

- set / get PlayerName
- playerMove
- isCurrentPlayer

*/

describe("PlayerFactory", () => {
  let player;
  let turn = 0;
  let playX = 0;
  let playY = 0;

  beforeEach(() => {
    player = PlayerFactory("Jimmy");
  });

  test("setPlayerName", () => {
    expect(player.getPlayerName()).toEqual("Jimmy");
  });

  test("playerMove - expect to send", () => {
    expect(player.playerMove(playX, playY)).toEqual([0, 0]);
  });

  test("isCurrentPlayer", () => {
    expect(player.isCurrentPlayer(turn)).toEqual(false);
  });
});
