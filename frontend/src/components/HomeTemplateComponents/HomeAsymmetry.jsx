import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { cardData } from '../../util/DataText';

import './HomeCommonComponents.css';

import HomeLeftComponent from './HomeLeftComponent';

function HomeAsymmetry({ title, description, shortDesc }) {
    const [titleText, setTitleText] = useState('Nice to fonts');

    return (
        <Box className="HomeTemplateWrap">
            <Box className="HomeTemplateHead">
                <Box>#1 Grid</Box>
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
                        borderRight: '1px solid',
                    }}
                >
                    <HomeLeftComponent title={title} shortDesc={shortDesc} />
                </Box>

                {/* 2x3 그리드 레이아웃 */}
                <Box
                    sx={{
                        padding: '0 2rem',
                        width: '70%',
                        boxShadow: 'none',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1.5rem',
                    }}
                >
                    {cardData.slice(0, 4).map((content) => (
                        <Box
                            key={content.id}
                            sx={{
                                padding: '2rem',
                                backgroundColor: 'var(--background-color)',
                                color: 'var(--text-color)',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={content.image}
                                alt={content.title}
                                style={{
                                    width: '7rem',
                                    height: '7rem',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '0.5rem',
                                }}
                            />
                            <TextField
                                className="Encode"
                                variant="standard"
                                value={titleText}
                                onChange={(e) => setTitleText(e.target.value)}
                                sx={{
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
                                    style: { fontSize: '2.3rem', border: 'none', width: '100%' },
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '1.5rem',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {content.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default HomeAsymmetry;
