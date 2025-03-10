require('dotenv').config();
const mysql = require('mysql2');

const db = mysql
    .createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'ckawpwk0165!',
        database: process.env.DB_NAME || 'my_fonts_db',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 100,
        queueLimit: 0,
    })
    .promise(); // ✅ 반드시 promise() 적용!

// ✅ MySQL 연결 체크 (Ping Test)
(async () => {
    try {
        await db.query('SELECT 1');
        console.log('✅ MySQL 데이터베이스 연결 성공!');
    } catch (err) {
        console.error('❌ MySQL 연결 오류:', err);
    }
})();

module.exports = db;
