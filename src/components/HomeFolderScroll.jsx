import React, { useEffect, useRef } from 'react';
import './HomeFolderScroll.css';

import HomeAccordion from './HomeTemplateComponents/HomeAccordion';
import HomeMarquee from './HomeTemplateComponents/HomeMarquee';
import HomeAsymmetry from './HomeTemplateComponents/HomeAsymmetry';
import HomeSlide from './HomeTemplateComponents/HomeSlide';

import { sectionsData } from '../util/DataText'; // sectionsData 가져오기

export default function HomeFolderScroll() {
    const sectionsRef = useRef([]);

    // components 배열을 sectionsData와 매칭
    const components = [HomeAsymmetry, HomeSlide, HomeAccordion, HomeMarquee];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            { threshold: 0.05 }
        );

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="folder-container" id="Template">
            {components.map((Component, index) => (
                <div
                    style={{
                        top: `${5 * (index + 1)}rem`,
                        zIndex: `${index + 1}`,
                    }}
                    key={index}
                    className="folder-section"
                    ref={(el) => (sectionsRef.current[index] = el)}
                >
                    <Component
                        title={sectionsData[index].title}
                        description={sectionsData[index].description}
                        shortDesc={sectionsData[index].shortDesc}
                    />
                </div>
            ))}
        </div>
    );
}
