// 页面加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-ring"></div>';
    document.body.appendChild(loader);

    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('fade-out');
            setTimeout(function() {
                loader.remove();
            }, 500);
        }, 300);
    });

    // 平滑滚动功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 减去导航栏高度
                    behavior: 'smooth'
                });
                
                // 更新活动导航项
                updateActiveNavItem(targetId);
            }
        });
    });

    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏滚动效果
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 隐藏/显示导航栏
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // 向下滚动，隐藏导航栏
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // 更新活动导航项
        updateActiveNavItemOnScroll();
        
        // 技能条动画
        animateSkillBars();
    });

    // 更新活动导航项
    function updateActiveNavItem(targetId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // 滚动时更新活动导航项
    function updateActiveNavItemOnScroll() {
        const sections = document.querySelectorAll('.section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        updateActiveNavItem(currentSection);
    }

    // 技能条动画
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }

    // 表单验证
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            let errorMessage = '';
            
            // 简单验证
            if (name === '') {
                isValid = false;
                errorMessage += '请输入您的姓名\n';
            }
            
            if (email === '') {
                isValid = false;
                errorMessage += '请输入您的邮箱\n';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += '请输入有效的邮箱地址\n';
            }
            
            if (message === '') {
                isValid = false;
                errorMessage += '请输入留言内容\n';
            } else if (message.length < 10) {
                isValid = false;
                errorMessage += '留言内容至少需要10个字符\n';
            }
            
            if (isValid) {
                // 模拟提交成功
                showNotification('感谢您的留言！我会尽快回复您。', 'success');
                contactForm.reset();
            } else {
                showNotification(errorMessage, 'error');
            }
        });
    }

    // 邮箱格式验证
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 通知提示
    function showNotification(message, type = 'info') {
        // 检查是否已存在通知，存在则移除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerText = message;
        
        // 添加样式
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.color = 'white';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '9999';
        notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        // 根据类型设置背景色
        if (type === 'success') {
            notification.style.backgroundColor = '#2ecc71';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#e74c3c';
        } else {
            notification.style.backgroundColor = '#3498db';
        }
        
        document.body.appendChild(notification);
        
        // 显示通知
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // 3秒后隐藏通知
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // 响应式导航菜单
    function setupResponsiveNav() {
        const navItems = document.querySelectorAll('.nav-item');
        
        // 为移动设备添加触摸反馈
        if (window.innerWidth <= 768) {
            navItems.forEach(item => {
                item.addEventListener('touchstart', function() {
                    this.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                });
                
                item.addEventListener('touchend', function() {
                    this.style.backgroundColor = 'transparent';
                });
            });
        }
    }
    setupResponsiveNav();

    // 窗口大小改变时重新设置响应式导航
    window.addEventListener('resize', setupResponsiveNav);

    // 图片懒加载（简单实现）
    function lazyLoadImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            const imgPosition = img.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (imgPosition < screenPosition) {
                // 模拟加载图片效果
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 200);
            }
        });
    }
    
    // 初始加载
    lazyLoadImages();
    // 滚动时加载
    window.addEventListener('scroll', lazyLoadImages);

    // 为项目卡片添加悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 添加返回顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '30px';
    backToTopButton.style.right = '30px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.backgroundColor = '#3498db';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.fontSize = '20px';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.transition = 'all 0.3s ease';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.pointerEvents = 'none';
    
    document.body.appendChild(backToTopButton);
    
    // 显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.pointerEvents = 'auto';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.pointerEvents = 'none';
        }
    });
    
    // 返回顶部功能
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 按钮悬停效果
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#2980b9';
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3498db';
        this.style.transform = 'translateY(0)';
    });

    // 初始化时触发一次滚动事件，确保页面状态正确
    window.dispatchEvent(new Event('scroll'));

    // 为页面元素添加入场动画
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-content > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 为元素设置初始样式
    const animatedElements = document.querySelectorAll('.section-content > div');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    // 初始触发
    setTimeout(animateOnScroll, 500);
    // 滚动时触发
    window.addEventListener('scroll', animateOnScroll);

    // 简单的打字效果（用于标题）
    function typewriterEffect() {
        const title = document.querySelector('.name');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            let i = 0;
            
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            typeWriter();
        }
    }
    
    // 延迟执行打字效果
    setTimeout(typewriterEffect, 800);
});