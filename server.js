const app = require("./app");
const { connectDB } = require("./config/db");
const http = require("http");
const { setupSocket } = require("./socket");

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  const server = http.createServer(app);

  setupSocket(server);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
