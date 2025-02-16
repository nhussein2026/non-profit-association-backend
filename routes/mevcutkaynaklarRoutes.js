const express = require('express');
const pool = require('../db'); // Import MySQL connection

const router = express.Router();

// GET Endpoint: Retrieve all MevcutKaynaklar
router.get('/mevcut-kaynaklar', async (req, res) => {
    const query = 'SELECT * FROM MevcutKaynaklar';
    try {
        const [results] = await pool.query(query);  // Using async/await
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST Endpoint: Add new MevcutKaynaklar
router.post('/mevcut-kaynaklar', async (req, res) => {
    const { hayir_kurumu_id, kategori, aciklama, miktar, durum } = req.body;

    // Check if all required fields are present
    if (!hayir_kurumu_id || !kategori || !aciklama || !miktar || !durum) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO MevcutKaynaklar (hayir_kurumu_id, kategori, aciklama, miktar, durum)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [hayir_kurumu_id, kategori, aciklama, miktar, durum];

    try {
        const [result] = await pool.query(query, values);  // Using async/await
        res.status(201).json({ message: 'Mevcut Kaynak added successfully', id: result.insertId });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
