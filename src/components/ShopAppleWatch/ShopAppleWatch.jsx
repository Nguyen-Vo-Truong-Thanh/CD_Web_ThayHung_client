import React from "react";
import ShopCart from "./ShopCart";
import "./style.css";

const ShopAppleWatch = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className="shop background">
        <div className="container">
          <div className="row">
            <div className="heading d_flex">
              <div className="heading-left row  f_flex">
                <h2>Đồng hồ thông minh</h2>
              </div>
            </div>
            <div className="row">
              <ShopCart addToCart={addToCart} shopItems={shopItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopAppleWatch;
