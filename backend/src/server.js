const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const connectDB = require("./shared/config/db");
const app = require("./app");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (adminId) => {
    if (!adminId) {
      console.log("Invalid adminId for join");
      return;
    }

    socket.join(adminId.toString());
    console.log("Admin joined room:", adminId.toString());
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io };
