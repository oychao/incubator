use crate::Token;

#[derive(Debug, PartialEq)]
pub struct ComponentBase<'a> {
  pub token_list: &'a Vec<Token>,
  pub start: usize,
  pub end: usize,
}

#[derive(Debug, PartialEq)]
pub struct WalkerStep<'a> {
  pub index: usize,
  pub token: &'a Token,
}

impl<'a> ComponentBase<'a> {
  // pub fn get_token_slice(&self) -> Vec<&'a Token> {
  //   let mut slice = vec![];
  //   let mut i: usize = self.start;
  //   while i < self.end {
  //     slice.push(&self.token_list[i]);
  //     i += 1;
  //   }
  //   slice
  // }

  pub fn read_next_token(token_list: &'a Vec<Token>, i: usize) -> WalkerStep {
    let step = WalkerStep {
      index: i + 1,
      token: token_list.get(i + 1).unwrap(),
    };
    // println!("{:?}", step);
    step
  }
}

pub trait ComponentBehavior<'a> {
  fn init(token_list: &'a Vec<Token>, start: usize) -> Self;
  fn is_start_condition_matched(token: &Token) -> bool;
  fn is_end_condition_matched(token: &Token) -> bool;
  fn get_base(&self) -> &ComponentBase;
  fn parse(&self) -> String {
    String::from("")
  }
}
