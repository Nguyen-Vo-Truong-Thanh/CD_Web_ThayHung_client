import React from "react";
import { useHistory } from "react-router-dom";

const ShopCart = ({ shopItems, addToCart }) => {
  const history = useHistory();

  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };
  return (
    <>
      {shopItems.map((item) => {
        return (
          <div className="col-md-4" key={item.id}>
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
                  <h4>{item.price.toLocaleString()} VNĐ </h4>
                  <div className="w-100 d-flex justify-content-between">
                    <button
                      onClick={() => openDetail(item)}
                      type="button"
                      className="btn btn-primary"
                    >
                      Xem nhanh
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => addToCart(item)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
