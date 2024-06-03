import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// Sử dụng thư viện ngzoro antd
import { Button, message, Card, Image, Badge } from 'antd';

const ShopProductNew = () => {  
  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi] = message.useMessage();
  const history = useHistory();

  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  const addToCart = (item) => { 
    // Thêm logic để thêm sản phẩm vào giỏ hàng
  }

  useEffect(() => {
    let isMounted = true; 

    const loadData = async () => {
      try {
        setLoading(true);
        let data = null;

        const response = await fetch(`http://localhost:8080/api/products/byStatus?status=new`);
        data = await response.json();
      
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
      isMounted = false; // Component đã bị unmounted
    };
  }, []);

  return (
    <>
      {lstData && lstData.map((item) => {
        return (
          <div className="col-md-3 mb-4" key={item.id}>
            <Badge.Ribbon text={item.status} className="code-box-card">
              <Card className="w-100 h-100">
                <div className="w-100 h-img-cart d-flex justify-content-center">
                  <Image className="w-100 h-100" src={item.imageUrl}/>
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
            </Badge.Ribbon>
          </div>
        )
      })}
    </>
  )
}

export default ShopProductNew;
