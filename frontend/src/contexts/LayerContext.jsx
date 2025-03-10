import React, { createContext, useContext, useState, useEffect } from 'react';

// FilterContext 생성
const LayerContext = createContext();

export const useLayerContext = () => useContext(LayerContext);

export const LayerProvider = ({ children }) => {
    const [layerStyle, setlayerStyle] = useState(false);

    // localStorage에서 초기 다크 모드 상태 가져오기
    const getInitialDarkMode = () => {
        return localStorage.getItem('darkMode') === 'true'; // 문자열 비교
    };

    const [dark, setDark] = useState(getInitialDarkMode);

    // 다크 모드 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        if (dark) {
            document.body.classList.add('darkMode');
            document.body.classList.remove('normal');
        } else {
            document.body.classList.remove('darkMode');
            document.body.classList.add('normal');
        }

        localStorage.setItem('darkMode', dark); // 최신 상태를 localStorage에 저장
    }, [dark]);

    const value = {
        layerStyle,
        dark,
        setlayerStyle,
        setDark,
    };

    return <LayerContext.Provider value={value}>{children}</LayerContext.Provider>;
};
