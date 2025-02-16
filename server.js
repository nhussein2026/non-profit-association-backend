require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Import the MySQL pool

const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(cors());
app.use(express.json());

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS test");
    res.json({ message: "Database connection successful!", data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all requested items
app.get("/requested-items", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM TalepEdilenUrunler");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all users
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Kullanicilar");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use authentication routes
app.use("/auth", authRoutes);

// Use application routes
app.use("/applications", require("./routes/applicationRoutes"));

// Use talepler routes
app.use("/talepler", require("./routes/TaleplerRoutes"));

// Use talepler routes
app.use("/", require("./routes/statsRoutes"));

// Use talepler routes
app.use("/", require("./routes/TaleplerTablosuRoutes"));

// Use talepler routes
app.use("/", require("./routes/hayirKurumlariRoutes"));

// Use talepler routes
app.use("/", require("./routes/mevcutkaynaklarRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
