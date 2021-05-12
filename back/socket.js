const http = require("http");

const server = http.createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("massage", (data) => {
    console.log(socket.id, " ", data);
    console.log("====================");
    io.to(data.destinationSocketId).emit("massage-back", data.massage);
    // socket.broadcast.emit("massage-back", data);
  });
});

server.listen(5000, () => {
  console.info("Server listening on http://localhost:5000");
});
