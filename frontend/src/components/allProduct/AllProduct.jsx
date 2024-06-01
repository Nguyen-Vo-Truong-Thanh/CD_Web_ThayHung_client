import React from "react";
import ShopCart from "./ShopCart";
import "./style.css";
import { Card, Spin } from 'antd';

const AllProduct = () => {
  return (
    <>
      <Card >
        <div className="container">
          <div className="row">
            <h4 className="mb-4">Sản phẩm của chúng tôi</h4>
            <div className="row">
              <ShopCart />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AllProduct;
