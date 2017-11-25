const express = require('express');
const app = express();

app.use(express.static(__dirname + '/html'));

app.get('/data', function (req, res) {
  res.send('hello fetch');
});

app.post('/datap', function (req, res) {
  console.log(req.params);
  const body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    const data = qs.parse(body);
    res.writeHead(200);
    res.end(JSON.stringify(data));
  });
  res.send('end');
});

app.listen(3000, function () {
  console.log('server started on port 3000');
});
