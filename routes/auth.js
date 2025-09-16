const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ---------------- LOGIN PAGE ----------------
router.get("/", (req, res) => {
  res.render("login");
});

// ---------------- LOGIN POST ----------------
router.post("/login", (req, res) => {
  const { username, code } = req.body;

  // username and pass both should be match 
  db.query(
    "SELECT * FROM users WHERE username = ? AND code = ?",
    [username, code],
    (err, result) => {
      if (err) return res.send("❌ Database error");

      if (result.length > 0) {
        const user = result[0];

        // Role check
        if (user.role === "admin") {
          res.redirect("/events/admin");
        } else {
          res.redirect("/events/home");
        }
      } else {
        // false username ya password hua toh
        res.render("Mistake.ejs");
      }
    }
  );
});

module.exports = router;