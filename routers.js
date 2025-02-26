const express = require("express");
const routers = express.Router();
const path = require("path");

// Routing
//donwload
// routers.get("/download", (req, res) => {
//   const filename = "dummy.png";
//   res.sendFile(__dirname + "/download/" + filename);
// });

//path
//kalau di luar
// routers.get("/download", (req, res) => {
//   const filename = "dummy.png";
//   res.sendFile(path.join(__dirname), filename);
// });

routers.get("/download", (req, res) => {
  const filename = "dummy.png";
  res.sendFile(path.join(__dirname, "/donwload", filename));
});

routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    message: "Login Page",
    data: {
      username: username,
      password: password,
    },
  });
});
routers.get("/", (req, res) => res.send("Hello World"));
routers.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);
routers.post("/contoh", (req, res) => res.send("request method POST"));
routers.put("/contoh", (req, res) => res.send("Request method PUT"));
routers.delete("/contoh", (req, res) => res.send("Request method DELETE"));
routers.patch("/contoh", (req, res) => res.send("Request method PATCH"));

routers.all("/universal", (req, res) =>
  res.send(`Request method ${req.method}`)
);
// Routing dinamis
// 1. Menggunakan params
routers.get("/post/:id", (req, res) =>
  res.send(`Artikel ke - ${req.params.id}`)
);
// 2. Menggunakan Query String
routers.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query string= page :${page}, sort : ${sort}`);
});

module.exports = routers;
