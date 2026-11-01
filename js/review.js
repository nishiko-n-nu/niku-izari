// Supabaseとの接続設定
const SUPABASE_URL = "https://dpredpvffvuovejhaiqi.supabase.co";
const SUPABASE_KEY = "sb_publishable_phbzMGF3-jI6l0n7_Guvvw_uqqH-UpX";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// HTMLの部品を取得
const reviewList = document.getElementById("review-list");
const reviewForm = document.getElementById("review-form");

const PRODUCT_ID = "002";

// レビューを読み込む
async function loadReviews() {
  const { data, error } = await db
    .from("product_reviews")
    .select("*")
    .eq("product_id", PRODUCT_ID)
    .order("created_at", { ascending: false });

  if (error) {
    reviewList.textContent = "レビューを読み込めませんでした。";
    console.error(error);
    return;
  }

  reviewList.innerHTML = "";

  if (data.length === 0) {
    reviewList.textContent = "まだレビューはありません。";
    return;
  }

  data.forEach(review => {
    const article = document.createElement("article");

    const name = document.createElement("h3");
    name.textContent = review.nickname;

    const rating = document.createElement("p");
    rating.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    const body = document.createElement("p");
    body.textContent = review.review_text;

    article.append(name, rating, body);
    reviewList.appendChild(article);
  });
}

// レビューを投稿する
reviewForm.addEventListener("submit", async event => {
  event.preventDefault();

  const nickname =
    document.getElementById("review-name").value.trim() || "匿名希望";

  const rating = Number(
    document.getElementById("review-rating").value
  );

  const reviewText =
    document.getElementById("review-text").value.trim();

  if (!reviewText) return;

  const { error } = await db
    .from("product_reviews")
    .insert({
      product_id: PRODUCT_ID,
      nickname: nickname,
      rating: rating,
      review_text: reviewText
    });

  if (error) {
    alert("投稿に失敗しました。");
    console.error(error);
    return;
  }

  alert("レビューを投稿しました！");
  reviewForm.reset();
  loadReviews();
});

// 最初にレビューを表示
loadReviews();