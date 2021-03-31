use crate::lexer::tokenizer::TOKEN_RIGHT_BRACKET;
use crate::parser::common::ComponentBase;
use crate::parser::common::ComponentBehavior;
use crate::parser::common::WalkerStep;
use crate::parser::TOKEN_SERVICE;
use crate::Token;

pub struct Service<'a> {
  pub base: ComponentBase<'a>,
}

impl<'a> ComponentBehavior<'a> for Service<'a> {
  fn init(token_list: &'a std::vec::Vec<Token>, start: usize) -> Self {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };
    // println!("namespace: {:?}", cur);

    if !Service::is_start_condition_matched(cur.token) {
      // error
    }

    while !Service::is_end_condition_matched(cur.token) {
      cur = ComponentBase::read_next_token(token_list, cur.index);
    }

    let base = ComponentBase {
      token_list,
      start,
      end: cur.index - 1,
    };

    Service { base }
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    TOKEN_SERVICE == token.name
  }

  fn is_end_condition_matched(token: &Token) -> bool {
    TOKEN_RIGHT_BRACKET == token.name
  }

  fn get_base(&self) -> &'a ComponentBase {
    &self.base
  }

  fn parse(&self) -> String {
    String::from("")
  }
}
