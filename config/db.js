const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        
  password: "",        
  database: "myTask"   
});

db.connect(err => {
  if (err) {
    console.error(" Database connect error:", err);
  } else {
    console.log(" Database connected");
  }
});
module.exports = db;