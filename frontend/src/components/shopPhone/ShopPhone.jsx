import ShopCart from "./ShopCart";
import React, { useState, useEffect } from 'react';

// Sử dụng thư viện ngzoro antd
import { Card } from 'antd';

const ShopPhone = () => {

  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Gọi api danh sách category 
  const loadData = async () => {
    try {
      setLoading(true);

      // const response = await fetch(`http://localhost:8080/api/products/category`);
      // const data = await response.json();

      const data = [ 
        // {
        //   "id": 1,
        //   "name": "New Arrivals",
        //   "createdAt": "2024-05-06T07:30:16.000+00:00"
        // },
        // {
        //   "id": 2,
        //   "name": "Discount",
        //   "createdAt": "2024-05-06T07:30:16.000+00:00"
        // },
        {
          "id": 3,
          "name": "Mobile Phones",
          "createdAt": "2024-05-06T07:30:16.000+00:00"
        },
        // {
        //   "id": 4,
        //   "name": "Laptop",
        //   "createdAt": "2024-05-06T07:30:16.000+00:00"
        // },
        // {
        //   "id": 5,
        //   "name": "Đồng hồ thông minh",
        //   "createdAt": "2024-05-06T07:30:16.000+00:00"
        // },
      ];

      setData((data && data.length > 0) ? data : []);
      setLoading(false);

    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {lstData && lstData.map((category) => {
        return(
          <>
            <div className="container mb-4" key={category.id}>
              <Card className="w-100" title={category.name}>
                <div className="row">
                  <ShopCart category={category}/>
                </div>
              </Card>
            </div>
          </>
        )
      })}
    </>
  );
};

export default ShopPhone;
