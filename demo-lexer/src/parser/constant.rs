use crate::parser::common::ComponentBase;
use crate::parser::common::ComponentBehavior;
use crate::parser::common::WalkerStep;
use crate::parser::COMPONENT_NAMES;
use crate::parser::TOKEN_CONST;
use crate::Token;

pub struct Constant<'a> {
  pub base: ComponentBase<'a>,
}

impl<'a> ComponentBehavior<'a> for Constant<'a> {
  fn init(token_list: &'a Vec<Token>, start: usize) -> Constant {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };
    // println!("namespace: {:?}", cur);

    if !Constant::is_start_condition_matched(cur.token) {
      // error
    }

    cur = ComponentBase::read_next_token(token_list, cur.index);

    while !Constant::is_end_condition_matched(cur.token) {
      cur = ComponentBase::read_next_token(token_list, cur.index);
    }

    let base = ComponentBase {
      token_list,
      start,
      end: cur.index - 1,
    };
    Constant { base }
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    TOKEN_CONST == token.name
  }

  fn is_end_condition_matched(token: &Token) -> bool {
    COMPONENT_NAMES.contains(&token.name)
  }

  fn get_base(&self) -> &'a ComponentBase {
    &self.base
  }

  fn parse(&self) -> String {
    String::from("")
  }
}
