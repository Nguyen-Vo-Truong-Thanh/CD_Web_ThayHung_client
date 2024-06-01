import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect  } from "react-router-dom";
import "./App.css";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shopPhone/Sdata";
import DetailProduct from "./components/DetailProduct/DetailProduct";
import Shop from "./pages/Shop";
import CheckOut from "./pages/Checkout";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import SearchResults from "./pages/SearchResults";
import ProductList from "./common/pagination/ProductList "; 
import ShopLaptop from "./components/ShopLaptop/ShopLaptop";
import ShopPhone from "./components/shopPhone/ShopPhone";
import ShopHeadphone from "./components/ShopHeadphone/ShopHeadphone";
import ShopAppleWatch from "./components/ShopAppleWatch/ShopAppleWatch";
import Logout from "./pages/Logout";

function App() {
  const { shopItems } = Sdata;
  const [CartItem, setCartItem] = useState([]);

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

  return (
    <Router>
      <MainApp CartItem={CartItem} shopItems={shopItems} addToCart={addToCart} decreaseQty={decreaseQty} />
    </Router>
  );
}

function MainApp({ CartItem, shopItems, addToCart, decreaseQty }) {
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
          <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
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
        <Route path="/shop/phones" exact>
          <ShopPhone />
        </Route>
        <Route path="/shop/laptops" exact>
          <ShopLaptop />
        </Route>
        <Route path="/shop/smart-watches" exact>
          <ShopAppleWatch />
        </Route>
        <Route path="/shop/headphones" exact>
          <ShopHeadphone />
        </Route>
        <Route path="/searchResult" exact>
          <SearchResults />
        </Route>
        <Route path="/detail/:id" exact>
          <DetailProduct addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/search-results" exact>
          <SearchResults addToCart={addToCart} />
        </Route>
        <Route path="/shop/page/:page" component={ProductList} />
      </Switch>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;
