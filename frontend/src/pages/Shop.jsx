import React, { useEffect } from "react";
import Categories from "../components/MainPage/Categories";
import AllProduct from "../components/allProduct/AllProduct";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-100 h-100 pt-4 pb-4">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-3 d-none d-sm-block">
            <Categories />
          </div>
          <div className="col-md-9 col-sm-12">
            <AllProduct className="col-md-8"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
