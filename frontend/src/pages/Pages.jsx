import React from "react";
import Home from "../components/MainPage/Home";
import ShopNewArrival from "../components/newarrivals/ShopNewArrival";
import ShopDiscount from "../components/Discount/ShopDiscount";
import ShopPhone from "../components/shopPhone/ShopPhone";
import ShopLaptop from "../components/ShopLaptop/ShopLaptop";
import ShopAppleWatch from "../components/ShopAppleWatch/ShopAppleWatch";
import ShopHeadphone from "../components/ShopHeadphone/ShopHeadphone";
import Pagination from "../common/pagination/Pagination";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <ShopNewArrival shopItems={shopItems} addToCart={addToCart} />
      <ShopDiscount shopItems={shopItems} addToCart={addToCart} />
      <ShopPhone shopItems={shopItems} addToCart={addToCart} />
      <ShopLaptop shopItems={shopItems} addToCart={addToCart} />
      <ShopAppleWatch shopItems={shopItems} addToCart={addToCart} />
      <ShopHeadphone shopItems={shopItems} addToCart={addToCart} />
      <Pagination />
    </>
  );
};

export default Pages;