import React from "react";
import ShopPhone from "../components/shopPhone/ShopPhone";
import ShopLaptop from "../components/ShopLaptop/ShopLaptop";
import ShopAppleWatch from "../components/ShopAppleWatch/ShopAppleWatch";
import ShopHeadphone from "../components/ShopHeadphone/ShopHeadphone";

const Shop = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <div className="shop">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <ShopPhone shopItems={shopItems} addToCart={addToCart} />
              <ShopLaptop shopItems={shopItems} addToCart={addToCart} />
              <ShopAppleWatch shopItems={shopItems} addToCart={addToCart} />
              <ShopHeadphone shopItems={shopItems} addToCart={addToCart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
