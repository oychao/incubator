import { Visitor } from 'Visitor';
import { AstType, Expr } from 'Expr/Expr';
import { Expression } from 'Expr/Expression';

export class Factor extends Expr {
  public value: number | Expression;

  constructor({ value }: { value: number | Expression }) {
    super();
    this.type = AstType.Factor;
    this.value = value;
  }

  public accept<R = void>(visitor: Visitor): R {
    return visitor.visitFactor(this);
  }
}
