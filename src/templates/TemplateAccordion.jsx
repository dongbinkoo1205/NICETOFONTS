import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomButton from '../components/MuiComponents/CustomButton';
import { Accordion, AccordionSummary, AccordionDetails, Box, InputBase, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MuiAccordion = () => {
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
    const [SubText, setSubText] = useState('');

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
            <CustomButton className={'Pretendard-r'}>아코디언</CustomButton>
            <Box
                className="scrollBar"
                sx={{ maxHeight: '35rem', overflowY: 'scroll', margin: '1rem 1.25rem', paddingRight: '1.25rem' }}
            >
                {weightsArray.map((item) => (
                    <Accordion
                        key={item}
                        sx={{
                            background: 'var(--background-color)',
                            color: 'var(--text-color)',
                            padding: '0',
                            margin: '1rem 0 ',
                            borderRadius: '0.5rem',
                            fontWeight: item,
                            boxShadow: 'none',
                            border: '1px solid',
                            '&.Mui-expanded': {
                                backgroundColor: '#262725',
                                color: '#fff',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon
                                    sx={{
                                        fontSize: '3rem',

                                        color: 'var(--text-color)',
                                    }}
                                />
                            }
                            aria-controls={`${font.index}-content`}
                            id={`${font.index}-header`}
                            sx={{
                                alignItems: 'center',
                                fontFamily: `'${font.name}'`,
                                color: 'inherit',
                                margin: '1rem 0',
                                padding: '1rem 1.5rem',
                                minHeight: '0',
                                '&.Mui-focusVisible': { backgroundColor: 'transparent' },
                                '& .MuiAccordionSummary-content': {
                                    alignItems: 'center',
                                    color: 'inherit',
                                    margin: '0rem 0 !important',
                                    padding: '0',
                                },
                                '&.Mui-expanded': {
                                    minHeight: 'unset',
                                    '& .MuiSvgIcon-root': {
                                        color: 'white',
                                        margin: '1rem 0 ',
                                    },
                                },
                            }}
                        >
                            <InputBase
                                value={TitleText}
                                onChange={(e) => {
                                    setTitleText(e.target.value);
                                }}
                                onBlur={() => {
                                    if (TitleText.trim() === '') {
                                        setTitleText(font.font_name); // 공백 입력 시 자동 복구
                                    }
                                }}
                                sx={{
                                    flexGrow: 1,
                                    fontSize: '2.6rem',
                                    fontFamily: `'${font.font_name}'`,
                                    backgroundColor: 'transparent',
                                    fontStyle: item,
                                    fontWeight: item,
                                    border: 'none',
                                    color: 'inherit',
                                    margin: '0',
                                    padding: '0',
                                    '& .MuiInputBase-input': {
                                        color: 'inherit',
                                        margin: '0',
                                        padding: '0',
                                    },
                                }}
                                inputProps={{
                                    'aria-label': 'editable text',
                                    style: { padding: 0, margin: 0 },
                                }}
                            />
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                '&.Mui-expanded': {
                                    backgroundColor: '#262725',
                                    color: '#fff',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    height: 100,
                                    width: '100%',
                                    fontFamily: `'${font.font_name}'`,
                                    transition: 'background-color 0.3s, color 0.3s',
                                    color: 'inherit',
                                }}
                            >
                                <InputBase
                                    value={SubText}
                                    onChange={(e) => setSubText(e.target.value)}
                                    sx={{
                                        width: '100%',
                                        fontSize: '3.4rem',
                                        fontWeight: item,
                                        fontFamily: `'${font.font_name}'`,
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'inherit',
                                    }}
                                    placeholder={`${font.font_name}_${item}입니다.`}
                                    inputProps={{
                                        'aria-label': 'editable text details',
                                        style: { padding: 0, margin: 0 },
                                    }}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};

export default MuiAccordion;
