import React from 'react';
import './HomeLeftComponent.css';

import { Box, Typography } from '@mui/material';

const HomeLeftComponent = ({ title, description, shortDesc }) => {
    return (
        <Box className="HomeTemplateDesc">
            <Typography
                variant="body2"
                mb={'1rem'}
                fontSize={'3rem'}
                sx={{ fontFamily: 'Pretendard', fontWeight: '700' }}
            >
                {title}
            </Typography>
            <Typography variant="body2" fontSize={'1.3rem'}>
                {shortDesc}
            </Typography>
            <Typography variant="body2" fontSize={'1.8rem'}>
                {description}
            </Typography>
        </Box>
    );
};

export default HomeLeftComponent;
