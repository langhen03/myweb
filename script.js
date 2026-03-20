// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 设置当前年份
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始
    const day = now.getDate();
    document.getElementById('currentDate').textContent = `${year}.${month}.${day}`;
    
    // 2. 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 3. 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 如果是移动端菜单，点击后关闭菜单
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 4. 出版物年份筛选
    const yearButtons = document.querySelectorAll('.year-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            yearButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            const selectedYear = this.getAttribute('data-year');
            
            // 显示/隐藏出版物
            publicationItems.forEach(item => {
                if (selectedYear === 'all' || item.getAttribute('data-year') === selectedYear) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 5. 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 6. 高亮当前活动导航项
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavItem() {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavItem);
});