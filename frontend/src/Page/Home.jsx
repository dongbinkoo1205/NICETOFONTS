import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MediaQueryContext } from '../contexts/MediaQueryContext';

// mui
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import { About1, About2, About3, About4 } from '../util/DataText'; // 나이스투 폰트 설명 텍스트

import FixSideContent from '../components/FixSideContent';
import HomeHeader from '../components/HomeHeader';
import HomeFolderScroll from '../components/HomeFolderScroll';
import Footer from '../components/Footer';

// 링크
const menuItems = [
    { text: '폰트보기', link: '/Page/MainPage' },
    { text: '문의하기', link: '/Page/FaqPage' },
    { text: 'Created by', link: 'https://profile-theta-lovat.vercel.app/' },
];

const headerItems = [{ value: 'Home' }, { value: 'About' }, { value: 'Template' }];

const Home = () => {
    // 반응형 컨텍스트
    const { isMobile } = useContext(MediaQueryContext);

    // 홈메뉴 상태
    const [menu, setMenu] = useState({ selected: headerItems[0].value });

    // 홈메뉴 스크롤
    const handleScroll = (menu) => {
        document.getElementById(menu)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // 폰트 굵기 상태 & 마우스 위치 상태
    const [fontWeight, setFontWeight] = useState(100);
    const [position, setPosition] = useState({ y: 0 });

    // 마우스 ref
    const divRef = useRef(null);
    const animationFrame = useRef(null);

    useEffect(() => {
        const updateMousePosition = (e) => {
            if (!divRef.current) return;

            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current); // 이전 애니메이션 취소
            }

            animationFrame.current = requestAnimationFrame(() => {
                const rect = divRef.current.getBoundingClientRect();
                let offsetY = e.clientY - rect.top;

                // Y 값이 컨테이너 안에서만 움직이도록 제한
                offsetY = Math.max(0, Math.min(offsetY, rect.height));
                setPosition({ y: offsetY });

                // 폰트 굵기 조절 (100~900 사이)
                const weight = Math.round((offsetY / rect.height) * 500) + 100;
                setFontWeight(weight);
            });
        };

        const container = divRef.current;

        if (container) {
            if (!isMobile) {
                // 모바일이 아닐 때만 mousemove 이벤트 추가
                container.addEventListener('mousemove', updateMousePosition);
            } else {
                // 모바일일 경우 mousemove 이벤트를 제거 (한 번만 실행되도록 보장)
                container.removeEventListener('mousemove', updateMousePosition);
            }
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', updateMousePosition);
            }
        };
    }, [isMobile]);

    return (
        <Box sx={{ display: 'flex' }}>
            <FixSideContent display={'none'} />
            <Box
                sx={{
                    marginBottom: isMobile ? 'var(--footer-height)' : '',
                    display: 'flex',
                    flexDirection: 'column',
                    width: isMobile ? '100%' : '95%',
                }}
            >
                {/* 헤더 */}
                <HomeHeader setMenu={setMenu} menu={menu} handleScroll={handleScroll} headerItems={headerItems} />
                <Box id="Home">
                    <Box
                        ref={divRef}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: isMobile ? 'self-start' : 'self-end',
                            justifyContent: isMobile ? 'center' : 'space-between',
                            flexDirection: isMobile ? 'column-reverse' : 'row',
                            padding: isMobile ? '10rem 2rem 2rem 2rem' : '20rem 2rem 2rem 2rem',
                            margin: `var(--homeHeader-height) 0 0rem 0 `,
                            borderBottom: '1px solid',
                            fontSize: '7vw',
                            overflow: 'hidden',
                        }}
                    >
                        <Box className="Encode">
                            <p
                                style={{
                                    fontSize: isMobile ? '8rem' : '10rem',
                                    lineHeight: '1',
                                    fontWeight: fontWeight,
                                }}
                            >
                                Nicetofonts
                            </p>
                        </Box>
                        <p
                            className="Pretendard-m"
                            style={{
                                fontSize: '1.6rem',
                                textAlign: 'justify',
                                lineHeight: '1.8',
                                marginBottom: isMobile ? '1.5rem' : '0',
                            }}
                        >
                            나이스투폰트는 폰트를 직접 다운로드하지 않고도
                            <br /> 다양한 템플릿에 적용하여 자유롭게 활용할 수 있는 공간입니다.
                        </p>
                        <Box
                            sx={{
                                display: isMobile ? 'none' : 'block',
                                position: 'absolute',
                                top: `calc(${position.y}px - 2.5rem)`,
                                right: 0,
                                width: '0.8rem',
                                height: '5rem',
                                background: 'rgba(0, 0, 0, 0.5)', // 반투명 컬러
                                borderRadius: '5rem',
                                pointerEvents: 'none', // 클릭 방지
                                zIndex: 10,
                            }}
                        />
                    </Box>
                    <Box
                        id="About"
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column-reverse' : 'row',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid',
                        }}
                    >
                        {/* 왼쪽 사이드바 */}
                        <Box
                            sx={{
                                width: isMobile ? '100%' : '30%',
                                padding: isMobile ? '0 2rem 5rem' : '5rem 2rem',
                                borderRight: isMobile ? '0' : '1px solid',
                            }}
                        >
                            <List>
                                {menuItems.map((item, index) => (
                                    <Link to={item.link} key={index}>
                                        <ListItem divider sx={{ borderBottom: '1px solid' }}>
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{
                                                    sx: { fontSize: isMobile ? '2.3rem' : '1.7rem' },
                                                }}
                                            />
                                            <IconButton
                                                edge="end"
                                                aria-label="open"
                                                sx={{
                                                    color: 'currentcolor',
                                                }}
                                            >
                                                <LaunchIcon
                                                    sx={{
                                                        color: 'currentcolor',
                                                        fontSize: isMobile ? '2.3rem' : '1.7rem',
                                                    }}
                                                />
                                            </IconButton>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Box>

                        {/* 본문 내용 */}
                        <Box
                            sx={{
                                width: isMobile ? '100%' : '70%',
                                flex: '1',
                                lineHeight: '2.3',
                                padding: '5rem 2rem',
                                marginBottom: isMobile ? '3rem' : '9rem',
                            }}
                        >
                            <Box
                                style={{
                                    fontSize: isMobile ? '2.5rem' : '2rem',
                                    marginBottom: '2rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                최소한의 시행착오를 위해
                            </Box>
                            <Box style={{ fontSize: isMobile ? '2rem' : '1.6rem' }}>
                                {About1}
                                <br />
                                {About2}
                            </Box>

                            <Box style={{ fontSize: isMobile ? '2rem' : '1.6rem', marginTop: '3rem' }}>
                                {About3}
                                <br />
                                {About4}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: isMobile ? 'self-start' : 'self-end',
                        justifyContent: isMobile ? 'center' : 'space-between',
                        flexDirection: isMobile ? 'column-reverse' : 'row',
                        padding: isMobile ? '10rem 2rem 2rem 2rem' : '20rem 2rem 2rem 2rem',
                        margin: `var(--homeHeader-height) 0 0rem 0 `,
                        borderBottom: '1px solid',
                        fontSize: '7vw',
                        zIndex: '8',
                    }}
                >
                    <Box className="Encode">
                        <p style={{ fontSize: isMobile ? '8rem' : '10rem', lineHeight: '1', fontWeight: fontWeight }}>
                            Template.
                        </p>
                    </Box>
                    <p
                        className="Pretendard-m"
                        style={{
                            fontSize: '1.6rem',
                            textAlign: 'justify',
                            lineHeight: '1.8',
                            marginBottom: isMobile ? '2.5rem' : '0',
                        }}
                    >
                        나이스투폰트에서 활용 가능한
                        <br /> 템플릿 UI로 자유롭게 사용가능합니다.
                    </p>
                </Box>
                <HomeFolderScroll /> {/* 템플릿 */}
                <Footer />
            </Box>
        </Box>
    );
};

export default Home;
