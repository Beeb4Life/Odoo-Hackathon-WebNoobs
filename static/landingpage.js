let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const loadingBars = document.querySelectorAll(".loading-bar");

function showSlides() {
    slides.forEach(slide => {
        slide.style.display = "none";
    });
    loadingBars.forEach(bar => {
        bar.classList.remove('active');
    });
    slideIndex++;
    if (slideIndex > slides.length) { 
        slideIndex = 1; 
    }
    slides[slideIndex - 1].style.display = "block";
    loadingBars[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 7000);
}
window.onload = showSlides;

document.addEventListener("DOMContentLoaded", function() {
    const finderIcon = document.getElementById('finder-icon');
    const searchBar = document.getElementById('search-bar');
    const searchInput = document.getElementById('search-input');
    const closeBtn = document.getElementById('close-btn');

    if (finderIcon && searchBar && searchInput && closeBtn) {
        finderIcon.addEventListener('click', function() {
            searchBar.style.display = 'block';
            searchInput.focus(); 
        });

        closeBtn.addEventListener('click', function() {
            searchBar.style.display = 'none';
            searchInput.value = '';
        });

        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                console.log('Search term:', searchInput.value);
                closeSearch();
            }
        });
    }
    const cards = document.querySelectorAll('.card-image');
    const defaultImages = {
        product1: 'https://stuf-f.com/cdn/shop/files/fortela-king-so032-oxford-shirt-white-1_1296x.jpg?v=1752150069',
        product2: 'https://stuf-f.com/cdn/shop/files/ues-w902-j-type-2-chambray-jacke-1_1296x.jpg?v=1751021140',
        product3: 'https://stuf-f.com/cdn/shop/files/stevenson-overall-co.-encinitas-150-osx-jean-indigo-one-wash-1_1296x.jpg?v=1752153982',
        product4: 'https://stuf-f.com/cdn/shop/files/fortela-tubejp-frt03-made-in-japan-pocket-tee-acquamarine-1_1296x.jpg?v=1752074852',
    };
    
    cards.forEach(card => {
    const productId = card.id;
    const defaultImg = defaultImages[productId];

    card.innerHTML = `
        <img src="${defaultImg}" alt="Product Image" style="width: 100%; height: auto;">
    `;
});

    document.querySelectorAll('.white-ball').forEach(ball => {
        ball.addEventListener('mouseover', function() {
            const tooltipId = this.getAttribute('data-tooltip-id');
            const tooltip = document.getElementById(tooltipId);
            if (tooltip) {
                tooltip.style.display = 'block';
            }
        });

        ball.addEventListener('mouseout', function() {
            const tooltipId = this.getAttribute('data-tooltip-id');
            const tooltip = document.getElementById(tooltipId);
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        });
    });
});