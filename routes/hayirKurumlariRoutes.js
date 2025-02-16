const express = require('express');
const pool = require('../db'); // Import MySQL connection

const router = express.Router();

// GET Endpoint: Retrieve all HayirKurumlari
router.get('/hayir-kurumlari', async (req, res) => {
    const query = 'SELECT * FROM HayirKurumlari';
    try {
        const [results] = await pool.query(query);  // Using async/await instead of callbacks
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST Endpoint: Add new HayirKurumlari
router.post('/hayir-kurumlari', async (req, res) => {
    const { ad, yetkili_kisi, telefon, email, adres } = req.body;

    // Check if all required fields are present
    if (!ad || !yetkili_kisi || !telefon || !email || !adres) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO HayirKurumlari (ad, yetkili_kisi, telefon, email, adres)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [ad, yetkili_kisi, telefon, email, adres];

    try {
        const [result] = await pool.query(query, values);  // Using async/await instead of callbacks
        res.status(201).json({ message: 'Hayır Kurumu added successfully', id: result.insertId });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
