import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";

const Categories = () => {
  const [lstData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const openDetail = (item) => {
    history.push("/product-category/" + item.id);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      let data = [];
      const accessToken = sessionStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8080/api/product-category/getAll`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        }
      );
      data = await response.json();

      setData((data && data.length > 0) ? data : []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Badge.Ribbon text="Danh mục">
        <div className="p-2 code-h-category">
          {lstData.map((value) => {
            return (
              <div onClick={() => openDetail(value)} key={value.id}>
                <div className="p-2 code-hover-category">
                  <span className="code-box-title">{value.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Badge.Ribbon>
    </>
  );
};

export default Categories;
