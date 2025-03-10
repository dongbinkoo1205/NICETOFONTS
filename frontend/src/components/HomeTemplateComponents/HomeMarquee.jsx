import React, { useState, useEffect } from 'react';
import './HomeCommonComponents.css';
import { Box, TextField } from '@mui/material';
import Marquee from 'react-fast-marquee';
import HomeLeftComponent from './HomeLeftComponent';

function HomeMarquee({ title, description, shortDesc }) {
    const [titleText, setTitleText] = useState('Nice to fonts');

    useEffect(() => {
        if (titleText.trim() === '') {
            setTitleText('');
        }
    }, [titleText]);

    return (
        <Box className="HomeTemplateWrap">
            <Box className="HomeTemplateHead">
                <Box>#4 Marquee</Box>
                <Box sx={{ fontSize: '1.3rem' }}>Template</Box>
            </Box>
            <Box className="HomeTemplateContent">
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
                <Box
                    sx={{
                        padding: '0 2rem',
                        width: '70%',
                        boxShadow: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        overflow: 'hidden',
                    }}
                >
                    {Array(3)
                        .fill(null)
                        .map((_, rowIndex) => (
                            <Marquee key={rowIndex} speed={50} gradient={false}>
                                {Array(10)
                                    .fill(null)
                                    .map((_, colIndex) => (
                                        <TextField
                                            key={colIndex}
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
                                                marginRight: '2rem',
                                            }}
                                            inputProps={{
                                                style: { fontSize: '4rem', border: 'none' },
                                            }}
                                        />
                                    ))}
                            </Marquee>
                        ))}
                </Box>
            </Box>
        </Box>
    );
}

export default HomeMarquee;
