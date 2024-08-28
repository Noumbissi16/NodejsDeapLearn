const fs = require("fs");
const express = require("express");

const app = express();
const port = process.env.PORT || 1337;

// const hostname = "127.0.0.1";

function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("hi");
}
function respondJson(req, res) {
  res.json({ text: "hi", numbers: [1, 2, 3] });
}

function respondNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

function respondEcho(req, res) {
  const { input = "" } = req.query;

  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split("").reverse().join(""),
  });
}

function respondStatic(req, res) {
  const filename = `${__dirname}/public/${req.params[0]}`;
  fs.createReadStream(filename)
    .on("error", () => respondNotFound(req, res))
    .pipe(res);
}

app.get("/", respondText);
app.get("/json", respondJson);
app.get("/echo", respondEcho);
app.get("/static/*", respondStatic);

app.listen(port, () => console.log(`Server listening on port ${port}`));

// const server = createServer(function (req, res) {
//   if (req.url === "/") return respondText(req, res);
//   if (req.url === "/json") return respondJson(req, res);
//   if (req.url.match(/^\/echo/)) return respondEcho(req, res);
//   if (req.url.match(/^\/static/)) return respondStatic(req, res);
//   respondNotFound(req, res);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
