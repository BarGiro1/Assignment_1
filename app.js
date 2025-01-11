const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.error("Database connection error:", error));
db.once("open", () => console.log("Connected to database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRoute = require("./routes/posts_route");
app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
