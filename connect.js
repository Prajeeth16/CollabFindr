import mysql from "mysql2"
let db = mysql.createPool({
host: 'localhost',
user: "prajeeth",
password: "prajeeth@2k6",
database: "collabfindr",
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0
})
export { db }