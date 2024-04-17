import React, { useState } from "react";
import ShopPhone from "../components/shopPhone/ShopPhone";
import ShopLaptop from "../components/ShopLaptop/ShopLaptop";
import ShopAppleWatch from "../components/ShopAppleWatch/ShopAppleWatch";
import ShopHeadphone from "../components/ShopHeadphone/ShopHeadphone";
import Pagination from "../common/pagination/Pagination";
import "./style/Shop.css";
import { Link } from "react-router-dom";

const Shop = ({ productItems, addToCart, CartItem, shopItems }) => {
  const [LstCategory, setLstCategory] = useState([
    {
      id: 1,
      name: "Điện thoại",
      imageUrl: "./images/category/cat1.jpg",
      isChecked: false, //không có trong database
      childs: [
        {
          id: 1,
          name: "apple",
          link: "/phone/apple",
        },
        {
          id: 2,
          name: "samsung",
          link: "/phone/samsung",
        },
        {
          id: 3,
          name: "oppo",
          link: "/phone/oppo",
        },
      ],
    },
    {
      id: 2,
      name: "Laptop",
      imageUrl: "./images/category/cat2.png",
      isChecked: false,
      childs: [
        {
          id: 1,
          name: "apple",
          link: "/laptop/apple",
        },
        {
          id: 2,
          name: "dell",
          link: "/laptop/dell",
        },
        {
          id: 3,
          name: "php",
          link: "/laptop/php",
        },
      ],
    },
    {
      id: 3,
      name: "Đồng hồ thông minh",
      imageUrl: "./images/category/cat3.png",
      isChecked: false,
      childs: [
        {
          id: 1,
          name: "apple",
          link: "/watch/apple",
        },
        {
          id: 2,
          name: "samsung",
          link: "/watch/samsung",
        },
        {
          id: 3,
          name: "xiaomi",
          link: "/watch/xiaomi",
        },
      ],
    },
    {
      id: 4,
      name: "Tai nghe",
      imageUrl: "./images/category/cat4.png",
      isChecked: false,
      childs: [
        {
          id: 1,
          name: "jbl",
          link: "/headphone/jbl",
        },
        {
          id: 2,
          name: "marshall",
          link: "/headphone/marshall",
        },
        {
          id: 3,
          name: "b&o",
          link: "/headphone/b&o",
        },
      ],
    },
  ]);

  const toggleCategory = (item) => {
    const index = LstCategory.findIndex((x) => x.id === item.id);
    if (index >= 0) {
      const updatedCategories = [...LstCategory];
      updatedCategories[index] = {
        ...updatedCategories[index],
        isChecked: !updatedCategories[index].isChecked,
      };
      setLstCategory(updatedCategories);
    }
  };

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
                      onClick={() => toggleCategory(item)}
                    >
                      <div className="box-icon d-flex">
                        <img src={item.imageUrl} alt="" />
                        <span>{item.name}</span>
                      </div>
                      <i className="fa-solid fa-angle-right fa-fw mt-2"></i> 
                      <div className="box-detail">
                      {item.isChecked ? <div>
                        {item.childs.map((x, i) => {
                          return(
                            <div className="box-detail-name" key={x.id}>
                              <Link to={x.link}>{x.name}</Link>
                            </div>
                          )
                        })}
                      </div> : null} 
                      </div>
                    </div>
                  );
                })}
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
