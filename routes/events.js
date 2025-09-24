const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ***** USER HOME *****
router.get("/home", (req, res) => {
  db.query("SELECT * FROM events", (err, events) => {
    if (err) return res.send("❌ कार्यक्रम लाने में त्रुटि");
    res.render("home", { events });
  });
});

// ********* ADMIN DASHBOARD ********
router.get("/admin", (req, res) => {
  db.query("SELECT * FROM events", (err, events) => {
    if (err) return res.send("❌ कार्यक्रम लाने में त्रुटि");
    res.render("admin", { events });
  });
});
// *********** EVENT DETAILS *****
router.get("/details/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM events WHERE id = ?", [id], (err, event) => {
    if (err) return res.send("Error fetching event details");
    if (!event[0]) return res.send("Event nahi mila");
    res.render("details", { event: event[0] });
  });
});

// *********************** ADD EVENT (ADMIN) ***********************
router.get("/add", (req, res) => {
  res.render("addEvent");
});

router.post("/add", (req, res) => {
  const { name, description, start_date, end_date, issue_date, location, event_type } = req.body;
  const sql = `INSERT INTO events (name, description, start_date, end_date, issue_date, location, event_type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, description, start_date, end_date, issue_date, location, event_type], (err) => {
    if (err) return res.send("❌ कार्यक्रम जोड़ने में त्रुटि: " + err);
    res.redirect("/events/admin");
  });
});

// *********************** UPDATE EVENT (USER) ***********************
router.get("/update/user/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM events WHERE id = ?", [id], (err, events) => {
    if (err) return res.send("❌ कार्यक्रम लाने में त्रुटि");
    if (!events[0]) return res.send("⚠️ कार्यक्रम नहीं मिला");
    res.render("update", { event: events[0], role: "user" });
  });
});

router.post("/update/user/:id", (req, res) => {
  const { id } = req.params;
  const { location, start_date, end_date } = req.body;
  db.query(
    "UPDATE events SET location = ?, start_date = ?, end_date = ? WHERE id = ?",
    [location, start_date, end_date, id],
    (err) => {
      if (err) return res.send("❌ कार्यक्रम अपडेट करने में त्रुटि: " + err);
      res.redirect("/events/home");  // User redirect
    }
  );
});

// *********************** UPDATE EVENT (ADMIN) ***********************
router.get("/update/admin/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM events WHERE id = ?", [id], (err, events) => {
    if (err) return res.send("❌ कार्यक्रम लाने में त्रुटि");
    if (!events[0]) return res.send("⚠️ कार्यक्रम नहीं मिला");
    res.render("update", { event: events[0], role: "admin" });
  });
});

router.post("/update/admin/:id", (req, res) => {
  const { id } = req.params;
  const { location, start_date, end_date } = req.body;
  db.query(
    "UPDATE events SET location = ?, start_date = ?, end_date = ? WHERE id = ?",
    [location, start_date, end_date, id],
    (err) => {
      if (err) return res.send("❌ कार्यक्रम अपडेट करने में त्रुटि: " + err);
      res.redirect("/events/admin");  // Admin redirect
    }
  );
});

module.exports = router;
