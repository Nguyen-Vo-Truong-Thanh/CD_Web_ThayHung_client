import React from "react";
import Home from "../components/MainPage/Home";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Discount from "../components/Discount/Discount";
import ShopPhone from "../components/shopPhone/ShopPhone";
import ShopLaptop from "../components/ShopLaptop/ShopLaptop";
import ShopAppleWatch from "../components/AppleWatch/ShopAppleWatch";
// import ShopHeadphones from "../components/Headphones/ShopHeadphones";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <NewArrivals />
      <Discount />
      <ShopPhone shopItems={shopItems} addToCart={addToCart} />
      <ShopLaptop shopItems={shopItems} addToCart={addToCart} />
      <ShopAppleWatch shopItems={shopItems} addToCart={addToCart} />
      {/* <ShopHeadphones shopItems={shopItems} addToCart={addToCart} /> */}
    </>
  );
};

export default Pages;
