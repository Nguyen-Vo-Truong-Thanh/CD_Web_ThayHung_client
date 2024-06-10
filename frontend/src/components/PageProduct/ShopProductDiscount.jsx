import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// Sử dụng thư viện ngzoro antd
import { Button, message, Card, Image, Badge } from 'antd';

const ShopProductDiscount = () => {  
  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();

  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  const addToCart = (item) => {
    // Thêm sản phẩm vào giỏ hàng
    const cartItem = { id: item.id, name: item.name, price: item.price, discount: item.discount };
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Hiển thị thông báo
    messageApi.success(`${item.name} đã được thêm vào giỏ hàng.`);
  }

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/products/byDiscount?discount=1`);
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
                  <Image className="w-100 h-100" src={item.imageUrl}/>
                </div>
                <div className="w-100 mt-4">
                  <p className="code-box-title">{item.name}</p>
                </div>
                <div className="w-100">
                  {item.discount > 0 ? (
                    <div>
                      <p className="code-box-price" style={{ textDecoration: 'line-through', color: 'gray',marginBottom:0 }}>
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

export default ShopProductDiscount;
