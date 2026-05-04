// ===== THEME TOGGLE =====
function initTheme() {
  const themeToggle = document.querySelectorAll('.theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggle.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle span');
  icons.forEach(icon => {
    icon.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'; 
  });
}

// ===== DYNAMIC FOOTER =====
async function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) return;
  try {
    const response = await fetch('footer.html');
    const data = await response.text();
    footerPlaceholder.innerHTML = data;
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

// ===== DYNAMIC CAR DATA =====
const carInventory = [
  { file: 'porsche-panamera-2024.jpg', name: 'Porsche Panamera 2024', price: '₦125,000,000', specs: '2.9L V6 · 325 HP · AWD · 18/24 MPG', brand: 'porsche' },
  { file: 'porsche-911-2024.jpg', name: 'Porsche 911 2024', price: '₦145,000,000', specs: '3.0L Flat-6 · 379 HP · RWD · 18/24 MPG', brand: 'porsche' },
  { file: 'audi-a5-coupe-2024.jpg', name: 'Audi A5 Coupe 2024', price: '₦55,000,000', specs: '2.0L Turbo · 261 HP · AWD · 24/32 MPG', brand: 'audi' },
  { file: 'nissan-gt-r-2024.jpg', name: 'Nissan GT-R 2024', price: '₦135,000,000', specs: '3.8L V6 · 565 HP · AWD · 16/22 MPG', brand: 'nissan' },
  { file: 'mercedes-benz-amg-gt-2024.jpg', name: 'Mercedes-AMG GT 2024', price: '₦155,000,000', specs: '4.0L V8 · 523 HP · RWD · 15/20 MPG', brand: 'mercedes' },
  { file: 'bmw-m4-2024.jpg', name: 'BMW M4 2024', price: '₦88,000,000', specs: '3.0L 6-Cyl · 473 HP · RWD · 16/23 MPG', brand: 'bmw' },
  { file: 'porsche-911-carrera-2024.jpg', name: 'Porsche 911 Carrera 2024', price: '₦140,000,000', specs: '3.0L Flat-6 · 379 HP · RWD · 18/24 MPG', brand: 'porsche' },
  { file: 'bmw-m4-dawn-2024.jpg', name: 'BMW M4 Competition 2024', price: '₦98,000,000', specs: '3.0L 6-Cyl · 503 HP · AWD · 16/23 MPG', brand: 'bmw' },
  { file: 'bmw-m2-2024.jpg', name: 'BMW M2 2024', price: '₦65,000,000', specs: '3.0L 6-Cyl · 453 HP · RWD · 16/24 MPG', brand: 'bmw' },
  { file: 'jaguar-f-type-2024.jpg', name: 'Jaguar F-Type 2024', price: '₦75,000,000', specs: '5.0L V8 · 444 HP · RWD · 17/24 MPG', brand: 'jaguar' },
  { file: 'toyota-supra-2024.jpg', name: 'Toyota Supra 2024', price: '₦48,000,000', specs: '3.0L 6-Cyl · 382 HP · RWD · 23/31 MPG', brand: 'toyota' },
  { file: 'chevrolet-camaro-ss-2024.jpg', name: 'Chevrolet Camaro SS 2024', price: '₦58,000,000', specs: '6.2L V8 · 455 HP · RWD · 16/24 MPG', brand: 'chevrolet' },
  { file: 'ford-explorer-2024.jpg', name: 'Ford Explorer 2024', price: '₦45,000,000', specs: '2.3L Turbo · 300 HP · AWD · 21/28 MPG', brand: 'ford' },
  { file: 'mercedes-benz-s-class-2024.jpg', name: 'Mercedes-Benz S-Class 2024', price: '₦165,000,000', specs: '3.0L Turbo · 429 HP · AWD · 20/28 MPG', brand: 'mercedes' },
  { file: 'lamborghini-huracan-2024.jpg', name: 'Lamborghini Huracán 2024', price: '₦285,000,000', specs: '5.2L V10 · 631 HP · AWD · 13/18 MPG', brand: 'lamborghini' },
  { file: 'ford-mustang-gt-2024.avif', name: 'Ford Mustang GT 2024', price: '₦68,000,000', specs: '5.0L V8 · 450 HP · RWD · 15/24 MPG', brand: 'ford' },
  { file: 'honda-cr-v-2024.jpg', name: 'Honda CR-V 2024', price: '₦38,500,000', specs: '1.5L Turbo · 190 HP · AWD · 28/34 MPG', brand: 'honda' },
  { file: 'mercedes-benz-c300-2024.webp', name: 'Mercedes-Benz C300 2024', price: '₦95,000,000', specs: '2.0L Turbo · 255 HP · AWD · 23/33 MPG', brand: 'mercedes' },
  { file: 'toyota-camry-2024.avif', name: 'Toyota Camry 2024', price: '₦42,000,000', specs: '2.5L 4-Cyl · 203 HP · FWD · 28/39 MPG', brand: 'toyota' }
];

// ===== DYNAMIC CAROUSEL =====
function initDynamicCarousel() {
  const track = document.querySelector('.carousel-track');
  const dotsContainer = document.querySelector('.carousel-dots');
  if (!track || !dotsContainer) return;

  track.innerHTML = carInventory.map(car => `
    <div class="carousel-slide">
      <div class="slide-bg" style="background-image:url('assets/images/cars/${car.file}');"></div>
      <div class="slide-overlay"></div>
      <div class="slide-info">
        <h3>${car.name}</h3>
        <p class="specs">${car.specs}</p>
        <p class="price">${car.price}</p>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = carInventory.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join('');

  const slides = track.querySelectorAll('.carousel-slide');
  const dots = dotsContainer.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let current = 0;
  const total = slides.length;
  let timer;

  function goTo(i) {
    current = (i + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  prevBtn?.addEventListener('click', () => { prev(); clearInterval(timer); setTimeout(startTimer, 6000); });
  nextBtn?.addEventListener('click', () => { next(); clearInterval(timer); setTimeout(startTimer, 6000); });
  dots.forEach((dot, idx) => dot.addEventListener('click', () => { goTo(idx); clearInterval(timer); setTimeout(startTimer, 6000); }));

  startTimer();
}

// ===== INVENTORY RENDERER & FILTERING =====
function renderInventory() {
  const inventoryGrid = document.querySelector('.inventory-grid');
  if (!inventoryGrid) return;

  inventoryGrid.innerHTML = carInventory.map(car => `
    <div class="inventory-card reveal" data-brand="${car.brand}" data-price="${parseInt(car.price.replace(/[^\d]/g, ''))}">
      <div class="card-img">
        <img src="assets/images/cars/${car.file}" alt="${car.name} – AutoVibe Motors">
      </div>
      <div class="card-body">
        <h3>${car.name}</h3>
        <div class="badges">
          ${car.specs.split(' · ').map(spec => `<span class="badge">${spec}</span>`).join('')}
        </div>
        <div class="price">${car.price}</div>
        <button class="btn btn-sm btn-primary" onclick="openCarModal('${car.file}')">
          <i class="fas fa-magnifying-glass" style="font-size:0.9rem; margin-right:8px;"></i>View Details
        </button>
      </div>
    </div>
  `).join('');
  
  initFilters();
  setTimeout(revealElements, 100);
}

function initFilters() {
  const brandFilter = document.getElementById('filter-brand');
  const priceFilter = document.getElementById('filter-price');
  if (!brandFilter || !priceFilter) return;

  const handleFilter = () => {
    const brand = brandFilter.value;
    const priceRange = priceFilter.value.split('-').map(Number);
    const cards = document.querySelectorAll('.inventory-card');

    cards.forEach(card => {
      const cardBrand = card.getAttribute('data-brand');
      const cardPrice = parseInt(card.getAttribute('data-price'));
      const brandMatch = !brand || cardBrand === brand;
      const priceMatch = !priceFilter.value || (cardPrice >= priceRange[0] && cardPrice <= priceRange[1]);
      card.style.display = (brandMatch && priceMatch) ? 'block' : 'none';
    });
  };

  brandFilter.addEventListener('change', handleFilter);
  priceFilter.addEventListener('change', handleFilter);
}

// ===== INTERACTIVE STAR RATING =====
function initStarRating() {
  const starContainer = document.querySelector('.star-selector');
  const ratingInput = document.getElementById('star-rating-value');
  const ratingLabel = document.getElementById('rating-label');
  if (!starContainer || !ratingInput) return;

  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  let selectedRating = 0;

  // Clear container and add FA stars
  starContainer.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.className = 'far fa-star star-icon';
    star.dataset.value = i;
    starContainer.appendChild(star);

    star.addEventListener('mouseenter', () => {
      updateStars(i, true);
      if (ratingLabel) ratingLabel.textContent = labels[i-1];
      if (ratingLabel) ratingLabel.style.color = 'var(--gold)';
    });

    star.addEventListener('mouseleave', () => {
      updateStars(selectedRating, false);
      if (ratingLabel) {
        ratingLabel.textContent = selectedRating > 0 ? labels[selectedRating-1] : "Select your rating";
        ratingLabel.style.color = selectedRating > 0 ? 'var(--gold)' : 'var(--text-muted)';
      }
    });

    star.addEventListener('click', () => {
      if (selectedRating === i) {
        selectedRating = 0; // Deselect
      } else {
        selectedRating = i;
      }
      ratingInput.value = selectedRating;
      updateStars(selectedRating, false);
    });
  }

  function updateStars(val, isHover) {
    const stars = starContainer.querySelectorAll('.star-icon');
    stars.forEach((s, idx) => {
      if (idx < val) {
        s.className = 'fas fa-star star-icon active';
      } else {
        s.className = 'far fa-star star-icon';
      }
    });
  }
}

// ===== MODAL LOGIC =====
window.openCarModal = function(file) {
  const car = carInventory.find(c => c.file === file);
  if (!car) return;

  let modal = document.getElementById('dynamic-car-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'dynamic-car-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="closeCarModal()">✕</button>
      <div style="aspect-ratio:16/9; overflow:hidden; border-radius:8px; margin-bottom:24px;">
        <img src="assets/images/cars/${car.file}" alt="${car.name}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <h2 style="font-family:var(--font-heading); margin-bottom:8px;">${car.name}</h2>
      <div class="modal-stars" style="color:var(--gold); margin-bottom:12px;">
        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
      </div>
      <p class="gold" style="font-size:1.4rem; font-weight:700; margin-bottom:16px;">${car.price}</p>
      <p style="color:var(--text-secondary); margin-bottom:20px;">Experience the pinnacle of performance and luxury with the ${car.name}. This vehicle features a ${car.specs.split(' · ')[0]} engine delivering ${car.specs.split(' · ')[1]}. Optimized for both comfort and speed.</p>
      <div class="badges" style="margin-bottom:24px;">
        ${car.specs.split(' · ').map(spec => `<span class="badge">${spec}</span>`).join('')}
      </div>
      <h3 style="margin-bottom:16px; font-family:var(--font-heading);"><i class="fas fa-envelope" style="margin-right:10px;"></i>Enquire About This Vehicle</h3>
      <form class="ajax-form">
        <div class="form-group"><input class="form-input" placeholder="Your Name" required></div>
        <div class="form-group"><input class="form-input" type="email" placeholder="Email" required></div>
        <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">
          <i class="fas fa-paper-plane" style="margin-right:8px;"></i>Request Information
        </button>
      </form>
    </div>
  `;
  modal.classList.add('active');
};

window.closeCarModal = function() {
  document.getElementById('dynamic-car-modal')?.classList.remove('active');
};

// ===== NAVBAR SCROLL & HAMBURGER =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== BACK TO TOP =====
window.addEventListener('scroll', function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// ===== SCROLL REVEAL =====
const revealElements = () => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
};
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// ===== FAQ ACCORDION =====
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// ===== FORM HANDLING =====
function handleForms() {
  const forms = document.querySelectorAll('.ajax-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      // Show loading state
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>Processing...';

      // Simulate API call
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i>Success!';
        btn.style.background = '#28a745';
        btn.style.borderColor = '#28a745';
        
        // Show success alert
        const successMsg = document.createElement('div');
        successMsg.className = 'reveal visible';
        successMsg.style.cssText = 'margin-top:20px; padding:15px; background:rgba(40,167,69,0.1); border:1px solid #28a745; border-radius:8px; color:#28a745; text-align:center; font-weight:600;';
        successMsg.innerHTML = 'Thank you! Your message has been sent successfully. Our team will contact you shortly.';
        form.appendChild(successMsg);

        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          successMsg.remove();
        }, 5000);
      }, 1500);
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadFooter();
  initDynamicCarousel();
  renderInventory();
  initStarRating();
  initFAQ();
  handleForms();
});
