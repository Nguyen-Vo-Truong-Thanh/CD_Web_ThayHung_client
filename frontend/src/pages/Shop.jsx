import React, { useState } from "react";
import AllProduct from "../components/allProduct/AllProduct";
import "./style/Shop.css";
import { Link } from "react-router-dom";

const Shop = ({ productItems, addToCart, CartItem, shopItems }) => {
  const [LstCategory, setLstCategory] = useState([
    {
      id: 1,
      name: "Điện thoại",
      imageUrl: "./images/category/cat1.jpg",
      link: "/shop/phones",
    },
    {
      id: 2,
      name: "Laptop",
      imageUrl: "./images/category/cat2.png",
      link: "/shop/laptops",
    },
    {
      id: 3,
      name: "Đồng hồ thông minh",
      imageUrl: "./images/category/cat3.png",
      link: "/shop/smart-watches",
    },
    {
      id: 4,
      name: "Tai nghe",
      imageUrl: "./images/category/cat4.png",
      link: "/shop/headphones",
    },
  ]);

  return (
    <>
      <div className="shop">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="shop-category">
                {LstCategory.map((item, index) => {
                  return (
                    <div className="box" key={item.id}>
                      <Link to={item.link}>
                        <div className="box-icon d-flex">
                          <img src={item.imageUrl} alt="" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-10">
              <AllProduct shopItems={shopItems} addToCart={addToCart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
