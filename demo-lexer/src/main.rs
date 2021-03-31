mod lexer;
mod parser;

extern crate regex;

use crate::lexer::lex;
use crate::parser::parse;
// use crate::parser::Parser;
use lexer::token::Token;
use lexer::tokenizer::TOKENIZER_LIST;

fn main() {
  let text = "
  namespace py iesarch.janus.admin

  // enum for service govern
  enum JanusEnum { // test comment
    JANUS = 1 // ui:{ \"title\": \"所属分组\" }
    JANUS_MINI = 2
  }

  const list<string> ParamName = [\"device_id\", \"app_id\", \"status_code\"] // 参数名称

  const list<WorkflowStatus> FinalStatus = [WorkflowStatus.CANCELED, WorkflowStatus.ROLLBACK, WorkflowStatus.FINISHED]

  struct TradeReport {
    1: required string  symbol // test
    2: required double  price
    3: optional i32     size
    4: optional i32     seq_num
    5: optional list<string> paths
    6: required map<string, bool> detail
  }

  struct JanusOpenApiDelFlowDividerReq {
    1: required string group_name(api.body=\"group_name\")
    2: required i32 id(api.body=\"id\")
  }

  service ginex {
    // deploy
    JanusWorkOrderResp JanusWorkOrder(1: JanusWorkOrderReq req) (api.GET=\"/api/v1/janus/workorder\")
  }
  ";

  let token_list = lex(text);
  parse(&token_list);
}
