import { Add } from 'Expr/Add';
import { Expression } from 'Expr/Expression';
import { Factor } from 'Expr/Factor';
import { Mul } from 'Expr/Mul';
import { Unary } from 'Expr/Unary';

export interface Visitor {
  visitExpression(expression: Expression): any;
  visitAdd(add: Add): any;
  visitMul(mul: Mul): any;
  visitUnary(unary: Unary): any;
  visitFactor(factor: Factor): any;
}
