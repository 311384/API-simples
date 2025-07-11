const express = require("express");
const app = express();

const port = 8081;
app.get("/", (req, res) => {
  res.send("Minha API!");
});
app.get("/api", (req, res) => {
  res.json({ message: "Hello from API!" });
});
app.get("/api/data", (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
