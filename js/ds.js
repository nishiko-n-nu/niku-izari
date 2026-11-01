
const detail = document.getElementById("product-detail");

async function loadProduct() {

  // DSソフトの商品ID
  const id = "001";

  try {
    const response = await fetch("data/products.json");

    if (!response.ok) {
      throw new Error("商品データを読み込めませんでした");
    }

    const data = await response.json();
    const product = data.products.find(item => item.id === id);

    if (!product) {
      detail.textContent = "商品が見つかりませんでした。";
      return;
    }

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.className = "product-detail-image";

    const category = document.createElement("p");
    category.textContent = "商品カテゴリー：" + product.category;

    const name = document.createElement("h1");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = "特別価格：¥" + product.price.toLocaleString();

    const description = document.createElement("p");
    description.textContent = product.description;

    detail.replaceChildren(
      image,
      category,
      name,
      price,
      description
    );

    document.title = product.name + "｜新鮮ニシン店";

  } catch (error) {
    detail.textContent = "商品情報の読み込みに失敗しました。";
    console.error(error);
  }
}

loadProduct();