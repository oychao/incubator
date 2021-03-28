#[derive(Debug)]
pub struct Token<'a> {
  pub name: &'a str,
  pub value: &'a str,
  pub start: usize,
  pub end: usize,
}

impl<'a> Token<'a> {
  pub fn new(name: &'a str, value: &'a str, start: usize, end: usize) -> Token<'a> {
    Token {
      name,
      value,
      start,
      end,
    }
  }
}
