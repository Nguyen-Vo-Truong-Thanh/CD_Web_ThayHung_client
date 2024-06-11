import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Image, Badge, message } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ShopProductList = ({ category }) => {
  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();

  const openDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  useEffect(() => {
    loadData();
  }, [category]);

  const loadData = async () => {
    try {
      setLoading(true);
      let data = null;
      if (category && category.id === 1000) {
        const response = await fetch(`http://localhost:8080/api/products/byStatus?status=new`);
        data = await response.json();
      } else {
        const response = await fetch(`http://localhost:8080/api/products/byCategory?id=${category.id}`);
        data = await response.json();
      }
      setData((data && data.length > 0) ? data : []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      messageApi.error("Error loading products");
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };
  
  return (
    <>
      {contextHolder}
      {lstData && lstData.map((product) => {
        return (
          <div className="col-md-3 mb-4" key={product.id}>
            <Badge.Ribbon text={product.status === 'new' ? 'New' : (product.discount > 0 ? product.discount + "%" : '')} className="code-box-card">
              <Card className="w-100 h-100">
                <div className="w-100 h-img-cart d-flex justify-content-center">
                  <Image className="w-100 h-100" src={product.imageUrl} />
                </div>
                <div className="w-100 mt-4">
                  <p className="code-box-title">{product.name}</p>
                </div>
                <div className="w-100">
                  {product.discount > 0 ? (
                    <div>
                      <p className="code-box-price" style={{ textDecoration: 'line-through', color: 'gray', marginBottom: 5 }}>
                        {product.price.toLocaleString()} VNĐ
                      </p>
                      <p className="code-box-price" style={{ fontWeight: 'bold' }}>
                        {calculateDiscountedPrice(product.price, product.discount).toLocaleString()} VNĐ
                      </p>
                    </div>
                  ) : (
                    <p className="code-box-price">{product.price.toLocaleString()} VNĐ</p>
                  )}
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <Button onClick={() => openDetail(product.id)} type="primary">Chi tiết</Button>
                  <Button><Link to="/checkout">Mua</Link></Button>
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        )
      })}
    </>
  );
}

export default ShopProductList;
