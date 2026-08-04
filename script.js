// Sayfayı Başlatma
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initProductFilters();
    updateCurrentYear();
});

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// İletişim Formu
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;

        if (!name || !email || !message) {
            showMessage('Lütfen tüm alanları doldurunuz!', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Geçersiz email adresi!', 'error');
            return;
        }

        // WhatsApp'a gönder
        const whatsappMessage = `Merhaba, Adı: ${name}, Email: ${email}, Mesaj: ${message}`;
        const whatsappURL = `https://wa.me/905332564848?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, '_blank');

        showMessage('Mesajınız başarıyla gönderilmiştir!', 'success');
        form.reset();
    });
}

// Email Doğrulama
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mesaj Göster
function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = text;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background: #4caf50; color: white;' 
            : 'background: #f44336; color: white;'
        }
    `;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Ürün Filtreleri
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.animation = 'fadeIn 0.3s ease';
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Yıl Güncelle (Footer)
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Ürün Sepete Ekle (Gelecek için hazır)
function addToCart(productId) {
    console.log(`Ürün ${productId} sepete eklendi`);
    showMessage('Ürün sepete eklendi!', 'success');
}

// Hızlı Gözat
function quickView(productId) {
    console.log(`Ürün ${productId} hızlı gözat`);
    showMessage('Ürün detayları yükleniyor...', 'success');
}

// Ürün Arama
function searchProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    const searchQuery = query.toLowerCase();

    productCards.forEach(card => {
        const productName = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
        const productDesc = card.querySelector('.product-description')?.textContent.toLowerCase() || '';

        if (productName.includes(searchQuery) || productDesc.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Animasyon CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
