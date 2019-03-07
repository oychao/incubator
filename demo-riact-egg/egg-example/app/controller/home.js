'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
    ctx.cookies.set('c', 'haha', {
      encrypt: true,
    });
    console.log(ctx.cookies.get('c', {
      encrypt: true,
    }));
  }
}

module.exports = HomeController;
