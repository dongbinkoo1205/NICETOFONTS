import React, { useState, useContext, useEffect } from 'react';

// mui
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';

// 컨텍스트
import FixSideContent from '../components/FixSideContent';
import { MediaQueryContext } from '../contexts/MediaQueryContext'; // 반응형 컨텍스트
import useCopyToClipboard from '../hook/useCopyToClipboard'; //이메일 복사 훅
import HomeHeader from '../components/HomeHeader';

// 팝업
import CustomPop from '../components/MuiComponents/CustomPop';
import Footer from '../components/Footer';

// faq
import { faqs } from '../util/DataFaq';

function FaqPage() {
    const [expanded, setExpanded] = useState(false);

    // 이메일 복사 커스텀 훅 상태
    const { copied, copyToClipboard } = useCopyToClipboard();

    // 반응형 컨텍스트
    const { isMobile } = useContext(MediaQueryContext);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // 링크
    const headerItems = [{ value: 'Home' }, { value: 'FAQ' }];
    // 홈메뉴 상태
    const [menu, setMenu] = useState({ selected: headerItems[0].value });

    // 홈메뉴 스크롤
    const handleScroll = (menu) => {
        document.getElementById(menu)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // 페이지 랜더링시 스크롤 상단으로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 팝업상태
    const [PopBtn, setPopBtn] = useState(null);
    const handleClick = (event) => {
        setPopBtn(PopBtn ? null : event.currentTarget);
    };

    return (
        <Box
            className={`Pretendard-r `}
            sx={{ display: 'flex', width: '100%', paddingBottom: isMobile ? 'var(--footer-height)' : '' }}
        >
            <HomeHeader setMenu={setMenu} menu={menu} handleScroll={handleScroll} headerItems={headerItems} />

            <FixSideContent display={'none'} />
            <Box
                sx={{
                    width: isMobile ? '100%' : '95%',
                    paddingTop: 'var(--homeHeader-height)',
                    borderTop: '1px solid #ccc',
                }}
            >
                {/* 상단 섹션 */}
                <Box
                    id="Home"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: isMobile ? 'column' : 'row',
                        padding: '20rem 3rem 3rem 3rem',
                        scrollMarginTop: 'var(--homeHeader-height)', // 해당 요소가 헤더에 가려지지 않고 값만큼 아래에 위치
                    }}
                >
                    {/* 왼쪽: 제목 및 설명 */}
                    <Box sx={{ width: isMobile ? '100%' : '100%' }}>
                        <Typography variant="h4" fontSize={'3.8rem'} fontWeight={'bold'}>
                            나이스 투 폰트.
                            <Typography variant="body1" fontSize={isMobile ? '2.5rem' : '3.5rem'} sx={{ mt: '1rem' }}>
                                당신을 놀라운 폰트의 세상으로 초대합니다.
                            </Typography>
                        </Typography>
                        <Typography
                            variant="body1"
                            color="currentColor"
                            mt={'2rem'}
                            fontSize={'1.4rem'}
                            sx={{ opacity: '0.7' }}
                            display={isMobile ? 'none' : 'block'}
                        >
                            우리는 저작권 걱정 없이 누구나 안심하고 사용할 수 있는 폰트들을 엄선하여 소개합니다.
                        </Typography>
                    </Box>
                </Box>

                {/* 구분선 */}
                <Box my={4} borderBottom="1px solid #ccc" />

                {/* 하단 섹션 */}
                <Box
                    id="FAQ"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: isMobile ? 'column' : 'row',
                        padding: ' 3rem 3rem',
                        scrollMarginTop: 'var(--homeHeader-height)', // 해당 요소가 헤더에 가려지지 않고 값만큼 아래에 위치
                    }}
                >
                    {/* 왼쪽: 연락 정보 */}
                    <Box sx={{ width: isMobile ? '100%' : '48%' }}>
                        <Typography variant="h4" fontSize={'3.8rem'} fontWeight={'bold'}>
                            문의사항이 있으신가요?
                        </Typography>
                        <Typography
                            variant="body1"
                            color="currentColor"
                            mt={'2rem'}
                            fontSize={isMobile ? '2rem' : '1.4rem'}
                        >
                            필요하신 경우 언제든지 이메일을 통해 문의해 주시면 성심껏 답변드리겠습니다.
                        </Typography>

                        <Box display="flex" alignItems={'flex-start'} flexDirection={'column'} mt={'3rem'}>
                            <Box display="flex" alignItems="center" mb={'0.5rem'}>
                                <Typography variant="body1" fontSize={isMobile ? '2rem' : '1.3rem'}>
                                    Instagram
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                color="currentColor"
                                startIcon={<ContentCopyIcon />}
                                onClick={handleClick}
                            >
                                {open && <CustomPop PopBtn={PopBtn} setPopBtn={setPopBtn} />}
                                <Typography
                                    color="currentColor"
                                    fontSize={isMobile ? '2rem' : '1.5rem'}
                                    variant="body1"
                                    fontFamily={'Oxygen'}
                                >
                                    NTFS
                                </Typography>
                            </Button>
                            <Box display="flex" alignItems="center" mb={'0.5rem'} mt={'1.5rem'}>
                                <Typography variant="body1" fontSize={isMobile ? '2rem' : '1.3rem'}>
                                    E-mail
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                color="currentColor"
                                startIcon={<ContentCopyIcon />}
                                onClick={() => copyToClipboard('hi.furyproject@gmail.com')}
                            >
                                <Typography
                                    color="currentColor"
                                    fontSize={isMobile ? '2rem' : '1.5rem'}
                                    variant="body1"
                                >
                                    hello@NicetoFont.com
                                </Typography>
                            </Button>
                            {copied && (
                                <Typography color="currentColor" variant="body3" mt={'1rem'} fontSize={'1.5rem'}>
                                    COPIED!
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* 오른쪽: FAQ (아코디언 적용) */}
                    <Box sx={{ width: isMobile ? '100%' : '48%', margin: isMobile ? '5rem 0' : '2rem 0' }}>
                        <Typography variant="h6" fontSize={isMobile ? '3.2rem' : '2.8rem'} mb={'2rem'}>
                            FAQ
                        </Typography>
                        {faqs.map((faq, index) => (
                            <Accordion
                                color="currentColor"
                                key={index}
                                expanded={expanded === index}
                                onChange={handleChange(index)}
                                fontSize={'2rem'}
                                sx={{ marginBottom: '1rem', background: 'transparent', color: 'currentcolor' }}
                            >
                                <AccordionSummary
                                    className="Pretendard-r"
                                    fontSize={'2rem'}
                                    sx={{
                                        color: 'var(--text-color)',
                                        '& .MuiAccordionSummary-expandIconWrapper': {
                                            color: 'var(--text-color)',
                                            fill: 'var(--text-color) !important',
                                        }, // 색상 변경
                                    }}
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography fontSize={isMobile ? '2rem' : '1.8rem'}>{faq.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography fontSize={isMobile ? '1.8rem' : '1.5rem'} color="currentColor">
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default FaqPage;
