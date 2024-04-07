import React from "react";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const shopItems = [
    {
      id: 1,
      imageUrl: "../images/shops/shops-1.png",
      name: "Mapple Earphones",
      price: 180,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 1,
    },
    {
      id: 2,
      imageUrl: "../images/shops/shops-1.png",
      name: "Mapple Earphones",
      price: 180,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 2,
    },
    {
      id: 3,
      imageUrl: "../images/shops/shops-1.png",
      name: "Mapple Earphones",
      price: 180,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 3,
    },
    {
      id: 4,
      imageUrl: "../images/shops/shops-1.png",
      name: "Mapple Earphones",
      price: 180,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 1,
    },
    {
      id: 5,
      imageUrl: "../images/shops/shops-1.png",
      name: "Mapple Earphones",
      price: 180,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 3,
    },
    {
      id: 6,
      imageUrl: "../images/shops/shops-1.png",
      name: "Mapple Earphones",
      price: 180,
      discount: 25,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      categoryId: 1,
    },
  ];

  const { id } = useParams();
  const item = shopItems.find((item) => item.id === parseInt(id));

  return (
    <>
      <div className="product mtop w-100">
        <div className="img">
          <span className="discount">{item.discount}% Off</span>
          <img src={item.imageUrl} alt="" />
        </div>
        <div className="product-details">
          <h3>{item.name}</h3>
          <div className="rate">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <div>
            <h4>${item.price}.00 </h4>
            <div className="w-100 d-flex justify-content-between">
              <button type="button" className="btn btn-primary">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
