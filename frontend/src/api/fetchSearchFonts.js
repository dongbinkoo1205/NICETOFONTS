const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://nicetofonts.onrender.com';


if (!API_BASE_URL) {
    console.error("❌ API_BASE_URL이 정의되지 않았습니다!");
}

console.log("✅ API_BASE_URL:", API_BASE_URL);


export const fetchSearchFonts = async (query, limit = 100, offset = 0) => {
    if (!query) return [];

    try {
        const response = await fetch(`${API_BASE_URL}/api/search-fonts?query=${query}&limit=${limit}&offset=${offset}`);

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
