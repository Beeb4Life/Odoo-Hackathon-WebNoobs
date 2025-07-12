document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    const footer = document.querySelector('.footer');
    const loadingIndicator = document.querySelector('.loading-indicator');
    let loading = false;
    let cardsLoaded = 0;
    const cardsPerLoad = 6;
    const maxCards = 42;

    const defaultImages = [
        "https://i.pinimg.com/736x/7d/bb/de/7dbbde2c09012fb7a6507fd819e61b32.jpg",
        "https://i.pinimg.com/736x/13/ff/e8/13ffe86d7314fcb06c395766447bc816.jpg",
        "https://i.pinimg.com/1200x/92/a5/6e/92a56ed39ed89f9a28bc44f2ea00e48d.jpg",
        "https://i.pinimg.com/736x/53/d5/6c/53d56ce8593569f9c04411baac082228.jpg",
        "https://i.pinimg.com/736x/1e/4b/be/1e4bbed3741a5679062b310d099a4f8a.jpg",
        "https://i.pinimg.com/736x/f7/e7/e7/f7e7e739c2b6012c731d1dd0e4b31d95.jpg",
        "https://i.pinimg.com/736x/8c/8e/64/8c8e64f0258f1a0d36ca04557dad17e8.jpg",
        "https://i.pinimg.com/736x/43/63/cc/4363ccd7c5c4c429831c59109e81a941.jpg",
        "https://i.pinimg.com/736x/8c/8e/64/8c8e64f0258f1a0d36ca04557dad17e8.jpg"
    ];

    const productNames = [
        "Tee <p>Buyer : Alison Pinto",
        "Tee DayLight <p>Buyer : Alison Pinto",
        "Shirt Flamingo <p>Buyer : Alison Pinto",
        "Shirt Adventure <p>Buyer : Alison Pinto",
        "Crop Top <p>Buyer : Alison Pinto",
        "Green Crop <p>Buyer : Alison Pinto",
        "Into The Woods <p>Buyer : Alison Pinto",
        "Canvas Of Prism <p>Buyer : Alison Pinto",
        "Into The Blossom <p>Buyer : Alison Pinto"
    ];

    const productPrices = [
        1299, 1299, 1199, 1299, 999, 999, 999, 1499, 999
    ];

    function lazyLoad() {
        if (loading) return;

        const { scrollTop, clientHeight } = document.documentElement;
        const footerOffset = footer.offsetTop;
        const scrollBottom = scrollTop + clientHeight;

        if (scrollBottom >= footerOffset) {
            showLoadingIndicator();
            loadMoreProducts();
        }
    }

    function loadMoreProducts() {
        if (cardsLoaded >= maxCards) {
            window.removeEventListener('scroll', lazyLoad);
            hideLoadingIndicator();
            return;
        }

        loading = true;
        const remainingCards = maxCards - cardsLoaded;
        const batchLimit = Math.min(cardsPerLoad, remainingCards);

        setTimeout(() => {
            for (let i = 0; i < batchLimit; i++) {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                const index = cardsLoaded % defaultImages.length;

                if (cardsLoaded < productNames.length) {
                    productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${defaultImages[index]}" alt="Product ${cardsLoaded + 1}">
                        </div>
                        <div class="product-info">
                            <h3>${productNames[cardsLoaded]}</h3>
                            <div class="price">₹${productPrices[cardsLoaded]}</div>
                           
                        </div>
                    `;
                } else {
                    productCard.innerHTML = `
                        <div class="product-image">
                            <img src="placeholder-image.jpg" alt="Product Not Available">
                        </div>
                        <div class="product-info">
                            <h3>Product Not Available</h3>
                        </div>
                    `;
                }

                productsContainer.appendChild(productCard);
                cardsLoaded++;
            }

            loading = false;
            hideLoadingIndicator();
        }, 800);
    }

    function showLoadingIndicator() {
        loadingIndicator.style.display = 'block';
    }

    function hideLoadingIndicator() {
        loadingIndicator.style.display = 'none';
    }

    loadMoreProducts();
    window.addEventListener('scroll', lazyLoad);
});
