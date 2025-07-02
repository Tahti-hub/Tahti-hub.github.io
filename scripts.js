// Import Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAnXGswlCTRtdC60dnAimdQ5yfW2iayFvM",
  authDomain: "urbnwrld-1e5ce.firebaseapp.com",
  projectId: "urbnwrld-1e5ce",
  storageBucket: "urbnwrld-1e5ce.appspot.com",
  messagingSenderId: "223575013891",
  appId: "1:223575013891:web:d63484e3cc0cf897c2ac36"
};

// Initialize Firebase & Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Admin email
const adminEmail = "tahtianahfelix9@gmail.com";

// Show admin panel only if logged in as admin
onAuthStateChanged(auth, (user) => {
  if (user && user.email === adminEmail) {
    document.getElementById('admin-panel').style.display = 'block';
  } else {
    document.getElementById('admin-panel').style.display = 'none';
  }
});

// Login function
window.login = function(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Logged in!"))
    .catch(err => alert(err.message));
};

// Signup function
window.signup = function(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Signed up!"))
    .catch(err => alert(err.message));
};

// Logout function
window.logout = function() {
  signOut(auth).then(() => alert("Logged out!"));
};

// LOADER & MAIN FADE-IN
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// NAVIGATION TOGGLE (mobile)
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));

// SECTION SWITCHING
const navItems = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('.section');
navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const target = item.dataset.section;
    sections.forEach(s => s.id === target ? s.classList.add('active') : s.classList.remove('active'));
    navLinks.classList.remove('show');
  });
});

// SHOP NOW BUTTON → PRODUCTS & HIGHLIGHT
const shopNowBtn = document.getElementById('shop-now-btn');
shopNowBtn.addEventListener('click', () => {
  sections.forEach(s => s.classList.remove('active'));
  const sec = document.getElementById('hoodies');
  sec.classList.add('active');
  // highlight border briefly
  sec.querySelector('.products-container').style.boxShadow = '0 0 20px #0f0';
  setTimeout(() => sec.querySelector('.products-container').style.boxShadow = '', 1000);
});

// ADMIN PANEL TOGGLE
const adminToggle = document.getElementById('admin-toggle');
const adminPanel = document.getElementById('admin-panel');
adminToggle.addEventListener('click', e => {
  e.preventDefault();
  sections.forEach(s => s.classList.remove('active'));
  adminPanel.classList.toggle('hidden');
  if (!adminPanel.classList.contains('hidden')) adminPanel.classList.add('active');
  navLinks.classList.remove('show');
});

// PRODUCTS STORAGE & RENDERING
let products = JSON.parse(localStorage.getItem('products')) || [];
const form = document.getElementById('product-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('product-name').value.trim();
  const category = document.getElementById('product-category').value;
  const price = parseFloat(document.getElementById('product-price').value).toFixed(2);
  const image = document.getElementById('product-image').value.trim();
  const desc = document.getElementById('product-description').value.trim();
  if (!name || !category || !price || !image || !desc) {
    alert('Fill all fields');
    return;
  }
  products.push({ name, category, price, image, desc });
  localStorage.setItem('products', JSON.stringify(products));
  form.reset();
  renderProducts();
});

function renderProducts() {
  const cats = ['hoodies', 'wallet-chains', 'belts', 'jewelry', 'pants', 'fashion-pieces', 'graphic-tees'];
  cats.forEach(cat => {
    const cont = document.getElementById(`${cat}-products`);
    cont.innerHTML = '';
    products
      .filter(p => p.category === cat)
      .forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}" class="product-image"/>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">$${p.price}</p>
          <p class="product-description">${p.desc}</p>
          <button class="purchase-btn">Purchase</button>
        `;
        cont.appendChild(card);
      });
  });
}

// Render products on page load
window.addEventListener('load', renderProducts);
