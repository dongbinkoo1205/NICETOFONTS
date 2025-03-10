require('dotenv').config();
const mysql = require('mysql2');

const db = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 100,
        queueLimit: 0,
    })
    .promise();

(async () => {
    try {
        await db.query('SELECT 1');
        console.log('✅ MySQL 데이터베이스 연결 성공!');
    } catch (err) {
        console.error('❌ MySQL 연결 오류:', err);
    }
})();

module.exports = db;
