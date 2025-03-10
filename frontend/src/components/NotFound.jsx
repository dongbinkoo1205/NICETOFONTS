import React from 'react';
import { Box, Typography, Button } from '@mui/material';

// svg
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';

const NotFound = ({ onClearFilters }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            textAlign="center"
        >
            <Box style={{ color: '#ffcc00' }}>
                <FontAwesomeIcon icon={faFaceSadTear} fontSize="8rem" />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ marginTop: '1rem', fontSize: '4rem' }}>
                No Font Found
            </Typography>
            <Typography variant="body1" color="currentColor" sx={{ marginTop: '1rem', fontSize: '2rem' }}>
                검색과 일치하는 폰트가 없습니다. 다시 검색해주세요.
            </Typography>
        </Box>
    );
};

export default NotFound;
