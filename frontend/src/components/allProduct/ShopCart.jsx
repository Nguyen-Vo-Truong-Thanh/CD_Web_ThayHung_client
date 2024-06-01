import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button, Card, Image } from 'antd';

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
    let isMounted = true;
    fetchProducts(currentPage).then(() => {
      if (isMounted) setLoading(false);
    }).catch((err) => {
      if (isMounted) setError(err.message);
    });
    return () => { isMounted = false; }; // Cleanup function to avoid memory leaks
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
        <div className="row">
          {shopItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
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
          ))}
        </div>
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
