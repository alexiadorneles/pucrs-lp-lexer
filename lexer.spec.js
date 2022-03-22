const { tokenizeLine } = require("./lexer");

describe("lexer", () => {
  it("should work for abc:=(aux-2)*200/(19)-67+teste", () => {
    const result = `('abc', IDENT, 1)
    (':=', ASSIGN_OP, 12)
    ('(', LPAREN, 3)
    ('aux', IDENT, 1)
    ('-', SUB_OP, 6)
    ('2', INT_LIT, 2)
    (')', RPAREN, 4)
    ('*', MUL_OP, 7)
    ('200', INT_LIT, 2)
    ('/', DIV_OP, 8)
    ('(', LPAREN, 3)
    ('19', INT_LIT, 2)
    (')', RPAREN, 4)
    ('-', SUB_OP, 6)
    ('67', INT_LIT, 2)
    ('+', ADD_OP, 5)
    ('teste', IDENT, 1)`;

    expect(
      tokenizeLine("abc:=(aux-2)*200/(19)-67+teste")
        .split("\n")
        .map((str) => str.trim())
    ).toEqual(result.split("\n").map((str) => str.trim()));
  });

  it("should work for a := (aux - 2) * 200 / 19", () => {
    const result = `('a', IDENT, 1)
    (':=', ASSIGN_OP, 12)
    ('(', LPAREN, 3)
    ('aux', IDENT, 1)
    ('-', SUB_OP, 6)
    ('2', INT_LIT, 2)
    (')', RPAREN, 4)
    ('*', MUL_OP, 7)
    ('200', INT_LIT, 2)
    ('/', DIV_OP, 8)
    ('19', INT_LIT, 2)`;

    expect(
      tokenizeLine("a := (aux - 2) * 200 / 19")
        .split("\n")
        .map((str) => str.trim())
    ).toEqual(result.split("\n").map((str) => str.trim()));
  });
  it("should work for a == (aux - 2) * 200 / 19", () => {
    const result = `('a', IDENT, 1)
    ('==', EQ_OP, 11)
    ('(', LPAREN, 3)
    ('aux', IDENT, 1)
    ('-', SUB_OP, 6)
    ('2', INT_LIT, 2)
    (')', RPAREN, 4)
    ('*', MUL_OP, 7)
    ('200', INT_LIT, 2)
    ('/', DIV_OP, 8)
    ('19', INT_LIT, 2)`;

    expect(
      tokenizeLine("a == (aux - 2) * 200 / 19")
        .split("\n")
        .map((str) => str.trim())
    ).toEqual(result.split("\n").map((str) => str.trim()));
  });

  it('should work for a := 1', () => {
    const result = `('a', IDENT, 1)
    (':=', ASSIGN_OP, 12)
    ('1', INT_LIT, 2)`;

    expect(tokenizeLine("a := 1")
      .split("\n")
      .map((str) => str.trim())
    ).toEqual(result.split("\n").map((str) => str.trim()))
  })
});
