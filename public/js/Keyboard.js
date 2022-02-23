import {
  KEYBOARD,
  MAX_LETTER_KEYBOARD,
  MAX_LETTER_TABLE,
  MAX_ROWS_TABLE,
} from "./config.js";

class Keyboard {
  constructor() {
    this.keyboard = document.querySelector(".keyboard");
    this.Game;
  }

  setGame(Game) {
    this.Game = Game;
  }

  appendLetterToKeyboard(letter) {
    const newLetter = document.createElement("button");
    newLetter.id = `key-${letter}`;
    newLetter.classList.add("key");
    newLetter.innerText = letter;
    return newLetter;
  }

  letterKey(key) {
    let currentCell = this.Game.Table.getCurrentCell();
    if (currentCell) {
      currentCell.innerText = key;
      this.Game.currentNumberCell++;
    }
  }

  deleteKey() {
    let currentCell = document.getElementById(
      `cell-${this.Game.currentNumberRow}-${this.Game.currentNumberCell - 1}`
    );
    if (currentCell) {
      currentCell.innerText = "";
      this.Game.currentNumberCell--;
    }
  }

  async enterKey() {
    let sendedWord = "";
    let lettersState = new Array(5);
    const currentRow = this.Game.Table.getCurrentRow();

    currentRow.map((cell) => {
      sendedWord += cell.innerText;
    });

    const sendedLetters = sendedWord.split("");
    let currentLetters = this.Game.currentWord.split("");
    let correctLetters = 0;

    currentRow.map((cell, index) => {
      if (sendedLetters[index] === currentLetters[index]) {
        cell.classList.add("correct-pos");
        currentLetters[index] = null;
        correctLetters++;
        lettersState[index] = "correct-pos";
      }
    });

    currentRow.map((cell, index) => {
      if (currentLetters.includes(sendedLetters[index])) {
        cell.classList.add("exist-letter");
        currentLetters[currentLetters.indexOf(sendedLetters[index])] = null;
        lettersState[index] = "exist-letter";
      }
    });

    
    this.Game.currentNumberRow++;
    this.Game.currentNumberCell = 0;
    this.Game.User.addCurrentGame(sendedWord, lettersState);

    if (correctLetters === MAX_LETTER_TABLE) {
      setTimeout(() => {
        this.Game.User.setTimeAgoLastWord(new Date(), true);
      }, 1000);
    } else if (this.Game.currentNumberRow === MAX_ROWS_TABLE) {
      setTimeout(() => {
        this.Game.User.setTimeAgoLastWord(new Date(), false);
      }, 1000);
    }
  }

  init() {
    for (let i = 0; i < MAX_LETTER_KEYBOARD; i++) {
      this.keyboard.appendChild(this.appendLetterToKeyboard(KEYBOARD[i]));
      let currentKey = document.getElementById(`key-${KEYBOARD[i]}`);
      currentKey.addEventListener("click", () => {
        if (KEYBOARD[i] !== "Enter" && KEYBOARD[i] !== "Del") {
          this.letterKey(KEYBOARD[i]);
        } else if (KEYBOARD[i] === "Del") {
          this.deleteKey();
        } else if (KEYBOARD[i] === "Enter") {
          this.enterKey();
        }
      });
    }

    window.addEventListener("keydown", (event) => {
      let letter = event.key === "Backspace" ? "Del" : event.key;
      if (letter.length === 1) {
        this.letterKey(letter.toUpperCase());
      } else if (letter === "Del") {
        this.deleteKey();
      } else if (letter === "Enter") {
        this.enterKey();
      }
    });
  }
}

export default Keyboard;
