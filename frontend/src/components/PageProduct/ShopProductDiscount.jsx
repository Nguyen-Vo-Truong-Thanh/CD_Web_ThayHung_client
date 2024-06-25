import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// Sử dụng thư viện ngzoro antd
import { Button, message, Card, Image, Badge } from 'antd';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ShopProductDiscount = () => {
  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();

  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await fetch(`http://localhost:8080/api/products/byDiscount?discount=1`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
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

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  return (
    <>
      {contextHolder}
      {lstData && lstData.map((item) => {
        return (
          <div className="col-md-3 mb-4" key={item.id}>
            <Badge.Ribbon text={`${item.discount}%`} className="code-box-card">
              <Card className="w-100 h-100">
                <div className="w-100 h-img-cart d-flex justify-content-center">
                  <Image className="w-100 h-100" src={item.imageUrl} />
                </div>
                <div className="w-100 mt-4">
                  <p className="code-box-title">{item.name}</p>
                </div>
                <div className="w-100">
                  {item.discount > 0 ? (
                    <div>
                      <p className="code-box-price" style={{ textDecoration: 'line-through', color: 'gray', marginBottom: 0 }}>
                        {item.price.toLocaleString()} VNĐ
                      </p>
                      <p className="code-box-price">
                        {calculateDiscountedPrice(item.price, item.discount).toLocaleString()} VNĐ
                      </p>
                    </div>
                  ) : (
                    <p className="code-box-price">{item.price.toLocaleString()} VNĐ</p>
                  )}
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <Button onClick={() => openDetail(item)} type="primary">Chi tiết</Button>
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

export default ShopProductDiscount;
