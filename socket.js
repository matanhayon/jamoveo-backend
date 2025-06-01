const { Server } = require("socket.io");

let currentLiveSong = null;
let adminSocketId = null;
const sessionId = "moveoJamSession";

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinSession", (sessionName) => {
      socket.join(sessionName);
    });

    socket.on("leaveSession", (sessionName) => {
      socket.leave(sessionName);
    });

    socket.on("registerAsAdmin", () => {
      adminSocketId = socket.id;
    });

    socket.on("unregisterAdmin", () => {
      if (socket.id === adminSocketId) {
        adminSocketId = null;
      }
    });

    socket.on("getSessionStatus", () => {
      if (currentLiveSong) {
        socket.emit("sessionStatus", { status: "Live" });
        socket.emit("songData", currentLiveSong);
      } else {
        socket.emit("sessionStatus", { status: "Offline" });
      }
    });

    socket.on("adminSelectSong", (song) => {
      currentLiveSong = song;
      io.to(sessionId).emit("sessionStatus", { status: "Live" });
      io.to(sessionId).emit("songData", currentLiveSong);
    });

    socket.on("quitSession", () => {
      currentLiveSong = null;
      io.to(sessionId).emit("sessionEnded");
    });

    socket.on("adminScrollUpdate", ({ scrollTop }) => {
      if (socket.id === adminSocketId) {
        socket.to(sessionId).emit("updateScrollPosition", { scrollTop });
      }
    });
  });
}

module.exports = { setupSocket };
