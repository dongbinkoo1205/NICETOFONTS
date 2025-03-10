import React from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// 🔥 애니메이션 정의 (아래로 움직였다가 원래 위치로 복귀)
const moveDown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0); }
`;

// 🔥 화살표 컨테이너 스타일 (세로 정렬)
const ArrowContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '1rem 0',
    filter: 'var(--filter-color)',
});

// 🔥 개별 화살표 애니메이션 설정
const ArrowWrapper = styled(Box)(({ delay }) => ({
    display: 'inline-block',
    animation: `${moveDown} 1s ease-in-out infinite`,
    animationDelay: delay, // 🔥 첫 번째 화살표에 시간차 적용
}));

// 🔥 화살표 스타일 (회전 및 테두리 적용)
const Arrow = styled(Box)({
    width: '2.2rem',
    height: '2.2rem',
    borderLeft: '2px solid black',
    borderBottom: '2px solid black',
    transform: 'rotate(-45deg)', // 화살표 모양 유지
});

const ArrowAnimation = () => {
    return (
        <ArrowContainer>
            <ArrowWrapper delay="0.1s">
                <Arrow />
            </ArrowWrapper>
            <ArrowWrapper delay="0s">
                <Arrow />
            </ArrowWrapper>
        </ArrowContainer>
    );
};

export default ArrowAnimation;
