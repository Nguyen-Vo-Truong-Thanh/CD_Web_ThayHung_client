
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
const ShopCart = ({ addToCart }) => {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);
  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      
      const response = await fetch(`http://localhost:8080/api/products/allProduct`);
      const data = await response.json();
      setShopItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log("Lỗi: " + err.message);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {shopItems &&
        shopItems.map((item) => {
          return (
            <div className="col-md-4" key={item.id}>
              <div className="product mtop w-100">
                <div className="img">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div className="product-details">
                  <h3>{item.name}</h3>
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
