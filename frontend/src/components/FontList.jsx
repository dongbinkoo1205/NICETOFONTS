import React, { useState, useEffect, useMemo, useRef, useContext, useCallback } from 'react';
import { fetchFonts } from '../api/fetchFonts'; // ✅ MySQL API 호출
import { useFilterContext } from '../contexts/FilterContext'; // 필터 컨텍스트
import { useFontContext } from '../contexts/FontContext'; // 폰트 컨텍스트
import { useLayerContext } from '../contexts/LayerContext'; // 다크모드 컨텍스트
import { MediaQueryContext } from '../contexts/MediaQueryContext'; // 반응형 컨텍스트

import { Link } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import setting from '../assets/setting.png';
import grid from '../assets/grid.png';
import view from '../assets/view.png';

import {
    filterByName,
    filterByCategory,
    filterByTextVariants,
    filterByNumVariants,
    filterBySubsets,
    filterByKind,
    filterByLanguage,
    filterByNewest,
    filterByOldest,
    filterByDown,
} from '../util/DataFilter'; // 필터 함수

import './FontList.css'; // CSS 스타일

const FontList = () => {
    const { isMobile } = useContext(MediaQueryContext); // 반응형 컨텍스트
    const { layerStyle, setlayerStyle } = useLayerContext(); // 다크모드 컨텍스트
    const { fonts, setFonts, updateFontSize, fontSize } = useFontContext(); // 폰트 크기 컨텍스트
    const [selectedText, setSelectedText] = useState('최신순');

    const [changeLayer, setChangeLayer] = useState(true); // 레이아웃 변경 상태
    const [offset, setOffset] = useState(10); // offset 초기값 설정 (10개 이후부터 로드)

    const [isFetching, setIsFetching] = useState(false); //  데이터 요청 중인지 확인
    const [hasMoreData, setHasMoreData] = useState(true); //  더 불러올 데이터가 있는지 확인
    const observerRef = useRef(null); // Intersection Observer용 ref

    // 필터 상태들
    const {
        userInput,
        categoryFilter,
        TextVariantsFilter,
        NumVariantsFilter,
        subsetsFilter,
        kindFilter,
        filterByLanguage,
        typing,
        sortFilter,
        setSortFilter,
    } = useFilterContext();

    // 필터버튼 누를 시 사이드 컨텐츠 on
    function handleLayerChange() {
        setlayerStyle((prev) => !prev);
    }

    // 한국어 지원 여부 확인
    const isAll = subsetsFilter === '' || (Array.isArray(subsetsFilter) && subsetsFilter.includes(''));
    const supportsKorean = isAll || (Array.isArray(subsetsFilter) && subsetsFilter.includes('korean'));

    // 최신순 오래된순 조회순 필터링
    const handleSortChange = (event) => {
        setSortFilter({ selected: event.target.value });
    };
    // 최신순 오래된순 조회순으로 텍스트 변경
    const handleTextChage = (event) => {
        setSelectedText(event.target.options[event.target.selectedIndex].text);
    };

    useEffect(() => {
        console.log('현재 선택된 정렬:', sortFilter.selected);
    }, [sortFilter]); // sortFilter가 변경될 때마다 실행

    // 필터 적용 (검색어가 있을 경우 서버에서 필터링됨)
    const filteredFonts = useMemo(() => {
        if (!fonts || fonts.length === 0) return [];

        if (userInput) {
            return filterByName(fonts, userInput);
        }

        let filtered = [...fonts]; // 원본 배열 복사

        if (categoryFilter) filtered = filterByCategory(filtered, categoryFilter);
        if (NumVariantsFilter) filtered = filterByNumVariants(filtered, NumVariantsFilter);
        if (TextVariantsFilter) filtered = filterByTextVariants(filtered, TextVariantsFilter);
        if (subsetsFilter.length > 0) filtered = filterBySubsets(filtered, subsetsFilter);
        if (kindFilter) filtered = filterByKind(filtered, kindFilter);
        if (filterByLanguage) filtered = filterByLanguage(filtered);

        // 최신순, 오래된순, 다운로드순 필터
        if (sortFilter.selected === 'newest') {
            filtered = filterByNewest(filtered);
        } else if (sortFilter.selected === 'oldest') {
            filtered = filterByOldest(filtered);
        } else {
            filtered = filterByDown(filtered);
        }

        return filtered;
    }, [
        fonts,
        userInput,
        categoryFilter,
        TextVariantsFilter,
        NumVariantsFilter,
        subsetsFilter,
        kindFilter,
        filterByLanguage,
        sortFilter,
    ]);

    // 만약에 검색이없으며 폰트 전체 갯수가 0이면 실행 10개씩 데이터 불러오기
    useEffect(() => {
        fetchFonts(10, 0).then(setFonts);
    }, []);

    // 폰트 추가 불러오기
    const loadMoreFonts = async () => {
        if (isFetching || userInput) return;
        setIsFetching(true);
        const newFonts = await fetchFonts(10, offset);

        if (newFonts.length === 0) {
            setHasMoreData(false);
            setIsFetching(false);
            return;
        }

        setFonts((prevFonts) => {
            return [...prevFonts, ...newFonts];
        });

        setOffset((prevOffset) => prevOffset + 10);
        setIsFetching(false);
    };

    //  Intersection Observer 설정
    useEffect(() => {
        if (!observerRef.current || !hasMoreData) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    loadMoreFonts();
                }
            },
            { rootMargin: '100px' }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [isFetching, hasMoreData]); //

    return (
        <div
            className={`font-list-container ${changeLayer ? '' : 'boxLayer'}  ${layerStyle ? 'Blayer' : ''} ${
                isMobile ? 'Mob ' : ''
            }`}
        >
            <Header loadMoreFonts={loadMoreFonts} />
            <div className="filter-container">
                <div className="filterCont">
                    <ul className="svgWrap">
                        <li onClick={handleLayerChange}>
                            <span className={`material-symbols-outlined ${layerStyle ? 'rotatePlus' : 'rotateMinus'}`}>
                                <img src={setting} alt="" />
                            </span>
                            <div>Filters</div>
                        </li>
                    </ul>
                </div>
                <div className="selectSvgCont">
                    <div
                        className="customSelect"
                        value={sortFilter.selected}
                        onChange={handleSortChange}
                        style={{ marginRight: isMobile ? '0' : '1.5rem' }}
                    >
                        <span className="selected-text">{selectedText}</span>
                        <svg className="dropdown-icon" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z"></path>
                        </svg>
                        <select name="sort" onChange={handleTextChage}>
                            <option value="newest">최신순</option>
                            <option value="oldest">오래된순</option>
                            <option value="down">다운로드순</option>
                        </select>
                    </div>
                    <div className="svg">
                        <span className="material-symbols-outlined smallMaterial" onClick={() => setChangeLayer(true)}>
                            <img src={view} alt="" style={{ filter: changeLayer ? '' : 'invert(0.5)' }} />
                        </span>
                        <span className="material-symbols-outlined smallMaterial" onClick={() => setChangeLayer(false)}>
                            <img src={grid} alt="" style={{ filter: changeLayer ? 'invert(0.5)' : '' }} />
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="filterFontList"
                style={{
                    marginBottom: isMobile ? 'var(--footer-height)' : '',
                }}
            >
                {filteredFonts.length > 0 ? (
                    filteredFonts.map((font, index) => {
                        const weightsArray = font.weights ? font.weights.replace(/"/g, '').split(',') : [];
                        const languagesArray = font.supported_languages
                            ? font.supported_languages.replace(/"/g, '').split(',')
                            : [];
                        return (
                            <Link to={`/Page/FontDetail/${font.font_name}`} key={index} state={{ font }}>
                                <div
                                    className="font-item"
                                    style={{ '--font-family': `'${font.font_name}', sans-serif` }}
                                >
                                    <div className="fontOption">
                                        <div>{font.font_name}</div>
                                        <ul>
                                            <li>굵기 및 스타일 {weightsArray.length}개</li>
                                            <li>지원언어 {languagesArray.length}개</li>
                                        </ul>
                                    </div>
                                    <div
                                        className="typingZone "
                                        style={{
                                            fontSize: `${fontSize}px`,
                                        }}
                                    >
                                        <div>
                                            {typing ? (
                                                <div>{typing}</div>
                                            ) : (
                                                <>
                                                    {supportsKorean && font.supported_languages.includes('korean') ? (
                                                        <div>
                                                            한국어가 지원되는 폰트입니다. 자유롭게 작성하고
                                                            이용해보세요.
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            Is this {font.font_name} easy to read? Try typing and see
                                                            for yourself!
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <NotFound />
                )}
                <div ref={observerRef} style={{ height: '1.5rem' }}></div>
            </div>
        </div>
    );
};

export default FontList;
