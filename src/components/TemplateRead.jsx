import React from 'react';
import './TemplateRead.css';
export default function TemplateRead({ title, description, id }) {
    return (
        <div className="templateRead" id={id}>
            <ul>
                <li className="Oxygen">{title}</li> {/* ✅ 제목 동적 변경 */}
                <li className="Pretendard-m">{description}</li> {/* ✅ 설명 동적 변경 */}
            </ul>
        </div>
    );
}
