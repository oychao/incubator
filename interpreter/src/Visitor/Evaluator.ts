import { Add } from 'Expr/Add';
import { Expression } from 'Expr/Expression';
import { Factor } from 'Expr/Factor';
import { Mul } from 'Expr/Mul';
import { Unary } from 'Expr/Unary';
import { Visitor } from 'Visitor/Visitor';

export class Evaluator implements Visitor {
  #ast: any;

  constructor(ast: any) {
    this.#ast = ast;
  }

  public visit() {
    return this.visitExpression(this.#ast);
  }

  public visitExpression(expression: Expression) {
    return this.visitAdd(expression.add);
  }

  public visitAdd(add: Add): number {
    let left =
      add.left instanceof Add
        ? this.visitAdd(add.left)
        : this.visitMul(add.left);
    if (add.op) {
      const right = this.visitMul(add.right);
      switch (add.op) {
        case '-':
          left = left - right;
          break;
        case '+':
          left = left + right;
          break;
        default:
          break;
      }
    }
    return left;
  }

  public visitMul(mul: Mul): number {
    let left =
      mul.left instanceof Mul
        ? this.visitMul(mul.left)
        : this.visitUnary(mul.left);
    if (mul.op) {
      const right = this.visitUnary(mul.right);
      switch (mul.op) {
        case '*':
          left = left * right;
          break;
        case '/':
          left = left / right;
          break;
        default:
          break;
      }
    }
    return left;
  }

  public visitUnary(unary: Unary): number {
    const result = this.visitFactor(unary.value);
    if (unary.prefix) {
      return -result;
    }
    return result;
  }

  public visitFactor(factor: Factor): number {
    return 'number' === typeof factor.value
      ? factor.value
      : this.visitExpression(factor.value);
  }
}
