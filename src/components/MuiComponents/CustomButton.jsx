import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Box)({
    color: 'black', // 검은색 텍스트
    borderBottom: '1px solid ',
    backgroundColor: 'white',
    fontSize: '2rem',
    textAlign: 'left',
    padding: '2rem',
});

// className을 받을 수 있도록 props 전달
const CustomBoxComponent = ({ children, className }) => {
    return <CustomButton className={className}>{children}</CustomButton>;
};

export default CustomBoxComponent;
