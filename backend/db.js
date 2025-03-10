require('dotenv').config();
const mysql = require('mysql2');

const db = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 100,
        queueLimit: 0,
    })
    .promise();

// 연결 테스트 코드
(async () => {
    try {
        await db.query('SELECT 1');
        console.log('✅ MySQL 데이터베이스 연결 성공!');
    } catch (err) {
        console.error('❌ MySQL 연결 실패:', err);
    }
})();
