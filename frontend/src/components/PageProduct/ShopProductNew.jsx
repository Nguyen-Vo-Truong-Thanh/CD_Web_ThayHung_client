// ShopProductNew.jsx
import React, { useState, useEffect } from 'react';
import { Button, message, Card, Image, Badge } from 'antd';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ShopProductNew = ({ }) => {  
  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();

  const openDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  useEffect(() => {
    let isMounted = true; 

    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/products/byStatus?status=new`);
        const data = await response.json();
      
        if (isMounted) {
          setData((data && data.length > 0) ? data : []);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <>
      {contextHolder}
      {lstData && lstData.map((product) => (
        <div className="col-md-3 mb-4" key={product.id}>
          <Badge.Ribbon text={product.status} className="code-box-card">
            <Card className="w-100 h-100">
              <div className="w-100 h-img-cart d-flex justify-content-center">
                <Image className="w-100 h-100" src={product.imageUrl} />
              </div>
              <div className="w-100 mt-4">
                <p className="code-box-title">{product.name}</p>
              </div>
              <div className="w-100">
                <p className="code-box-price">{product.price.toLocaleString()} VNĐ</p>
              </div>
              <div className="w-100 d-flex justify-content-between">
                <Button onClick={() => openDetail(product.id)} type="primary">Chi tiết</Button>
                <Button><Link to="/checkout">Mua</Link></Button>
              </div>
            </Card>
          </Badge.Ribbon>
        </div>
      ))}
    </>
  );
};

export default ShopProductNew;
