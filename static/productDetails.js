document.getElementById("product-image").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function () {
    const preview = document.getElementById("image-preview");
    preview.style.backgroundImage = `url('${reader.result}')`;
    preview.style.backgroundSize = "cover";
    preview.textContent = "";
    preview.setAttribute("data-img", reader.result); // store image temporarily
  };
  reader.readAsDataURL(e.target.files[0]);
});

document.getElementById("product-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const desc = document.getElementById("product-description").value;
  const img = document.getElementById("image-preview").getAttribute("data-img");

  if (!img || !desc) {
    alert("Please add both image and description.");
    return;
  }

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.push({ img, desc });

  localStorage.setItem("products", JSON.stringify(products));

  window.location.href = "browse.html";
});
