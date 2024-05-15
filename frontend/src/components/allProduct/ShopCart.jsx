import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const ShopCart = ({ addToCart }) => {
  const { page } = useParams(); // Lấy số trang từ URL
  const currentPage = parseInt(page, 10) || 1; // Nếu không có trang nào được chỉ định, mặc định là trang 1
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();

  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/products/page?page=${pageNumber}&size=9`);
      if (!response.ok) {
        console.error("Network response was not ok", response.status, response.statusText);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setShopItems(data.content);
      setTotalPages(data.totalPages); // Cập nhật tổng số trang từ phản hồi
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log("Lỗi: " + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
          <Link to={`/shop/page/${i}`} className="page-link">
            {i}
          </Link>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        shopItems.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="product mt w-100">
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
        ))
      )}
      <nav aria-label="Page navigation example" className="mb-3">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <Link to={`/shop/page/${currentPage - 1}`} className="page-link">
              Previous
            </Link>
          </li>
          {renderPageNumbers()}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <Link to={`/shop/page/${currentPage + 1}`} className="page-link">
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ShopCart;
