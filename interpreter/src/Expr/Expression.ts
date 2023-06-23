import { Visitor } from 'Visitor';
import { AstType, Expr } from 'Expr/Expr';
import { Add } from 'Expr/Add';

export class Expression extends Expr {
  public add: Add;

  constructor({ add }: { add: Add }) {
    super();
    this.type = AstType.Expression;
    this.add = add;
  }

  public accept<R = void>(visitor: Visitor): R {
    visitor.visitExpression(this);

    return undefined;
  }
}
