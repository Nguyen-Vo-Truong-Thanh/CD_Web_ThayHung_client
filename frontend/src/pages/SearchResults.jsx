import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const SearchResults = ({ addToCart }) => {
  const location = useLocation();
  const history = useHistory();
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param);
  };

  const keyword = getQueryParam("keyword");

  useEffect(() => {
    if (keyword) {
      fetchProducts();
    } else {
      history.push("/");
    }
  }, [keyword]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/products/search?keyword=${keyword}`);
      const data = await response.json();
      setShopItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  return (
    <section className="search-results">
      <div className="container">
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              {shopItems.map(item => (
                <div className="col-md-3" key={item.id}>
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
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
