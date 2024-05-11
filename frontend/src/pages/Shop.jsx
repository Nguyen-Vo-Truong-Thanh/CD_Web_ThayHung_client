import React, { useState } from "react";
import AllProduct from "../components/allProduct/AllProduct";
import Pagination from "../common/pagination/Pagination";
import "./style/Shop.css";
import { Link } from "react-router-dom";

const Shop = ({ productItems, addToCart, CartItem, shopItems }) => {
  const [LstCategory, setLstCategory] = useState([
    {
      id: 1,
      name: "Điện thoại",
      imageUrl: "./images/category/cat1.jpg",
      
    },
    {
      id: 2,
      name: "Laptop",
      imageUrl: "./images/category/cat2.png",
    },
    {
      id: 3,
      name: "Đồng hồ thông minh",
      imageUrl: "./images/category/cat3.png",
      
    },
    {
      id: 4,
      name: "Tai nghe",
      imageUrl: "./images/category/cat4.png",
      
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
                    <div
                      className="box"
                      key={item.id}
                    
                    >
                      <div className="box-icon d-flex">
                        <img src={item.imageUrl} alt="" />
                        <span>{item.name}</span>
                      </div>
                    </div>
                    
                  );
                })}
              </div>
            </div>

            <div className="col-md-10">
              <AllProduct shopItems={shopItems} addToCart={addToCart} />
             
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
