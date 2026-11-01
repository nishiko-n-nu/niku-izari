
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

let products = [];

async function loadProducts() {
  try {
    const response = await fetch("data/products.json");
    const data = await response.json();

    products = data.products;
    displayProducts(products);

  } catch (error) {
    productList.textContent = "商品を読み込めませんでした。";
    console.error(error);
  }
}

function displayProducts(items) {
  productList.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <a href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
      </a>
      <p class="product-price">¥${product.price.toLocaleString()}</p>
      <p>${product.category}</p>
    `;

    productList.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword)
  );

  displayProducts(filtered);
});

loadProducts();