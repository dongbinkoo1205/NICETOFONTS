const API_BASE_URL = 'http://localhost:5000'; // ✅ API 서버 주소

/** ✅ 다운로드 횟수 증가 */
export const fetchDownload = async (fontId) => {
    try {
        console.log(`🚀 다운로드 요청 시작 (ID: ${fontId})`);

        const response = await fetch(`${API_BASE_URL}/fonts/download/${fontId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('📡 다운로드 API 응답 상태:', response.status);

        if (!response.ok) {
            throw new Error(`❌ 다운로드 API 요청 실패: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ 다운로드 완료, 업데이트된 데이터:', data);

        return data.font; // ✅ 업데이트된 폰트 데이터 반환
    } catch (error) {
        console.error('❌ 다운로드 API 호출 오류:', error);
        return null;
    }
};
