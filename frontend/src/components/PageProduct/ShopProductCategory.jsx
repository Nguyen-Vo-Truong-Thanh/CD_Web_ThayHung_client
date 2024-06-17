import ShopCart from "./ShopProductList";
import "./style.css";
import React, { useState, useEffect } from 'react';

// Sử dụng thư viện ngzoro antd
import { Card, Spin } from 'antd';
import ShopProductList from "./ShopProductList";
import ShopProductNew from "./ShopProductNew";
import ShopProductDiscount from "./ShopProductDiscount";

const ShopProductCategory = () => {

  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Gọi api danh sách category 
  const loadData = async () => {
    try {
      setLoading(true);
      let data = [];

      const response = await fetch(`http://localhost:8080/api/product-category/getAll`);
      data = await response.json();

      setData((data && data.length > 0) ? data : []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="shop-new-arrival">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="container mb-4" key="new">
            <Card className="w-100" title="Sản phẩm mới">
              <div className="row">
                <ShopProductNew />
              </div>
            </Card>
          </div>

          <div className="container mb-4" key="discount">
            <Card className="w-100" title="Giảm giá">
              <div className="row">
                <ShopProductDiscount />
              </div>
            </Card>
          </div>

          {lstData && lstData.map((category) => (
            <div className="container mb-4" key={category.id}>
              <Card className="w-100" title={category.name}>
                <div className="row">
                  <ShopProductList category={category} />
                </div>
              </Card>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ShopProductCategory;
