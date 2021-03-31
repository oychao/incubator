use crate::lexer::tokenizer::COMMENT_PART;
use crate::lexer::tokenizer::TOKEN_DECLARATION;
use crate::lexer::tokenizer::TOKEN_EQUAL;
use crate::lexer::tokenizer::TOKEN_LEFT_BRACKET;
use crate::lexer::tokenizer::TOKEN_RIGHT_BRACKET;
use crate::parser::common::ComponentBase;
use crate::parser::common::ComponentBehavior;
use crate::parser::common::WalkerStep;
use crate::parser::TOKEN_ENUM;
use crate::Token;

#[derive(Debug, PartialEq)]
struct EnumerationKVPair<'a> {
  key: &'a str,
  value: &'a str,
}

impl<'a> EnumerationKVPair<'a> {
  fn init(key: &'a str, value: &'a str) -> EnumerationKVPair<'a> {
    EnumerationKVPair { key, value }
  }
}

#[derive(Debug, PartialEq)]
pub struct Enumeration<'a> {
  pub base: ComponentBase<'a>,
  name: &'a str,
  kvs: Vec<EnumerationKVPair<'a>>,
}

impl<'a> ComponentBehavior<'a> for Enumeration<'a> {
  fn init(token_list: &'a Vec<Token>, start: usize) -> Enumeration {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };

    assert_eq!(Enumeration::is_start_condition_matched(cur.token), true);

    cur = ComponentBase::read_next_token(token_list, cur.index);
    assert_eq!(cur.token.name, TOKEN_DECLARATION);

    let name: &str = cur.token.name;
    let mut kvs: Vec<EnumerationKVPair<'a>> = vec![];

    cur = ComponentBase::read_next_token(token_list, cur.index);
    assert_eq!(cur.token.name, TOKEN_LEFT_BRACKET);

    while !Enumeration::is_end_condition_matched(cur.token) {
      cur = ComponentBase::read_next_token(token_list, cur.index);

      if COMMENT_PART == cur.token.name {
        continue;
      }

      if TOKEN_DECLARATION == cur.token.name {
        let key = cur.token.value.as_str();
        cur = ComponentBase::read_next_token(token_list, cur.index);
        assert_eq!(cur.token.name, TOKEN_EQUAL);

        cur = ComponentBase::read_next_token(token_list, cur.index);
        let value = cur.token.value.as_str();

        kvs.push(EnumerationKVPair::init(key, value));
      }

      cur = ComponentBase::read_next_token(token_list, cur.index);
    }

    let base = ComponentBase {
      token_list,
      start,
      end: cur.index,
    };

    let enumeration = Enumeration { base, name, kvs };

    return enumeration;
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    TOKEN_ENUM == token.name
  }

  fn is_end_condition_matched(token: &Token) -> bool {
    TOKEN_RIGHT_BRACKET == token.name
  }

  fn get_base(&self) -> &ComponentBase<'a> {
    &self.base
  }

  fn parse(&self) -> String {
    println!("{} {:#?}", self.name, self.kvs);
    String::from("")
  }
}
