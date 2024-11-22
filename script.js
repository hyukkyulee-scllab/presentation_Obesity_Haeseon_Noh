document.addEventListener('DOMContentLoaded', function() {
    // Reveal.js 초기화
    Reveal.initialize({
        // 기본 설정
        controls: true,
        progress: true,
        center: true,
        hash: true,

        // 전환 효과
        transition: 'slide',
        backgroundTransition: 'fade',

        // 네비게이션
        keyboard: true,
        overview: true,
        touch: true,
        
        // 크기 설정
        width: "100%",
        height: "100%",
        margin: 0.1,
        minScale: 0.2,
        maxScale: 2.0,

        // 플러그인
        plugins: [ RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight ]
    });

    // 차트 변수
    let obesityChart = null;

    // 차트 생성 함수
    function createObesityChart() {
        const ctx = document.getElementById('obesityChart');
        if (!ctx) return;

        const obesityData = {
            labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: '남자',
                data: [37.9, 38.8, 40.7, 42.0, 43.8, 45.4, 46.2, 48.6, 49.2, 49.6],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                tension: 0.4,
                fill: true
            }, {
                label: '전체',
                data: [30.6, 31.1, 32.4, 33.3, 34.7, 35.7, 36.3, 37.9, 38.4, 38.4],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                tension: 0.4,
                fill: true
            }, {
                label: '여자',
                data: [23.7, 23.7, 24.5, 25.0, 25.9, 26.5, 27.3, 27.5, 27.8, 27.7],
                borderColor: '#FF4081',
                backgroundColor: 'rgba(255, 64, 129, 0.2)',
                tension: 0.4,
                fill: true
            }]
        };

        if (obesityChart) {
            obesityChart.destroy();
        }

        obesityChart = new Chart(ctx, {
            type: 'line',
            data: obesityData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    title: {
                        display: true,
                        text: '성인 비만 유병률 추이 (%)',
                        color: '#fff',
                        font: {
                            size: 16,
                            family: "'Noto Sans KR', sans-serif",
                            weight: 'bold'
                        },
                        padding: 20
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#fff',
                            font: {
                                family: "'Noto Sans KR', sans-serif",
                                size: 12
                            },
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff',
                            font: {
                                family: "'Noto Sans KR', sans-serif"
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff',
                            font: {
                                family: "'Noto Sans KR', sans-serif"
                            }
                        }
                    }
                }
            }
        });
    }

    // Reveal.js 이벤트 리스너
    Reveal.on('slidechanged', function(event) {
        // 통계 슬라이드에서 차트 생성
        if (event.currentSlide.querySelector('#obesityChart')) {
            setTimeout(createObesityChart, 200);
        }
    });

    // 아이콘 애니메이션
    document.querySelectorAll('.fact i, .risk-item i, .disease-category i').forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        icon.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 결론 포인트 애니메이션
    document.querySelectorAll('.conclusion-points p').forEach((point, index) => {
        point.style.opacity = '0';
        point.style.transform = 'translateX(-20px)';
        point.style.transition = 'all 0.5s ease';
        point.style.transitionDelay = `${index * 0.5}s`;
    });

    // 결론 슬라이드에서 포인트 표시
    Reveal.on('slidechanged', function(event) {
        if (event.currentSlide.querySelector('.conclusion-points')) {
            document.querySelectorAll('.conclusion-points p').forEach((point, index) => {
                setTimeout(() => {
                    point.style.opacity = '1';
                    point.style.transform = 'translateX(0)';
                }, index * 500);
            });
        }
    });

    // 초기 차트 생성 (첫 로드 시 통계 슬라이드가 보이는 경우)
    if (document.querySelector('#obesityChart')) {
        setTimeout(createObesityChart, 200);
    }

    // 키보드 이벤트 리스너 추가
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            if (event.key === 'ArrowRight') {
                Reveal.next();
            } else {
                Reveal.prev();
            }
        }
    });
});
