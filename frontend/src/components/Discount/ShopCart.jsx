import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';

// Sử dụng thư viện antd
import { Button, message, Card, Image, Badge } from 'antd';

const ShopCart = ({ category }) => { 

  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi] = message.useMessage();

  const history = useHistory();

  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  const addToCart = (item) => { 
    // Xử lý thêm vào giỏ hàng ở đây
  }

  useEffect(() => {
    loadData();
  }, [category]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Gọi API để lấy danh sách sản phẩm theo danh mục
      const response = await fetch(`http://localhost:8080/api/products/productByDiscount?discount=1`);
      const data = await response.json();
      
      setData((data && data.length > 0) ? data : []);
      setLoading(false);

    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {lstData && lstData.map((item) => {
        const discountedPrice = (item.price * (100 - item.discount) / 100).toLocaleString();
        const originalPrice = item.price.toLocaleString();

        return (
          <div className="col-md-3 mb-4" key={item.id}>
            <Badge.Ribbon text={`${item.discount}% OFF`} className="code-box-card">
              <Card className="w-100 h-100">
                <div className="w-100 h-img-cart d-flex justify-content-center">
                  <Image className="w-100 h-100" src={item.imageUrl} alt={item.name} />
                </div>
                <div className="w-100 mt-4">
                  <p className="code-box-title">{item.name}</p>
                </div>
                <div className="w-100">
                  {item.discount ? (
                    <div>
                      <p className="code-box-price">
                        <del>{originalPrice} VNĐ</del> <br />
                        {discountedPrice} VNĐ
                      </p>
                    </div>
                  ) : (
                    <p className="code-box-price">{originalPrice} VNĐ</p>
                  )}
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <Button onClick={() => openDetail(item)} type="primary">Chi tiết</Button>
                  <Button onClick={() => addToCart(item)}>Mua</Button>
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        )
      })}
    </>
  );
}

export default ShopCart;
