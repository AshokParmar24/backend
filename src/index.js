const env = require("dotenv");
const mongooseserver = require("./config/mongooseServer");
const http = require("http");
const app = require("./config/app");

env.config();

const server = http.createServer(app);
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongooseserver?.connect();
