// script.js - Complete Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initSnapScroll();
    initJupiterModal();
    initMemeGallery();
    initMemeModal();
    initSmoothNavigation();
    initHoverAnimations();
});

// Snap Scroll Enhancement
function initSnapScroll() {
    const container = document.querySelector('.sections-container');
    const sections = document.querySelectorAll('.section');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = sections[1];
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const currentScroll = container.scrollTop;
            const sectionHeight = window.innerHeight;
            const currentIndex = Math.round(currentScroll / sectionHeight);
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Jupiter Modal - Direct plugin integration
function initJupiterModal() {
    const modal = document.getElementById('jupiterModal');
    const openBtn = document.getElementById('openJupiter');
    
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        
        // Initialize Jupiter directly in modal
        setTimeout(() => {
            if (window.Jupiter) {
                window.Jupiter.init({
                    displayMode: "integrated",
                    integratedTargetId: "jupiter-container",
                    formProps: {
                        initialInputMint: "So11111111111111111111111111111111111111112",
                        initialOutputMint: "Hh3oTaqDCKKfdBgsQEvxp9sUwyNf8x9qmKqEMLBWpump",
                        fixedMint: "",
                    },
                });
            }
        }, 100);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            // Clear Jupiter container
            document.getElementById('jupiter-container').innerHTML = '';
        }
    });
}

// Meme Gallery
function initMemeGallery() {
    const memeGrid = document.getElementById('memeGrid');
    
    for (let i = 1; i <= 16; i++) {
        const memeItem = document.createElement('div');
        memeItem.className = 'meme-item';
        memeItem.dataset.index = i;
        
        const img = document.createElement('img');
        img.src = `images/memes/meme${i}.PNG`;
        img.alt = `Meme ${i}`;
        img.loading = 'lazy';
        
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IT0RMIE1lbWUgJHtpfTwvdGV4dD48L3N2Zz4=';
        };
        
        memeItem.appendChild(img);
        memeGrid.appendChild(memeItem);
    }
}

// Meme Modal with Navigation
function initMemeModal() {
    const modal = document.getElementById('memeModal');
    const closeBtn = document.getElementById('closeMemeModal');
    const expandedImg = document.getElementById('expandedMeme');
    const prevBtn = document.getElementById('prevMeme');
    const nextBtn = document.getElementById('nextMeme');
    const counter = document.getElementById('memeCounter');
    
    let currentIndex = 1;
    const totalMemes = 16;
    
    // Open modal on meme click
    document.addEventListener('click', (e) => {
        const memeItem = e.target.closest('.meme-item');
        if (memeItem) {
            const img = memeItem.querySelector('img');
            if (img) {
                currentIndex = parseInt(memeItem.dataset.index) || 1;
                updateMemeDisplay();
                modal.style.display = 'flex';
            }
        }
    });
    
    // Update displayed meme
    function updateMemeDisplay() {
        expandedImg.src = `images/memes/meme${currentIndex}.PNG`;
        counter.textContent = `${currentIndex}/${totalMemes}`;
        
        // Handle image error
        expandedImg.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IT0RMIE1lbWUgJHtjdXJyZW50SW5kZXh9PC90ZXh0Pjwvc3ZnPg==';
        };
    }
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 1 ? currentIndex - 1 : totalMemes;
        updateMemeDisplay();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < totalMemes ? currentIndex + 1 : 1;
        updateMemeDisplay();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                currentIndex = currentIndex > 1 ? currentIndex - 1 : totalMemes;
                updateMemeDisplay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                currentIndex = currentIndex < totalMemes ? currentIndex + 1 : 1;
                updateMemeDisplay();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Smooth Navigation
function initSmoothNavigation() {
    const sections = document.querySelectorAll('.section');
    const container = document.querySelector('.sections-container');
    
    const observerOptions = {
        root: container,
        threshold: 0.5,
    };
    
    const observer = new IntersectionObserver((entries) => {
        // 
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Global Hover Animations
function initHoverAnimations() {
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(elem => {
        if (!elem.style.transition) {
            elem.style.transition = 'all 0.3s ease';
        }
        
        if (elem.children.length === 0 && elem.textContent.trim().length > 0) {
            elem.addEventListener('mouseenter', function() {
                if (!this.classList.contains('section-title') && 
                    !this.classList.contains('hero-title') &&
                    !this.classList.contains('social-name')) {
                    this.style.transform = 'translateX(3px)';
                    this.style.backgroundColor = 'rgba(0,0,0,0.02)';
                }
            });
            
            elem.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.backgroundColor = '';
            });
        }
    });
    
    // Parallax effect on hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            
            const title = heroSection.querySelector('.hero-title');
            if (title) {
                title.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }
}

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const container = document.querySelector('.sections-container');
        if (container) {
            container.style.scrollSnapType = 'none';
            setTimeout(() => {
                container.style.scrollSnapType = 'y mandatory';
            }, 10);
        }
    }, 250);
});

// Touch support
document.addEventListener('touchstart', () => {}, { passive: true });