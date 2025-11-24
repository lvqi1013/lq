// 导航栏切换
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 关闭移动端菜单当点击链接
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// 滚动时导航栏样式变化
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        if (percent) {
            bar.style.width = percent + '%';
        }
    });
}

// 奖项轮播功能
function initAwardsCarousel() {
    const featuredSlides = document.querySelectorAll('.featured-slide');
    const thumbnails = document.querySelectorAll('.award-thumb');
    const featuredPrevBtn = document.querySelector('.featured-btn.prev-btn');
    const featuredNextBtn = document.querySelector('.featured-btn.next-btn');
    const thumbPrevBtn = document.querySelector('.thumb-btn.thumb-prev');
    const thumbNextBtn = document.querySelector('.thumb-btn.thumb-next');
    
    if (!featuredSlides.length) return;
    
    let currentIndex = 0;
    const totalSlides = featuredSlides.length;
    let autoPlayInterval;

    // 更新显示状态
    function updateDisplay() {
        // 更新大图
        featuredSlides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
                slide.style.display = 'flex';
            } else {
                slide.classList.remove('active');
                slide.style.display = 'none';
            }
        });
        
        // 更新缩略图
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }

    // 切换到指定幻灯片
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentIndex = index;
            updateDisplay();
        }
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateDisplay();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateDisplay();
    }

    // 开始自动轮播
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    // 停止自动轮播
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // 绑定事件
    function bindEvents() {
        // 大图控制按钮
        if (featuredPrevBtn) {
            featuredPrevBtn.addEventListener('click', () => {
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
            });
        }
        
        if (featuredNextBtn) {
            featuredNextBtn.addEventListener('click', () => {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            });
        }
        
        // 小图控制按钮
        if (thumbPrevBtn) {
            thumbPrevBtn.addEventListener('click', () => {
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
            });
        }
        
        if (thumbNextBtn) {
            thumbNextBtn.addEventListener('click', () => {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            });
        }
        
        // 缩略图点击
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                stopAutoPlay();
                goToSlide(index);
                startAutoPlay();
            });
        });
        
        // 鼠标悬停暂停
        const awardsSection = document.getElementById('awards');
        if (awardsSection) {
            awardsSection.addEventListener('mouseenter', stopAutoPlay);
            awardsSection.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // 初始化
    bindEvents();
    updateDisplay();
    startAutoPlay();
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    animateSkillBars();
    initAwardsCarousel();
    initSmoothScroll();
});