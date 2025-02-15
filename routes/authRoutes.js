const express = require("express");
const pool = require("../db"); // Import the MySQL pool
const bcrypt = require("bcryptjs"); // For password hashing
require("dotenv").config();

const router = express.Router();

// ✅ Kullanıcı Kaydı (Register)
router.post("/kayit", async (req, res) => {
  const { kullanici_adi, email, sifre, ad_soyad } = req.body;

  if (!kullanici_adi || !email || !sifre || !ad_soyad) {
    console.log("Missing fields!");
    return res.status(400).json({ message: "Tüm alanları doldurun!" });
  }

  try {
    await pool.query(
      "INSERT INTO Kullanicilar (kullanici_adi, email, sifre, ad_soyad, rol) VALUES (?, ?, ?, ?, ?)",
      [kullanici_adi, email, sifre, ad_soyad, "admin"] // Set role to 'admin' by default
    );

    console.log("User successfully inserted into the database.");
    res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi." });
  } catch (err) {
    console.error("Database error:", err); // Log the error
    res.status(500).json({ message: "Sunucu hatası!", error: err.message });
  }
});

// ✅ Kullanıcı Girişi (Login)
router.post("/giris", async (req, res) => {
  const { email, sifre } = req.body;

  if (!email || !sifre) {
    return res.status(400).json({ message: "Email ve şifre gereklidir!" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Kullanicilar WHERE email = ? AND sifre = ?",
      [email, sifre] // Direct password comparison (No Hashing)
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Geçersiz email veya şifre!" });
    }

    const user = rows[0];

    res.status(200).json({ message: "Giriş başarılı!", user });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Sunucu hatası!", error: err.message });
  }
});

// ✅ Tüm Kullanıcıları Getir (Get All Users)
router.get("/kullanicilar", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, kullanici_adi, email, ad_soyad, rol FROM Kullanicilar"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Sunucu hatası!", error: err.message });
  }
});

module.exports = router;
