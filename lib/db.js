import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",   // use 127.0.0.1 if localhost fails
    user: "root",        // your MySQL username
    password: "Manju012@",        // your MySQL password
    database: "schooldb"
  });
  return connection;
}
