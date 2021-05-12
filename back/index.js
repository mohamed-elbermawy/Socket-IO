const express = require("express");
const cors = require("cors");
const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());

subscribers = {};
subscribers_sse = {};
massages = [];

app.post("/longpolling/massages", (req, res, next) => {
  console.log(req.body);
  Object.entries(subscribers).forEach(([id, res]) => {
    res.json(req.body);
    delete subscribers[id];
  });
  res.status(204).end();
});

app.get("/longpolling/massages/subscribe", (req, res, next) => {
  const id = Math.ceil(Math.random() * 1000);
  subscribers[id] = res;
  req.on("close", () => {
    delete subscribers[id];
  });
});

app.post("/shortpolling/massages", (req, res, next) => {
  massages.push(req.body);
  console.log(massages);
  res.status(204).end();
});

app.get("/shortpolling/massages/subscribe", (req, res, next) => {
  console.log(req.query);
  if (req.query.lastupdate == "0") {
    return res.status(200).json(massages);
  }

  let filtered = massages.filter(
    (massage) => massage.createdAt > req.query.lastupdate
  );
  console.log(filtered);
  return res.status(200).json(filtered);
});

app.post("/sse/massages", (req, res, next) => {
  console.log(req.body);
  Object.entries(subscribers_sse).forEach(([id, res]) => {
    res.write(`data: ${JSON.stringify(req.body)}\n\n`);
  });
  res.status(204).end();
});

app.get("/sse/massages/subscribe", (req, res, next) => {
  const id = Math.ceil(Math.random() * 1000);
  subscribers_sse[id] = res;
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  req.on("close", () => {
    delete subscribers[id];
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
