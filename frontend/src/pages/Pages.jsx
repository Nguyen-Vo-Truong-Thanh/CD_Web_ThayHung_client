import React from "react";
import Home from "../components/MainPage/Home";
import ShopProductCategory from "../components/PageProduct/ShopProductCategory";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <ShopProductCategory />
      </>
  );
};

export default Pages;
