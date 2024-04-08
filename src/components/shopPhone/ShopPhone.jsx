import React from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";

const ShopPhone = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className="shop background">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Catg />
            </div>

            <div className="col-md-9">
              <div className="heading d_flex">
                <div className="heading-left row  f_flex">
                  <h2>Mobile Phones</h2>
                </div>
              </div>
              <div className="row">
                <ShopCart addToCart={addToCart} shopItems={shopItems} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPhone;
