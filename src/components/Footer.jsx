import React, { useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useCopyToClipboard from '../hook/useCopyToClipboard';

function Footer() {
    // 이메일 복사 커스텀 훅 상태
    const { copied, copyToClipboard } = useCopyToClipboard();

    return (
        <Box
            sx={{
                borderTop: '1px solid #ccc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                height: 'var(--footer-height)',
                zIndex: '10',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '2.5rem',
                }}
            >
                <Button
                    sx={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        color: 'currentColor',
                        '&:hover': {
                            color: 'currentColor',
                            backgroundColor: 'transparent',
                        },
                    }}
                    onClick={() => copyToClipboard('hi.furyproject@gmail.com')}
                >
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start', flexDirection: 'column' }}>
                        {/* 좌측 작은 텍스트 */}
                        <Typography sx={{ fontSize: '1.6rem', color: 'currentcolor', mr: '10rem' }}>
                            무엇을 도와드릴까요?
                            {copied && (
                                <Typography color="curruntColor" variant="span" ml={'1rem'} fontSize={'1.5rem'}>
                                    COPIED!
                                </Typography>
                            )}
                        </Typography>
                        {/* 중앙 메인 타이틀 */}
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                position: 'relative',
                                fontSize: '4.5rem',
                                '&::after': {
                                    content: '""',
                                    display: 'block',
                                    width: '100%',
                                    height: '0.3rem',
                                    backgroundColor: '#fff462',
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: 0,
                                },
                            }}
                        >
                            @NTFS.gmail.com
                        </Typography>
                    </Box>
                </Button>
                {/* 우측 노란색 원 버튼 */}
                <IconButton
                    sx={{
                        backgroundColor: '#fff462',
                        width: '5rem',
                        height: '5rem',
                        borderRadius: '50%',

                        '&:hover': {
                            backgroundColor: '#fff962',
                        },
                    }}
                >
                    <ArrowForwardIcon sx={{ color: 'black' }} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Footer;
