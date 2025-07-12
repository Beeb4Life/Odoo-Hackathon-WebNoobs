document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    const footer = document.querySelector('.footer');
    const loadingIndicator = document.querySelector('.loading-indicator');
    let loading = false;
    let cardsLoaded = 0;
    const cardsPerLoad = 6;
    const maxCards = 42;

    const defaultImages = [
        "https://i.pinimg.com/1200x/35/70/67/357067f153004f8224864514a9df0598.jpg",
        "https://i.pinimg.com/1200x/e5/0b/8c/e50b8c5524462ef696049690da8ded37.jpg",
        "https://i.pinimg.com/736x/fb/d6/4a/fbd64ae801555d44b2ca83aa6b4d2af7.jpg",
        "https://i.pinimg.com/1200x/9a/58/60/9a58604f2f408c9ce0623d6fd0a31e2a.jpg",
        "https://i.pinimg.com/1200x/40/67/06/406706a31f272a5d15c5b28ecf1dce2b.jpg",
        "https://i.pinimg.com/1200x/4e/d6/1b/4ed61ba8a92d90136d9056541b6b3da9.jpg",
        "https://i.pinimg.com/736x/f9/da/f8/f9daf8994c02b8cca330775f4e601ba3.jpg",
        "https://i.pinimg.com/736x/43/63/cc/4363ccd7c5c4c429831c59109e81a941.jpg",
        "https://i.pinimg.com/1200x/9f/6a/c0/9f6ac035d649d809aafa335d026b39c9.jpg"
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
