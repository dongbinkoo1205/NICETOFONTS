import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomButton from '../components/MuiComponents/CustomButton';
import ArrowAnimation from '../components/MuiComponents/CustomDownButton';
import CustomImageUpload from '../components/MuiComponents/CustomImageUpload';
import { Box, styled, Button, InputBase, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ExperienceContainer = styled(Box)({
    textAlign: 'center',
    width: '100%',
    margin: '0 auto',
});

const ImageGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    margin: '5rem 0',
    gridAutoFlow: 'row dense',
});

const ImageBox = styled(Box)(() => ({
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    padding: '10px',
    borderRadius: '8px',
    transition: '0.5s',

    '& input': {
        color: 'white',
    },
}));

const MoreButton = styled(Button)({
    padding: '1rem 2.2rem',
    fontSize: '1.5rem',
    border: '1px solid black',
    backgroundColor: 'transparent',
    color: 'black',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white',
    },
    margin: '1rem 0',
});

const TemplateAsymmetry = () => {
    const [layout, setLayout] = useState(false); // 레이아웃 변경
    const location = useLocation(); // useLocation
    const { font } = location.state || {}; //폰트정보
    const [TitleText, setTitleText] = useState(font.font_name); // 기본 폰트 이름

    // 배열로 변환
    const weightsArray = font.weights ? font.weights.replace(/"/g, '').split(',') : [];

    // mui 반응형
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const hasSingleItem = weightsArray.length === 1;
        setLayout(hasSingleItem);
    }, [weightsArray]);

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
            <CustomButton className={'Pretendard-r'}>비대칭 컨텐츠</CustomButton>
            <Box
                className="scrollBar "
                sx={{ maxHeight: '35rem', overflowY: 'scroll', margin: '1rem 1.25rem', paddingRight: '1.25rem' }}
            >
                <ExperienceContainer>
                    <Box className="Pretendard-r" sx={{ fontSize: '4.4rem' }}>
                        Contents
                    </Box>
                    <ArrowAnimation />

                    <ImageGrid
                        sx={{
                            display: layout ? 'flex' : 'grid',
                            justifyContent: layout ? 'center' : '',
                        }}
                    >
                        {weightsArray.map((item, index) => (
                            <ImageBox
                                key={`asymmetry-${item}-${index}`}
                                sx={{
                                    background: 'var(--filter-color)',
                                }}
                            >
                                <CustomImageUpload key={`asymmetry-upload-${index}`} index={`asymmetry-${index}`} />
                                <InputBase
                                    value={TitleText}
                                    onChange={(e) => setTitleText(e.target.value)}
                                    sx={{
                                        fontFamily: `'${font.font_name}'`,
                                        fontSize: '2.4rem',
                                        fontWeight: item,
                                        fontStyle: item,
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        '& .MuiInputBase-input': {
                                            textAlign: 'center',
                                            color: 'var(--text-color)',
                                        },
                                    }}
                                />
                            </ImageBox>
                        ))}
                    </ImageGrid>
                    <MoreButton variant="outlined" className="Pretendard-r">
                        Nice to Fonts
                    </MoreButton>
                </ExperienceContainer>
            </Box>
        </Box>
    );
};

export default TemplateAsymmetry;
