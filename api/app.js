const express = require("express");
const app = express();
const port = 3000;

app.get("/api", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
