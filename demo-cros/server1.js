const express = require('express');

const app = express();

const obj = {
  foo: 'foo',
  bar: 'bar'
};

app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.send(obj);
});

app.listen(3000, () => {
  console.log('server started at 3000 port.')
});
