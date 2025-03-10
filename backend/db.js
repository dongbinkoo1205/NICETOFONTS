require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
});

// ✅ 연결 테스트
(async () => {
    try {
        const [result] = await db.execute('SELECT 1'); // ✅ execute() 사용
        console.log('✅ MySQL 데이터베이스 연결 성공!');
    } catch (err) {
        console.error('❌ MySQL 연결 실패:', err);
        process.exit(1); // ❗ 서버 실행 중단 (필수)
    }
})();

module.exports = db; // ✅ db 내보내기
