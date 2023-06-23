import { Visitor } from 'Visitor';
import { AstType, Expr } from 'Expr/Expr';
import { Mul } from 'Expr/Mul';

export class Add extends Expr {
  public left: Mul | Add;

  public op?: '+' | '-';

  public right?: Mul;

  constructor({
    left,
    op,
    right,
  }: {
    left: Mul | Add;
    op?: '+' | '-';
    right?: Mul;
  }) {
    super();
    this.type = AstType.Add;
    this.left = left;
    this.op = op;
    this.right = right;
  }

  public accept<R = void>(visitor: Visitor): R {
    return visitor.visitAdd(this);
  }
}
