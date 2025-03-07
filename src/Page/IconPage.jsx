import React, { useState, useContext, useEffect } from 'react';

import { Container, Typography, Box, Divider, Link } from '@mui/material';
import { MediaQueryContext } from '../contexts/MediaQueryContext'; // 반응형 컨텍스트

import FixSideContent from '../components/FixSideContent';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';

const IconPage = () => {
    // 반응형 컨텍스트
    const { isMobile } = useContext(MediaQueryContext);

    const headerItems = [{ value: 'Home' }, { value: 'About' }, { value: 'Template' }];

    // 홈메뉴 상태
    const [menu, setMenu] = useState({ selected: headerItems[0].value });

    // 홈메뉴 스크롤
    const handleScroll = (menu) => {
        document.getElementById(menu)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    // 페이지 랜더링시 스크롤 상단으로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexWrap: 'wrap',
                height: isMobile ? '100dvh' : 'auto',
            }}
            className={`Pretendard-r `}
        >
            <FixSideContent display={'none'} />
            <Box
                sx={{
                    width: isMobile ? '100%' : '95%',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBottom: isMobile ? 'var(--footer-height)' : '',
                }}
            >
                <HomeHeader setMenu={setMenu} menu={menu} handleScroll={handleScroll} headerItems={headerItems} />
                <Container
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh - 10rem)',
                    }}
                >
                    {/* 타이틀 */}
                    <Typography variant="h5" fontWeight="bold" color="currentColor" fontSize={'5rem'}>
                        and preparing hard :)
                    </Typography>

                    {/* 설명 텍스트 */}
                    <Typography
                        variant="body2"
                        color="currentColor"
                        sx={{ mt: 2, mx: 'auto', fontSize: '1.8rem', lineHeight: '1.8' }}
                    >
                        죄송합니다. 아이콘 컨텐츠는 바쁘게 준비 중에 있습니다.
                        <br />
                        문의사항이 있으시면 아래 이메일로 연락부탁드립니다.
                    </Typography>
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};

export default IconPage;
