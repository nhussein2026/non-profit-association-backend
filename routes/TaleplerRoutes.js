const express = require("express");
const pool = require("../db"); // Import MySQL connection

const router = express.Router();

// POST Endpoint to add new product request
router.post('/add', async (req, res) => {
    console.log("Talepler: ", req.body)
    const { basvuran_id, kategori, aciklama, miktar } = req.body;
    
    // Validation
    if (!basvuran_id || !kategori || !aciklama || !miktar) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    try {
         // Execute query without destructuring
    const result = await pool.query(
        `INSERT INTO TalepEdilenUrunler 
         (basvuran_id, kategori, aciklama, miktar) 
         VALUES (?, ?, ?, ?)`,
        [basvuran_id, kategori, aciklama, miktar]
      );
      // Access the insertId correctly
      const newId = result[0].insertId;
      
      res.status(201).json({
        message: 'Request added successfully',
        id: newId
      });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});


module.exports = router;
