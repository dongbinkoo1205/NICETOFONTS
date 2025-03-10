import React, { useEffect, useRef, useContext } from 'react';
import { useFilterContext } from '../contexts/FilterContext';
import { MediaQueryContext } from '../contexts/MediaQueryContext'; // 반응형 컨텍스트
import nLogo2 from '../assets/nLogo2.png';
import './Header.css'; // 스타일 파일 import

const Header = ({ setCalcTop, loadMoreFonts }) => {
    // 필터 상태들
    const { userInput, setUserInput, typing } = useFilterContext();

    // 반응형 컨텍스트
    const { isMobile } = useContext(MediaQueryContext);

    const CalcWrap = useRef(null);

    useEffect(() => {
        if (typeof setCalcTop !== 'function') {
            // 메인페이지를 제외하면 setCalcTop사용하지 않기 때문에 방어코드 추가함
            return;
        }

        const updateHeight = () => {
            if (CalcWrap.current) {
                setCalcTop(CalcWrap.current.getBoundingClientRect().height);
            }
        };

        updateHeight();

        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <header className={'header Pretendard-r '} ref={CalcWrap}>
            <div className="logo" style={{ display: isMobile ? 'block' : 'none' }}>
                <ul>
                    <li className=" Oxygen">
                        <img src={nLogo2} alt="" />
                    </li>
                    {/* <li className="smslogun">더 나은 디자인, Nice to Font</li> */}
                </ul>
            </div>
            {/* 검색창 */}
            <div className="search-bar">
                <div className="search-icon" />
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="search-input Pretendard-r"
                    placeholder="폰트를 검색해보세요."
                />
            </div>
            <button className="load-more-button  Pretendard-r" onClick={loadMoreFonts}>
                More Fonts
            </button>
            {/* 정렬 및 장바구니
            <div className="header-right">
                <div className="sort-dropdown">
                    <span>Sort by</span>
                    <select>
                        <option value="trending">Trending</option>
                        <option value="popularity">Popularity</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
                <div className="cart-icon">
                    <span className="cart-badge">1</span>
                </div>
            </div> */}
        </header>
    );
};

export default Header;
