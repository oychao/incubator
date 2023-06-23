import { Parser } from 'Parser';
import { Scanner } from 'Scanner';
import { Evaluator } from 'Visitor/Evaluator';
import { InversePolish } from 'Visitor/InversePolish';

export function main() {
  const scanner = new Scanner('123 + 456 * 222 + -666');
  scanner.scan();
  // scanner.print();

  const parser = new Parser(scanner.getTokens());
  parser.parse();
  // parser.print();

  const evaluator = new Evaluator(parser.getAst());
  console.log(evaluator.visit());

  const inversePolish = new InversePolish(parser.getAst());
  console.log(inversePolish.visit());
}

main();
