import React, { useState } from 'react';

import HomeLeftComponent from './HomeLeftComponent';

import { Box, Accordion, AccordionSummary, AccordionDetails, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './HomeCommonComponents.css';

function HomeAccordion({ title, description, shortDesc }) {
    const [titleText, setTitleText] = useState('Nice to fonts');
    const [subText, setSubText] = useState('');
    return (
        <Box className="HomeTemplateWrap">
            <Box className="HomeTemplateHead">
                <Box>#3 Accordion</Box>
                <Box sx={{ fontSize: '1.3rem' }}>Template</Box>
            </Box>
            <Box className="HomeTemplateContent">
                <Box
                    sx={{
                        padding: '0 2rem',
                        width: '30%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        boxShadow: 'none',
                        borderRight: '1px solid',
                    }}
                >
                    <HomeLeftComponent title={title} shortDesc={shortDesc} />
                </Box>
                {/* 아코디언 */}
                {/* 아코디언 */}
                {/* 아코디언 */}
                <Box
                    sx={{
                        padding: '0 2rem',
                        width: '70%',
                        boxShadow: 'none',
                    }}
                >
                    <Accordion
                        defaultExpanded
                        sx={{
                            padding: '0',
                            width: '100%',
                            backgroundColor: 'transparent',
                            boxShadow: 'none', // 그림자 제거
                            borderRadius: '0px', // 모서리 둥글기 제거
                            border: 'none', // 테두리 제거
                            '&::before': { display: 'none' }, // 기본 배경 효과 제거
                            '&:hover': { backgroundColor: 'transparent' }, // hover 효과 제거
                            '&.Mui-expanded': { margin: 0 }, // 확장 시 여백 제거
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ fontSize: '4rem' }} />}
                            sx={{
                                padding: '0',
                                borderRadius: '0px', // 둥글기 제거
                                '&:hover': { backgroundColor: 'transparent' }, // hover 효과 제거
                                '&.Mui-focusVisible': { backgroundColor: 'transparent' }, // 클릭 시 배경색 제거
                                '&.Mui-expanded': { minHeight: 'auto' }, // 확장된 상태에서 높이 조절
                            }}
                        >
                            <TextField
                                className="Encode"
                                variant="standard"
                                value={titleText}
                                onChange={(e) => setTitleText(e.target.value)}
                                onBlur={() => {
                                    if (titleText.trim() === '') setTitleText('나이스투폰트');
                                }}
                                sx={{
                                    padding: '0',
                                    flexGrow: 1,
                                    '& .MuiInputBase-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color: 'var(--text-color)',
                                    },
                                    '& .MuiInput-root::before': {
                                        backgroundColor: 'var(--background-color)',
                                    },
                                }}
                                inputProps={{
                                    style: { fontSize: '4rem' },
                                }}
                            />
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                padding: '0',
                                borderRadius: '0px', // 둥글기 제거
                                '&:hover': { backgroundColor: 'transparent' }, // hover 효과 제거
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'var(--background-color)',
                                    color: 'var(--text-color)',
                                },
                                '& .MuiInput-root::before': {
                                    backgroundColor: 'var(--background-color)',
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="standard"
                                multiline
                                placeholder={description}
                                value={subText}
                                onChange={(e) => setSubText(e.target.value)}
                                inputProps={{
                                    style: {
                                        fontSize: '1.8rem',
                                        lineHeight: '1.8',
                                        whiteSpace: 'pre-line',
                                        padding: '1.2rem 0',
                                    },
                                }}
                            />
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Box>
    );
}

export default HomeAccordion;
