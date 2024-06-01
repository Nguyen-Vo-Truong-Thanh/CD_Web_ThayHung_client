import React from "react";
import Home from "../components/MainPage/Home";
import ShopDiscount from "../components/Discount/ShopDiscount";
import ShopPhone from "../components/shopPhone/ShopPhone";
import ShopLaptop from "../components/ShopLaptop/ShopLaptop";
import ShopAppleWatch from "../components/ShopAppleWatch/ShopAppleWatch";
import ShopHeadphone from "../components/ShopHeadphone/ShopHeadphone";
import ShopProductCategory from "../components/PageProduct/ShopProductCategory";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <ShopProductCategory />
      {/* <ShopDiscount shopItems={shopItems} addToCart={addToCart} />
      <ShopPhone shopItems={shopItems} addToCart={addToCart} />
      <ShopLaptop shopItems={shopItems} addToCart={addToCart} />
       <ShopAppleWatch shopItems={shopItems} addToCart={addToCart} />
      <ShopHeadphone shopItems={shopItems} addToCart={addToCart} /> */}
      </>
  );
};

export default Pages;
