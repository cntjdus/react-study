import { useEffect, useState } from "react";

// 현재 저는 mock data 파일을 따로 분리하지 않고 App.jsx 안에 작성했지만, 실제 프로젝트에서는 mock data를 별도의 파일로 분리하는 것을 추천드려요!
const products = [
  {
    id: 1,
    name: "CECOM T-Shirt",
    description: "Simple black logo t-shirt",
    price: 15000,
    emoji: "👕",
  },
  {
    id: 2,
    name: "CECOM Hoodie",
    description: "Soft oversized hoodie",
    price: 32000,
    emoji: "🧥",
  },
  {
    id: 3,
    name: "CECOM Keyring",
    description: "Small acrylic keyring",
    price: 5000,
    emoji: "🔑",
  },
  {
    id: 4,
    name: "CECOM Sticker",
    description: "Laptop sticker pack",
    price: 3000,
    emoji: "✨",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  // Side Effect
  // cart가 변경될 때마다 실행
  useEffect(() => {
    console.log("장바구니가 변경되었습니다.", cart);
  }, [cart]);

  // 장바구니에 상품 추가
  const addToCart = (product) => {
    const isAlreadyAdded = cart.some(
      (item) => item.id === product.id
    );

    if (isAlreadyAdded) {
      return;
    }

    setCart([...cart, product]);
  };

  // 장바구니에서 상품 삭제
  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  // 장바구니 전체 삭제
  const clearCart = () => {
    setCart([]);
  };

  // 총 가격 계산
  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="app">

      {/* Header */}
      <header className="header">

        <div className="brand">
          <img
            src="/cecomfav.png"
            alt="CECOM Logo"
            className="brand-logo"
          />

          <p className="logo">
            CECOM
          </p>
        </div>

        <div className="cart-count">
          Bag
          <span>
            {cart.length}
          </span>
        </div>

      </header>

      <main>

        {/* Hero */}
        <section className="hero">

          <p className="hero-label">
            CECOM ONLINE STORE
          </p>

          <h1>
            Welcome to
            <br />
            CECOM ONLINE STORE
          </h1>

          <p className="hero-description">
            CECOM 굿즈를 구경하고
            원하는 상품을 장바구니에 담아보세요.
          </p>

        </section>

        {/* Products */}
        <section className="shop">

          <div className="section-header">

            <div>

              <p className="section-label">
                COLLECTION
              </p>

              <h2>
                Products
              </h2>

            </div>

            <p className="product-count">
              {products.length} items
            </p>

          </div>

          <div className="product-grid">

            {products.map((product) => {

              const isAdded = cart.some(
                (item) => item.id === product.id
              );

              return (
                <article
                  className="product-card"
                  key={product.id}
                >

                  <div className="product-image">
                    <span>
                      {product.emoji}
                    </span>
                  </div>

                  <div className="product-info">

                    <div>

                      <h3>
                        {product.name}
                      </h3>

                      <p className="description">
                        {product.description}
                      </p>

                    </div>

                    <p className="price">
                      {product.price.toLocaleString()}
                      원
                    </p>

                  </div>

                  <button
                    className={
                      isAdded
                        ? "add-button added"
                        : "add-button"
                    }
                    onClick={() =>
                      addToCart(product)
                    }
                    disabled={isAdded}
                  >
                    {isAdded
                      ? "Added"
                      : "Add to Bag"}
                  </button>

                </article>
              );
            })}

          </div>

        </section>

        {/* Shopping Bag */}
        <section className="cart-section">

          <div className="cart-header">

            <div>

              <p className="section-label">
                YOUR
              </p>

              <h2>
                Shopping Bag
              </h2>

            </div>

            {cart.length > 0 && (
              <button
                className="clear-button"
                onClick={clearCart}
              >
                Clear
              </button>
            )}

          </div>

          {/* Empty Cart */}
          {cart.length === 0 ? (

            <div className="empty-cart">

              <div className="empty-icon">
                ⌑
              </div>

              <h3>
                Your bag is empty.
              </h3>

              <p>
                마음에 드는 상품을
                장바구니에 추가해보세요.
              </p>

            </div>

          ) : (

            <>
              {/* Cart Items */}
              <div className="cart-list">

                {cart.map((item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <div className="cart-item-left">

                      <div className="cart-item-image">
                        {item.emoji}
                      </div>

                      <div>

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          {item.price.toLocaleString()}
                          원
                        </p>

                      </div>

                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                ))}

              </div>

              {/* Cart Summary */}
              <div className="cart-summary">

                <div className="summary-row">

                  <span>
                    Items
                  </span>

                  <span>
                    {cart.length}
                  </span>

                </div>

                <div className="summary-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    {totalPrice.toLocaleString()}
                    원
                  </strong>

                </div>

                <button className="checkout-button">
                  결제하기
                </button>

              </div>

            </>

          )}

        </section>

      </main>

      {/* Footer */}
      <footer>
        <p>
          Developed by Chu Seoyeon
        </p>
      </footer>

    </div>
  );
}

export default App;