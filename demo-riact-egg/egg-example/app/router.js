'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/todo', controller.todo.all);
  router.post('/api/todo', controller.todo.post);
  router.delete('/api/todo', controller.todo.delete);
};
