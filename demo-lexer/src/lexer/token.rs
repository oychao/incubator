#[derive(Debug, PartialEq)]
pub struct Token {
  pub name: &'static str,
  pub value: String,
  pub start: usize,
  pub end: usize,
}

impl Token {
  pub fn new(name: &'static str, value: String, start: usize, end: usize) -> Token {
    Token {
      name,
      value,
      start,
      end,
    }
  }
}
