import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

const CustomImageUpload = ({ index }) => {
    // ✅ 각 `CustomImageUpload` 내부에서 개별적으로 상태 관리!
    const [imagePreview, setImagePreview] = useState('https://www.w3schools.com/w3images/avatar2.png');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl); // ✅ 개별 상태 업데이트!
        }
    };

    return (
        <Box sx={{ textAlign: 'center', m: '2rem 0' }}>
            {imagePreview && (
                <Box>
                    <img
                        src={imagePreview}
                        alt="미리보기"
                        style={{ width: '100%', height: '110px', borderRadius: '0.5rem' }}
                    />
                </Box>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange} // ✅ 개별적으로 상태 업데이트됨!
                style={{ display: 'none' }}
                id={`upload-button-${index}`} // ✅ 부모 단위까지 고려한 고유한 ID 적용
            />
            <label htmlFor={`upload-button-${index}`}>
                <Button
                    variant="contained"
                    component="span"
                    sx={{ backgroundColor: '#222', margin: '1rem 0', fontSize: '1.3rem' }}
                >
                    이미지 업로드
                </Button>
            </label>
        </Box>
    );
};

export default CustomImageUpload;
