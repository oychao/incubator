import { Visitor } from 'Visitor';
import { AstType, Expr } from 'Expr/Expr';
import { Unary } from 'Expr/Unary';

export class Mul extends Expr {
  public left: Unary | Mul;

  public op?: '*' | '/';

  public right?: Unary;

  constructor({
    left,
    op,
    right,
  }: {
    left: Unary | Mul;
    op?: '*' | '/';
    right?: Unary;
  }) {
    super();
    this.type = AstType.Mul;
    this.left = left;
    this.op = op;
    this.right = right;
  }

  public accept<R = void>(visitor: Visitor): R {
    visitor.visitMul(this);

    return undefined;
  }
}
