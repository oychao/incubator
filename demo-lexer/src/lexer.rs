pub mod token;
pub mod tokenizer;

use crate::lexer::tokenizer::NOT_MATCHED;
use crate::lexer::tokenizer::TOKEN_END;
use crate::lexer::tokenizer::TOKEN_START;
use crate::Token;
use crate::TOKENIZER_LIST;
// use crate::parser::Parser;

pub fn lex(input: &str) -> Vec<Token> {
  let mut prev_offset: usize = 0;
  let mut token_name = "";
  let mut token_list: Vec<Token> = vec![Token::new(TOKEN_START, String::from(""), 0, 0)];

  loop {
    for (_, tokenizer) in TOKENIZER_LIST.iter().enumerate() {
      token_list.push(tokenizer.check_gen(input, prev_offset));
      let cur_token = token_list.pop().unwrap();
      token_name = &cur_token.name[..];
      if NOT_MATCHED != token_name {
        token_list.push(cur_token);
        break;
      }
    }
    let cur_token = token_list.pop().unwrap();
    prev_offset = cur_token.end;
    // println!("- {} {}", &cur_token.name, &cur_token.value);
    token_list.push(cur_token);
    if TOKEN_END == token_name {
      break;
    }
  }

  token_list
}
