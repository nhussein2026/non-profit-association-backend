const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// GET all requests with applicant details
router.get('/talepler-tablosu', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        tu.id,
        a.name,
        a.surname,
        a.national_id,
        a.phone,
        a.address,
        tu.kategori,
        tu.aciklama,
        tu.miktar,
        tu.durum
      FROM TalepEdilenUrunler tu
      JOIN Applications a ON tu.basvuran_id = a.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
