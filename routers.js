const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const users = require("./users");

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

// Download file
routers.get("/download", (req, res) => {
  const filename = "dummy.png";
  res.download(path.join(__dirname, "download", filename), "dummy-photo.png");
});

// Get all users
routers.get("/users", (req, res) => {
  res.status(200).json({ status: "success", data: users });
});

// Get user by name (case-insensitive)
routers.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === name);
  if (user) {
    res.status(200).json({ status: "success", data: user });
  } else {
    res.status(404).json({ status: "error", message: "User tidak ditemukan" });
  }
});

// Add a new user
routers.post("/users", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res
      .status(400)
      .json({ status: "error", message: "Nama dan usia harus diisi" });
  }
  users.push({ name, age });
  res.status(201).json({
    status: "success",
    message: "User berhasil ditambahkan",
    data: { name, age },
  });
});

// Update user by name
routers.put("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const { age } = req.body;
  const userIndex = users.findIndex((u) => u.name.toLowerCase() === name);
  if (userIndex === -1) {
    return res
      .status(404)
      .json({ status: "error", message: "User tidak ditemukan" });
  }
  if (!age) {
    return res
      .status(400)
      .json({ status: "error", message: "Usia harus diisi" });
  }
  users[userIndex].age = age;
  res.status(200).json({
    status: "success",
    message: "User berhasil diperbarui",
    data: users[userIndex],
  });
});

// Delete user by name
routers.delete("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const userIndex = users.findIndex((u) => u.name.toLowerCase() === name);
  if (userIndex === -1) {
    return res
      .status(404)
      .json({ status: "error", message: "User tidak ditemukan" });
  }
  users.splice(userIndex, 1);
  res.status(200).json({ status: "success", message: "User berhasil dihapus" });
});

module.exports = routers;
