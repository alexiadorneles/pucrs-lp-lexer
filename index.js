// Autores:
// Aléxia Dorneles
// Leonardo Berlatto

const fs = require("fs");

/*
    Considerações sobre a linguagem:
    Variáveis não podem começar com dígitos mas podem ter dígitos e caracteres depois do segundo símbolo.
    As expressões possuem apenas números inteiros.
    Não há números negativos neste nível de análise ainda.
    Considere que os lexemas relativos aos números terão tamanho menor 100 dígitos. A mesma restrição de tamanho se aplica aos nomes de variáveis.
*/

let read = [];
const operators = ["/", "-", "(", ")", "*", "+", "<", ">"];
let outputs = [];

const readFile = () => {
  return fs.readFileSync("./test.txt").toString();
};

const tokenizeLine = (content) => {
  const chars = content.replace(new RegExp(/ /gi), "").split("").reverse();
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    read.push(char);

    if (char === ":") {
      const last = read[read.length - 2];
      if (last === "=") {
        const data = read.reverse().join("");
        output(data, "ASSIGN_OP", 12);
        read = [];
      }
    }

    if (char === "=") {
      const last = read[read.length - 2];
      if (last === "=") {
        const data = read.reverse().join("");
        output(data, "EQ_OP", 11);
        read = [];
      }

      continue;
    }

    if (Number(char)) {
      continue;
    }

    if (operators.includes(char)) {
      const lastRead = read.pop();
      const data = read.reverse().join("");
      const id = Number(data) ? 2 : 1;
      const token = Number(data) ? "INT_LIT" : "IDENT";
      read.length && output(data, token, id);
      read = [lastRead];

      if (char === "/") {
        output(read.reverse().join(""), "DIV_OP", 8);
        read = [];
      } else if (char === "*") {
        output(read.reverse().join(""), "MUL_OP", 7);
        read = [];
      } else if (char === ")") {
        output(read.reverse().join(""), "RPAREN", 4);
        read = [];
      } else if (char === "(") {
        output(read.reverse().join(""), "LPAREN", 3);
        read = [];
      } else if (char === "-") {
        output(read.reverse().join(""), "SUB_OP", 6);
        read = [];
      } else if (char === "+") {
        output(read.reverse().join(""), "ADD_OP", 5);
        read = [];
      } else if (char === ">") {
        output(read.reverse().join(""), "GT_OP", 9);
        read = [];
      } else if (char === "<") {
        output(read.reverse().join(""), "LT_OP", 10);
        read = [];
      }
    }

    if (i === chars.length - 1) {
      const data = read.reverse().join("");
      output(data, "IDENT", 1);
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

console.log(tokenizeLine(readFile()));

module.exports = { tokenizeLine };
