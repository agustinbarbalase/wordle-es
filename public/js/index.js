let currentWord = "REINO";
import Game from "./Game.js";
import Table from "../../js/Table.js";
import Keyboard from "./Keyboard.js";
import User from "./User.js";

window.onload = () => {
  const game = new Game();
  const table = new Table();
  const keyboard = new Keyboard();
  const user = new User();

  game.setKeyboard(keyboard);
  game.setTable(table);
  game.setUser(user);
  table.setGame(game);
  keyboard.setGame(game);
  user.setGame(game);

  table.init();
  keyboard.init();
  game.init();
};  
