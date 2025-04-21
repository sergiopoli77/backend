const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/latihan");
    console.log("Koneksi Berhasil");
  } catch (err) {
    console.log(err);
  }
}
main();
