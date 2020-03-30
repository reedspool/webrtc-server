var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: ' from server' });
  socket.on('my other event', function (data) {
    console.log(data);
    socket.emit('echo', data);
  });
  socket.on('broadcast', function (data) {
    console.log('received broadcast from client', data);
    io.emit('broadcast', data);
  });

  socket.on("join a room", function (data) {
    socket.join(data);
  });
});
