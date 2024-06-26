import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import DetailProduct from "./components/DetailProduct/DetailProduct";
import Shop from "./pages/Shop";
import CheckOut from "./pages/Checkout";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderHistory from "./pages/OrderHistory";
import ResetPassword from "./pages/ResetPassword";
import SearchResults from "./pages/SearchResults";
import Logout from "./pages/Logout";
import ProductList from "./common/pagination/ProductList ";
import ProductCategory from "./components/allProduct/ProductCategory";
import ShopProductNew from "./components/PageProduct/ShopProductNew";
import ShopProductList from "./components/PageProduct/ShopProductList";
import ProductAdmin from "./admin/ProductAdmin"
import CustomerAdmin from "./admin/CustomerAdmin";
import OrderAdmin from "./admin/OrderAdmin";
function App() {
  const [CartItem, setCartItem] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("CartItem"));
    if (storedCartItems && storedCartItems.length > 0) {
      setCartItem(storedCartItems);
    }
  }, []);

  useEffect(() => {
    if (CartItem.length > 0) {
      sessionStorage.setItem("CartItem", JSON.stringify(CartItem));
    }
  }, [CartItem]);

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (item) => {
    setCartItem(CartItem.filter(cartItem => cartItem.id !== item.id));
  };

  return (
    <Router>
      <MainApp
        CartItem={CartItem}
        setCartItem={setCartItem}
        addToCart={addToCart}
        decreaseQty={decreaseQty}
        removeFromCart={removeFromCart}
      />
    </Router>
  );
}

function MainApp({ CartItem, setCartItem, shopItems, addToCart, decreaseQty, removeFromCart }) {
  const location = useLocation();

  const noHeaderFooterPaths = ["/login", "/register", "/resetpassword"];

  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header CartItem={CartItem} />}
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/resetpassword" exact>
          <ResetPassword />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
        <Route path="/" exact>
          <Pages addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/cart" exact>
          <Cart
            CartItem={CartItem}
            setCartItem={setCartItem}
            addToCart={addToCart}
            decreaseQty={decreaseQty}
            removeFromCart={removeFromCart}
          />
        </Route>
        <Route path="/shop" exact>
          <Shop addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/checkout" exact>
          <CheckOut />
        </Route>
        <Route path="/searchResult" exact>
          <SearchResults />
        </Route>
        <Route path="/detail/:id" exact>
          <DetailProduct addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/search-results" exact>
          <SearchResults addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/product-category/:id" exact>
          <ProductCategory addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/shop/page/:page" exact>
          <ProductList addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/product/new" exact>
          <ShopProductNew addToCart={addToCart} />
        </Route>
        <Route path="/productList" exact>
          <ShopProductList addToCart={addToCart} />
        </Route>
        <Route path="/order-history" exact>
          <OrderHistory />
        </Route>
        <Route path="/productAdmin">
          <ProductAdmin />
        </Route>
        <Route path="/customerAdmin">
          <CustomerAdmin />
        </Route>
        <Route path="/orderAdmin">
          <OrderAdmin/>
        </Route>
      </Switch>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;