// src/theme.js
import { createTheme } from '@mui/material/styles';

// ✅ 원하는 폰트를 기본값으로 설정
const theme = createTheme({
    typography: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
    },
});

export default theme;
