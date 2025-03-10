import React, { useState, useEffect, useContext } from 'react';
import TemplateWrap from '../components/TemplateWrap';
import { useParams, useLocation } from 'react-router-dom';
import { useFilterContext } from '../contexts/FilterContext';
import { MediaQueryContext } from '../contexts/MediaQueryContext'; // 반응형 컨텍스트
import { fetchDownload } from '../api/fetchDownFonts';

import FixSideContent from '../components/FixSideContent';
import HomeHeader from '../components/HomeHeader';
import './FontDetail.css';

function FontDetail() {
    // 반응형 컨텍스트
    const { isMobile } = useContext(MediaQueryContext);
    const [fontSize, setFontSize] = useState(30);
    const [download, setDownload] = useState([]);
    const [fontdown, setFontDown] = useState(0);
    const { fontName } = useParams();
    const location = useLocation();

    // 링크
    const headerItems = [{ value: 'Home' }, { value: 'Template' }, { value: 'Style' }];

    // 홈메뉴 상태
    const [menu, setMenu] = useState({ selected: headerItems[0].value });

    // 홈메뉴 스크롤
    const handleScroll = (menu) => {
        document.getElementById(menu)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // 페이지가 마운트될 때 최상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // 모바일에 따라 기본적용되는 폰트사이즈 변경
    useEffect(() => {
        const cgFontSize = isMobile ? 4.0 : 5.0;
        setFontSize(cgFontSize);
    }, []);

    // 폰트데이터 받아오기
    const { font } = location.state || {};

    console.log(font);

    // 필터 상태들
    const { typing, setTyping } = useFilterContext();

    //  구글 폰트 상세페이지 링크 함수
    function getGoogleFontsPageUrl(fontName) {
        return `https://fonts.google.com/specimen/${fontName.replace(/ /g, '+')}`;
    }

    //  `variants`가 문자열이면 JSON 변환, 기본값 설정
    const weightsArray = font.weights ? font.weights.replace(/"/g, '').split(',') : [];

    // `subsets`가 배열인지, JSON 문자열인지 확인 후 변환
    const subsets = Array.isArray(font?.subsets)
        ? font.subsets.join(', ')
        : typeof font?.subsets === 'string'
        ? JSON.parse(font.subsets).join(', ')
        : 'Unknown';

    const handleDownload = async (event, id) => {
        if (!id) {
            console.error('❌ 오류: 잘못된 ID');
            return;
        }

        // preventDefault가 모든 경우를 막지 않도록 예외 처리
        if (event.target.tagName !== 'A') {
            event.preventDefault(); // 링크 자체를 클릭할 때는 preventDefault를 실행하지 않음
        }

        const updatedFont = await fetchDownload(id);
        if (updatedFont) {
            setDownload((prevFonts) =>
                prevFonts.map((font) =>
                    font.id === id ? { ...font, download_count: updatedFont.download_count } : font
                )
            );
        }
    };

    return (
        <>
            {/* 헤더 */}
            <HomeHeader setMenu={setMenu} menu={menu} handleScroll={handleScroll} headerItems={headerItems} />
            <div id="Home" style={{ display: 'flex' }}>
                <FixSideContent display={'none'} />
                <div className="FontDetail" style={{ width: isMobile ? '100%' : '95%' }}>
                    <div className="stickyBtnWrap">
                        <div className="stickyBtn Pretendard-r">
                            <a
                                href={getGoogleFontsPageUrl(font.font_name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    handleDownload(e, font.id);
                                }}
                            >
                                Get Font
                            </a>
                        </div>
                    </div>
                    <div
                        className="fontName"
                        style={{
                            fontFamily: `'${font.font_name}', sans-serif`,
                        }}
                    >
                        <p>{fontName}</p>
                    </div>
                    {font ? (
                        <>
                            <div
                                className="fontInfo"
                                style={{
                                    fontFamily: `'${font.font_name}', sans-serif`,
                                }}
                            >
                                <div className="subInfo Pretendard-r">
                                    <span>
                                        카테고리<span>{font.font_style}</span>
                                    </span>
                                    <span>
                                        언어<span>{font.supported_languages}</span>
                                    </span>
                                    <span>
                                        굵기 및 스타일 <span>{font.weights.split(', ').length}개</span>
                                    </span>
                                    <span>
                                        다운로드
                                        <span>
                                            {typeof font.download_count === 'number' ? font.download_count : 0}회
                                        </span>
                                    </span>
                                </div>
                                <div className="exFiled">
                                    <p>
                                        Is this <em className="underlineEm">{font.font_name}</em> easy to read? Try
                                        typing and see for yourself!
                                    </p>
                                </div>
                                <TemplateWrap id={'Template'} />
                                <div className="textFiled" id="Style">
                                    <div className="textFiledSearch">
                                        <div className="textFiledSearchWrap">
                                            <div className="Pretendard-r">
                                                <p>스타일</p>
                                                <p>모든 굵기, 스타일을 확인할 수 있습니다.</p>
                                            </div>
                                        </div>
                                        <div className="textFiledRangeWrap">
                                            <div className="search-bar ">
                                                <input
                                                    className="Pretendard-r"
                                                    type="text"
                                                    placeholder="텍스트 입력하고 폰트 미리보기"
                                                    value={typing}
                                                    onChange={(e) => setTyping(e.target.value)}
                                                />
                                            </div>
                                            <div className="textRange range">
                                                <input
                                                    type="range"
                                                    min="2"
                                                    max="10"
                                                    value={fontSize}
                                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                                />
                                                <span className="Pretendard-r ">{fontSize * 10}px</span>
                                            </div>
                                        </div>
                                    </div>
                                    {weightsArray.map((num) => (
                                        <div
                                            className="typing"
                                            key={num}
                                            style={{ fontWeight: num, fontSize: `${fontSize}rem`, fontStyle: num }}
                                        >
                                            {typing ? (
                                                <p>
                                                    <span className="variant Pretendard-r">{num}</span>
                                                    {typing}
                                                </p>
                                            ) : (
                                                <p>
                                                    <span className="variant Pretendard-r">{num}</span>
                                                    Try {font.font_name} and see for yourself!
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Loading font details...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default FontDetail;
