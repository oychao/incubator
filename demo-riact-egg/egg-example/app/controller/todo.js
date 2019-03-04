'use strict';

const Controller = require('egg').Controller;

const db = require('../service/db');

class AllController extends Controller {
  async all() {
    const { ctx } = this;
    ctx.body = db.getAll();
  }

  async post() {
    const { ctx } = this;
    const item = {
      key: Math.random() + '',
      value: ctx.request.body.item,
    };
    db.add(item);
    ctx.body = {
      code: 0,
      payload: item,
    };
  }

  async delete() {
    const { ctx } = this;
    db.delete(ctx.queries.key[0]);
    ctx.body = {
      code: 0,
    };
  }
}

module.exports = AllController;
