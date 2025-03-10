require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 서버가 정상적으로 실행 중입니다.');
});

// ✅ 폰트 리스트 가져오기 (페이징 적용)
app.get('/fonts', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const offset = parseInt(req.query.offset) || 0;

        const sql = `SELECT * FROM fonts LIMIT ? OFFSET ?`;
        const [results] = await db.execute(sql, [limit, offset]); // ✅ execute 사용

        results.forEach((font) => {
            try {
                if (typeof font.files === 'string') {
                    font.files = JSON.parse(font.files);
                }
            } catch (error) {
                console.warn(`⚠️ 'files' 필드 JSON 변환 실패:`, font.files, error);
            }
        });

        res.json(results);
    } catch (err) {
        console.error('❌ MySQL 데이터 조회 오류:', err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ 폰트 검색 (최대 10개 제한)
app.get('/search-fonts', async (req, res) => {
    const { query, limit = 100, offset = 0 } = req.query;

    if (!query) {
        return res.json([]);
    }

    try {
        const sql = `SELECT * FROM fonts WHERE font_name LIKE ? LIMIT ? OFFSET ?`;
        const [results] = await db.execute(sql, [`%${query}%`, parseInt(limit), parseInt(offset)]); // ✅ execute 사용
        res.json(results);
    } catch (err) {
        console.error('❌ 폰트 검색 오류:', err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ 다운로드 횟수 증가 API
app.post('/fonts/download/:id', async (req, res) => {
    const fontId = req.params.id;

    try {
        const [updateResult] = await db.execute('UPDATE fonts SET download_count = download_count + 1 WHERE id = ?', [
            fontId,
        ]); // ✅ execute 사용

        if (updateResult.affectedRows === 0) {
            console.warn(`⚠️ 폰트(ID: ${fontId})가 존재하지 않음`);
            return res.status(404).json({ message: '해당 폰트가 존재하지 않습니다.' });
        }

        // ✅ 업데이트 후 변경된 데이터 다시 조회하기
        const [updatedFont] = await db.execute('SELECT * FROM fonts WHERE id = ?', [fontId]); // ✅ execute 사용

        res.json({ message: '다운로드 횟수 증가 완료', font: updatedFont[0] });
    } catch (error) {
        console.error('❌ 다운로드 API 에러:', error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
