const express = require('express');
const app = express();

app.use(express.static(__dirname + '/html'));

app.get('/data', function(req, res) {
  res.send('hello fetch');
});

app.post('/datap', function(req, res) {
  console.log(req.params);
});

app.listen(3000, function() {
  console.log('server started on port 3000');
});
