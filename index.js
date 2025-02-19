const express = require("express");
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const users = require("./users");

const app = express();

// Middleware untuk logging
app.use(morgan("tiny"));
app.use(errorhandler());

// Endpoint untuk mendapatkan semua users
app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    data: users,
  });
});

// Endpoint untuk mendapatkan user berdasarkan nama
app.get("/users/:name", (req, res) => {
  const userName = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === userName);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "resource tidak ditemukan",
    });
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// Middleware untuk menangani 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Middleware untuk menangani error server
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
