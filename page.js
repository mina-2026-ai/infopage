// cursor-pointer 클릭 시 다른 홈페이지 열기
document.addEventListener('DOMContentLoaded', function() {
    // ------------------------- section-1 animations ------------------------------
    // Entry animations for first-section logo and title
    const firstSection = document.querySelector('.first-section');
    if (firstSection) {
        const logo = firstSection.querySelector('img'); // first img is logo
        const title = firstSection.querySelector('h1');

        [logo, title].forEach(el => { if (el) el.classList.add('animate-up'); });

        // staggered reveal
        if (title) setTimeout(() => title.classList.add('is-visible'), 50);
        if (logo) setTimeout(() => logo.classList.add('is-visible'), 200);
    }

    // rocket-box animations
    const rocketBox = document.querySelector('.rocket-box');
    if (rocketBox) {
        const rocketImg = rocketBox.querySelector('img');
        const underLine = rocketBox.querySelector('.under-line');
        const paragraph = rocketBox.querySelector('p');

        [rocketImg, underLine, paragraph].forEach(el => { if (el) el.classList.add('animate-up'); });

        // staggered sequence: img → underline → p
        if (rocketImg) setTimeout(() => rocketImg.classList.add('is-visible'), 400);
        if (underLine) setTimeout(() => underLine.classList.add('is-visible'), 600);
        if (paragraph) setTimeout(() => paragraph.classList.add('is-visible'), 800);
    }


    //  -------------------------- section-2 animations (scroll-triggered) --------------------------
    const section2 = document.querySelector('.section-2');
    if (section2) {
        const firstDiv = section2.querySelector('div');
        if (firstDiv) {
            firstDiv.classList.add('animate-up');
        }
        
        // wreath-table의 모든 tr에 animate-up 클래스 추가
        const wreathTable = section2.querySelector('.wreath-table');
        if (wreathTable) {
            const tableRows = wreathTable.querySelectorAll('tr');
            tableRows.forEach(row => {
                row.classList.add('animate-up');
            });
        }
    }

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 요소의 10%가 보이면 트리거
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // section-2 첫 번째 div가 화면에 보이면 애니메이션 시작
                if (entry.target.classList.contains('section-2')) {
                    const firstDiv = entry.target.querySelector('div');
                    if (firstDiv && !firstDiv.classList.contains('is-visible')) {
                        setTimeout(() => {
                            firstDiv.classList.add('is-visible');
                        }, 100);
                    }
                    
                    // wreath-table tr들도 순차적으로 애니메이션
                    const wreathTable = entry.target.querySelector('.wreath-table');
                    if (wreathTable) {
                        const tableRows = wreathTable.querySelectorAll('tr');
                        tableRows.forEach((row, index) => {
                            if (!row.classList.contains('is-visible')) {
                                setTimeout(() => {
                                    row.classList.add('is-visible');
                                }, 300 + (index * 300)); // 첫 번째: 300ms, 두 번째: 600ms, 세 번째: 900ms
                            }
                        });
                    }
                }
            }
        });
    }, observerOptions);

    // section-2 관찰 시작
    if (section2) {
        observer.observe(section2);
    }

    //  -------------------------- section-3 animations (scroll-triggered) --------------------------
    const section3 = document.querySelector('.section-3');
    if (section3) {
        const firstDiv = section3.querySelector('div');
        if (firstDiv) {
            firstDiv.classList.add('animate-up');
        }
    }

    // section-3 observer 콜백에 추가
    const observer3 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('section-3')) {
                    const firstDiv = entry.target.querySelector('div');
                    if (firstDiv && !firstDiv.classList.contains('is-visible')) {
                        setTimeout(() => {
                            firstDiv.classList.add('is-visible');
                        }, 100);
                    }
                }
            }
        });
    }, observerOptions);

    if (section3) {
        observer3.observe(section3);
    }


    // img-container p 태그 tracking-in-expand 애니메이션
    const imgContainer = document.querySelector('.img-container');
    if (imgContainer) {
        const imgContainerPTags = imgContainer.querySelectorAll('p');
        
        const imgContainerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('tracking-in-expand')) {
                    setTimeout(() => {
                        entry.target.classList.add('tracking-in-expand');
                    }, 300); // 2초 딜레이
                }
            });
        }, observerOptions);

        imgContainerPTags.forEach(p => {
            imgContainerObserver.observe(p);
        });
    }
       //  -------------------------- section-4 animations (scroll-triggered) --------------------------
    const section4 = document.querySelector('.section-4');
    if (section4) {
        const firstDiv = section4.querySelector('div');
        if (firstDiv) {
            firstDiv.classList.add('animate-up');
        }

        // section-4 title div observer
        const observer4Title = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, 100);
                }
            });
        }, observerOptions);

        if (firstDiv) {
            observer4Title.observe(firstDiv);
        }

        // 각 cursor-pointer 개별 observer
        const cursorPointers = section4.querySelectorAll('.cursor-pointer');
        cursorPointers.forEach(pointer => {
            pointer.classList.add('animate-up');

            // 각 cursor-pointer마다 독립적인 observer 생성
            const observerIndividual = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, observerOptions);

            observerIndividual.observe(pointer);
        });
    }

    // ---------------------- language-class img slide-in animation -----------------------
    const languageClassImgs = document.querySelectorAll('.language-class img');
    
    const languageClassObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // language-class 영역이 보이면 모든 img에 slide-in 클래스 추가
                languageClassImgs.forEach(img => {
                    if (!img.classList.contains('slide-in')) {
                        img.classList.add('slide-in');
                    }
                });
                // 한 번 트리거되면 관찰 중지
                languageClassObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // language-class 요소 감시
    const languageClass = document.querySelector('.language-class');
    if (languageClass) {
        languageClassObserver.observe(languageClass);
    }

    //  -------------------------- section-5 animations (scroll-triggered) --------------------------    
    const section5 = document.querySelector('.section-5');
    const mainContainer = section5.querySelector('.main-container');
    if (section5) {
        const firstDiv = section5.querySelector('div');
        if (firstDiv) {
            firstDiv.classList.add('animate-up');
            mainContainer.classList.add('animate-up');
        }   
    }

    // section-5 observer 콜백에 추가
    const observer5 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('section-5')) {
                    const firstDiv = entry.target.querySelector('div');
                    if (firstDiv && !firstDiv.classList.contains('is-visible')) {
                        setTimeout(() => {
                            firstDiv.classList.add('is-visible');
                        }, 100);
                    }
                }
            }
        });
    }, observerOptions);

    if (section5) {
        observer5.observe(section5);
    }

    // -------------------------- section-5 insert-coin drag (free move) --------------------------
    const insertCoin = document.querySelector('.insert-coin');
    const piggyZone = document.querySelector('.piggy-zone');
    const piggyBankGame = document.querySelector('.piggy-bank-game');
    const coinInfo = document.querySelector('.section-5 > span');

    function playLottie() {
        const lottie = document.querySelector('#myLottie');
        if (lottie) {
            lottie.classList.add('show');
            setTimeout(() => {
                lottie.classList.remove('show');
            }, 750);
        }
    }
    
    if (insertCoin && piggyZone && piggyBankGame) {
        insertCoin.classList.add('floating'); // 초기에 둥실둥실 애니메이션 추가
        insertCoin.style.cursor = 'grab';
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let startOffsetX = 0;
        let startOffsetY = 0;
        let currentOffsetX = 0;
        let currentOffsetY = 0;
        let hasTriggered = false; // 일회성 이벤트를 위한 플래그
        
        const checkCollision = () => {
            if (hasTriggered) return; // 이미 트리거되었으면 더 이상 체크하지 않음
            
            const coinRect = insertCoin.getBoundingClientRect();
            const zoneRect = piggyZone.getBoundingClientRect();

            // 코인이 piggy-zone 안에 완전히 들어갔는지 확인
            const isInside = 
                coinRect.left >= zoneRect.left &&
                coinRect.right <= zoneRect.right &&
                coinRect.top >= zoneRect.top &&
                coinRect.bottom <= zoneRect.bottom;

            if (isInside) {
                // 일회성 트리거
                if (piggyBankGame.classList.contains('piggy-bank-game')) {
                    insertCoin.style.display = 'none';
                    coinInfo.style.display = 'none';
                    setTimeout(() => {
                        piggyBankGame.classList.remove('piggy-bank-game');
                        piggyBankGame.classList.add('piggy-bank');
                        mainContainer.classList.add('is-visible');
                    }, 750);
                    playLottie();
                    hasTriggered = true; // 트리거 완료 표시
                }
            }
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            const nextX = startOffsetX + deltaX;
            const nextY = startOffsetY + deltaY;
            currentOffsetX = nextX;
            currentOffsetY = nextY;
            insertCoin.style.transform = `translate(${nextX}px, ${nextY}px)`;
            checkCollision();
        };

        const onTouchMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            const nextX = startOffsetX + deltaX;
            const nextY = startOffsetY + deltaY;
            currentOffsetX = nextX;
            currentOffsetY = nextY;
            insertCoin.style.transform = `translate(${nextX}px, ${nextY}px)`;
            checkCollision();
        };

        const endDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            insertCoin.style.cursor = 'grab';
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', endDrag);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', endDrag);
            checkCollision();
        };

        // 마우스 이벤트
        insertCoin.addEventListener('mousedown', (e) => {
            insertCoin.classList.remove('floating');
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startOffsetX = currentOffsetX;
            startOffsetY = currentOffsetY;
            insertCoin.style.cursor = 'grabbing';
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', endDrag);
        });

        // 터치 이벤트
        insertCoin.addEventListener('touchstart', (e) => {
            insertCoin.classList.remove('floating');
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startOffsetX = currentOffsetX;
            startOffsetY = currentOffsetY;
            window.addEventListener('touchmove', onTouchMove, { passive: false });
            window.addEventListener('touchend', endDrag);
        });
    }

    //  -------------------------- section-6 animations (scroll-triggered) --------------------------    
    const section6 = document.querySelector('.section-6');
    if (section6) {
        const firstDiv = section6.querySelector('div');
        if (firstDiv) {
            firstDiv.classList.add('animate-up');
        }

        const cards = section6.querySelectorAll('.card');
        cards.forEach(card => card.classList.add('animate-up'));
    }

    const observer6 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('section-6')) {
                const firstDiv = entry.target.querySelector('div');
                if (firstDiv && !firstDiv.classList.contains('is-visible')) {
                    setTimeout(() => {
                        firstDiv.classList.add('is-visible');
                    }, 100);
                }

                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    if (!card.classList.contains('is-visible')) {
                        setTimeout(() => {
                            card.classList.add('is-visible');
                        }, 200 + index * 200);
                    }
                });
            }
        });
    }, observerOptions);

    if (section6) {
        observer6.observe(section6);
    }

    //  -------------------------- final-section animations (scroll-triggered) --------------------------    
    const finalSection = document.querySelector('.final-section');
    if (finalSection) {
        const innerWrap = finalSection.querySelector('.wrap');
        if (innerWrap) {
            innerWrap.classList.add('animate-up');
        }

        const finalButtons = finalSection.querySelectorAll('.go-to-button');
        finalButtons.forEach(btn => btn.classList.add('animate-up'));
    }

    const observerFinal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('final-section')) {
                const innerWrap = entry.target.querySelector('.wrap');
                if (innerWrap && !innerWrap.classList.contains('is-visible')) {
                    setTimeout(() => {
                        innerWrap.classList.add('is-visible');
                    }, 100);
                }

                const finalButtons = entry.target.querySelectorAll('.go-to-button');
                finalButtons.forEach((btn, index) => {
                    if (!btn.classList.contains('is-visible')) {
                        setTimeout(() => {
                            btn.classList.add('is-visible');
                        }, 200 + index * 300);
                    }
                });
            }
        });
    }, observerOptions);

    if (finalSection) {
        observerFinal.observe(finalSection);
    }

    // ------------------------- click link ------------------------------
    const cursorPointers = document.querySelectorAll('.cursor-pointer');
    
    cursorPointers.forEach((element, index) => {
        // 각 cursor-pointer에 URL 지정
        let url;
        
        // 첫 번째 ~ 세 번째: 과정 페이지
        if (index === 0) {
            url = 'https://specify.kr/p/?j=49&edu_code=Vmtaa2QxVnJOVkpRVkRBOStN'; // 디지털 디자인 과정 URL
        } else if (index === 1) {
            url = 'https://specify.kr/p/?j=49&edu_code=Vmtaa2QxWnRVak5RVkRBOStN'; // 게임 콘텐츠 과정 URL
        } else if (index === 2) {
            url = 'https://specify.kr/p/?j=49&edu_code=Vmtaa2QxWnRWa0pRVkRBOStN'; // 조리기능사 과정 URL
        } else if (index === 3) {
            url = 'https://place.map.kakao.com/252184976'; // 방문주소
        } else if (index === 4) {
            url = 'https://pf.kakao.com/_DdnBC'; // 카톡/온라인 상담
        }
        
        // 클릭 이벤트 추가
        element.addEventListener('click', function() {
            if (url) {
                window.open(url, '_blank');
            }
        });
        
        // 마우스 커서 포인터로 변경 (이미 CSS에 설정되어 있지만 명시적으로 표시)
        element.style.cursor = 'pointer';
    });

    // go-to-button 클릭 시 다른 홈페이지 열기
    const goToButtons = document.querySelectorAll('.go-to-button');
    
    goToButtons.forEach((button, index) => {
        let url;
        
        // 각 버튼마다 다른 URL 지정
        if (index === 0) {
            url = 'https://specify.kr/p/?j=27&edu_code=Vmtaa2QxVnJOVkpRVkRBOStN&edu_part=VmtkMFJrOVdRbEpRVkRBOStN&edu_class=VmtaYVUxRnNRbEpRVkRBOStN'; // 디지털 디자인&영상 광고 콘텐츠
        } else if (index === 1) {
            url = 'https://specify.kr/p/?j=27&edu_code=Vmtaa2QxWnRVak5RVkRBOStN&edu_part=VmtkMFJrOVdRbEpRVkRBOStN&edu_class=VmtSR1JrOVdRbEpRVkRBOStN'; // 게임 콘텐츠 제작
        } else if (index === 2) {
            url = 'https://specify.kr/p/?j=27&edu_code=Vmtaa2QxWnRWa0pRVkRBOStN&edu_part=VmtkMFJrOVdRbEpRVkRBOStN&edu_class=VmtaYVUxSnNRbEpRVkRBOStN'; // 한식&양식 조리기능사
        }
        
        // 클릭 이벤트 추가
        button.addEventListener('click', function() {
            if (url) {
                window.open(url, '_blank');
            }
        });
        
        // 마우스 커서 포인터로 변경
        button.style.cursor = 'pointer';
    });

    // contact-button 클릭 시 다른 홈페이지 열기
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            window.open('https://specify.kr/p/?j=27', '_blank');
        });
        contactButton.style.cursor = 'pointer';
    }
});

// 기존 이벤트 방지 코드
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('paste', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => e.preventDefault());
