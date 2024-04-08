import React from "react";
import { useParams } from "react-router-dom";
import "./DetailProduct.css";

const DetailProduct = () => {
  const shopItems = [
    {
      id: 1,
      imageUrl: "../images/shops/shops-1.png",
      name: "Mapple Earphones",
      price: 18000000,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 1,
    },
    {
      id: 2,
      imageUrl: "../images/shops/shops-2.png",
      name: "Mapple Earphones",
      price: 12000000,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 2,
    },
    {
      id: 3,
      imageUrl: "../images/shops/shops-3.png",
      name: "Mapple Earphones",
      price: 13000000,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 3,
    },
    {
      id: 4,
      imageUrl: "../images/shops/shops-4.png",
      name: "Mapple Earphones",
      price: 16000000,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 1,
    },
    {
      id: 5,
      imageUrl: "../images/shops/shops-5.png",
      name: "Mapple Earphones",
      price: 18000000,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 3,
    },
    {
      id: 6,
      imageUrl: "../images/shops/shops-6.png",
      name: "Mapple Earphones",
      price: 18000000,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 2,
    },
  ];

  const { id } = useParams();
  const item = shopItems.find((item) => item.id === parseInt(id));

  return (
    <>
      <div className="product mtop w-100">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <img src={item.imageUrl} alt="" />
            </div>
            <div className="col-md-7">
              <div className="product-details"></div>
              <h3 className="title">{item.name}</h3>
              <div>
                <h4>{item.price.toLocaleString()} VNĐ </h4>
                <div className="des">
                  <i class="fa-solid fa-circle"></i>
                  <span className="description">{item.description}</span>
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <button type="button" className="btn btn-primary">
                    Thêm vào giỏ hàng
                  </button>
                </div>
                <div className="payment">
                  <button type="button" className="btn btn-danger">
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
