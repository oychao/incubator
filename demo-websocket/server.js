var util = require("util");
var fs = require("fs");
var net = require("net");
var http = require("http");

function SocketServer() {
  var server = this;
  http.Server.call(server, function() {});

  server.on("connection", function(req, socket, head) {
    console.log('connected!!!!!!!!');
  });

  server.on("request", function(req, res) {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    fs.createReadStream("index.html").pipe(res);
  });

  server.on("upgrade", function(req, socket, upgradeHead) {

    var magicString = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    var secWsKey = req.headers['sec-websocket-key'];
    var hash = require('crypto')
      .createHash('SHA1')
      .update(secWsKey + magicString)
      .digest('base64');
    var handshake = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" +
      "Upgrade: WebSocket\r\n" +
      "Connection: Upgrade\r\n" +
      "Sec-WebSocket-Accept: " + hash + "\r\n" +
      "\r\n";

    socket.write(handshake);

    socket.on('data', function(d, start, end) {
      console.log('data......');
      // var data = d.toString('utf8', start, end);
      var original_data = d.toString('utf8', start, end);
      console.log('ondata', original_data);
      var data = original_data.split('\ufffd')[0].slice(1);

      socket.write('123', "utf8");
      if (data == "kill") {
        socket.end();
      } else {
        console.log(data);
        socket.write("\u0000", "binary");
        socket.write(data, "utf8");
        socket.write("\uffff", "binary");
      }

    });
    // // socket.setEncoding('utf8');
    // socket.write(handshake);
    // // socket.setEncoding('utf8');
    // socket.on('data', function(d, start, end) {
    //     console.log('get data', d.toString());
    //
    //     socket.write('123', 'utf8', function(){
    //         console.log('wrote to client');
    //     });
    //
    // });
    });
};

util.inherits(SocketServer, http.Server);

new SocketServer().listen(3000);