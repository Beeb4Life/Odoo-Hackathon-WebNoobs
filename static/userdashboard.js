// userdashboard.js
window.onload = function () {
  const listingGrid = document.getElementById('listingGrid');
  const products = JSON.parse(localStorage.getItem('products') || '[]');

  if (products.length === 0) {
    listingGrid.innerHTML = "<p>No listings found.</p>";
    return;
  }

  products.forEach((product) => {
    const box = document.createElement('div');
    box.className = 'listing-box';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = 'Product Image';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';

    box.appendChild(img);
    listingGrid.appendChild(box);
  });
};
