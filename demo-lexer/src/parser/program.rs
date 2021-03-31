use crate::lexer::tokenizer::TOKEN_END;
use crate::lexer::tokenizer::TOKEN_START;
use crate::parser::common::ComponentBase;
use crate::parser::common::ComponentBehavior;
use crate::parser::common::WalkerStep;
use crate::parser::Constant;
use crate::parser::Enumeration;
use crate::parser::Namespace;
use crate::parser::Service;
use crate::parser::Structure;
use crate::Token;

pub struct Program<'a> {
  pub base: ComponentBase<'a>,
}

impl<'a> ComponentBehavior<'a> for Program<'a> {
  fn init(token_list: &'a std::vec::Vec<Token>, start: usize) -> Self {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };

    assert_eq!(Program::is_start_condition_matched(cur.token), true);

    while !Program::is_end_condition_matched(cur.token) {
      if Namespace::is_start_condition_matched(cur.token) {
        let namespace = Namespace::init(token_list, cur.index);
        namespace.parse();
        cur = ComponentBase::read_next_token(token_list, namespace.base.end);
      } else if Enumeration::is_start_condition_matched(cur.token) {
        let enumeration = Enumeration::init(token_list, cur.index);
        enumeration.parse();
        cur = ComponentBase::read_next_token(token_list, enumeration.base.end);
      } else if Constant::is_start_condition_matched(cur.token) {
        let constant = Constant::init(token_list, cur.index);
        constant.parse();
        cur = ComponentBase::read_next_token(token_list, constant.base.end);
      } else if Structure::is_start_condition_matched(cur.token) {
        let structure = Structure::init(token_list, cur.index);
        structure.parse();
        cur = ComponentBase::read_next_token(token_list, structure.base.end);
      } else if Service::is_start_condition_matched(cur.token) {
        let service = Service::init(token_list, cur.index);
        service.parse();
        cur = ComponentBase::read_next_token(token_list, service.base.end);
      } else {
        cur = ComponentBase::read_next_token(token_list, cur.index);
      }
    }

    let base = ComponentBase {
      token_list,
      start,
      end: cur.index - 1,
    };

    Program { base }
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    TOKEN_START == token.name
  }

  fn is_end_condition_matched(token: &Token) -> bool {
    TOKEN_END == token.name
  }

  fn get_base(&self) -> &'a ComponentBase {
    &self.base
  }

  fn parse(&self) -> String {
    String::from("")
  }
}
