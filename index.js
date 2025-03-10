const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const routers = require("./routers");

const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routing
app.use(routers);

// Middleware untuk 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Middleware untuk error handling
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
