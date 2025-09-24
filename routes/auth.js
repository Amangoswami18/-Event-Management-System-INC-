const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ---------------- LOGIN PAGE ----------------
router.get("/", (req, res) => {
  res.render("login");
});

// ---------------- LOGIN POST ----------------
router.post("/login", (req, res) => {
  const { code } = req.body;

  // code sirf 4 digit ka hona chahiye
  if (!/^\d{4}$/.test(code)) {
    return res.render("Mistake.ejs"); 
  }

  // ab DB me sirf code check karenge
  db.query("SELECT * FROM users WHERE code = ?", [code], (err, result) => {
    if (err) return res.send("❌ Database error");

    if (result.length > 0) {
      const user = result[0];

      if (user.role === "admin") {
        res.redirect("/events/admin");
      } else {
        res.redirect("/events/home");
      }
    } else {
      res.render("Mistake.ejs"); // code galat hua toh
    }
  });
});

module.exports = router;
