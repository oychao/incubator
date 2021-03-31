use crate::lexer::tokenizer::TOKEN_LEFT_ANGLE_BRACKET;
use crate::lexer::tokenizer::TOKEN_LIST_TYPE;
use crate::lexer::tokenizer::TOKEN_RIGHT_ANGLE_BRACKET;
use crate::parser::common::ComponentBase;
use crate::parser::common::WalkerStep;
use crate::parser::types::CommonType;
use crate::parser::ComponentBehavior;
use crate::Token;

#[derive(Debug, PartialEq)]
pub struct ListType<'a> {
  pub base: ComponentBase<'a>,
  value: String,
}

impl<'a> ComponentBehavior<'a> for ListType<'a> {
  fn init(token_list: &'a std::vec::Vec<Token>, start: usize) -> Self {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };
    // println!("namespace: {:?}", cur);

    if !ListType::is_start_condition_matched(cur.token) {
      // error
    }

    let mut value: String = String::from("");

    cur = ComponentBase::read_next_token(token_list, cur.index);
    assert_eq!(TOKEN_LEFT_ANGLE_BRACKET, cur.token.name);

    cur = ComponentBase::read_next_token(token_list, cur.index);

    let common_type = CommonType::init(token_list, cur.index);
    value.push_str(&common_type.parse().as_str());

    cur = ComponentBase::read_next_token(token_list, common_type.base.end);
    assert_eq!(TOKEN_RIGHT_ANGLE_BRACKET, cur.token.name);

    let base = ComponentBase {
      token_list,
      start,
      end: cur.index,
    };

    ListType { base, value }
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    TOKEN_LIST_TYPE == token.name
  }

  fn is_end_condition_matched(token: &Token) -> bool {
    TOKEN_RIGHT_ANGLE_BRACKET == token.name
  }

  fn get_base(&self) -> &ComponentBase<'_> {
    &self.base
  }

  fn parse(&self) -> String {
    format!("list<{}>", &self.value)
  }
}
