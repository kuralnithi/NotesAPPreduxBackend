const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const rdsCon = () => {
  const con = mysql2.createPool({
    host: "rdstest.c34s0w2yusrf.us-east-1.rds.amazonaws.com",
    port: "3307",
    user: "admin",
    password: process.env.PASS,
    database: "notesdb",
  });
  return con;
};

module.exports = rdsCon;
