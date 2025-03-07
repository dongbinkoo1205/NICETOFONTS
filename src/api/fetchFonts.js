const API_BASE_URL = 'http://localhost:5000'; // 올바른 API 주소 확인

/** ✅ 폰트 데이터를 가져오고 Google Fonts & Custom Fonts 로드 */
export const fetchFonts = async (limit = 100, offset = 0) => {
    try {
        // console.log('🚀 API 요청 시작');
        const response = await fetch(`${API_BASE_URL}/fonts?limit=${limit}&offset=${offset}`);
        // console.log('📡 API 응답 상태:', response.status);

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
        }

        const fonts = await response.json();
        console.log('📡 받아온 폰트 데이터:', fonts);
        // ✅ `files` 필드가 JSON 문자열이면 변환
        fonts.forEach((font) => {
            if (typeof font.files === 'string') {
                try {
                    font.files = JSON.parse(font.files);
                } catch (error) {
                    console.warn(`⚠️ 'files' 필드 JSON 변환 실패:`, font.files, error);
                    font.files = {}; // 오류 발생 시 빈 객체로 설정
                }
            }
        });

        // ✅ 폰트 로드 실행
        loadGoogleFonts(fonts);
        loadCustomFonts(fonts);

        return fonts;
    } catch (error) {
        console.error('❌ 폰트 데이터 불러오기 오류:', error);
        return [];
    }
};

/** ✅ Google Fonts 최적화 로드 */
const loadGoogleFonts = (fonts) => {
    const googleFonts = fonts
        .filter((font) => font.source === 'Google Fonts') // Google Fonts만 필터링
        .map((font) => font.font_name.replace(/\s/g, '+')); // 폰트 이름을 Google Fonts 형식으로 변환

    if (googleFonts.length === 0) return; // ✅ Google Fonts가 없으면 실행하지 않음

    const linkHref = `https://fonts.googleapis.com/css2?family=${googleFonts.join('&family=')}&display=swap`;

    // ✅ 중복 추가 방지
    if (!document.querySelector(`link[href="${linkHref}"]`)) {
        const link = document.createElement('link');
        link.href = linkHref;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
};

/** ✅ Custom Fonts (@font-face) 동적 추가 */
const loadCustomFonts = (fonts) => {
    const existingFonts = new Set();
    document.head.querySelectorAll('style[data-font]').forEach((style) => {
        existingFonts.add(style.getAttribute('data-font'));
    });

    const newStyleTag = document.createElement('style');
    newStyleTag.setAttribute('data-font', 'dynamic-fonts');

    const newStyles = fonts
        .filter((font) => font.source !== 'Google Fonts') // Google Fonts 제외
        .filter((font) => font.site_url.endsWith('.ttf') || font.site_url.endsWith('.woff2')) // ✅ URL이 폰트 파일인 경우만
        .filter((font) => !existingFonts.has(font.font_name)) // ✅ 중복 제거
        .map(
            (font) => `
      @font-face {
        font-family: '${font.font_name}';
        src: url('${font.site_url}') format('${font.site_url.endsWith('.woff2') ? 'woff2' : 'truetype'}');
        font-weight: normal;
        font-style: normal;
      }
    `
        )
        .join('\n');

    if (newStyles) {
        newStyleTag.innerHTML = newStyles;
        document.head.appendChild(newStyleTag);
    }
};
