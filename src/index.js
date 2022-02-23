const express = require("express");
require("dotenv").config();

const app = express();

const WORDS = process.env.WORDS || "";
const PORT = process.env.PORT || 3000;
const LIST_OF_WORDS =
  WORDS.split(";")[0] === ""
    ? ["REINO", "REINA", "ARBOL", "GUSTO", "FLORA", "JULIO"]
    : WORDS.split(";");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/word", (req, res) => {
  const { words } = req.body;
  res.status(200).send({
    currentWord: LIST_OF_WORDS[words] || false,
  });
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
