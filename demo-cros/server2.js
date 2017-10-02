const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/data', (req, res) => {
  res.send('hello world from server2');
});

app.listen(4000, () => {
  console.log('server started at 3000 port.')
});
