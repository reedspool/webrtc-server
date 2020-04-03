const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = 8000; // 80 or 443 require root
server.listen(PORT);
console.log(`Listening on port ${PORT}`);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('broadcast', function (data) {
    console.log(`Broadcast from ${socket._myName}: ${data}`);
    io.emit('broadcast', { from: socket._myName, payload: data });
  });

  socket.on("join", function (data) {
    console.log(`${data} joined`);

    // Both join the Socket.io room for my name and save my name
    socket._myName = data;
    socket.join(data);
  });

  socket.on('dm', function (data)
  {
    console.log(`${socket._myName} DM'd ${data.to}: ${data.payload}`);
    data.from = socket._myName;
    io.to(data.to).emit('dm', data);
  })
});
