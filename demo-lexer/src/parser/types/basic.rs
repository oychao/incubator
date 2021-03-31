use crate::lexer::tokenizer::TOKEN_DECLARATION;
use crate::lexer::tokenizer::TOKEN_DOUBLE_TYPE;
use crate::lexer::tokenizer::TOKEN_I32_TYPE;
use crate::lexer::tokenizer::TOKEN_STRING_TYPE;
use crate::parser::common::ComponentBase;
use crate::parser::common::WalkerStep;
use crate::parser::ComponentBehavior;
use crate::Token;

#[derive(Debug, PartialEq)]
pub struct BasicType<'a> {
  pub base: ComponentBase<'a>,
  value: String,
}

impl<'a> ComponentBehavior<'a> for BasicType<'a> {
  fn init(token_list: &'a std::vec::Vec<Token>, start: usize) -> Self {
    let cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };
    // println!("namespace: {:?}", cur);

    if !BasicType::is_start_condition_matched(cur.token) {
      // error
    }

    let base = ComponentBase {
      token_list,
      start,
      end: start,
    };

    BasicType {
      base,
      value: cur.token.value.clone(),
    }
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    [
      TOKEN_DECLARATION,
      TOKEN_STRING_TYPE,
      TOKEN_I32_TYPE,
      TOKEN_DOUBLE_TYPE,
    ]
    .contains(&token.name)
  }

  fn is_end_condition_matched(_: &Token) -> bool {
    true
  }

  fn get_base(&self) -> &ComponentBase<'_> {
    &self.base
  }

  fn parse(&self) -> String {
    String::from(&self.value)
  }
}
