extern crate regex;

use super::token::Token;
use lazy_static::lazy_static;
use regex::Regex;

#[derive(Debug)]
pub struct Tokenizer<'a> {
  pub exp: Regex,
  pub token_name: &'a str,
}

impl<'a> Tokenizer<'a> {
  pub fn new(exp: Regex, token_name: &'a str) -> Tokenizer<'a> {
    Tokenizer { exp, token_name }
  }

  pub fn check_gen(&self, str: &'a str, offset: usize) -> Token<'a> {
    let mut actual_offset = offset;
    let raw_empty = Regex::new(r"(\s){0,}").unwrap().find_at(str, offset);
    if None != raw_empty {
      actual_offset = raw_empty.unwrap().end();
    }

    let raw_find_ret = self.exp.find_at(&str[actual_offset..], 0);
    if None != raw_find_ret {
      let find_ret = raw_find_ret.unwrap();
      let start = actual_offset + find_ret.start();
      let end = actual_offset + find_ret.end();
      Token::new(&self.token_name, &str[start..end], start, end)
    } else {
      Token::new("NotMatched", "", actual_offset, actual_offset)
    }
  }
}

lazy_static! {
  pub static ref TOKENIZER_LIST: [Tokenizer<'static>; 3] = [
    Tokenizer::new(Regex::new(r"^\d+").unwrap(), "TokenNumber"),
    Tokenizer::new(Regex::new(r"^[\+\-\*/]{1}").unwrap(), "TokenOperation"),
    Tokenizer::new(Regex::new(r"()$").unwrap(), "TokenEnd")
  ];
}
