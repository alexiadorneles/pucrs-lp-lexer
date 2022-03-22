// Autores:
// Aléxia Dorneles
// Leonardo Berlatto

const fs = require("fs");
const { tokenizeLine } = require("./lexer");


const readFile = () => {
  return fs.readFileSync("./test.txt").toString();
};

readFile().split('\n').forEach(line => {
  console.log(tokenizeLine(line))
});
