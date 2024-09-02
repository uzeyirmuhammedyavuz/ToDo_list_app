require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const sequelize = require("./db/db");
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(port, async () => {
  try {
    console.log(`app running on port ${port}`);
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
