import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Sử dụng thư viện ngzoro antd
import { Button, message, Card, Image, Badge  } from 'antd';

const ProductCategory = () => {  

  const [categoryItem, setCategoryItem] = useState([]);
  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi] = message.useMessage();

  const history = useHistory();
  const openDetail = (item) => {
    history.push("/detail/" + item.id);
  };

  const addToCart = (item) => { 
  }

  const { id } = useParams();
  useEffect(() => {
    if(id) { 
      loadCategoryItem()
      loadProduct();
    }
  }, []);

  const loadCategoryItem = async () => {
    try {
      setLoading(true);
      let data = null;

      const categoryId = parseInt(id);
      const response = await fetch(`http://localhost:8080/api/product-category/getItem?id=${categoryId}`);
      data = await response.json();
    
      setCategoryItem(data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
    }
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      let data = null;

      const categoryId = parseInt(id);
      const response = await fetch(`http://localhost:8080/api/products/byCategory?id=${categoryId}`);
      data = await response.json();
    
      setData((data && data.length > 0) ? data : []);
      setLoading(false);

    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <div className="col-md-12">
            <h4>{categoryItem ? categoryItem.name : ''}</h4>
          </div>
        </div>
        <div className="row">
          {lstData && lstData.map((item) => {
            return (
              <>
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
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ProductCategory;
