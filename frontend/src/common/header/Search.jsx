import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logo from "../../components/assets/images/logo.webp";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const Search = ({ CartItem }) => {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);
  

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/products/search?keyword=?`);
      const data = await response.json();
      setShopItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log("Lỗi: " + err.message);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  return (
    <>
      <section className="search">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="logo width ">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="col-md-8">
            <form>
              <div className="search-box f_flex">
                <i className="fa fa-search"></i>
                <input name="keyword" type="text" placeholder="Search here..." />
                <span>Search</span>
              </div>
              </form>
            </div>
            <div className="col-md-2">
              <div className="icon f_flex width user-shop">
                <div className="account">
                  <Link to="/account">
                  <i className="fa fa-user icon-circle"></i>
                  </Link>
                </div>
                <div className="cart">
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag icon-circle"></i>
                    <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
