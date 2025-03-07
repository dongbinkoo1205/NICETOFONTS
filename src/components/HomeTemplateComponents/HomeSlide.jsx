import React from 'react';

import { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // ✅ Autoplay 모듈 추가

import { cardData } from '../../util/DataText';

import HomeLeftComponent from './HomeLeftComponent';

import 'swiper/css'; // Swiper 기본 스타일 불러오기
import './HomeCommonComponents.css';

function HomeSlide({ title, description, shortDesc }) {
    const [titleText, setTitleText] = useState('Nice to fonts');

    return (
        <Box className="HomeTemplateWrap">
            <Box className="HomeTemplateHead">
                <Box>#2 Slide</Box>
                <Box sx={{ fontSize: '1.3rem' }}>Template</Box>
            </Box>
            <Box className="HomeTemplateContent">
                {/* 좌측 정보 박스 */}
                <Box
                    sx={{
                        marginTop: '1px',
                        padding: '0 2rem',
                        width: '30%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        boxShadow: 'none',
                        backgroundColor: 'var(--background-color)',
                        borderRight: '1px solid',
                    }}
                >
                    <HomeLeftComponent title={title} shortDesc={shortDesc} />
                </Box>

                {/* 우측 슬라이드 콘텐츠 */}
                <Box
                    sx={{
                        width: '70%',
                        boxShadow: 'none',
                        overflow: 'hidden',
                        padding: '0 2rem',
                    }}
                >
                    <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView="2" autoplay={{ delay: 3000 }}>
                        {cardData.map((card) => (
                            <SwiperSlide key={card.id} style={{ width: '33.33%', padding: '1rem' }}>
                                <Box
                                    sx={{
                                        borderRadius: '1rem',
                                        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        style={{ width: '100%', height: '23rem', objectFit: 'cover' }}
                                    />
                                    <Box sx={{ padding: '1rem' }}>
                                        <TextField
                                            className="Encode"
                                            variant="standard"
                                            value={titleText}
                                            onChange={(e) => setTitleText(e.target.value)}
                                            sx={{
                                                width: '100%',
                                                '& .MuiInput-root': {
                                                    color: 'var(--text-color)',
                                                    '&::before, &::after': { display: 'none' },
                                                },
                                                '& .MuiInput-underline': {
                                                    '&:before, &:after': { display: 'none' },
                                                },
                                                '& .MuiInputBase-input': {
                                                    '&:hover': { backgroundColor: 'transparent' },
                                                    '&:focus': { backgroundColor: 'transparent' },
                                                },
                                            }}
                                            inputProps={{
                                                style: { fontSize: '2.3rem', border: 'none', textAlign: 'center' },
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                m: '1rem',
                                                fontSize: '1.5rem',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {card.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Box>
        </Box>
    );
}

export default HomeSlide;
