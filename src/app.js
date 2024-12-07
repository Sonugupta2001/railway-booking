const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/trains", require("./routes/trainRoutes"));

app.use("/user", userRoutes);
app.use("/admin/trains", trainRoutes);


module.exports = app;