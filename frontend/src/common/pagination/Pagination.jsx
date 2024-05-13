import React, { useState, useEffect } from "react";
import "./Pagination.css";
import { Link } from "react-router-dom";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pages > 0 ? pages : 1);
  }, [totalItems, itemsPerPage]);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/products/productByPage?page=${page}`);
      const data = await response.json();
      setShopItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log("Lỗi: " + err.message);
      setLoading(false);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "active" : ""}`}
      >
        <Link
          to={`/products?page=${number}`}
          className="page-link"
          onClick={() => {
            onPageChange(number);
            fetchProducts(number); // Gọi fetchProducts khi trang thay đổi
          }}
        >
          {number}
        </Link>
      </li>
    ));
  };

  return (
    <div className="pagination">
      <div className="container">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <Link
                to={`/products?page=${currentPage - 1}`}
                className="page-link"
                onClick={() => {
                  onPageChange(currentPage - 1);
                  fetchProducts(currentPage - 1); // Gọi fetchProducts khi trang thay đổi
                }}
              >
                Previous
              </Link>
            </li>
            {renderPageNumbers()}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <Link
                to={`/products?page=${currentPage + 1}`}
                className="page-link"
                onClick={() => {
                  onPageChange(currentPage + 1);
                  fetchProducts(currentPage + 1); // Gọi fetchProducts khi trang thay đổi
                }}
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
