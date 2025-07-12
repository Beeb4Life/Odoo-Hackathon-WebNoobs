document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    const footer = document.querySelector('.footer');
    const loadingIndicator = document.querySelector('.loading-indicator');
    let loading = false;
    let cardsLoaded = 0;
    const cardsPerLoad = 6;
    const maxCards = 42;

    const defaultImages = [
        "https://i.pinimg.com/1200x/7a/58/36/7a5836c56ea70c3a2569de69403ce3b5.jpg",
        "https://i.pinimg.com/736x/4d/52/34/4d523420205051198dd670a338abbd1e.jpg",
        "https://i.pinimg.com/1200x/f9/99/43/f99943adcd4e258046c2e4e39d1a5929.jpg",
        "https://i.pinimg.com/1200x/24/67/d5/2467d55bbf5a5d5798e17628f89942ea.jpg",
        "https://i.pinimg.com/736x/81/80/35/818035c5b8202b24f6153ace0a963cf5.jpg",
        "https://i.pinimg.com/736x/b7/bf/86/b7bf860027f87406abd5bb9157fabb79.jpg",
        "https://i.pinimg.com/736x/a5/7e/2c/a57e2c2596723312a6028571b717b5d0.jpg",
        "https://i.pinimg.com/736x/7d/54/47/7d5447f68d9e8758a4fa3c9d9d759a6e.jpg",
        "https://i.pinimg.com/736x/1e/eb/9f/1eeb9fc1d7522a647b05175202e3aea2.jpg"
    ];

    const productNames = [
        "Jeans Dawn <p>Buyer : Alison Pinto",
        "Jeans DayLight <p>Buyer : Alison Pinto",
        "Trouser Flamingo <p>Buyer : Alison Pinto",
        "Trouser Adventure <p>Buyer : Alison Pinto",
        "shorts <p>Buyer : Alison Pinto",
        "shorts cool <p>Buyer : Alison Pinto",
        "The Woods <p>Buyer : Alison Pinto",
        "The Prism <p>Buyer : Alison Pinto",
        "The Blossom <p>Buyer : Alison Pinto"
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
