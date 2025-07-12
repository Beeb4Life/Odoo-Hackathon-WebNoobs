const users = [
  { id: 1, name: "John Doe", avatar: "assets/default-user.png" },
  { id: 2, name: "Jane Smith", avatar: "assets/default-user.png" },
];

const listings = [
  {
    id: 101,
    title: "Denim Jacket",
    image: "assets/default-user.png",
    description: "Blue, size M, slightly used.",
    user: "John Doe"
  },
  {
    id: 102,
    title: "Leather Boots",
    image: "assets/default-user.png",
    description: "Brown, size 9, excellent condition.",
    user: "Jane Smith"
  }
];

// Navigation handlers
document.getElementById("manage-users").onclick = () => toggleSections("manage-users-section");
document.getElementById("manage-orders").onclick = () => toggleSections("manage-orders-section");
document.getElementById("manage-listings").onclick = () => toggleSections("manage-listings-section");

function toggleSections(activeId) {
  document.querySelectorAll("main > section").forEach(sec => {
    sec.style.display = sec.id === activeId ? "block" : "none";
  });
}

// Render users
const userList = document.getElementById("userList");
users.forEach(user => {
  const card = document.createElement("div");
  card.className = "user-card";
  card.innerHTML = `
    <div class="user-details">
      <img src="${user.avatar}" alt="Avatar">
      <p>${user.name}</p>
    </div>
    <div class="action-buttons">
      <button class="remove">Remove</button>
    </div>
  `;
  userList.appendChild(card);
});

// Listings logic
const listingList = document.getElementById("listingList");
const removeModal = document.getElementById("removeModal");
const removalReason = document.getElementById("removalReason");
let currentRemovingId = null;

function renderListings() {
  listingList.innerHTML = "";
  listings.forEach(item => {
    const card = document.createElement("div");
    card.className = "listing-card";
    card.innerHTML = `
      <div class="listing-details">
        <img src="${item.image}" alt="Product">
        <div>
          <strong>${item.title}</strong><br>
          <small>By: ${item.user}</small>
          <p>${item.description}</p>
          <a href="#" class="see-more">See More</a>
        </div>
      </div>
      <div class="action-buttons">
        <button class="approve">Approve</button>
        <button class="reject" data-id="${item.id}">Reject</button>
      </div>
    `;
    listingList.appendChild(card);
  });

  document.querySelectorAll(".reject").forEach(btn => {
    btn.onclick = (e) => {
      currentRemovingId = parseInt(e.target.getAttribute("data-id"));
      removeModal.style.display = "flex";
    };
  });
}

renderListings();

// Modal Logic
document.getElementById("submitRemoval").onclick = () => {
  const reason = removalReason.value.trim();
  if (reason && currentRemovingId !== null) {
    const index = listings.findIndex(l => l.id === currentRemovingId);
    if (index !== -1) {
      alert(`Rejected "${listings[index].title}" by ${listings[index].user}.\nReason: ${reason}`);
      listings.splice(index, 1);
      renderListings();
    }
    closeModal();
  }
};

document.getElementById("cancelRemoval").onclick = closeModal;

function closeModal() {
  removeModal.style.display = "none";
  removalReason.value = "";
  currentRemovingId = null;
}
