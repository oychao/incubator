use crate::parser::common::ComponentBase;
use crate::parser::common::ComponentBehavior;
use crate::parser::common::WalkerStep;
use crate::parser::COMPONENT_NAMES;
use crate::parser::TOKEN_NAMESPACE;
use crate::Token;

pub struct Namespace<'a> {
  pub base: ComponentBase<'a>,
}

impl<'a> ComponentBehavior<'a> for Namespace<'a> {
  fn init(token_list: &'a std::vec::Vec<Token>, start: usize) -> Self {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };
    // println!("namespace: {:?}", cur);

    if !Namespace::is_start_condition_matched(cur.token) {
      // error
    }

    cur = ComponentBase::read_next_token(token_list, cur.index);

    while !Namespace::is_end_condition_matched(cur.token) {
      // println!("namespace: {:?}", cur);
      cur = ComponentBase::read_next_token(token_list, cur.index);
    }

    let base = ComponentBase {
      token_list,
      start,
      end: cur.index - 1,
    };

    let namespace = Namespace { base };
    namespace
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    TOKEN_NAMESPACE == token.name
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
