import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FontProvider } from './contexts/FontContext';
import { InputProvider } from './contexts/InputContext';
import { FilterProvider } from './contexts/FilterContext';
import { LayerProvider } from './contexts/LayerContext';
import MediaQueryProvider from './contexts/MediaQueryContext';

import MainPage from './Page/MainPage'; // 메인페이지
import FontDetail from './Page/FontDetail'; // 폰트 상세 페이지 추가
import IconPage from './Page/IconPage'; // 폰트 상세 페이지 추가
import FaqPage from './Page/FaqPage'; // 폰트 상세 페이지 추가
import Home from './Page/Home'; // 폰트 상세 페이지 추가

// mui 컴포넌트
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/MuiComponents/CustomFontFamily'; // 설정한 테마 가져오기

function App() {
    return (
        <Router>
            <MediaQueryProvider>
                <ThemeProvider theme={theme}>
                    <LayerProvider>
                        <FontProvider>
                            <InputProvider>
                                <FilterProvider>
                                    <Routes>
                                        <Route path="/Page/FontDetail/:fontName" element={<FontDetail />} />
                                        <Route path="/" element={<Home />} />
                                        <Route path="/Page/MainPage" element={<MainPage />} />
                                        <Route path="/Page/IconPage" element={<IconPage />} />
                                        <Route path="/Page/FaqPage" element={<FaqPage />} />
                                    </Routes>
                                </FilterProvider>
                            </InputProvider>
                        </FontProvider>
                    </LayerProvider>
                </ThemeProvider>
            </MediaQueryProvider>
        </Router>
    );
}

export default App;
