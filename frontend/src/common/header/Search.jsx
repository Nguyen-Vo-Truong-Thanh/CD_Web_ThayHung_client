import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import logo from "../../components/assets/images/logo.webp";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Search = ({ CartItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      history.push("/");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      history.push(`/search-results?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

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
              <form onSubmit={handleSearch}>
                <div className="search-box f_flex">
                  <i className="fa fa-search"></i>
                  <input
                    name="keyword"
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  <button className="me-3" type="submit">Search</button>
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
