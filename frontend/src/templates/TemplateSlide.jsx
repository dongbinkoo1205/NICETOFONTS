import React, { useState } from 'react';
import CustomButton from '../components/MuiComponents/CustomButton';
import CustomImageUpload from '../components/MuiComponents/CustomImageUpload';
import ArrowAnimation from '../components/MuiComponents/CustomDownButton';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Card, InputBase, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import 'swiper/css';

// MUI 스타일 정의
const StyledCard = styled(Card)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '2rem',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)', // 텍스트 색상 변경
    borderRadius: '1rem',
    boxShadow: 'none',
    position: 'relative',
    height: '100%',
    margin: '5rem 0',
    cursor: 'pointer',
    transition: '0.5s',
    border: `1px solid var(--text-color)`,

    '& input': {
        color: 'var(--text-color)', // 텍스트 색상 변경
    },
}));

const ContentNumber = styled(Box)({
    fontSize: '2rem',
    fontWeight: 'bold',
    width: '100%',
});

const ContentDescription = styled(Box)({
    textAlign: 'center',
    width: '100%',
});

// 슬라이드 데이터 배열

export default function TemplateSlideComponent() {
    const location = useLocation();
    const { font } = location.state || {};

    // 영문 및 한글 검사
    const hasLatin = font.supported_languages.includes('latin');
    const hasKorean = font.supported_languages.includes('korean');

    const fontFilter =
        hasLatin && hasKorean
            ? `${font.font_name}를 수정해보세요.`
            : hasLatin
            ? `${font.font_name}는 영문만 지원합니다.`
            : hasKorean
            ? `${font.font_name}를 수정해보세요.`
            : '폰트 정보를 확인할 수 없습니다.';

    const [TitleText, setTitleText] = useState(font.font_name);
    const [SubText, setSubText] = useState();

    // 배열로 변환
    const weightsArray = font.weights ? font.weights.replace(/"/g, '').split(',') : [];

    // mui 반응형
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box
            sx={{
                width: isMobile ? '100%' : '49%',
                margin: '2rem 0',
                fontSize: '3rem',
                position: 'relative',
                border: '1px solid ',
            }}
        >
            <CustomButton className={'Pretendard-r'}>슬라이드</CustomButton>
            <Box
                className="scrollBar"
                sx={{
                    maxHeight: '35rem',
                    margin: '1rem 1.25rem',
                    paddingRight: '1.25rem',
                }}
            >
                <Box
                    className="Pretendard-r"
                    sx={{
                        fontSize: '4.4rem',
                        textAlign: 'center',
                    }}
                >
                    Slide
                </Box>
                <ArrowAnimation />
                <Swiper spaceBetween={10} slidesPerView={1.4} centeredSlides={true} style={{ height: '100%' }}>
                    {weightsArray.map((item, index) => (
                        <SwiperSlide key={`slide-${item}-${index}`}>
                            <StyledCard>
                                <ContentNumber>
                                    <InputBase
                                        value={TitleText}
                                        onChange={(e) => {
                                            setTitleText(e.target.value);
                                        }}
                                        onBlur={() => {
                                            if (TitleText.trim() === '') {
                                                setTitleText(font.font_name);
                                            }
                                        }}
                                        sx={{
                                            width: '100%',
                                            flexGrow: 1,
                                            fontSize: '3rem',
                                            fontWeight: item,
                                            fontStyle: item,
                                            fontFamily: `'${font.font_name}'`,
                                            backgroundColor: 'transparent',
                                            textAlign: 'center',
                                            border: 'none',
                                            '& .MuiInputBase-input': {
                                                padding: 0,
                                                margin: 0,
                                                textAlign: 'center',
                                                color: 'var(--text-color)',
                                            },
                                        }}
                                        inputProps={{
                                            'aria-label': 'editable text',
                                            style: { padding: 0, margin: 0 },
                                        }}
                                    />
                                </ContentNumber>
                                <CustomImageUpload key={`slide-upload-${index}`} index={`slide-${index}`} />
                                <ContentDescription>
                                    <InputBase
                                        value={SubText}
                                        onChange={(e) => setSubText(e.target.value)}
                                        sx={{
                                            width: '100%',
                                            padding: '1rem 0',
                                            fontSize: '1.8rem',
                                            fontWeight: item,
                                            fontFamily: `'${font.font_name}'`,
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            '& .MuiInputBase-input': {
                                                padding: 0,
                                                margin: 0,
                                                textAlign: 'center',
                                                color: 'var(--text-color)',
                                                fontSize: '2.2rem',
                                            },
                                        }}
                                        placeholder={`${font.font_name}_${item}입니다.`}
                                        inputProps={{
                                            'aria-label': 'editable text details',
                                            style: { padding: 0, margin: 0 },
                                        }}
                                    />
                                </ContentDescription>
                            </StyledCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
}
