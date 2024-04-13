import React from "react";
import logo from "../../components/assets/images/logo.webp";
import { Link } from "react-router-dom";

const Search = ({ CartItem }) => {
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
              <div className="search-box f_flex">
                <i className="fa fa-search"></i>
                <input type="text" placeholder="Search here..." />
                <span>All Category</span>
              </div>
            </div>
            <div className="col-md-2">
              <div className="icon f_flex width">
                <i className="fa fa-user icon-circle"></i>
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
