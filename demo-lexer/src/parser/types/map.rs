use crate::lexer::tokenizer::TOKEN_MAP_TYPE;
use crate::lexer::tokenizer::TOKEN_RIGHT_ANGLE_BRACKET;
use crate::parser::common::ComponentBase;
use crate::parser::common::WalkerStep;
use crate::parser::ComponentBehavior;
use crate::Token;

#[derive(Debug, PartialEq)]
pub struct MapType<'a> {
  pub base: ComponentBase<'a>,
  value: String,
}

impl<'a> ComponentBehavior<'a> for MapType<'a> {
  fn init(token_list: &'a std::vec::Vec<Token>, start: usize) -> Self {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };
    // println!("namespace: {:?}", cur);

    if !MapType::is_start_condition_matched(cur.token) {
      // error
    }

    cur = ComponentBase::read_next_token(token_list, cur.index);

    let base = ComponentBase {
      token_list,
      start,
      end: start,
    };

    MapType {
      base,
      value: cur.token.value.clone(),
    }
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    TOKEN_MAP_TYPE == token.name
  }

  fn is_end_condition_matched(token: &Token) -> bool {
    TOKEN_RIGHT_ANGLE_BRACKET == token.name
  }

  fn get_base(&self) -> &ComponentBase<'_> {
    &self.base
  }

  fn parse(&self) -> String {
    String::from(&self.value)
  }
}
