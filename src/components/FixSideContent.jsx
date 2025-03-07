import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom'; // 자동으로 현재 페이지 감지
import { useLayerContext } from '../contexts/LayerContext';

import HomeIcon from '../assets/HomeIcon.png';
import stylusNote from '../assets/stylusNote.png';
import palette from '../assets/palette.png';
import help from '../assets/help.png';
import darkMode from '../assets/darkMode.png';
import sunny from '../assets/sunny.png';

import './FixSideContent.css';

import { MediaQueryContext } from '../contexts/MediaQueryContext'; //반응형 컨텍스트

function FixSideContent() {
    // 아이콘 불러오기

    // 반응형 컨텍스트
    const { isMobile } = useContext(MediaQueryContext);

    // 다크모드 컨텍스트
    const { layerStyle, setlayerStyle, setDark, dark } = useLayerContext();

    function handleLayerChange() {
        setlayerStyle((prev) => !prev); // true <-> false 토글
    }

    return (
        <div className={`FixSideContent ${isMobile ? 'Mob' : ''}`}>
            {/* 오픈닫힘 아이콘 */}
            <div className="iconWrap">
                {/* <ul style={{ display: display ? 'none' : 'none' }}>
                    <li className="Oxygen">
                        <img src={nLogo} alt="" style={{ width: isMobile ? '8rem' : '5rem' }} />
                    </li>
                </ul> */}

                <NavLink to="/" className={({ isActive }) => (isActive ? 'on' : '')}>
                    <ul>
                        <li>
                            <span className="material-icon material-symbols-outlined">
                                <img src={HomeIcon} alt="" />
                            </span>
                            <div>Home</div>
                        </li>
                    </ul>
                </NavLink>
                <NavLink to="/Page/MainPage" className={({ isActive }) => (isActive ? 'on' : '')}>
                    <ul>
                        <li>
                            <span className="material-icon material-symbols-outlined">
                                <img src={stylusNote} alt="" />
                            </span>

                            <div>폰트</div>
                        </li>
                    </ul>
                </NavLink>
                <NavLink to="/Page/IconPage" className={({ isActive }) => (isActive ? 'on' : '')}>
                    <ul>
                        <li>
                            <span className="material-icon  material-symbols-outlined">
                                <img src={palette} alt="" />
                            </span>
                            <div>아이콘</div>
                        </li>
                    </ul>
                </NavLink>
                <NavLink to="/Page/FaqPage" className={({ isActive }) => (isActive ? 'on' : '')}>
                    <ul>
                        <li>
                            <span className="material-symbols-outlined">
                                <img src={help} alt="" />
                            </span>
                            <div>FAQ</div>
                        </li>
                    </ul>
                </NavLink>
            </div>
            <div className="darkModeWrap">
                <ul>
                    <li onClick={() => setDark(!dark)}>
                        <span className="material-symbols-outlined" style={{ display: dark ? 'block' : 'none' }}>
                            <img src={darkMode} alt="" />
                        </span>
                        <span className="material-symbols-outlined" style={{ display: dark ? 'none' : 'block' }}>
                            <img src={sunny} alt="" />
                        </span>
                        <div>테마</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FixSideContent;
