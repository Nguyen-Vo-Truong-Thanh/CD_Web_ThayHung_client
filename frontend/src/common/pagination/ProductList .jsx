import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import './Pagination.css';
import AllProduct from '../../components/allProduct/AllProduct';
import Categories from '../../components/MainPage/Categories';

const ProductList = ({ addToCart }) => {
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
    <div className="shop">
      <div className="w-100 h-100 pt-4 pb-4">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-3 d-none d-sm-block">
              <Categories />
            </div>
            <div className="col-md-9 col-sm-12">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <AllProduct shopItems={shopItems} addToCart={addToCart} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
