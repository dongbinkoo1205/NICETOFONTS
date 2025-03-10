import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, InputBase, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Marquee from 'react-fast-marquee';
import CustomButton from '../components/MuiComponents/CustomButton';

const TemplateMarquee = () => {
    const location = useLocation();
    const { font } = location.state || {};
    const [TitleText, setTitleText] = useState(font.font_name);
    // const [layout, setLayout] = useState(false);

    // JSON.parse()를 사용하여 배열로 변환
    const weightsArray = font.weights ? font.weights.replace(/"/g, '').split(',') : [];

    // useEffect(() => {
    //     const hasSingleItem = variantsArray.length === 1;
    //     setLayout(hasSingleItem);
    // }, [variantsArray]);

    // 영문 및 한글 검사
    const hasLatin = font.supported_languages.includes('latin');
    const hasKorean = font.supported_languages.includes('korean');

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
            <CustomButton className={'Pretendard-r'}>흐르는 텍스트</CustomButton>
            <Box
                className="scrollBar"
                sx={{
                    maxHeight: '35rem',
                    overflowY: 'scroll',
                    margin: '1rem 1.25rem',
                    paddingRight: '1.25rem',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    {weightsArray.map((item) => (
                        <Marquee speed={30} gradient={false} key={item}>
                            {Array(10)
                                .fill(TitleText)
                                .map((text, index) => (
                                    <InputBase
                                        value={TitleText}
                                        key={index}
                                        onChange={(e) => setTitleText(e.target.value)}
                                        sx={{
                                            margin: '3rem 1.5rem',
                                            padding: '0',
                                            fontFamily: `'${font.font_name}'`,
                                            fontSize: '2.6rem',
                                            fontWeight: item,
                                            fontStyle: item,
                                            color: 'var(--text-color)',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            lineHeight: '0',
                                            height: 'auto',
                                            '& .rfm-child': {
                                                all: 'unset',
                                                display: 'initial',
                                                padding: '0',
                                                margin: '0',
                                                lineHeight: '0',
                                                height: 'auto',
                                            },
                                            '& .MuiInputBase-input': {
                                                textAlign: 'center',
                                                margin: '0rem 0',
                                                padding: '0rem 0rem',
                                                lineHeight: '0',
                                                height: 'auto',
                                            },
                                        }}
                                    />
                                ))}
                        </Marquee>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
export default TemplateMarquee;
