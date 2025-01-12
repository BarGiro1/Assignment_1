const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.error("Database connection error:", error));
db.once("open", () => console.log("Connected to database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRoute = require("./Routes/posts_route");
app.use("/posts", postsRoute);

const commentsRoute = require("./Routes/comments_route");
app.use("/comments", commentsRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
