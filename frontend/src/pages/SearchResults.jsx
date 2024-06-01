import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Card, Image } from 'antd';

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
      const response = await axios.get(`http://localhost:8080/api/products/search?keyword=${keyword}`);
      setShopItems(response.data);
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
            shopItems.map(item => (
              <div className="col-md-3 mb-4 mt-3" key={item.id}>
                <Card className="w-100 h-100">
                  <div className="w-100 h-img-cart d-flex justify-content-center">
                    <Image className="w-100 h-100" src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="w-100 mt-4">
                    <p className="code-box-title">{item.name}</p>
                  </div>
                  <div className="w-100">
                    <p className="code-box-price">{item.price.toLocaleString()} VNĐ</p>
                  </div>
                  <div className="w-100 d-flex justify-content-between">
                    <Button onClick={() => openDetail(item)} type="primary">Chi tiết</Button>
                    <Button onClick={() => addToCart(item)}>Mua</Button>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
