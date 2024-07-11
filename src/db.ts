import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db= mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
});


db.connect((err)=>{
  if(err){
    console.error('MySQL connection failed', err)
  }
  else{
    console.log('connected sucessfuly')
  }
});

module.exports = db;