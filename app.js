const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use("/api/online__Radio/users", userRoute);
module.exports = app;
