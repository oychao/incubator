pub mod types;
pub mod common;
pub mod constant;
pub mod enumeration;
pub mod namespace;
pub mod program;
pub mod service;
pub mod structure;

use crate::lexer::token::Token;
use crate::lexer::tokenizer::TOKEN_CONST;
use crate::lexer::tokenizer::TOKEN_ENUM;
use crate::lexer::tokenizer::TOKEN_NAMESPACE;
use crate::lexer::tokenizer::TOKEN_SERVICE;
use crate::lexer::tokenizer::TOKEN_STRUCT;
use crate::parser::common::ComponentBehavior;
use crate::parser::constant::Constant;
use crate::parser::enumeration::Enumeration;
use crate::parser::namespace::Namespace;
use crate::parser::program::Program;
use crate::parser::service::Service;
use crate::parser::structure::Structure;

pub const COMPONENT_NAMES: [&'static str; 5] = [
  TOKEN_NAMESPACE,
  TOKEN_CONST,
  TOKEN_ENUM,
  TOKEN_STRUCT,
  TOKEN_SERVICE,
];

pub fn parse<'a>(token_list: &'a Vec<Token>) -> String {
  // for (_, token) in token_list.iter().enumerate() {
  //   println!("{:?}", token);
  // }

  let program = Program::init(token_list, 0);

  program.parse()
}
