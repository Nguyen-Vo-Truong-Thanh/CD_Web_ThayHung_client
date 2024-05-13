import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logo from "../../components/assets/images/logo.webp";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Search = ({ CartItem }) => {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [showSearchResults, setShowSearchResults] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);
  const [showOtherSections, setShowOtherSections] = useState(true); // State để kiểm soát việc hiển thị các phần không liên quan

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/products/search?keyword=${searchTerm}`);
      const data = await response.json();
      console.log("API Response:", data); 
      setShopItems(data);
      setLoading(false);
      setShowSearchResults(true); 
      setShowOtherSections(false); // Ẩn các phần không liên quan khi có kết quả tìm kiếm
    } catch (err) {
      setError(err.message);
      console.log("Error fetching products:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchProducts();
    }
  }, [searchTerm]); 

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Kiểm tra xem giá trị của ô tìm kiếm có rỗng hay không
    if (value.trim() === "") {
      // Nếu rỗng, quay lại trang chủ và ẩn kết quả tìm kiếm trước đó
      history.push("/");
      setShowSearchResults(false);
      setShowOtherSections(true); // Hiển thị lại các phần không liên quan khi không có kết quả tìm kiếm
    }
  };

  const openDetail = (item) => {
    // Xử lý khi người dùng nhấp vào nút xem nhanh
  };

  const addToCart = (item) => {
    // Xử lý khi người dùng nhấp vào nút thêm vào giỏ hàng
  };

  return (
    <>
      <section className="search">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="logo width ">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="col-md-8">
              <form>
                <div className="search-box f_flex">
                  <i className="fa fa-search"></i>
                  <input
                    name="keyword"
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm} 
                    onChange={handleInputChange}
                  />
                  <span>Search</span>
                </div>
              </form>
            </div>
            <div className="col-md-2">
              <div className="icon f_flex width user-shop">
                <div className="account">
                  <Link to="/account">
                  <i className="fa fa-user icon-circle"></i>
                  </Link>
                </div>
                <div className="cart">
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag icon-circle"></i>
                    <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiển thị kết quả tìm kiếm nếu có */}
      {showSearchResults && (
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
                          <span className="arrival">{item.discount} %OFF</span>
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
      )}

      {/* Ẩn các phần không liên quan khi có kết quả tìm kiếm */}
      {!showSearchResults && showOtherSections && (
        <>
          {/* Các phần không liên quan ở đây */}
        </>
      )}
    </>
  );
};

export default Search;
