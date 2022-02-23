import { MAX_ROWS_TABLE, MAX_LETTER_TABLE } from "./config.js";

class Table {
  constructor() {
    this.table = document.querySelector(".table");
    this.Game;
  }

  setGame(Game) {
    this.Game = Game;
  }

  appendRowToTable(id) {
    const newRow = document.createElement("div");
    newRow.id = `row-${id}`;
    newRow.classList.add("row");
    return newRow;
  }

  appendLetterToRow(row, col) {
    const newLetter = document.createElement("div");
    newLetter.id = `cell-${row}-${col}`;
    newLetter.classList.add("cell");
    newLetter.classList.add("flip-horizontal-bottom");
    return newLetter;
  }

  getCurrentRow() {
    let currentRow = [];

    for (let i = 0; i < MAX_LETTER_TABLE; i++) {
      currentRow.push(
        document.getElementById(`cell-${this.Game.currentNumberRow}-${i}`)
      );
    }

    return currentRow;
  }

  getCurrentCell() {
    return document.getElementById(
      `cell-${this.Game.currentNumberRow}-${this.Game.currentNumberCell}`
    );
  }

  clearTable() {
    for (let i = 0; i < MAX_ROWS_TABLE; i++) {
      let currentRow = document.getElementById(`row-${i}`);
      for (let j = 0; j < MAX_LETTER_TABLE; j++) {
        currentRow.children[j].innerText = '';
        currentRow.children[j].classList.remove('correct-pos');
        currentRow.children[j].classList.remove('exist-letter');
      }
    }
  }

  init() {
    for (let i = 0; i < MAX_ROWS_TABLE; i++) {
      this.table.appendChild(this.appendRowToTable(i));
      let currentRow = document.getElementById(`row-${i}`);
      for (let j = 0; j < MAX_LETTER_TABLE; j++) {
        currentRow.appendChild(this.appendLetterToRow(i, j));
      }
    }
  }
}

export default Table;
