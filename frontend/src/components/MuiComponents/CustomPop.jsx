import React from 'react';
import { Popover, Typography } from '@mui/material';

const CustomPop = ({ PopBtn, setPopBtn }) => {
    const handleClose = () => {
        setPopBtn(null);
    };

    const open = Boolean(PopBtn);

    return (
        <Popover
            open={open}
            anchorEl={PopBtn}
            onClose={handleClose}
            anchorOrigin={{
                horizontal: 'right',
            }}
            sx={{ ml: '1rem' }}
        >
            <Typography sx={{ p: '1rem', fontSize: '1.2rem' }}>죄송합니다. 준비 중입니다.</Typography>
        </Popover>
    );
};

export default CustomPop;
