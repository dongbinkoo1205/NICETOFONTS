import React from 'react';

// templates
import TemplateAccordion from '../templates/TemplateAccordion';
import TemplateSlideComponent from '../templates/TemplateSlide';
import TemplateMarquee from '../templates/TemplateMarquee';
import TemplateAsymmetry from '../templates/TemplateAsymmetry';
// css
import './TemplateWrap.css';

function TemplateWrap({ id }) {
    return (
        <div className="TemplateWrap" id={id}>
            <div className="TemplateWrapName">
                <ul className="Pretendard-r">
                    <li>템플릿</li>
                    <li>모든 텍스트를 자유롭게 수정할 수 있습니다.</li>
                </ul>
            </div>
            <div className="Templates">
                <TemplateAsymmetry />
                <TemplateSlideComponent />
                <TemplateMarquee />
                <TemplateAccordion />
            </div>
        </div>
    );
}

export default TemplateWrap;
