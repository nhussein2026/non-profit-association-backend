const express = require("express");
const pool = require("../db"); // Import MySQL connection

const router = express.Router();


router.get('/users/stats', async (req, res) => {
    const [totalUsers] = await pool.query('SELECT COUNT(*) AS total FROM Kullanicilar');
    const [totalAdmins] = await pool.query('SELECT COUNT(*) AS total FROM Kullanicilar WHERE rol = "Admin"');
    
    res.json({
      totalUsers: totalUsers[0].total,
      totalAdmins: totalAdmins[0].total
    });
  });

  router.get('/applications/stats', async (req, res) => {
    const [total] = await pool.query('SELECT COUNT(*) AS total FROM Applications');
    const [pending] = await pool.query('SELECT COUNT(*) AS total FROM Applications WHERE status = "pending"');
    const [status] = await pool.query(`
      SELECT 
        SUM(status = 'approved') AS approved,
        SUM(status = 'pending') AS pending,
        SUM(status = 'rejected') AS rejected
      FROM Applications
    `);
  
    res.json({
      totalApplications: total[0].total,
      pendingApplications: pending[0].total,
      statusDistribution: status[0]
    });
  });

  router.get('/products/stats', async (req, res) => {
    const [total] = await pool.query('SELECT COUNT(*) AS total FROM TalepEdilenUrunler');
    const [categories] = await pool.query(`
      SELECT kategori AS category, SUM(miktar) AS total 
      FROM TalepEdilenUrunler 
      GROUP BY kategori
    `);
  
    res.json({
      totalProducts: total[0].total,
      categoryDistribution: categories
    });
  });

  

module.exports = router;
