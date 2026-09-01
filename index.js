const express = require("express");
const pool = require("./db");

const app = express();
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
app.listen(port, () => {
  console.log(`MyWishlist backend is running on port ${port}`);
});