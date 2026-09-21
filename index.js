const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
app.get("/wishes", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM wishes
      ORDER BY CASE WHEN priority = 'high' THEN 0 ELSE 1 END, id`
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
  const { name, price, priority } = req.body;
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
  if (priority !== "high" && priority !== "low") {
    return res.status(400).json({
      error: "Priority must be high or low",
    });
  }
  try {
    const result = await pool.query(
      `INSERT INTO wishes (name, price, priority)
   VALUES ($1, $2, $3)
   RETURNING *`,
      [name.trim(), price, priority]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Could not create wish:", error);
    res.status(500).json({
      error: "Could not create wish",
    });
  }
});
app.put("/wishes/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, price, bought, priority } = req.body;
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "ID must be a positive integer",
    });
  }
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Name is required",
    });
  }
  if (
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return res.status(400).json({
      error: "Price must be a non-negative number",
    });
  }
  if (typeof bought !== "boolean") {
    return res.status(400).json({
      error: "Bought must be true or false",
    });
  }

  if (priority !== "high" && priority !== "low") {
    return res.status(400).json({
      error: "Priority must be high or low",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE wishes
       SET name = $1, price = $2, bought = $3, priority = $4
       WHERE id = $5
       RETURNING *`,
      [name.trim(), price, bought, priority, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Wish not found",
      });
    }


    res.json(result.rows[0]);
  } catch (error) {
    console.error("Could not update wish:", error);
    res.status(500).json({
      error: "Could not update wish",
    });
  }
});
app.delete("/wishes/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "ID must be a positive integer",
    });
  }

  try {
    const result = await pool.query(
      `DELETE FROM wishes
       WHERE id = $1
       RETURNING *`,
      [id]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Wish not found",
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Could not delete wish:", error);
    res.status(500).json({
      error: "Could not delete wish",
    });
  }
});
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});
app.listen(port, () => {
  console.log(`MyWishlist backend is running on port ${port}`);
});