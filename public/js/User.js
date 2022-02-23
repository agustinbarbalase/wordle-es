import { MAX_ROWS_TABLE } from "./config.js";

class User {
  constructor() {
    this.statistics = JSON.parse(localStorage.getItem("statistics")) || {
      words: 0,
      attempts: 0,
      timeAgoLastWord: null,
      currentGame: [],
      winsByRow: Array(MAX_ROWS_TABLE).fill(0),
      isWin: null,
    };
    this.Game;
  }

  setTimeAgoLastWord(time, isWin) {
    this.statistics.timeAgoLastWord = time;
    this.statistics.isWin = isWin;
    this.saveStatistics();
    this.Game.setTimer(time, isWin);
  }

  addCurrentGame(word, lettersState) {
    this.statistics.currentGame.push({ [word]: lettersState });
    this.saveStatistics();
  }

  addAttemp() {
    this.statistics.attempts += 1;
    this.saveStatistics();
  }

  addWord() {
    this.statistics.words += 1;
    this.saveStatistics();
  }

  addWinsByRow() {
    this.statistics.winsByRow[this.Game.currentNumberRow - 1]++;
    this.saveStatistics();
  }

  deleteTimeAgoLastWord() {
    this.statistics.timeAgoLastWord = null;
    this.saveStatistics();
  }

  clearIsWin() {
    this.statistics.isWin = null;
    this.saveStatistics();
  }

  clearCurrentGame() {
    this.statistics.currentGame = [];
    this.saveStatistics();
  }

  changeMatch(isWin) {
    if (isWin) {
      this.addWord();
      this.addWinsByRow();
      this.Game.getCurrentWord();
    }
    this.addAttemp();
    this.deleteTimeAgoLastWord();
    this.clearIsWin();
    this.clearCurrentGame();
  }

  saveStatistics() {
    localStorage.setItem("statistics", JSON.stringify(this.statistics));
  }

  setGame(Game) {
    this.Game = Game;
  }
}

export default User;
