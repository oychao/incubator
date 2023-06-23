import { Visitor } from 'Visitor';
import { AstType, Expr } from './Expr';
import { Factor } from 'Expr/Factor';

export class Unary extends Expr {
  public prefix?: '-';

  public value: Factor;

  constructor({ prefix, value }: { prefix?: '-'; value: Factor }) {
    super();
    this.type = AstType.Unary;
    this.prefix = prefix;
    this.value = value;
  }

  public accept<R = void>(visitor: Visitor): R {
    return visitor.visitUnary(this);
  }
}
