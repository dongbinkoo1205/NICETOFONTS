import React, { createContext, useState, useEffect, useContext, useCallback, useDeferredValue } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';

// FontContext 생성
const FontContext = createContext();

// FontProvider 컴포넌트 정의
export const FontProvider = ({ children }) => {
    const [fonts, setFonts] = useState([]); // 폰트 데이터 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [fontSize, setFontSize] = useState(30); // 폰트 크기 조절 상태
    const deferredFontSize = useDeferredValue(fontSize); // 변경된 값을 지연 적용

    // 300ms 동안 입력이 없을 때만 상태 업데이트
    const updateFontSize = useCallback(
        debounce((size) => setFontSize(size), 300),
        []
    );

    // 서버에서 폰트 데이터 가져오기
    useEffect(() => {
        const fetchFonts = async () => {
            try {
                const response = await axios.get('https://nicetofonts.onrender.com/fonts?limit=10&offset=0');
                setFonts(response.data);
            } catch (error) {
                console.error('❌ 폰트 데이터를 불러오는 중 오류 발생:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFonts();
    }, []);

    return (
        <FontContext.Provider
            value={{ fonts, loading, fontSize, deferredFontSize, updateFontSize, setFonts, setFontSize }}
        >
            {children}
        </FontContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useFontContext = () => useContext(FontContext);
