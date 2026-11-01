
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

let products = [];

async function loadProducts() {
  try {
    const response = await fetch("data/products.json");

    if (!response.ok) {
      throw new Error("商品データを読み込めませんでした");
    }

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

    const link = document.createElement("a");

    if (product.id === "001") {
      link.href = "ds.html";
    } else {
      link.href = `product.html?id=${encodeURIComponent(product.id)}`;
    }

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    const name = document.createElement("h3");
    name.textContent = product.name;

    link.append(image, name);

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = "¥" + product.price.toLocaleString();

    const category = document.createElement("p");
    category.textContent = product.category;

    card.append(link, price, category);
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