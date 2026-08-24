const express = require("express");

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Welcome to the MyWishlist API");
});
app.listen(port, () => {
  console.log(`MyWishlist backend is running on port ${port}`);
});