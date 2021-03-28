extern crate regex;

use regex::Regex;

#[derive(Debug)]
struct Token {
  name: String,
  value: String,
  start: usize,
  end: usize,
}

impl Token {
  fn new(name: String, value: String, start: usize, end: usize) -> Token {
    Token {
      name,
      value,
      start,
      end,
    }
  }
}

#[derive(Debug)]
struct Tokenizer {
  exp: regex::Regex,
  token_name: String,
}

impl Tokenizer {
  fn new(exp: regex::Regex, token_name: String) -> Tokenizer {
    Tokenizer { exp, token_name }
  }

  fn check_gen(&self, str: &str, offset: usize) -> Token {
    let mut actual_offset = offset;
    let raw_empty = Regex::new(r"(\s+)").unwrap().find_at(str, offset);
    if None != raw_empty {
      actual_offset = raw_empty.unwrap().end();
    }

    let raw_find_ret = self.exp.find_at(str, actual_offset);
    if None != raw_find_ret {
      let find_ret = raw_find_ret.unwrap();
      let start = find_ret.start();
      let end = find_ret.end();
      // println!("{:?} {} {} {}", self, actual_offset, start, end);
      Token::new(
        self.token_name.clone(),
        String::from(&str[start..end]),
        start,
        end,
      )
    } else {
      Token::new(
        String::from("NotMatched"),
        String::from(""),
        actual_offset,
        actual_offset,
      )
    }
  }
}

fn main() {
  let tokenizer_number = Tokenizer::new(Regex::new(r"\d+").unwrap(), String::from("TokenNumber"));
  let tokenizer_operation = Tokenizer::new(
    Regex::new(r"\+{1}").unwrap(),
    String::from("TokenOperation"),
  );
  let tokenizer_end = Tokenizer::new(Regex::new(r"()$").unwrap(), String::from("TokenEnd"));

  let tokenizers = [tokenizer_number, tokenizer_operation, tokenizer_end];

  let text = " 12 + 23 ";

  let mut prev_offset: usize = 0;

  let mut ret: Token = Token::new(String::from(""), String::from(""), 0, 0);
  let mut token_name = "";
  loop {
    for (_, tokenizer) in tokenizers.iter().enumerate() {
      ret = tokenizer.check_gen(&text, prev_offset);
      token_name = &ret.name[..];
      if "NotMatched" != token_name {
        println!("{:?}", ret);
        break;
      }
    }
    prev_offset = ret.end;
    if "TokenEnd" == token_name {
      break;
    }
  }
}
