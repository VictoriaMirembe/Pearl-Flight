document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    
    const form = document.getElementById('flightSearchForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.search-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Searching...`;
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                showToast('Flights Found!', 'We found 45 flights matching your criteria.');
            }, 1500);
        });
    }

    
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            
            const formContainer = document.querySelector('.flight-search-form');
            formContainer.style.opacity = '0';
            setTimeout(() => {
                formContainer.style.opacity = '1';
            }, 200);
        });
    });

    
    const swapBtn = document.querySelector('.swap-btn');
    if(swapBtn) {
        swapBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('.form-row:first-child .glass-input');
            if(inputs.length >= 2) {
                const temp = inputs[0].value;
                inputs[0].value = inputs[1].value;
                inputs[1].value = temp;

                
                inputs[0].style.transform = 'translateY(-5px)';
                inputs[1].style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    inputs[0].style.transform = 'none';
                    inputs[1].style.transform = 'none';
                }, 200);
            }
        });
    }

    
    function showToast(title, message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let icon = 'bx-check-circle';
        if (type === 'warning') icon = 'bx-info-circle';
        
        toast.innerHTML = `
            <i class='bx ${icon}'></i>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        container.appendChild(toast);
        
        
        void toast.offsetWidth;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    }

    
    let updateShown = false;
    window.addEventListener('scroll', () => {
        const liveSection = document.getElementById('updates');
        if (!liveSection) return;
        
        const pos = liveSection.getBoundingClientRect();
        if (pos.top < window.innerHeight && !updateShown) {
            updateShown = true;
            
            setTimeout(() => {
                showToast('Live Update: Gate Change', 'Flight PF-402 to LHR has changed to Gate C12.', 'warning');
                
                
                const highlight = document.querySelector('.highlight');
                if(highlight) {
                    highlight.style.background = 'rgba(245, 158, 11, 0.2)';
                    highlight.style.padding = '4px 8px';
                    highlight.style.borderRadius = '4px';
                    setTimeout(() => {
                        highlight.style.background = 'transparent';
                    }, 2000);
                }
            }, 2000);
        }
    });
});
