use crate::lexer::tokenizer::TOKEN_DECLARATION;
use crate::lexer::tokenizer::TOKEN_OPTIONAL;
use crate::lexer::tokenizer::TOKEN_REQUIRED;
use crate::lexer::tokenizer::TOKEN_RIGHT_BRACKET;
use crate::lexer::tokenizer::TOKEN_STRUCT_PROPERTY_INDEX;
use crate::parser::common::ComponentBase;
use crate::parser::common::ComponentBehavior;
use crate::parser::common::WalkerStep;
use crate::parser::types::basic::BasicType;
use crate::parser::types::list::ListType;
use crate::parser::types::map::MapType;
use crate::parser::types::CommonType;
use crate::parser::TOKEN_STRUCT;
use crate::Token;

#[derive(Debug, PartialEq)]
struct StructureProperty<'a> {
  required: bool,
  s_type: String,
  value: &'a str,
}

impl<'a> StructureProperty<'a> {
  fn init() -> StructureProperty<'a> {
    StructureProperty {
      required: false,
      s_type: String::from(""),
      value: "",
    }
  }
}

#[derive(Debug, PartialEq)]
pub struct Structure<'a> {
  pub base: ComponentBase<'a>,
  name: &'a str,
  properties: Vec<StructureProperty<'a>>,
}

impl<'a> ComponentBehavior<'a> for Structure<'a> {
  fn init(token_list: &'a Vec<Token>, start: usize) -> Structure<'a> {
    let mut cur: WalkerStep = WalkerStep {
      index: start,
      token: token_list.get(start).unwrap(),
    };
    // println!("namespace: {:?}", cur);

    assert_eq!(Structure::is_start_condition_matched(cur.token), true);

    cur = ComponentBase::read_next_token(token_list, cur.index);

    let name: &str = cur.token.value.as_str();
    let mut properties: Vec<StructureProperty<'a>> = vec![];

    while !Structure::is_end_condition_matched(cur.token) {
      cur = ComponentBase::read_next_token(token_list, cur.index);

      if TOKEN_STRUCT_PROPERTY_INDEX != cur.token.name {
        continue;
      }

      cur = ComponentBase::read_next_token(token_list, cur.index);

      let mut property: StructureProperty = StructureProperty::init();
      if TOKEN_REQUIRED == cur.token.name || TOKEN_OPTIONAL == cur.token.name {
        if "required" == cur.token.value.as_str() {
          property.required = true;
        }
        cur = ComponentBase::read_next_token(token_list, cur.index);
      }

      if ListType::is_start_condition_matched(cur.token) {
        let common_type = CommonType::init(token_list, cur.index);
        property.s_type = common_type.parse();
        cur = ComponentBase::read_next_token(token_list, common_type.base.end);
      } else if MapType::is_start_condition_matched(cur.token) {
        let common_type = CommonType::init(token_list, cur.index);
        property.s_type = common_type.parse();
        cur = ComponentBase::read_next_token(token_list, common_type.base.end);
      } else if BasicType::is_start_condition_matched(cur.token) {
        let common_type = CommonType::init(token_list, cur.index);
        assert_eq!(cur.index, common_type.base.end);
        property.s_type = common_type.parse();
        cur = ComponentBase::read_next_token(token_list, common_type.base.end);
      } else {
        // error
      }

      assert_eq!(TOKEN_DECLARATION, cur.token.name);

      property.value = cur.token.value.as_str();

      properties.push(property);
    }

    // println!("{:#?}", properties);

    let base = ComponentBase {
      token_list,
      start,
      end: cur.index - 1,
    };

    let structure = Structure {
      base,
      name,
      properties,
    };

    // println!("{:?}", structure);

    return structure;
  }

  fn is_start_condition_matched(token: &Token) -> bool {
    TOKEN_STRUCT == token.name
  }

  fn is_end_condition_matched(token: &Token) -> bool {
    TOKEN_RIGHT_BRACKET == token.name
  }

  fn get_base(&self) -> &ComponentBase<'a> {
    &self.base
  }

  fn parse(&self) -> String {
    println!("{} {:#?}", self.name, self.properties);
    String::from("")
  }
}
