import React, { useState } from "react";
import ShopPhone from "../components/shopPhone/ShopPhone";
import ShopLaptop from "../components/ShopLaptop/ShopLaptop";
import ShopAppleWatch from "../components/ShopAppleWatch/ShopAppleWatch";
import ShopHeadphone from "../components/ShopHeadphone/ShopHeadphone";
import Pagination from "../common/pagination/Pagination";
import "./style/Shop.css";
import { Link } from "react-router-dom";

const Shop = ({ productItems, addToCart, CartItem, shopItems }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <>
      <div className="shop">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="shop-category">
                <div
                  className="box"
                  onClick={() => toggleCategory("Điện thoại")}
                >
                  <div className="box-icon">
                    <img src={"./images/category/cat1.jpg"} alt="" />
                    <span>Điện thoại</span>
                  </div>
                  <i className="fa-solid fa-angle-right fa-fw"></i>
                </div>
                <div className="box" onClick={() => toggleCategory("Laptop")}>
                  <div className="box-icon">
                    <img src={"./images/category/cat2.png"} alt="" />
                    <span>Laptop</span>
                  </div>
                  <i className="fa-solid fa-angle-right fa-fw"></i>
                </div>
                <div
                  className="box"
                  onClick={() => toggleCategory("Đồng hồ thông minh")}
                >
                  <div className="box-icon">
                    <img src={"./images/category/cat3.png"} alt="" />
                    <span>Đồng hồ thông minh</span>
                  </div>
                  <i className="fa-solid fa-angle-right fa-fw"></i>
                </div>
                <div className="box" onClick={() => toggleCategory("Tai nghe")}>
                  <div className="box-icon">
                    <img src={"./images/category/cat4.png"} alt="" />
                    <span>Tai nghe</span>
                  </div>
                  <i className="fa-solid fa-angle-right fa-fw"></i>
                </div>
              </div>
              <div className="phone-details">
                {selectedCategory === "Điện thoại" && (
                  <div className="box">
                    <p>
                      <Link to="/phone/apple">Apple</Link>
                    </p>
                    <p>
                      <Link to="/phone/samsung">Samsung</Link>
                    </p>
                    <p>
                      <Link to="/phone/oppo">Oppo</Link>
                    </p>
                  </div>
                )}
                {selectedCategory === "Laptop" && (
                  <div className="box">
                    <p>
                      <Link to="/laptop/apple">Apple</Link>
                    </p>
                    <p>
                      <Link to="/laptop/samsung">Dell</Link>
                    </p>
                    <p>
                      <Link to="/laptop/oppo">PHP</Link>
                    </p>
                  </div>
                )}
                {selectedCategory === "Đồng hồ thông minh" && (
                  <div className="box">
                    <p>
                      <Link to="/watch/apple">Apple</Link>
                    </p>
                    <p>
                      <Link to="/watch/samsung">Samsung</Link>
                    </p>
                    <p>
                      <Link to="/watch/oppo">Xiaomi</Link>
                    </p>
                  </div>
                )}
                {selectedCategory === "Tai nghe" && (
                  <div className="box">
                    <p>
                      <Link to="/headphone/jbl">JBL</Link>
                    </p>
                    <p>
                      <Link to="/headphone/marshall">Marshall</Link>
                    </p>
                    <p>
                      <Link to="/headphone/b&o">B&O</Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-10">
              <ShopPhone shopItems={shopItems} addToCart={addToCart} />
              <ShopLaptop shopItems={shopItems} addToCart={addToCart} />
              <ShopAppleWatch shopItems={shopItems} addToCart={addToCart} />
              <ShopHeadphone shopItems={shopItems} addToCart={addToCart} />
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
