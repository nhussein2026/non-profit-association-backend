const express = require("express");
const pool = require("../db"); // Import MySQL connection

const router = express.Router();

// ✅ POST: Yeni bir başvuru ekle
router.post("/basvuru-ekle", async (req, res) => {
  console.log("İstek gövdesi:", req.body);
  const { ad, soyad, kimlik_no, telefon, adres } = req.body;

  // Gerekli alanların kontrolü
  if (!ad || !soyad || !kimlik_no) {
    return res.status(400).json({
      message: "Ad, Soyad ve Kimlik Numarası zorunlu alanlardır!",
    });
  }

  try {
    // Veritabanına başvuruyu ekle
    await pool.query(
      "INSERT INTO Applications (name, surname, national_id, phone, address) VALUES (?, ?, ?, ?, ?)",
      [ad, soyad, kimlik_no, telefon, adres]
    );

    res.status(201).json({ message: "Başvuru başarıyla gönderildi!" });
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    res.status(500).json({ message: "Sunucu hatası!", error: err.message });
  }
});

// ✅ GET: Retrieve all applications
router.get("/applications", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Applications ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error!", error: err.message });
  }
});

module.exports = router;
