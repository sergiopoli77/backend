const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World"));
app.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "about page",
    data: [],
  })
);

//method http
app.post("/contoh", (req, res) => res.send("request method POST"));
app.put("/contoh", (req, res) => res.send("request method PUT"));
app.delete("/contoh", (req, res) => res.send("request method DELETE"));
app.patch("/contoh", (req, res) => res.send("request method PATCH"));
app.all("/universal", (req, res) =>
  res.send(`request dengan method ${req.method}`)
);

// 1. Routing dinamis menggunakan params
app.get("/post/:id", (req, res) => res.send(`Artikel ke - $ {req.params.id}`));

// 2. Menggunakan query string
app.get("post", (req, res) => {
  const { page } = req.query;
  res.send(`Query yang didapatkan adalah : ${page}`);
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
