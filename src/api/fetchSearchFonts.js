const API_BASE_URL = 'http://localhost:5000';

export const fetchSearchFonts = async (query, limit = 100, offset = 0) => {
    if (!query) return [];

    try {
        const response = await fetch(`${API_BASE_URL}/search-fonts?query=${query}&limit=${limit}&offset=${offset}`);

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
        }

        const fonts = await response.json();
        console.log(`🔍 검색된 폰트 (${query}):`, fonts);

        return fonts;
    } catch (error) {
        console.error('❌ 폰트 검색 오류:', error);
        return [];
    }
};
