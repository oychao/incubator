use crate::lexer::tokenizer::TOKEN_RIGHT_ANGLE_BRACKET;
use crate::parser::common::ComponentBase;
use crate::parser::common::WalkerStep;
use crate::parser::types::basic::BasicType;
use crate::parser::types::list::ListType;
use crate::parser::types::map::MapType;
use crate::parser::ComponentBehavior;
use crate::Token;

pub mod basic;
pub mod list;
pub mod map;

pub struct CommonType<'a> {
  pub base: ComponentBase<'a>,
  value: String,
}

impl<'a> ComponentBehavior<'a> for CommonType<'a> {
  fn init(token_list: &'a std::vec::Vec<Token>, start: usize) -> Self {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };
    // println!("namespace: {:?}", cur);

    if !CommonType::is_start_condition_matched(cur.token) {
      // error
    }

    let mut end: usize = start;

    let value = {
      if ListType::is_start_condition_matched(cur.token) {
        let list_type = ListType::init(token_list, cur.index);
        end = list_type.base.end;
        println!("{} {}", list_type.base.start, list_type.base.end);
        list_type.parse()
      } else if MapType::is_start_condition_matched(cur.token) {
        let value = cur.token.value.clone();
        while TOKEN_RIGHT_ANGLE_BRACKET != cur.token.name {
          cur = ComponentBase::read_next_token(token_list, cur.index);
        }
        end = cur.index;
        value
      } else if BasicType::is_start_condition_matched(cur.token) {
        let common_type = BasicType::init(token_list, cur.index);
        assert_eq!(cur.index, common_type.base.end);
        end = cur.index;
        common_type.parse()
      } else {
        // error
        String::from("unknown")
      }
    };

    let base = ComponentBase {
      token_list,
      start,
      end,
    };

    CommonType { base, value }
  }

  fn is_start_condition_matched(_: &Token) -> bool {
    true
  }

  fn is_end_condition_matched(_: &Token) -> bool {
    true
  }

  fn get_base(&self) -> &ComponentBase<'a> {
    &self.base
  }

  fn parse(&self) -> String {
    String::from(&self.value)
  }
}
