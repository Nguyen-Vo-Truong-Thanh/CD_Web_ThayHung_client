import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, message, Image } from 'antd';
import "./DetailProduct.css";

const DetailProduct = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { id } = useParams();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/products/product/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      messageApi.error("Error loading product data");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  return (
    <>
      {contextHolder}
      <div className="product mtop w-100">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <Image src={product.imageUrl} alt={product.name} />
            </div>
            <div className="col-md-7">
              <div className="product-details"></div>
              <h3 className="title">{product.name}</h3>
              <div>
                {product.discount > 0 ? (
                  <div>
                    <h4 style={{ textDecoration: 'line-through', color: 'gray' }}>
                      {product.price.toLocaleString()} VNĐ
                    </h4>
                    <h4>
                      {calculateDiscountedPrice(product.price, product.discount).toLocaleString()} VNĐ
                    </h4>
                  </div>
                ) : (
                  <h4>{product.price.toLocaleString()} VNĐ</h4>
                )}
                <div className="des">
                  <i className="fa-solid fa-circle"></i>
                  <span className="description">{product.description}</span>
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <Button
                    className="ant-btn css-dev-only-do-not-override-17seli4 ant-btn-default"
                    onClick={() => addToCart(product)}
                  >
                    Mua
                  </Button>
                </div>
                <div className="btn btn-danger mt-3">
                  <Button type="danger">
                    <Link to="/checkout">Thanh toán</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
