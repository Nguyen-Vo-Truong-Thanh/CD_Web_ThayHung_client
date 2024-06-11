import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Card, Image, Badge } from "antd";

const ShopCart = () => {
  const { page } = useParams();
  const currentPage = parseInt(page, 10) || 1;
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();

  const openDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/products/page?page=${pageNumber}&size=9`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setShopItems(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      setError(error.message);
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
        <div className="row">
          {shopItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <Badge.Ribbon text={item.status === "new" ? "New" : item.discount > 0 ? `${item.discount}%` : ""}>
                <Card className="w-100 h-100">
                  <div className="w-100 h-img-cart d-flex justify-content-center">
                    <Image className="w-100 h-100" src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="w-100 mt-4">
                    <p className="code-box-title">{item.name}</p>
                  </div>
                  <div className="w-100">
                    {item.discount > 0 ? (
                      <div>
                        <p className="code-box-price" style={{ textDecoration: "line-through", color: "gray", marginBottom:0 }}>
                          {item.price.toLocaleString()} VNĐ
                        </p>
                        <p className="code-box-price">{calculateDiscountedPrice(item.price, item.discount).toLocaleString()} VNĐ</p>
                      </div>
                    ) : (
                      <p className="code-box-price">{item.price.toLocaleString()} VNĐ</p>
                    )}
                  </div>
                  <div className="w-100 d-flex justify-content-between">
                    <Button onClick={() => openDetail(item.id)} type="primary">
                      Chi tiết
                    </Button>
                    <Button><Link to="/checkout">Mua</Link></Button>
                  </div>
                </Card>
              </Badge.Ribbon>
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
