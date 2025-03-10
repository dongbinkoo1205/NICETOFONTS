import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './HomeHeader.css';
import nLogo2 from '../assets/nLogo2.png';

function HomeHeader({ menu, setMenu, handleScroll, headerItems }) {
    // 첫 번째 메뉴를 기본 선택(active)으로 설정
    useEffect(() => {
        if (!menu.selected) {
            setMenu({ selected: headerItems[0].value });
        }
    }, [menu, setMenu]);

    return (
        <div className="HomeHeader">
            <ul className="HomeHeaderWrap">
                <div className="Nlogo">
                    <NavLink to="/">
                        <img src={nLogo2} alt="" />
                    </NavLink>
                </div>
                <div className="menu">
                    {headerItems.map((item) => (
                        <li
                            key={item.value}
                            onClick={() => {
                                handleScroll(item.value);
                                setMenu((prev) => ({ ...prev, selected: item.value }));
                            }}
                            className={menu.selected === item.value ? 'active' : ''}
                        >
                            {item.value}
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
}

export default HomeHeader;
