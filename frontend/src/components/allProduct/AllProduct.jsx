import React from "react";
import ShopCart from "./ShopCart";
import "./style.css";

const ShopPhone = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className="shop background">
        <div className="container">
          <div className="row">
            <div className="heading d_flex">
              <div className="heading-left row  f_flex">
                <h2>Sản phẩm của chúng tôi</h2>
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

export default ShopPhone;
