const express = require('express');

const app = express();

// Access-Control-Allow-Origin *
// Access-Control-Allow-Headers X-Requested-With

app.get('/', (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('visited');
  res.send('Message from server1(port 3000)');
});

app.listen(3000, () => {
  console.log('server started at 3000 port.')
});
