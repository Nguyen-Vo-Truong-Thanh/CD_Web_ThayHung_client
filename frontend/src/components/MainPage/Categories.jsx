import React from "react";
import { Badge } from 'antd';
import { Link } from 'react-router-dom';

const Categories = () => {
  const data = [
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
  ];

  return (
    <>
      <Badge.Ribbon text="Danh mục">
        <div className="p-2 code-h-category">
          {data.map((value, index) => {
            return (
              <Link to={value.link} key={index}>
                <div className="p-2 code-hover-category">
                  <span className="code-box-title">{value.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Badge.Ribbon>
    </>
  );
};

export default Categories;
