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

if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Name is required",
    });
  }

if (typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return res.status(400).json({
      error: "Price must be a non-negative number",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO wishes (name, price)
       VALUES ($1, $2)
       RETURNING *`,
      [name.trim(), price]
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