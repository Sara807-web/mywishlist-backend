const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the MyWishlist API");
});
app.get("/wishes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM wishes ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Could not load wishes:", error);
    res.status(500).json({
      error: "Could not load wishes",
    });
  }
});
app.post("/wishes", async (req, res) => {
  const { name, price } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO wishes (name, price)
       VALUES ($1, $2)
       RETURNING *`,
      [name, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Could not create wish:", error);
    res.status(500).json({
      error: "Could not create wish",
    });
  }
});
app.listen(port, () => {
  console.log(`MyWishlist backend is running on port ${port}`);
});