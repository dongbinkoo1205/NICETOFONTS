import React, { useContext, useEffect } from 'react';
import { useFilterContext } from '../contexts/FilterContext';
import { useFontContext } from '../contexts/FontContext';
import { useLayerContext } from '../contexts/LayerContext';
import { MediaQueryContext } from '../contexts/MediaQueryContext'; // 반응형 컨텍스트
import './SideContent.css';

// 폰트 카테고리 매핑
import { FontCategories, FontSubsets } from '../util/DataCategories';

import close from '../assets/close.png';
import nLogo2 from '../assets/nLogo2.png';

const SideContent = () => {
    // 반응형 컨텍스트
    const { isMobile } = useContext(MediaQueryContext);

    // 폰트 사이즈 조절 상태 컨텍스트
    const { fontSize, updateFontSize } = useFontContext();

    // 레이어 변경
    const { layerStyle, setlayerStyle } = useLayerContext();

    useEffect(() => {
        if (isMobile) {
            setlayerStyle(true);
        }
    }, [isMobile]);

    function handleLayerChange() {
        setlayerStyle((prev) => !prev); // true <-> false 토글
    }

    // 필터 상태들
    const { setCategoryFilter, setNumVariantsFilter, setTextVariantsFilter, setSubsetsFilter, setTyping } =
        useFilterContext();

    return (
        <div className={`side-content scrollBar ${layerStyle ? 'Blayer' : ''} ${isMobile ? 'Mob' : ''}`}>
            {/* 닫기버튼 */}
            <div className="closeBtn" onClick={handleLayerChange}>
                <span className="material-symbols-outlined">
                    <img src={close} alt="" />
                </span>
            </div>
            <div className='cateWrap'>
                {/* 로고 */}

                <div className="slideLogo">
                    <ul>
                        <li className="mainLogo Oxygen">
                            <img src={nLogo2} alt="" style={{}} />
                        </li>
                    </ul>
                </div>
                {/* range 존 */}
                <div className="range">
                    <div>Range</div>
                    <input
                        type="range"
                        min="10"
                        max="60"
                        value={fontSize}
                        onChange={(e) => updateFontSize(Number(e.target.value))}
                        className="font-size-slider"
                    />
                    <span>{fontSize}px</span>
                </div>
                {/* 타이핑 존 */}
                <div className="typingWrap ">
                    <div>Preview</div>
                    <textarea
                        type="text"
                        className="typing Pretendard-r"
                        onChange={(e) => setTyping(e.target.value)}
                        placeholder="텍스트를 입력하고 미리보기"
                    />
                </div>

                {/* 카테고리 필터 */}
                <fieldset className="filter-group">
                    <legend>Category</legend>
                    {FontCategories.map(({ value, label }) => (
                        <label key={label}>
                            <input
                                type="radio"
                                name="category"
                                value={value}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            />
                            {label}
                        </label>
                    ))}
                </fieldset>

                {/* 텍스트 스타일 필터 */}
                <fieldset className="filter-group">
                    <legend>Variants</legend>
                    {['regular', 'italic'].map((variant) => (
                        <label key={variant}>
                            <input
                                type="radio"
                                name="variant"
                                value={variant}
                                onChange={(e) => setTextVariantsFilter([e.target.value])}
                            />
                            {variant}
                        </label>
                    ))}
                </fieldset>

                {/* 폰트 굵기 필터 */}
                <fieldset className="filter-group">
                    <legend>Size</legend>
                    {['', '100', '200', '300', 'regular', '500', '600', '700', '800', '900'].map((size) => (
                        <label key={size}>
                            <input
                                type="radio"
                                name="size"
                                value={size}
                                onChange={(e) => setNumVariantsFilter([e.target.value])}
                            />
                            {size || 'All'}
                        </label>
                    ))}
                </fieldset>

                {/* 언어 지원 필터 */}
                <fieldset className="filter-group lastFilter-group">
                    <legend>Language</legend>
                    {FontSubsets.map(({ value, label }) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name="subset"
                                value={value}
                                onChange={(e) => setSubsetsFilter([e.target.value])}
                            />
                            {label}
                        </label>
                    ))}
                </fieldset>
            </div>
        </div>
    );
};

export default SideContent;
