import { useState } from 'react';

const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text); // 복사되는 텍스트
            setCopied(true);

            // ✅ 2초 후에 복사 상태 초기화
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('❌ 복사 실패:', error);
        }
    };

    return { copied, copyToClipboard };
};

export default useCopyToClipboard;
