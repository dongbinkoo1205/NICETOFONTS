// 폰트 이름으로 필터링
export const filterByName = (fonts, query) => {
    return fonts.filter((font) => font.font_name.toLowerCase().includes(query.toLowerCase()));
};

// 폰트 종류(category)로 필터링
export const filterByCategory = (fonts, font_style) => {
    return fonts.filter((font) => {
        const isMatch = font.font_style === font_style;
        return isMatch;
    });
};

// 폰트 스타일(variants)로 필터링 (숫자)
export const filterByNumVariants = (fonts, filterValue) => {
    filterValue = (filterValue || '').toString(); // `undefined` 및 숫자 변환 방지

    return fonts.filter((font) => {
        let weights = font.weights || '';

        if (typeof weights === 'string') {
            weights = weights.split(',').map((w) => w.trim()); // 공백 제거 후 배열로 변환
        } else if (typeof weights === 'object') {
            weights = Object.values(weights);
        } else {
            weights = [];
        }

        const isMatch = weights.some((weight) => weight.includes(filterValue));
        return isMatch;
    });
};

// 폰트 스타일(variants)로 필터링 (영문)
export const filterByTextVariants = (fonts, variants) => {
    if (!variants || variants.length === 0 || variants.includes('')) {
        return fonts;
    }

    variants = variants.filter((variant) => isNaN(variant));

    return fonts.filter((font) => {
        let fontVariants = font.variants || 'regular';
        if (typeof fontVariants === 'string') {
            fontVariants = fontVariants.split(',').map((v) => v.trim());
        }

        const isMatch = variants.some((variant) => fontVariants.includes(variant));
        return isMatch;
    });
};

// 폰트 지원 언어(subsets)로 필터링
export const filterBySubsets = (fonts, subsets) => {
    if (!subsets || subsets.length === 0 || subsets.includes('')) {
        return fonts; // ✅ 빈 값이면 필터링 없이 모든 폰트 반환
    }

    return fonts.filter((font) => {
        let fontSubsets = font.supported_languages || '';

        if (typeof fontSubsets === 'string') {
            fontSubsets = fontSubsets.split(',').map((s) => s.trim()); // ✅ 쉼표로 나누고 공백 제거
        }

        const isMatch = subsets.every((subset) => fontSubsets.includes(subset));
        return isMatch;
    });
};

// 폰트 종류(kind)로 필터링
export const filterByKind = (fonts, kind) => {
    return fonts.filter((font) => font.kind === kind);
};

// 언어별로 필터링 (영어, 중국어, 한국어, 일본어만)
export const filterByLanguage = (fonts) => {
    const allowedLanguages = ['latin', 'chinese-simplified', 'korean', 'japanese'];
    return fonts.filter((font) => {
        return font.supported_languages.some((subset) => allowedLanguages.includes(subset));
    });
};

// 최신순 정렬 (내림차순: 최신 데이터가 먼저)
export const filterByNewest = (fonts) => {
    const sortedFonts = [...fonts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return sortedFonts;
};

// 오래된순 정렬 (오름차순: 가장 오래된 데이터가 먼저)
export const filterByOldest = (fonts) => {
    const sortedFonts = [...fonts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    return sortedFonts;
};
// 오래된순 정렬 (오름차순: 가장 오래된 데이터가 먼저)
export const filterByDown = (fonts) => {
    const sortedFonts = [...fonts].sort((a, b) => b.download_count - a.download_count);

    return sortedFonts;
};
