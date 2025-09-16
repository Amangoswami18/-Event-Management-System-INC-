const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000; 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

app.use("/", authRoutes);
app.use("/events", eventRoutes);

app.listen(PORT, () => {
  console.log(` Server is running: http://localhost:${PORT}`);
});
