// Simulate empty listings
const listings = []; // Add item here to simulate existing ones

const listingGrid = document.getElementById("listingGrid");

function renderListings() {
    if (listings.length === 0) {
        const addBtn = document.createElement("div");
        addBtn.className = "add-listing-btn";
        addBtn.innerText = "+ Add Listing";
        addBtn.onclick = () => {
            alert("Redirect to add listing page or form.");
        };
        listingGrid.appendChild(addBtn);
    } else {
        listings.forEach(item => {
            const box = document.createElement("div");
            box.className = "listing-box";
            box.innerText = item;
            listingGrid.appendChild(box);
        });
    }
}

renderListings();
