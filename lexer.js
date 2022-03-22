// Autores:
// Aléxia Dorneles
// Leonardo Berlatto
const tokens = require("./tokens.json");

let read = [];
let outputs = [];

const tokenByOperator = (token) =>
  Object.entries(tokens).find(([key, value]) => value.operator === token)[0];

const operators = Object.values(tokens)
  .map((token) => token.operator)
  .filter(Boolean);

const classifyLeftChars = () => {
  const id = Number(buildOutput()) ? 2 : 1;
  const token = Number(buildOutput()) ? "INT_LIT" : "IDENT";
  read.length && output(buildOutput(), token, id);
}

const buildOutput = () => read.reverse().join("");

const tokenizeLine = (content) => {
  const chars = content.replace(new RegExp(/ /gi), "").split("").reverse();

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    read.push(char);

    if (char === ":") {
      const last = read[read.length - 2];
      if (last === "=") {
        output(buildOutput(), "ASSIGN_OP", 12);
        read = [];
      } else {
        const current = read.pop()
        classifyLeftChars();
        read = [current];
      }
    }

    if (char === "=") {
      const last = read[read.length - 2];
      if (last === "=") {
        output(buildOutput(), "EQ_OP", 11);
        read = [];
      } else {
        const current = read.pop()
        classifyLeftChars();
        read = [current];
      }

      continue;
    }

    if (i === chars.length - 1) {
      classifyLeftChars();
    }

    if (Number(char)) {
      continue;
    }

    if (operators.includes(char)) {
      const lastRead = read.pop();
      classifyLeftChars();
      read = [lastRead];

      const operatorKey = tokenByOperator(char);
      output(read.reverse().join(""), operatorKey, tokens[operatorKey].id);
      read = [];
    }


  }

  const result = outputs.reverse().join("\n");
  outputs = [];
  read = [];
  return result;
};

const output = (lexema, token, id) => {
  outputs.push(`('${lexema}', ${token}, ${id})`);
};


module.exports = { tokenizeLine };
