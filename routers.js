const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const users = require("./users");
const client = require("./mongodb");

const routers = express.Router();
const upload = multer({ dest: "public/uploads" });

// Upload file
routers.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "public/uploads", file.originalname);
    fs.renameSync(file.path, target);
    res.send("File berhasil diupload");
  } else {
    res.status(400).send("File gagal diupload");
  }
});



// Routing
routers.get("/users", async (req, res) => {
  try {
    const db = client.db("latihan");
    const users = await db.collection("users").find().toArray();
    res.json({
      status: "success",
      message: "list users",
      data: users,
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

module.exports = routers;
