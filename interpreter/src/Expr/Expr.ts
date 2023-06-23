import { Visitor } from 'Visitor';

export enum AstType {
  Expression = 'Expression',
  Add = 'Add',
  Mul = 'Mul',
  Unary = 'Unary',
  Factor = 'Factor',
}

export abstract class Expr {
  protected type: AstType;

  public abstract accept<R = void>(visitor: Visitor): R;
}
