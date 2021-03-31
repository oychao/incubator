extern crate regex;

use super::token::Token;
use lazy_static::lazy_static;
use regex::Regex;

#[derive(Debug)]
pub struct Tokenizer {
  pub exp: Regex,
  pub token_name: &'static str,
}

impl Tokenizer {
  pub fn new(exp: Regex, token_name: &'static str) -> Tokenizer {
    Tokenizer { exp, token_name }
  }

  pub fn check_gen<'a>(&self, content: &'a str, offset: usize) -> Token {
    let mut actual_offset = offset;
    let wrapped_empty = Regex::new(r"(\s){0,}").unwrap().find_at(content, offset);

    match wrapped_empty {
      Some(empty) => {
        actual_offset = empty.end();
      }
      None => {}
    };

    let wrapped_find_ret = self.exp.find_at(&content[actual_offset..], 0);

    match wrapped_find_ret {
      Some(find_ret) => {
        let start = actual_offset + find_ret.start();
        let end = actual_offset + find_ret.end();
        Token::new(
          &self.token_name,
          String::from(&content[start..end]),
          start,
          end,
        )
      }
      None => Token::new(NOT_MATCHED, String::from(""), actual_offset, actual_offset),
    }
  }
}

pub const TOKEN_START: &str = "TOKEN_START";
pub const COMMENT_PART: &str = "COMMENT_PART";
pub const TOKEN_STRING_LITERAL: &str = "TOKEN_STRING_LITERAL";
pub const TOKEN_NAMESPACE: &str = "TOKEN_NAMESPACE";
pub const TOKEN_CONST: &str = "TOKEN_CONST";
pub const TOKEN_ENUM: &str = "TOKEN_ENUM";
pub const TOKEN_EQUAL: &str = "TOKEN_EQUAL";
pub const TOKEN_STRUCT: &str = "TOKEN_STRUCT";
pub const TOKEN_SERVICE: &str = "TOKEN_SERVICE";
pub const TOKEN_COMMA: &str = "TOKEN_COMMA";
pub const TOKEN_LEFT_BRACKET: &str = "TOKEN_LEFT_BRACKET";
pub const TOKEN_RIGHT_BRACKET: &str = "TOKEN_RIGHT_BRACKET";
pub const TOKEN_LEFT_PARENTHESIS: &str = "TOKEN_LEFT_PARENTHESIS";
pub const TOKEN_RIGHT_PARENTHESIS: &str = "TOKEN_RIGHT_PARENTHESIS";
pub const TOKEN_LEFT_SQUARE_BRACKET: &str = "TOKEN_LEFT_SQUARE_BRACKET";
pub const TOKEN_RIGHT_SQUARE_BRACKET: &str = "TOKEN_RIGHT_SQUARE_BRACKET";
pub const TOKEN_LEFT_ANGLE_BRACKET: &str = "TOKEN_LEFT_ANGLE_BRACKET";
pub const TOKEN_RIGHT_ANGLE_BRACKET: &str = "TOKEN_RIGHT_ANGLE_BRACKET";
pub const TOKEN_PROPERTY_DOT: &str = "TOKEN_PROPERTY_DOT";
pub const TOKEN_REQUIRED: &str = "TOKEN_REQUIRED";
pub const TOKEN_OPTIONAL: &str = "TOKEN_OPTIONAL";
pub const TOKEN_STRING_TYPE: &str = "TOKEN_STRING_TYPE";
pub const TOKEN_LIST_TYPE: &str = "TOKEN_LIST_TYPE";
pub const TOKEN_MAP_TYPE: &str = "TOKEN_MAP_TYPE";
pub const TOKEN_DOUBLE_TYPE: &str = "TOKEN_DOUBLE_TYPE";
pub const TOKEN_I8_TYPE: &str = "TOKEN_I8_TYPE";
pub const TOKEN_I16_TYPE: &str = "TOKEN_I16_TYPE";
pub const TOKEN_I32_TYPE: &str = "TOKEN_I32_TYPE";
pub const TOKEN_I64_TYPE: &str = "TOKEN_I64_TYPE";
pub const TOKEN_STRUCT_PROPERTY_INDEX: &str = "TOKEN_STRUCT_PROPERTY_INDEX";
pub const TOKEN_NUMBER: &str = "TOKEN_NUMBER";
pub const TOKEN_DECLARATION: &str = "TOKEN_DECLARATION";
pub const TOKEN_OPERATION: &str = "TOKEN_OPERATION";
pub const TOKEN_END: &str = "TOKEN_END";
pub const NOT_MATCHED: &str = "NOT_MATCHED";

