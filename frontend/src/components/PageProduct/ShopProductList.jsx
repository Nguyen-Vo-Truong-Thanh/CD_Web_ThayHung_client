import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';

// Sử dụng thư viện ngzoro antd
import { Button, message, Card, Image, Badge  } from 'antd';

const ShopProductList = ({ category }) => {  debugger

  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi] = message.useMessage();

  const history = useHistory();
  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  const addToCart = (item) => { 
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      let data = null;

      if(category && category.id === 1000) {
        const response = await fetch(`http://localhost:8080/api/products/byStatus?status=new`);
        data = await response.json();
      } else {
        // Chỗ này sử dụng category => đầu vào api 
        const response = await fetch(`http://localhost:8080/api/products/byCategory?id=${category.id}`);
        data = await response.json();
      }

      setData((data && data.length > 0) ? data : []);
      setLoading(false);

    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {lstData && lstData.map((item) => {
        return (
          <>
            <div className="col-md-3 mb-4" key={item.id}>
              <Badge.Ribbon text={item.status ? item.status : (item.discount > 0 ? item.discount + "%" : '')} className="code-box-card">
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
          </>
        )
      })}
    </>
  )
}

export default ShopProductList;
