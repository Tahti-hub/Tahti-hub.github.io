// Navigation toggle for mobile
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Section navigation
const navItems = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('.section');
navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const target = item.getAttribute('data-section');
    sections.forEach(sec => {
      if (sec.id === target) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });
    navLinks.classList.remove('show');
  });
});

// Shop Now button jumps to Hoodies section
const shopNowBtn = document.getElementById('shop-now-btn');
shopNowBtn.addEventListener('click', () => {
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById('hoodies').classList.add('active');
});

// Admin panel toggle
const adminToggle = document.getElementById('admin-toggle');
const adminPanel = document.getElementById('admin-panel');
adminToggle.addEventListener('click', e => {
  e.preventDefault();
  adminPanel.classList.toggle('hidden');
  // Show admin panel section only when toggled visible
  if (!adminPanel.classList.contains('hidden')) {
    sections.forEach(sec => sec.classList.remove('active'));
    adminPanel.classList.add('active');
  } else {
    // Return to home if admin panel closed
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById('home').classList.add('active');
  }
});

// Product storage and rendering
let products = JSON.parse(localStorage.getItem('products')) || [];

// Add product form
const productForm = document.getElementById('product-form');
productForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('product-name').value.trim();
  const category = document.getElementById('product-category').value;
  const price = parseFloat(document.getElementById('product-price').value).toFixed(2);
  const image = document.getElementById('product-image').value.trim();
  const description = document.getElementById('product-description').value.trim();

  if (!name || !category || !price || !image || !description) {
    alert('Please fill out all fields.');
    return;
  }

  const newProduct = { name, category, price, image, description };
  products.push(newProduct);

  localStorage.setItem('products', JSON.stringify(products));
  productForm.reset();
  renderProducts();
  alert(`Product "${name}" added!`);
});

// Render products on each category section
function renderProducts() {
  const hoodiesContainer = document.getElementById('hoodies-products');
  const shirtsContainer = document.getElementById('shirts-products');
  const accessoriesContainer = document.getElementById('accessories-products');

  hoodiesContainer.innerHTML = '';
  shirtsContainer.innerHTML = '';
  accessoriesContainer.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">$${product.price}</p>
      <p class="product-description">${product.description}</p>
      <button class="btn purchase-btn">Purchase</button>
    `;

    // Append card to correct category container
    if (product.category === 'hoodies') {
      hoodiesContainer.appendChild(card);
    } else if (product.category === 'shirts') {
      shirtsContainer.appendChild(card);
    } else if (product.category === 'accessories') {
      accessoriesContainer.appendChild(card);
    }

    // Purchase button action (you can customize)
    const purchaseBtn = card.querySelector('.purchase-btn');
    purchaseBtn.addEventListener('click', () => {
      alert(`Thanks for your interest in "${product.name}"! Purchase feature coming soon.`);
      // Later you can link to vendor checkout or payment gateway here.
    });
  });
}

// Initial render
renderProducts();