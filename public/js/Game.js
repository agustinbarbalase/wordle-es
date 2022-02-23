import { MIN_TIME_BETWEEN_MATCHS } from "./config.js";

class Game {
  constructor() {
    this.currentNumberRow = 0;
    this.currentNumberCell = 0;
    this.currentGame = document.querySelector("#current-game");
    this.currentDate = new Date();
    this.contentTimer = document.querySelector("#hidden-timer");
    this.timer = document.querySelector("#timer");
    this.words = document.querySelector("#words");
    this.attempts = document.querySelector("#attempts");
    this.winsByRow = document.querySelector("#wins-by-row");
    this.winGame = document.querySelector("#win-game");
    this.currentWord;
    this.Table;
    this.Keyboard;
    this.User;
  }

  setTable(Table) {
    this.Table = Table;
  }

  setKeyboard(Keyboard) {
    this.Keyboard = Keyboard;
  }

  setUser(User) {
    this.User = User;
  }

  toggleTimer() {
    this.currentGame.style.display =
      this.currentGame.style.display === "none" ? "inline" : "none";
    this.contentTimer.style.display =
      this.contentTimer.style.display === "inline" ? "none" : "inline";
  }

  setTimer(time, isWin) {
    let idInterval;
    time = new Date(time);
    this.currentDate = new Date();

    this.toggleTimer();
    this.renderStatistics();
    idInterval = setInterval(() => {
      if (
        this.currentDate.getTime() - time.getTime() >=
        MIN_TIME_BETWEEN_MATCHS
      ) {
        clearInterval(idInterval);
        this.toggleTimer();
        this.clearTimerAndStatistics();
        this.User.changeMatch(isWin);
        this.Table.clearTable();
        this.currentNumberCell = 0;
        this.currentNumberRow = 0;
      } else {
        this.currentDate.setSeconds(this.currentDate.getSeconds() + 1);
        this.renderTimer(this.currentDate.getTime() - time.getTime());
      }
    }, 1000);
  }

  renderStatistics() {
    this.words.innerText = `Words: ${this.User.statistics.words}`;
    this.attempts.innerText = `Attempts: ${this.User.statistics.attempts}`;
    this.User.statistics.winsByRow.map((item, index) => {
      let winRow = document.createElement("div");
      winRow.innerText = `${index + 1}: ${item}`;
      this.winsByRow.appendChild(winRow);
    });
    this.attempts.innerText = `Attempts: ${this.User.statistics.attempts}`;
  }

  parseSeconds(seconds) {
    return seconds < 10 ? `0${seconds}` : `${seconds}`;
  }

  renderTimer(diff) {
    this.timer.innerText = `${Math.floor(
      (diff / (1000 * 60)) % 60
    )}:${this.parseSeconds(Math.floor((diff / 1000) % 60))}`;
  }

  clearTimerAndStatistics() {
    this.timer.innerText = "0:00";
    while (this.winsByRow.hasChildNodes()) {
      this.winsByRow.removeChild(this.winsByRow.firstChild);
    }
  }

  getCurrentWord() {
    fetch("/word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.User.statistics),
    })
      .then((res) => res.json())
      .then((res) => {
        this.currentWord = res.currentWord;
        if (this.currentWord === false) {
          this.toggleRenderWinGame();
        }
      })
      .catch((err) => console.error(err));
  }

  toggleRenderWinGame() {
    this.currentGame.style.display =
      "none" === this.currentGame.style.display ? "inline" : "none";
    this.winGame.style.display =
      "inline" === this.winGame.style.display ? "none" : "inline";
  }

  init() {
    this.getCurrentWord();

    if (this.User.statistics.timeAgoLastWord !== null) {
      this.setTimer(
        this.User.statistics.timeAgoLastWord,
        this.User.statistics.isWin
      );
    }

    if (this.User.statistics.currentGame) {
      this.User.statistics.currentGame.map((item) => {
        let word = Object.keys(item)[0].split("");
        word.map((letter, index) => {
          let currentCell = this.Table.getCurrentCell();
          if (item[word.join("")][index]) {
            currentCell.classList.add(item[word.join("")][index]);
          }
          this.Keyboard.letterKey(letter);
        });
        this.currentNumberRow++;
        this.currentNumberCell = 0;
      });
    }
  }
}

export default Game;
