const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const express = require("express");
const users = require("./users");

const app = express();

app.get("/", (req, res) => res.send("This the homepage"));

app.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "Response success",
    description: "Exercise #03",
    date: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
  })
);

app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    users,
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "not found",
    message: "Route tidak ditemukan",
    date: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
