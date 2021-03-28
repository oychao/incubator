mod lexers;

extern crate regex;

use lexers::token::Token;
use lexers::tokenizer::TOKENIZER_LIST;

fn main() {
  let text = "struct TradeReport {
    1: string  symbol
    2: double  price
    3: i32     size
    4: i32     seq_num
  }";
  let mut prev_offset: usize = 0;
  let mut token_name = "";

  let mut result: Vec<Token> = Vec::new();

  loop {
    for (_, tokenizer) in TOKENIZER_LIST.iter().enumerate() {
      result.push(tokenizer.check_gen(&text, prev_offset));
      let cur_token = result.pop().unwrap();
      token_name = &cur_token.name[..];
      if "NotMatched" != token_name {
        println!("{:?}", &cur_token);
        result.push(cur_token);
        break;
      }
    }
    let cur_token = result.pop().unwrap();
    prev_offset = cur_token.end;
    result.push(cur_token);
    if "TokenEnd" == token_name {
      break;
    }
  }
}
