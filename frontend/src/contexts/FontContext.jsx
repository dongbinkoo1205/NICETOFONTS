import React, { createContext, useState, useEffect, useContext } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';

// ✅ 환경 변수 적용
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://nicetofonts.onrender.com';

// FontContext 생성
const FontContext = createContext();

// FontProvider 컴포넌트 정의
export const FontProvider = ({ children }) => {
    const [fonts, setFonts] = useState([]); // 폰트 데이터 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [fontSize, setFontSize] = useState(30); // 폰트 크기 조절 상태

    // ✅ debounce 최적화
    const updateFontSize = debounce((size) => setFontSize(size), 300);

    // ✅ 서버에서 폰트 데이터 가져오기 (환경 변수 적용)
    useEffect(() => {
        console.log('✅ API_BASE_URL:', API_BASE_URL); // 환경 변수 확인

        const fetchFonts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/fonts?limit=10&offset=0`);
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
        <FontContext.Provider value={{ fonts, loading, fontSize, updateFontSize, setFonts, setFontSize }}>
            {children}
        </FontContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useFontContext = () => useContext(FontContext);
