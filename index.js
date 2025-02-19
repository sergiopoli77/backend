const express = require("express");
const morgan = require("morgan");
const users = require("./users"); // Import data dari users.js

const app = express();

// Middleware untuk logging
app.use(morgan("tiny"));

app.get("/users", (req, res) => {
  res.json({
    status: "success",
    data: users,
  });
});

app.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === name);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "Data user tidak ditemukan",
    });
  }

  res.json({
    status: "success",
    data: user,
  });
});

// Middleware untuk penanganan Routing 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Middleware untuk penanganan Error Server 500
app.use((err, req, res, next) => {
  console.error(err.stack);
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
