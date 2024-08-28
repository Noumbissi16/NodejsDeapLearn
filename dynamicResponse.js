const http = require("http");

const hostname = "127.0.0.1";
const port = process.env.PORT || 3001;
const server = http.createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  res.end("Hello");
});

server.listen(port, hostname, (req, res) => {
  console.log(`Server started successfully`);
});
