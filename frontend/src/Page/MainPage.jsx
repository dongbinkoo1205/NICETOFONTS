import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SideContent from '../components/SideContent';
import FontList from '../components/FontList';
import FixSideContent from '../components/FixSideContent';

const MainPage = () => {

    const location = useLocation();
    // 페이지가 마운트될 때 최상단으로 이동

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div style={{ display: 'flex' }} className={`Pretendard-r `}>
            {/* <div style={{ display: 'flex' }} className={`Pretendard-r  normal ${dark ? 'darkMode' : ''}`}> */}
            <FixSideContent />
            <SideContent />
            <FontList />
        </div>
    );
};

export default MainPage;