lazy_static! {
  pub static ref TOKENIZER_LIST: [Tokenizer; 33] = [
    Tokenizer::new(Regex::new(r"^//.{0,}").unwrap(), COMMENT_PART),
    Tokenizer::new(Regex::new(r#"^"[^"]{0,}""#).unwrap(), TOKEN_STRING_LITERAL),
    Tokenizer::new(Regex::new(r"^namespace").unwrap(), TOKEN_NAMESPACE),
    Tokenizer::new(Regex::new(r"^const").unwrap(), TOKEN_CONST),
    Tokenizer::new(Regex::new(r"^enum").unwrap(), TOKEN_ENUM),
    Tokenizer::new(Regex::new(r"^struct").unwrap(), TOKEN_STRUCT),
    Tokenizer::new(Regex::new(r"^service").unwrap(), TOKEN_SERVICE),
    Tokenizer::new(Regex::new(r"^=").unwrap(), TOKEN_EQUAL),
    Tokenizer::new(Regex::new(r"^,").unwrap(), TOKEN_COMMA),
    Tokenizer::new(Regex::new(r"^\{").unwrap(), TOKEN_LEFT_BRACKET),
    Tokenizer::new(Regex::new(r"^\}").unwrap(), TOKEN_RIGHT_BRACKET),
    Tokenizer::new(Regex::new(r"^\(").unwrap(), TOKEN_LEFT_PARENTHESIS),
    Tokenizer::new(Regex::new(r"^\)").unwrap(), TOKEN_RIGHT_PARENTHESIS),
    Tokenizer::new(Regex::new(r"^\[").unwrap(), TOKEN_LEFT_SQUARE_BRACKET),
    Tokenizer::new(Regex::new(r"^\]").unwrap(), TOKEN_RIGHT_SQUARE_BRACKET),
    Tokenizer::new(Regex::new(r"^<").unwrap(), TOKEN_LEFT_ANGLE_BRACKET),
    Tokenizer::new(Regex::new(r"^>").unwrap(), TOKEN_RIGHT_ANGLE_BRACKET),
    Tokenizer::new(Regex::new(r"^\.").unwrap(), TOKEN_PROPERTY_DOT),
    Tokenizer::new(Regex::new(r"^required").unwrap(), TOKEN_REQUIRED),
    Tokenizer::new(Regex::new(r"^optional").unwrap(), TOKEN_OPTIONAL),
    Tokenizer::new(Regex::new(r"^string").unwrap(), TOKEN_STRING_TYPE),
    Tokenizer::new(Regex::new(r"^list").unwrap(), TOKEN_LIST_TYPE),
    Tokenizer::new(Regex::new(r"^map").unwrap(), TOKEN_MAP_TYPE),
    Tokenizer::new(Regex::new(r"^double").unwrap(), TOKEN_DOUBLE_TYPE),
    Tokenizer::new(Regex::new(r"^i8").unwrap(), TOKEN_I8_TYPE),
    Tokenizer::new(Regex::new(r"^i32").unwrap(), TOKEN_I16_TYPE),
    Tokenizer::new(Regex::new(r"^i16").unwrap(), TOKEN_I32_TYPE),
    Tokenizer::new(Regex::new(r"^i64").unwrap(), TOKEN_I64_TYPE),
    Tokenizer::new(Regex::new(r"^\d+:").unwrap(), TOKEN_STRUCT_PROPERTY_INDEX),
    Tokenizer::new(Regex::new(r"^\d+").unwrap(), TOKEN_NUMBER),
    Tokenizer::new(Regex::new(r"^[\w]+").unwrap(), TOKEN_DECLARATION),
    Tokenizer::new(Regex::new(r"^[\+\-\*/]{1}").unwrap(), TOKEN_OPERATION),
    Tokenizer::new(Regex::new(r"()$").unwrap(), TOKEN_END)
  ];
}
