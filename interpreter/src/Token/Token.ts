export enum TokenType {
  EOF = 'EoF',
  EOL = 'EoL',
  OP = 'Op',
  GROUP = 'Group',
  NUMBER = 'Number',
}

export interface Token<V> {
  type: TokenType;
  value?: V;
}
